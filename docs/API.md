# API.md

> FCC PORTAL API Specification

---

# 1. 目的

本ドキュメントは FCC PORTAL で利用する API の設計ルールを定義します。

画面は直接データベースへアクセスせず、必ず Repository → API を経由します。

---

# 2. 基本方針

- REST APIを採用
- JSON形式で通信
- Repositoryを経由してDBへアクセス
- 画面からSQLは禁止
- 論理削除を採用
- 楽観ロック(version)を採用

---

# 3. 共通レスポンス

成功

```json
{
  "success": true,
  "message": "",
  "data": {}
}
```

失敗

```json
{
  "success": false,
  "message": "入力内容を確認してください。",
  "errors": []
}
```

---

# 4. HTTPメソッド

|Method|用途|
|-------|----------------|
|GET|取得|
|POST|新規登録|
|PUT|更新|
|DELETE|論理削除|

---

# 5. 認証API

```
POST /api/login

POST /api/logout

GET /api/me
```

---

# 6. Household API

```
GET

/api/households
```

一覧取得

---

```
GET

/api/households/{id}
```

詳細取得

---

```
POST

/api/households
```

登録

---

```
PUT

/api/households/{id}
```

更新

---

```
DELETE

/api/households/{id}
```

論理削除

---

# 7. Users API

```
GET

/api/users
```

```
POST

/api/users
```

```
PUT

/api/users/{id}
```

```
DELETE

/api/users/{id}
```

---

# 8. Players API

```
GET

/api/players
```

一覧

---

```
GET

/api/players/{id}
```

詳細

---

```
POST

/api/players
```

登録

---

```
PUT

/api/players/{id}
```

更新

---

```
DELETE

/api/players/{id}
```

削除

---

# 9. Schedule API

```
GET

/api/schedules
```

予定一覧

---

```
GET

/api/schedules/{id}
```

詳細

---

```
POST

/api/schedules
```

新規

---

```
PUT

/api/schedules/{id}
```

更新

---

```
DELETE

/api/schedules/{id}
```

削除

---

# 10. Attendance API

```
GET

/api/attendance
```

一覧

---

```
POST

/api/attendance
```

回答

---

```
PUT

/api/attendance/{id}
```

変更

---

# 11. Coach Attendance API

```
GET

/api/coach-attendance
```

一覧

---

```
POST

/api/coach-attendance
```

回答

---

```
PUT

/api/coach-attendance/{id}
```

更新

---

# 12. Notice API

```
GET

/api/notices
```

一覧

---

```
GET

/api/notices/{id}
```

詳細

---

```
POST

/api/notices
```

登録

---

```
PUT

/api/notices/{id}
```

更新

---

```
DELETE

/api/notices/{id}
```

削除

---

# 13. Master API

```
GET

/api/masters
```

```
POST

/api/masters
```

```
PUT

/api/masters/{id}
```

```
DELETE

/api/masters/{id}
```

---

# 14. Year Update API

```
POST

/api/year-update/preview
```

年度更新プレビュー

---

```
POST

/api/year-update/execute
```

年度更新実行

---

# 15. Document API

```
POST

/api/documents/upload
```

アップロード

---

```
GET

/api/documents/{id}
```

取得

---

```
DELETE

/api/documents/{id}
```

削除

---

# 16. エラーハンドリング

APIは必ず

- success
- message
- errors

を返却する。

画面側でHTTPコードのみを判定しない。

---

# 17. 権限チェック

API側でも必ず実施する。

画面側だけの制御は禁止。

---

# 18. ログ

更新系APIは

- 更新者
- 更新日時
- version

を必ず更新する。

---

# 19. 実装ルール

- Repository経由でDBアクセス
- Transaction対応
- SQL直書き禁止
- 例外は共通処理へ集約
- APIレスポンス形式を統一

---

# 20. 更新履歴

|Version|内容|
|-------|----------------|
|1.0.0|初版作成|