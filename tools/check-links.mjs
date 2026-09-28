// 連結檢查：掃描站內 HTML 的 href / src / url()，驗證
// 1) 本地檔案存在  2) 頁面內 #錨點 id 存在  3) 跨頁錨點 id 存在
// 用法：node tools/check-links.mjs
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlFiles = readdirSync(root).filter((f) => f.endsWith('.html'));

const errors = [];
const warnings = [];
const anchorsByFile = {};

// 收集每頁的 id 錨點
for (const file of htmlFiles) {
  const html = readFileSync(join(root, file), 'utf8');
  const ids = new Set();
  for (const m of html.matchAll(/\bid=["']([^"']+)["']/g)) ids.add(m[1]);
  anchorsByFile[file] = ids;
}

const extOk = (url) => /^(https?:)?\/\//i.test(url) || /^(mailto:|tel:|data:|#)/i.test(url);

for (const file of htmlFiles) {
  const html = readFileSync(join(root, file), 'utf8');
  const refs = [];
  for (const m of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) refs.push(m[1]);
  for (const m of html.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) refs.push(m[1]);

  for (const raw of refs) {
    const ref = raw.trim();
    if (!ref || extOk(ref)) continue;

    const [pathPart, fragment] = ref.split('#');
    const targetFile = pathPart === '' ? file : pathPart;

    if (!existsSync(join(root, targetFile))) {
      if (targetFile.endsWith('.html')) {
        errors.push(`${file}: 內部頁面不存在 → ${ref}`);
      } else {
        errors.push(`${file}: 本地資源不存在 → ${ref}`);
      }
      continue;
    }

    if (fragment && targetFile.endsWith('.html')) {
      if (!anchorsByFile[targetFile]?.has(fragment)) {
        errors.push(`${file}: 錨點 #${fragment} 在 ${targetFile} 中不存在 → ${ref}`);
      }
    }
  }

  // 未使用的本地圖片列為 warning（非錯誤）
}

// 圖片資產未被引用提示
const imgDir = join(root, 'images');
if (existsSync(imgDir)) {
  const allHtml = htmlFiles.map((f) => readFileSync(join(root, f), 'utf8')).join('\n');
  for (const img of readdirSync(imgDir)) {
    if (!allHtml.includes(`images/${img}`)) warnings.push(`images/${img} 未被任何頁面引用`);
  }
}

for (const w of warnings) console.log(`WARN  ${w}`);
if (errors.length) {
  for (const e of errors) console.log(`ERROR ${e}`);
  console.log(`\n結果：${errors.length} 個錯誤`);
  process.exit(1);
}
console.log(`結果：0 個 broken link（檢查 ${htmlFiles.length} 頁，警告 ${warnings.length} 則）`);
