import { IPluginContext } from '@tarojs/service';

export interface TaroPluginPolymorphicOption {
  /**
   * 环境变量名称, 该插件会从 process.env[typeName] 中获取当前类型
   * 默认是 TARO_TYPE
   */
  typeName?: string;
}

const DEFAULT_OPTIONS: TaroPluginPolymorphicOption = {
  typeName: 'TARO_TYPE',
};

export default function TaroPluginPolymorphic(ctx: IPluginContext, options: TaroPluginPolymorphicOption = {}) {
  options = { ...DEFAULT_OPTIONS, ...options };

  const type = process.env[options.typeName!];
  const framework = ctx.initialConfig.framework;

  if (!type) {
    return;
  }

  console.log(`当前细分平台: ${options.typeName}=${type}`);

  const helper = ctx.helper !== require('@tarojs/helper') ? require('@tarojs/helper') : ctx.helper;

  const scriptExt = helper.SCRIPT_EXT;
  const cssExt = helper.CSS_EXT;
  const frameworkExtMap = helper.FRAMEWORK_EXT_MAP;

  const addExt = (exts: string[]) => {
    exts
      .map((i) => `.${type}${i}`)
      .reverse()
      .forEach((ext) => {
        exts.unshift(ext);
      });
  };

  // 添加多态扩展名
  addExt(scriptExt);
  addExt(cssExt);

  // @ts-expect-error
  let frameworkExt = frameworkExtMap[framework];

  if (frameworkExt && frameworkExt !== scriptExt) {
    addExt(frameworkExt);
  }

  // 在程序中可以访问 process.env.<typeName>
  if (ctx.initialConfig.defineConstants == null || !(options.typeName! in ctx.initialConfig.defineConstants)) {
    ctx.initialConfig.defineConstants = ctx.initialConfig.defineConstants || {};
    ctx.initialConfig.defineConstants[options.typeName!] = JSON.stringify(type);
  }
}
