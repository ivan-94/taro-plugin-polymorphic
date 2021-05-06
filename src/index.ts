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

  const type = process.env[options.typeName];
  const framework = ctx.initialConfig.framework;

  if (!type || !framework) {
    return;
  }

  const scriptExt = ctx.helper.FRAMEWORK_MAP[framework];
}
