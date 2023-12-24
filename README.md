```bash
pnpm i # install

# dev
pnpm db:dev:restart # start postgres dev-db in docker and push migrations
pnpm start:dev # start api in dev mode

# test
pnpm pretest:e2e # start postgres test-db in docker and push migrations
pnpm test:e2e # start testing
```
