//定制请求的实例

//导入axios  npm install axios
import axios from "axios";
import {ElMessage} from "element-plus";
import {useTokenStore} from "@/stores/token";
import router from "@/router";

//定义一个变量,记录公共的前缀，baseURL
//const baseURL = 'http://localhost:8080';
const instance = axios.create({baseURL: '/api'});

//添加请求拦截器
instance.interceptors.request.use(
    config => {
      //请求前的回调
      //添加token
      const tokenStore = useTokenStore();
      //判断有没有token，有才携带
      if (tokenStore.token) {
        config.headers.Authorization = tokenStore.token
      }
      return config
    },
    error => {
      //请求错误的回调
      return Promise.reject(error)
    }
)

//添加响应拦截器
instance.interceptors.response.use(
    result => {
      //判断业务状态码
      if (result.data.code === 0) {
        return result.data
      }

      //操作失败
      //alert(result.data.msg?result.data.msg:'服务异常')
      ElMessage.error(result.data.message ? result.data.message : '服务异常')
      return Promise.reject(result.data)
    },
    error => {
      //判断响应状态码，如果为401，则证明未登录，提示请登录，并跳转到登录页面
      if (error.response.status === 401) {
        ElMessage.error("请先登录")
        //使用router完成跳转
        router.push('/login')
      } else {
        ElMessage.error('服务异常')
      }
      return Promise.reject(error) //异步的状态转化成失败的状态
    }
)

export default instance