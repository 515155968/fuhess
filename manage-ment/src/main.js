// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/*element-ui引入*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
/*引入font样式*/
import '../src/icon/user/demo.css';
import '../src/icon/user/iconfont.css';
/*引入vue-quill-editor文本编辑器*/
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
/*axios*/
import axios from 'axios'
import Qs from 'qs'
/*使用原型 让axios 全局使用 this.*/
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;
/*上传头像 引入 vue-croppa*/
import Croppa from 'vue-croppa'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.use(Croppa);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
