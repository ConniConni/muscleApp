# 筋トレ記録共有アプリ

友達と一緒に筋トレを頑張るため、筋トレの実績を記録し、コメントやいいね！で励まし合えるアプリです。

## プロジェクト構成

```
muscle-app/
├── frontend/     # React フロントエンド
├── backend/      # NestJS バックエンド
├── docker/       # Docker設定ファイル
└── CLAUDE.md     # 開発仕様書
```

## 技術スタック

### フロントエンド
- React 18+
- TypeScript
- Material-UI / Chakra UI

### バックエンド
- NestJS
- TypeScript
- Prisma ORM

### データベース
- PostgreSQL 15+

## 開発の始め方

### 1. 環境変数の設定

バックエンドとフロントエンドの`.env.example`をコピーして`.env`ファイルを作成してください。

```bash
# バックエンド
cd backend
cp .env.example .env

# フロントエンド
cd ../frontend
cp .env.example .env
```

### 2. データベースの起動

**注意**: ポート5432が既に使用されている場合は、既存のPostgreSQLを使用するか、docker-compose.ymlのポート設定を変更してください。

```bash
cd docker
docker-compose up -d
```

既存のPostgreSQLを使用する場合:
```bash
# データベースを作成
docker exec <your-postgres-container> psql -U postgres -c "CREATE DATABASE muscle_app_db;"

# backend/.env のDATABASE_URLを適切に設定
```

### 3. データベースマイグレーション

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### 4. バックエンドの起動

```bash
cd backend
npm install
npm run start:dev
```

### 5. フロントエンドの起動

```bash
cd frontend
npm install
npm start
```

### アクセス

- フロントエンド: http://localhost:3001
- バックエンドAPI: http://localhost:3000

## 実装状況

### ✅ 完了
- **スプリント1: 環境構築・基本設計**
  - Docker PostgreSQL環境
  - NestJSプロジェクト初期化
  - Reactプロジェクト初期化
  - Prismaセットアップとデータベーススキーマ設計

- **スプリント2: 認証機能**
  - ユーザー登録API (POST /auth/register)
  - ログインAPI (POST /auth/login)
  - JWT認証の実装
  - 認証済みユーザー情報取得API (GET /auth/me)

### 🚧 進行中
- **スプリント2: 認証機能**
  - フロントエンド: 認証画面の実装

### 📋 未着手
- スプリント3: 筋トレ記録機能
- スプリント4: 共有機能
- スプリント5: 振り返り機能
- スプリント6: テスト・改善
- スプリント7: デプロイ・リリース

詳細な開発仕様については、[CLAUDE.md](./CLAUDE.md)を参照してください。

## ライセンス

Private
