# DEVELOP.md

> FCC PORTAL Development Guide

---

# 1. 目的

このドキュメントはFCC PORTALの開発ルールを定義します。

新しい開発者・ChatGPT・Claude・Cursorが同じルールで開発できることを目的としています。

---

# 2. 基本思想

FCC PORTALは

「保守性」

「拡張性」

「運用性」

を最優先に開発します。

実装の簡単さより

将来の修正しやすさ

を重視してください。

---

# 3. 技術構成

Framework

```
Next.js(App Router)
```

Language

```
TypeScript
```

Database

```
Supabase
(SQLite対応可能)
```

CSS

```
Tailwind CSS
```

---

# 4. アーキテクチャ

```
Page

↓

Component

↓

Repository

↓

Database
```

画面からDBアクセスは禁止。

---

# 5. Repositoryルール

Repositoryの責務

・CRUD

・検索

・Transaction

・論理削除

・version管理

Repository以外でSQLを書かない。

---

# 6. Componentルール

Componentは

UIのみ担当。

業務ロジックは禁止。

---

# 7. Pageルール

Pageでは

・表示

・イベント

のみ扱う。

Repositoryを直接呼び出さない。

---

# 8. フォルダ構成

```
app/

components/

repositories/

lib/

hooks/

types/

docs/

sql/

seed/

public/
```

Feature単位で整理する。

---

# 9. 命名規則

Component

```
PlayerCard.tsx
```

Repository

```
PlayerRepository.ts
```

Type

```
player.ts
```

Hook

```
useAttendance.ts
```

---

# 10. DBルール

全テーブル

```
created_at

created_by_user_id

updated_at

updated_by_user_id

version

is_active

is_deleted
```

を持つ。

---

# 11. 論理削除

物理削除は禁止。

```
is_deleted=true
```

で管理。

---

# 12. 楽観ロック

```
version
```

で管理。

更新前にversionを確認する。

---

# 13. バリデーション

必ず

画面

API

Repository

の3層で実施する。

---

# 14. エラー処理

例外は共通処理へ集約。

画面ごとにtry-catchを書かない。

---

# 15. Git運用

main

↓

develop

↓

feature

で管理。

1機能＝1ブランチ

を基本とする。

---

# 16. Commitルール

例

```
feat:

fix:

refactor:

docs:

style:

test:
```

---

# 17. ChatGPT利用ルール

コード提供は

全文コピー

全文貼り付け

差分修正は禁止。

長い場合は

前半

後半

へ分割。

---

# 18. 設計変更

設計変更時

必ず

```
設計書

↓

README

↓

Markdown

↓

コード
```

の順で更新。

---

# 19. コードレビュー

レビュー項目

□ Repository経由

□ 型安全

□ SQL直書きなし

□ 共通Component利用

□ 命名規則

□ コメント

□ 保守性

---

# 20. 更新履歴

|Version|内容|
|-------|----------------|
|1.0.0|初版作成|