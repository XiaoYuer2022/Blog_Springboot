import axios from "axios";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/**
 * 怎么判断java的api程序有无正常运行？怎么判断baseURL是否填对？
 * 1、cms端的baseURL将后面的/admin/删除，然后用浏览器访问，有显示“Whitelabel Error Page”字样就是正确的
 * 2、view端的baseURL直接用浏览器访问，有显示“Whitelabel Error Page”字样就是正确的
 * baseURL: 'https://api.haoxx.site/blog/admin/',    cms端 用户管理终端
 * baseURL: 'https://api.haoxx.site/blog/',          view端 前台显示终端
 * 3、调试时注意：https网页中调用http连接会被浏览器屏蔽掉！所以会出现：Network Error的问题！
 */
const request = axios.create({
	baseURL: 'https://api.haoxx.site/blog/',  //调试时使用：http://111.230.43.93:8090/
	timeout: 10000,
})

// 请求拦截
request.interceptors.request.use(
	config => {
		NProgress.start()
		const identification = window.localStorage.getItem('identification')
		//identification存在，且是基于baseURL的请求
		if (identification && !(config.url.startsWith('http://') || config.url.startsWith('https://'))) {
			config.headers.identification = identification
		}
		return config
	}
)

// 响应拦截
request.interceptors.response.use(
	config => {
		NProgress.done()
		const identification = config.headers.identification
		if (identification) {
			//保存身份标识到localStorage
			window.localStorage.setItem('identification', identification)
		}
		return config.data
	}
)

export default request