import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {Message} from 'element-ui'

/**
 * 怎么判断java的api程序有无正常运行？怎么判断baseURL是否填对？
 * 1、cms端的baseURL将后面的/admin/删除，然后用浏览器访问，有显示“Whitelabel Error Page”字样就是正确的
 * 2、view端的baseURL直接用浏览器访问，有显示“Whitelabel Error Page”字样就是正确的
 * baseURL: 'https://api.haoxx.site/blog/admin/',    cms端 用户管理终端
 * baseURL: 'https://api.haoxx.site/blog/',          view端 前台显示终端
 * 3、调试时注意：https网页中调用http连接会被浏览器屏蔽掉！所以会出现：Network Error的问题！
 */
const request = axios.create({
	baseURL: 'https://api.haoxx.site/blog/admin/',  //调试时使用：http://111.230.43.93:8090/admin/
	timeout: 5000
})

let CancelToken = axios.CancelToken

// 请求拦截
request.interceptors.request.use(config => {
		//对于访客模式，除GET请求外，都拦截并提示
		const userJson = window.localStorage.getItem('user') || '{}'
		const user = JSON.parse(userJson)
		if (userJson !== '{}' && user.role !== 'ROLE_admin' && config.method !== 'get') {
			config.cancelToken = new CancelToken(function executor(cancel) {
				cancel('演示模式，不允许操作')
			})
			return config
		}

		NProgress.start()
		const token = window.localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = token
		}
		return config
	},
	error => {
		console.info(error)
		return Promise.reject(error)
	}
)

// 响应拦截
request.interceptors.response.use(response => {
		NProgress.done()
		const res = response.data
		if (res.code !== 200) {
			let msg = res.msg || 'Error'
			Message.error(msg)
			return Promise.reject(new Error(msg))
		}
		return res
	},
	error => {
		console.info(error)
		Message.error(error.message)
		return Promise.reject(error)
	}
)

export default request