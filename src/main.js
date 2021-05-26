import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import moment from 'moment'//导入文件 
Vue.prototype.$base64Img = (e)=>{
    return new Promise(function(resolve, reject) {      //使用Promise进行异步处理
        let fileSize = 0;
        let fileMaxSize = 1024;                 //设置图片最大为 1M 
        fileSize = e.target.files[0].size;           //获取图片大小
        let size = fileSize / 1024;
        let file = e.target.files[0];           //获取图片文件对象
        let reader = new FileReader();          //实例化一个对象
        if (size > fileMaxSize) { 
            e.target.value  = ''                //内容清空
            resolve({err:'图片大小必须小于1M！'})
        }else if (size <= 0) { 
            e.target.value  = ''                //内容清空
            resolve({err:'图片大小大小不能为0M！'})
        }else{
            reader.readAsDataURL(file);             //把图片文件对象转换base64
            reader.onload = function(e) {       
                 resolve(e.target.result)           //回到函数返回base64值
            }  
        }
    })  
}
 Vue.prototype.$moment = moment;//赋值使用
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
