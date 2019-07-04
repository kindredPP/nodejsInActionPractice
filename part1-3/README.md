### nodejs 基础

#### 如何组织代码
> 3-1 创建模块 currency.js test-currency.js

> 3-2 模块放在文件系统中的什么地方 
1. page41 p42 两个图要搞懂;node_modules查找规则、查找模块目录规则；并移动路径
> 3-3 在创建和使用模块时要意识到的东西


#### 怎么做异步编程
1. 如何响应一次性事件：回调
2. 如何处理重复性事件：事件监听器 EventEmitter
    1. ./async 异步变成介绍 
    2. ./watcher 自定义监听文件夹类，将文件名转为小写
3. 如何让异步逻辑顺序执行

    流程控制：串行和并行
    1. 如何使用串行化流程控制
    2. 如何实现串行化流程flowControl/random_story
    3. 如何实现并行化流程控制wflowControl/word_count
    4. 如何使用第三方模块做流程控制 Nimble、Step、Seq