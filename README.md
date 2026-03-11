# ddj-v2-ui-setting
ddj-v2 powered by https://github.com/hydro-dev/Hydro

## addon  設定

1. 安裝 CI/CD 所需套件
```sh
npm install -D semantic-release \
@semantic-release/commit-analyzer \
@semantic-release/release-notes-generator \
@semantic-release/github \
@semantic-release/npm
```

2. 建立設定
`.releaserc`

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github"
  ]
}
```

3. github action
`.github/workflows/publish.yml`

```yaml
name: Release

on:
  push:
    branches:
      - main

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write    # 寫入 Git 標籤與 Release
      issues: write      # 讓 semantic-release 在 Issue 留言
      pull-requests: write
      id-token: write    # 關鍵：啟用 OIDC Trusted Publishing
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          # Required so npm CLI targets the correct registry and can perform OIDC auth
          registry-url: 'https://registry.npmjs.org'
      - run: npm install -g npm@latest # 點睛之筆 更新 npm 版本 github action 預設的 npm 版本過舊 會導致 publish 失敗 我被坑了好久
      - run: npm install
      - run: npm ci
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
