vite-plugin-tencent-oss
=======
![license](https://img.shields.io/npm/l/vite-plugin-tencent-oss)
![downloads](https://img.shields.io/npm/dt/vite-plugin-tencent-oss)

将项目中打包后生产文件上传到腾讯云COS，除了 html 以外。

# 功能特性

- 默认跳过已存在的文件（不会下载文件），加快上传速度
- 几乎零配置，使用 `vite` `outDir` 路径，上传到 oss 的相同路径中

备注：除了所有 html 文件以外，上传所有文件。因为 html 文件没有哈希值，且通常放在服务器上

效果预览：

![preview](https://static-1253419794.cos.ap-nanjing.myqcloud.com/img/1656215242281.png)

# 安装

```bash
pnpm i -D vite-plugin-tencent-oss
```

或者

```bash
yarn add -D vite-plugin-tencent-oss
```

或者

```bash
npm i -D vite-plugin-tencent-oss
```

# 基本使用

1. 在 vite.config.js 中注册本插件
2. 设置 base 开发或生产环境服务的公共基础 ***URL*** 路径

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

const prod = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  base: prod ? 'https://foo.com/' : '/', // 打包时必须是 URL
  plugins: [vue(), vitePluginTencentOss(options)]
})
```
3. 打包发布生产代码

```bash
pnpm run build
```

插件将会在打包完成后，上传 vite 配置 outDir 路径下的所有资源文件。

# 配置项

| options   | description                                                                     | type    | default       |
|-----------|---------------------------------------------------------------------------------|---------|---------------|
| region    | 腾讯云 oss 地域                                                                      | string  |               |
| secretId  | 腾讯云 oss 访问 ID                                                                   | string  |               |
| secretKey | 腾讯云 oss 访问密钥                                                                    | string  |               |
| bucket    | 腾讯云 oss 存储空间名称                                                                  | string  |               |
| overwrite | 如果文件已存在，是否覆盖                                                                    | boolean | false         |
| ignore    | 文件忽略规则。如果你使用空字符串 `''`，将不会忽略任何文件                                                 | boolean | `'**/*.html'` |
| test      | 仅测试路径，不会有文件上传                                                                   | boolean | false         |
| enabled   | 是否启用本插件                                                                         | boolean | true          |
| ...       | 其他初始化 oss 的参数，详细信息请见 https://cloud.tencent.com/document/product/436/8629 | any | |

# 鸣谢
本项目基于[vite-plugin-ali-oss](https://github.com/xiaweiss/vite-plugin-ali-oss)二次开发。
