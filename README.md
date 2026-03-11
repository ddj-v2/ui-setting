# ddj-v2-ui-setting
ddj-v2 powered by https://github.com/hydro-dev/Hydro

## 第一次 publish
```sh
npm login
npm publish --access public
```
```sh
# 建立對應 npm 現有版本的 Tag
git tag v1.0.0
# 推送到遠端
git push origin v1.0.0
```

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


`.npmignore`
```sh
# 排除所有隱藏檔案與資料夾
.*
!/.npmignore

# 排除 CI 與開發工具設定
.github/
.vscode/
node_modules/
*.log

# 排除測試與原始碼 (如果你的 build 結果在 dist/ 或 lib/)
test/
tests/
src/
__tests__/
jest.config.js
tsconfig.json

# 排除 semantic-release 可能產生的檔案
release.config.js
.releaserc
```

`.gitignore`
```sh
# 依賴套件 (絕對不能進 Git)
node_modules/
/npm-debug.log*
/yarn-error.log*

# 編譯產物 (建議不進 Git，由 CI 在發佈時產生)
dist/
lib/
build/

# 測試與覆蓋率報告
coverage/
*.lcov
.nyc_output/

# 敏感資訊 (雖然你現在用 Trusted Publisher 不需要 NPM_TOKEN，但還是要防範)
.env
.env.local
.secret
*.pem

# 系統檔案
.DS_Store
Thumbs.db

# semantic-release 暫存檔 (如果有用到的話)
package-lock.json.bak
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

## npm 設定
https://docs.npmjs.com/trusted-publishers 參考

記得package.json要有
```json
  "repository": {
    "type": "git",
    "url": "https://github.com/Fudan-Computer-Science/ddj-v2-ui-setting.git"
  }
```