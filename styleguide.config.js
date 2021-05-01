module.exports = {
    // set your styleguidist configuration here
    title: 'Component Docs', // 文档的标题
    components: [
        'packages/**/src/*.vue',
        'packages/**/src/*.js'
    ], // 组件的目录
    defaultExample: false, //是否使用默认样例
    exampleMode: 'expand', //是否展开示例代码
    styleguideDir: 'styleguide', // 打包的目录
    usageMode: 'expand', //是否展开方法
    copyCodeButton: true,
    codeSplit: true, // 打包时是否进行分片
    // skipComponentsWithoutExample: true // 是否跳过没有样例的组件
}