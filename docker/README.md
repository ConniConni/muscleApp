# Docker環境

## PostgreSQLの起動

```bash
cd docker
docker-compose up -d
```

## PostgreSQLの停止

```bash
docker-compose down
```

## データベースの削除（ボリュームも削除）

```bash
docker-compose down -v
```

## PostgreSQLコンテナへの接続

```bash
docker-compose exec postgres psql -U muscle_app -d muscle_app_db
```

## 注意事項

- データベースの接続情報は`docker-compose.yml`を参照してください
- 本番環境では必ず環境変数で管理し、強力なパスワードを設定してください
