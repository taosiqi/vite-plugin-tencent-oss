import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginTencentOss from 'vite-plugin-tencent-oss'

const options = {
  region: '',
  secretId: '',
  secretKey: '',
  bucket: '',
  overwrite: false,
  // enabled: false,
  // test: true,
}

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://static-1253419794.file.myqcloud.com/', // same with webpack public path
  plugins: [vue(), vitePluginTencentOss(options)]
})
// result: foo/assets/vendor.bfb92b77.js =>https://static-1253419794.file.myqcloud.com/assets/vendor.bfb92b77.js


// export default defineConfig({
//   base: 'https://static-1253419794.file.myqcloud.com/', // must be URL
//   plugins: [vue(), vitePluginTencentOss(options)],
//   build: {
//     outDir: 'foo'
//   }
// })

