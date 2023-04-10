import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//声明全局变量 保存上传文件的前缀
import BaseUrl from './http/BaseUrl'
Vue.prototype.UPLOADURL=BaseUrl.UPLOADURL

window._AMapSecurityConfig = {
  securityJsCode:'0b7fff62bb4d6f79bae15c1a1483e327',
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
