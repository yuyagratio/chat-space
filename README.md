# ChatSpace DB設計
## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|text|null: false|
### Association
- has_many :users, through: :groups_users
- has_many :messages
- has_many :groups_users

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|
### Association
- has_many :groups, through: :groups_users
- has_many :messages
- has_many :groups_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
