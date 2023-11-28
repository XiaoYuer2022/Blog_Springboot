import Cookies from "js-cookie";

const TokenKey: string = "Token";

// 我网站的域名是www.haoxx.site，去前面的www，改成自己的域名
const domain: string = ".haoxx.site";

// token前缀
export let token_prefix = "Bearer ";

export function getToken() {
  return Cookies.get(TokenKey);
}

// 本地运行记得删除domain
export function setToken(token: string) {
  return Cookies.set(TokenKey, token, { domain: domain });  //项目上线发布的时候使用这个
  // return Cookies.set(TokenKey, token);                   //本地测试时，使用这个

}

export function removeToken() {
  return Cookies.remove(TokenKey, { domain: domain });  //项目上线发布的时候使用这个
  //return Cookies.remove(TokenKey);                    //本地测试时，使用这个
}
