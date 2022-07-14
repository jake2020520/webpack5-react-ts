module.exports = {
  root: true,
  env: {
    // 运行环境 eg: 浏览器
    browser: true,
    commonjs: true,
    es2020: true
  },
  extends: [], // 继承其他的配置
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // 指定esmascript的版本、soureType的类型
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  plugins: ['@typescript-eslint'], // 插件
  rules: {
    // 自定义的规则
    'no-unused-vars': 'error', // off 关闭， wran报警高不报错， error报错
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // js语句结尾必须使用分号
    semi: ['off', 'always'],
    // 三等号
    eqeqeq: 0,
    // 强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': 0,
    // 关键字后面使用一致的空格
    'keyword-spacing': 0,
    // 强制在 function的左括号之前使用一致的空格
    'space-before-function-paren': 0,
    // 引号类型
    quotes: [0, 'single'],
    // 禁止出现未使用过的变量
    // 'no-unused-vars': 0,
    // 要求或禁止末尾逗号
    'comma-dangle': 0
  }
};
