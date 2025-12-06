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

```bash
cd docker
docker-compose up -d
```

### 3. データベースマイグレーション

```bash
cd ../backend
npx prisma migrate dev --name init
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

詳細な開発仕様については、[CLAUDE.md](./CLAUDE.md)を参照してください。

## ライセンス

Private
