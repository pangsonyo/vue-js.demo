# car-market

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
##安裝樣式   解決引入scss報錯的問題
``` bash
npm install node-sass --save-dev
npm install sass-loader --save-dev
npm install style-loader --save-dev 
npm install sass-resources-loader --save-dev
```

##學習記錄
一个组件下只能有一个并列的 div
在template裡面  
<div><div></div></div>只能這樣，如果是兩個div  同一級別是會報錯的

