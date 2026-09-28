# 捷安特 義昌車行 官方網站

嘉義民雄腳踏車與電動車專賣店的靜態官方網站（純 HTML / CSS / JavaScript，無後端）。

- 線上版：<https://yichang-bike-shop.vercel.app>
- GitHub Pages：<https://thumb2086.github.io/yichang-bike-shop/>（gh-pages 分支）

## 頁面結構

| 檔案 | 內容 |
| --- | --- |
| `index.html` | 首頁：Hero 輪播、關於車行、精選車款、服務預覽、營業資訊 |
| `products.html` | 產品目錄：7 大分類共 26 款商品（公路車／登山車／城市車／電輔車／摺疊車／兒童車／配件） |
| `services.html` | 服務項目：維修保養（`#repair`）、二手車買賣（`#trade`）、改裝升級（`#upgrade`） |
| `contact.html` | 聯絡我們：門市資訊、Google 地圖、LINE、線上諮詢表單 |
| `styles.css` | 全站樣式（含響應式，支援手機選單） |
| `script.js` | 共用腳本：手機選單、Hero 輪播、導航欄捲動、平滑捲動、諮詢表單 |
| `images/` | 產品與車行實拍圖 |
| `vercel.json` | Vercel 部署設定 |
| `tools/check-links.mjs` | 站內連結檢查工具 |

## 本機啟動

```bash
# 任選一種
python -m http.server 8000
npx serve .
```

開啟 <http://127.0.0.1:8000/index.html> 即可預覽。

## 連結檢查

```bash
node tools/check-links.mjs
```

檢查所有頁面的 `href` / `src` / `url()`：本地檔案是否存在、`#錨點` 是否存在。錯誤數為 0 才算通過（exit code 1 代表有錯誤）。

## 聯絡表單說明

本站為純靜態部署，表單沒有後端。送出後會將諮詢內容複製到剪貼簿並開啟 LINE（`line.me/ti/p/~052261731`），訪客貼上傳送即可；亦可直接撥打 05-226-1731。

## 部署

- **Vercel**：repo 已含 `vercel.json`，連接 repo 即可。
- **GitHub Pages**：內容放在 `gh-pages` 分支。

## 營業資訊

- 地址：621 嘉義縣民雄鄉民族路 57 號
- 電話：05-226-1731
- 營業時間：09:00 - 20:00（週日彈性營業，歡迎來電確認）
