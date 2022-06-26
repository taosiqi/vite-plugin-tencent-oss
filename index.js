const color = require('picocolors')
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const {URL} = require('url')
const COS = require('cos-nodejs-sdk-v5');
const {normalizePath} = require('vite')
const {to} = require('await-to-js')

module.exports = function vitePluginTencentOss(options) {
  let baseConfig = '/'
  let buildConfig = ''

  if (options.enabled !== void 0 && !options.enabled) {
    return
  }

  return {
    name: 'vite-plugin-tencent-oss',
    enforce: 'post',
    apply: 'build',
    configResolved(config) {
      baseConfig = config.base
      buildConfig = config.build
    },
    async closeBundle() {
      const outDirPath = normalizePath(path.resolve(normalizePath(buildConfig.outDir)))
      const {pathname: ossBasePath, origin: ossOrigin} = new URL(baseConfig)

      let {secretId:SecretId,secretKey:SecretKey,bucket:Bucket,region:Region,overwrite=false,test=false}=options
      if(!SecretId || !SecretKey || !Bucket || !Region){
        throw new Error('关键参数缺失')
      }
      delete options.secretId
      delete options.secretKey
      delete options.overwrite
      delete options.test

      const client = new COS({
        ...options,
        SecretId,
        SecretKey,
      })
      const files = await glob.sync(
        outDirPath + '/**/*',
        {
          strict: true,
          nodir: true,
          dot: true,
          ignore: options.ignore ? options.ignore : '**/*.html'
        }
      )
      log('tencent oss upload start')
      console.time("tencent oss upload complete ^_^, cost");

      for (const fileFullPath of files) {
        const filePath = fileFullPath.split(outDirPath)[1] // eg: '/assets/vendor.bfb92b77.js'

        const ossFilePath = ossBasePath.replace(/\/$/, '') + filePath // eg: '/base/assets/vendor.bfb92b77.js'

        const completePath = ossOrigin + ossFilePath // eg: 'https://foo.com/base/assets/vendor.bfb92b77.js'

        const output = `${buildConfig.outDir + filePath} => ${color.green(completePath)}`

        if (test) {
          console.log(`test upload path: ${output}`)
          continue
        }

        //是否覆盖上传文件
        if (overwrite) {
          let [err, data] = await to(upDown(client,{Bucket,Region,ossFilePath,fileFullPath}));
          data && console.log(`upload complete: ${output}`)
          if(err) throw new Error(err);
          continue
        }

        //不覆盖的话，先校验下文件是否存在
        let [err, data] = await to(client.headObject({
          Bucket,
          Region,
          Key: ossFilePath,
        }));
        data && console.log(`${color.gray('files exists')}: ${output}`)
        if (err) {
          if(err.code === '404'){
            let [err, data] = await to(upDown(client,{Bucket,Region,ossFilePath,fileFullPath}));
            data && console.log(`upload complete: ${output}`)
            if(err) throw new Error(err)
          }else{
            throw new Error(err)
          }
        }
      }
      console.log('')
      console.timeLog("tencent oss upload complete ^_^, cost");
    }
  }
}


function upDown(client,option) {
  let {Bucket,Region,ossFilePath:Key,fileFullPath}=option
  return client.putObject(
    {
      Bucket,
      Region,
      Key,
      Body: fs.createReadStream(fileFullPath)
    }
  )
}

function log(logStr) {
  console.log('')
  console.log(logStr)
  console.log('')
}
