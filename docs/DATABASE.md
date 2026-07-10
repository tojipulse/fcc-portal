# DATABASE.md

> FCC PORTAL Database Design Overview

---

# 1. 目的

このドキュメントは、FCC PORTALで使用するデータベース全体の構成をまとめたものです。

詳細なカラム定義は

```
docs/
16_DBテーブル定義書
```

を参照してください。

本書では

- テーブル構成
- リレーション
- 責務
- 更新ルール

をまとめます。

---

# 2. 設計方針

FCC PORTALでは

- 正規化
- 保守性
- 年度更新
- 論理削除
- 拡張性

を最優先にしています。

すべてのテーブルは

- created_at
- created_by_user_id
- updated_at
- updated_by_user_id
- version
- is_active
- is_deleted

を基本項目として持ちます。

---

# 3. テーブル一覧

## Household

家庭情報

親となるテーブル

---

## Users

保護者

コーチ

管理者

ログインユーザー

---

## Players

選手

Household配下

---

## Uniforms

ユニフォーム管理

選手と紐付く

複数購入対応

---

## Documents

物理ファイル管理

保存先

storage_path

を保持する

---

## ScheduleGroups

予定カード

保護者が見る単位

---

## ScheduleUnits

予定詳細

時間

場所

を保持

---

## ScheduleUnitGrades

予定対象学年

合同予定対応

---

## Invitations

招待対象選手

予定変更時も履歴保持

---

## Attendance

保護者回答

出席

欠席

未定

未回答

---

## CoachAttendance

コーチ出席

専用画面のみ回答

---

## Notices

お知らせ

公開

下書き

添付対応

---

## Masters

各種マスター

---

# 4. リレーション

```
Household

    │

    ├──── Users

    │

    └──── Players

Players

    │

    ├──── Uniforms

    │

    └──── Documents

ScheduleGroup

    │

    ├──── ScheduleUnits

    │

    ├──── ScheduleUnitGrades

    │

    ├──── Invitations

    │

    ├──── CoachAttendance

    │

    └──── Documents

Invitation

    │

    └──── Attendance
```

---

# 5. 年度更新対象

更新対象

・Players

・担当学年

・テンプレート

更新対象外

・Attendance

・Schedule

・Notice

・Documents

・履歴

---

# 6. 論理削除

すべての業務テーブルで採用

```
is_deleted
```

物理削除は行わない。

---

# 7. 楽観ロック

すべて

```
version
```

で管理する。

---

# 8. 監査項目

全テーブル共通

```
created_at

created_by_user_id

updated_at

updated_by_user_id
```

---

# 9. ファイル管理

Documents

↓

storage_path

↓

Storage

DBへバイナリ保存は禁止。

---

# 10. 主キー

UUIDを基本とする。

画面表示番号は

別管理。

---

# 11. インデックス

検索性能向上のため

- Household

- Player

- Schedule

- Attendance

- CoachAttendance

を中心にINDEXを設定する。

---

# 12. 禁止事項

・画面からSQL

・物理削除

・履歴更新

・過去予定変更

・Attendance直接更新

---

# 13. DB変更ルール

DB変更時

必ず

```
ER図

↓

DB定義書

↓

DATABASE.md

↓

Repository

↓

API

↓

画面
```

の順で更新する。

---

# 14. 今後追加予定

・Push通知

・既読管理

・監査ログ

・アクセスログ

・大会成績

・試合結果

・成長記録

・写真アルバム

---

# 15. 更新履歴

|Version|内容|
|-------|----------------|
|1.0.0|初版作成|