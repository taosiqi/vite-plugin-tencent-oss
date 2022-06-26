vite-plugin-ali-oss
=======
![license](https://img.shields.io/npm/l/vite-plugin-tencent-oss)
![downloads](https://img.shields.io/npm/dt/vite-plugin-tencent-oss)

Upload the production files bundled in the project to Tencent OSS, except for html

[中文文档](https://github.com/taosiqi/vite-plugin-tencent-oss/blob/main/README_CN.md)

# Feature

- Skip existing files by default (files will not be downloaded) to speed up upload files.
- Almost zero configuration, using `outDir` path of `vite`, uploading to the same path of oss.

Note: Upload all files except html files, because html files have no hash and are usually placed on the server.

# Preview:

![preview](https://static-1253419794.cos.ap-nanjing.myqcloud.com/img/1656215242281.png)

# Installation

```bash
pnpm i -D vite-plugin-tencent-oss
```

or

```bash
yarn add -D vite-plugin-tencent-oss
```

or

```bash
npm i -D vite-plugin-tencent-oss
```

# Basic usage

1. Register the plugin in `vite.config.js`
2. Set base public ***URL*** path when served in development or production.

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginTencentOss from 'vite-plugin-tencent-oss'

const options = {
  region: '<Your Region>',
  secretId: '<Your Secret ID>',
  secretKey: '<Your Secret Key>',
  bucket: '<Your Bucket>'
}

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://foo.com/', // must be URL
  plugins: [vue(), vitePluginTencentOss(options)]
})
```

3. Build Production

```bash
pnpm run build
```

The plugin will upload files of `outDir` path after bundle.

# options

| options   | description                                                                                   | type    | default       |
|-----------|-----------------------------------------------------------------------------------------------|---------|---------------|
| region    | tencent cloud oss region                                                                      | string  |               |
| secretId  | tencent cloud oss secretId                                                                     | string  |               |
| secretKey | tencent cloud oss secretKey                                                                 | string  |               |
| bucket    | tencent cloud oss bucket                                                                          | string  |               |
| overwrite | If the file already exists, whether to skip upload                                            | boolean | false         |
| ignore    | Ignore file rules. If you use empty string `''`, no files will be ignored                     | string  | `'**/*.html'` |
| test      | Only test path, no files upload                                                               | boolean | false         |
| enabled   | Enable the ali oss plugin                                                                     | boolean | true          |
| ...       | Other init oss options, more information: https://cloud.tencent.com/document/product/436/8629 | any | |

# thanks
This project is based on[vite-plugin-ali-oss](https://github.com/xiaweiss/vite-plugin-ali-oss)secondary development。
