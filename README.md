# 老爸的私房錢

![](https://raw.githubusercontent.com/alanchang920/expense-tracker/main/expense-tracker.png)

## 產品功能
- 在首頁一次瀏覽所有支出的清單
- 在首頁看到所有支出清單的總金額
- 新增一筆支出
- 編輯支出的所有屬性 (一次只能編輯一筆)
- 刪除任何一筆支出 (一次只能刪除一筆)
- 加入使用者認證功能
- 在首頁可以根據支出「類別」、「月份」篩選支出；總金額的計算只會包括被篩選出來的支出總和。

## 環境建置
- Node.js
- npm
- Express
- Express-Handlebars
- Nodemon
- MongoDB
- Mongoose

## 專案安裝
1. 開啟終端機

```
https://github.com/alanchang920/expense-tracker.git
```

2. 進入專案資料夾

```
cd expense-tracker
```

3. 安裝 npm 套件

```
npm install
```

4. 安裝 nodemon 套件

```
npm install -g nodemon
```

5. 匯入種子資料到資料庫

```
npm run seed
```

6. 啟動伺服器，執行 app.js 檔案

```
npm run dev
```

7. 連線成功，查看專案

```
Express is listening on http://localhost:3000
mongodb connected!
```
