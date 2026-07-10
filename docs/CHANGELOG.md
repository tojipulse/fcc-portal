# CHANGELOG.md

> FCC PORTAL Change History

---

# 1. 目的

本ドキュメントでは、FCC PORTAL の仕様変更・機能追加・不具合修正履歴を管理します。

設計変更・DB変更・API変更・画面変更は必ず本書へ記録してください。

---

# 2. バージョンルール

|Version|内容|
|--------|------------------------------|
|v1.0.0|初版リリース|
|v1.0.1|軽微な修正・不具合対応|
|v1.1.0|機能追加（DB変更なし）|
|v2.0.0|DB構造変更・大規模改修|

---

# 3. 更新ルール

仕様変更が発生した場合は必ず

設計書

↓

Markdown

↓

SQL

↓

Repository

↓

API

↓

画面

↓

CHANGELOG

の順で更新する。

コードだけ先に変更することは禁止。

---

# 4. 更新履歴

---

## v1.0.0

### 初版作成

プロジェクト開始

### 機能

- 家庭管理
- 保護者管理
- 選手管理
- ユニフォーム管理
- ドキュメント管理
- スケジュール管理
- 出欠管理
- コーチ出席管理
- お知らせ管理
- マスター管理
- 年度更新

---

### 設計

作成済み

- README.md
- AI_HANDOVER.md
- DATABASE.md
- SCREENS.md
- API.md
- DEVELOP.md
- CHANGELOG.md
- TODO.md（予定）

---

### DB

作成

- Household
- Users
- Players
- Uniforms
- Documents
- ScheduleGroups
- ScheduleUnits
- ScheduleUnitGrades
- Invitations
- Attendance
- CoachAttendance
- Notices
- Masters

---

### 共通ルール

採用

- Repository Pattern
- Logical Delete
- Version管理
- 監査項目
- UUID主キー

---

## v1.0.1

（未使用）

---

## v1.1.0

（未使用）

---

## v2.0.0

（未使用）

---

# 5. 記載ルール

更新時は以下の形式で追記する。

```text
Version

更新日

担当

概要

影響範囲

画面

DB

API

Repository

備考
```

---

# 6. 影響範囲

変更が発生した場合は必ず影響範囲を書く。

例

```
Players

Attendance

Repository

API
```

---

# 7. 仕様変更

仕様変更時は

理由

↓

変更前

↓

変更後

↓

影響画面

↓

影響テーブル

を書く。

---

# 8. 不具合修正

記録内容

- 発生日
- 原因
- 修正内容
- 再発防止策

---

# 9. リファクタリング

記録内容

- 対象
- 理由
- 効果
- 動作確認

---

# 10. リリース履歴

|Version|Release|内容|
|--------|--------|----------------|
|v1.0.0|未リリース|初版|

---

# 11. 今後予定

- Push通知
- LINE連携
- 試合結果管理
- 成績管理
- 写真アルバム
- 活動履歴
- コーチ評価
- 練習メニュー

---

# 12. 禁止事項

CHANGELOGを書かずに

- DB変更
- API変更
- Repository変更

を行わない。

---

# 13. レビュー

レビュー時は

□ 設計書更新済

□ Markdown更新済

□ CHANGELOG更新済

□ SQL更新済

□ Repository更新済

□ API更新済

□ 画面更新済

を確認する。

---

# 14. 運用方針

CHANGELOGは削除しない。

古い履歴もすべて残す。

---

# 15. 更新履歴

|Version|内容|
|--------|---------------------------|
|1.0.0|CHANGELOG初版作成|