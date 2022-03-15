# taro-plugin-polymorphic

Taro 细分平台文件区分。

<br/>

Taro 中支持通过平台扩展名来为不同的平台设计代码，比如 `index.h5.jsx`, `index.weapp.jsx`。

`taro-plugin-polymorphic` 插件支持进一步拆分细分平台，比如 `index.h5.wxoa.jsx`、`index.rn.ios.jsx`。

或者其他多业态场景, 比如 零售业态 `index.retail.jsx`、 地产业态 `index.estate.tsx`

<br/>

## Usage

安装

```shell
$ yarn add taro-plugin-polymorphic -D # or npm i taro-plugin-polymorphic --save-dev
```

<br/>

配置

```js
// config/index.js

const config = {
  // ...
  plugins: ['taro-plugin-polymorphic'],
  // ...
};
```

默认根据 `INDUSTRY` 环境变量来指定细分平台。这个支持配置:

```js
// config/index.js

const config = {
  // ...
  plugins: [{'taro-plugin-polymorphic', {typeName: 'INDUSTRY'}}],
  // ...
};
```

<br/>

运行并指定细分平台类型：

```json
// package.json
{
  "scripts": {
    // ...
    "dev:weapp": "npm run build:weapp -- --watch",
    "dev:weapp:retail": "cross-env INDUSTRY=retail npm run dev:weapp",
    "dev:weapp:estate": "cross-env INDUSTRY=estate npm run dev:weapp"
  }
}
```

<br>

# 使用

假设模块组织如下：

```shell
index.retail.ts
index.estate.ts
index.ts
```

当使用 INDUSTRY 环境变量指定为 retail 时， 将优先加载 index.retail.ts。

在 Javascript 模块中获取 INDUSTRY：

```js
if (process.env.INDUSTRY === 'retail') {
  // 零售业态
} else {
  // 默认业态
}
```


# 注意事项

- app.config.ts 不支持。你可以通过 process.env.<INDUSTRY> 来区分不同业态
- 仅支持 JavaScript 文件。对于 CSS、图片等静态资源必须**全命名**导入。举个例子
  + foo.demo.ts, 手动导入 foo.demo.css
  + foo.ts, 导入 foo.css
