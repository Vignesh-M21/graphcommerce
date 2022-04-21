/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import { ConfigProcessOptions } from '@graphql-mesh/config'
import { defaultImportFn, loadYaml } from '@graphql-mesh/utils'
import { cosmiconfig, defaultLoaders } from 'cosmiconfig'

function customLoader(ext: 'json' | 'yaml' | 'js', importFn = defaultImportFn) {
  // eslint-disable-next-line consistent-return
  function loader(filepath: string, content: string) {
    if (process.env) {
      // eslint-disable-next-line no-param-reassign
      content = content.replace(/\$\{(.*?)\}/g, (_, variable) => {
        let varName = variable
        let defaultValue = ''

        if (variable.includes(':')) {
          const spl = variable.split(':')
          varName = spl.shift()
          defaultValue = spl.join(':')
        }

        return process.env[varName] || defaultValue
      })
    }

    if (ext === 'json') {
      return defaultLoaders['.json'](filepath, content)
    }

    if (ext === 'yaml') {
      return loadYaml(filepath, content)
    }

    if (ext === 'js') {
      return importFn(filepath)
    }
  }

  return loader
}

export async function findConfig(
  options?: Pick<ConfigProcessOptions, 'configName' | 'dir' | 'importFn'>,
) {
  const { configName = 'mesh', dir: configDir = '' } = options || {}
  const dir = path.isAbsolute(configDir) ? configDir : path.join(process.cwd(), configDir)
  const explorer = cosmiconfig(configName, {
    searchPlaces: [
      'package.json',
      `.${configName}rc`,
      `.${configName}rc.json`,
      `.${configName}rc.yaml`,
      `.${configName}rc.yml`,
      `.${configName}rc.js`,
      `.${configName}rc.ts`,
      `.${configName}rc.cjs`,
      `${configName}.config.js`,
      `${configName}.config.cjs`,
    ],
    loaders: {
      '.json': customLoader('json', options?.importFn),
      '.yaml': customLoader('yaml', options?.importFn),
      '.yml': customLoader('yaml', options?.importFn),
      '.js': customLoader('js', options?.importFn),
      '.ts': customLoader('js', options?.importFn),
      noExt: customLoader('yaml', options?.importFn),
    },
  })
  const results = await explorer.search(dir)

  if (!results) {
    throw new Error(`No ${configName} config file found in "${dir}"!`)
  }

  const { config } = results
  return config
}
