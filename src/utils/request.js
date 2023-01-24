import axios from "axios";

// import store from "@/store";
import { getToken, removeToken } from "@/utils/auth";
// import errorCode from "@/utils/errorCode";
let downloadLoadingInstance;

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: "/api",
  // 超时
  timeout: 10000,
});

// axios 全局拦截
const pending = [];
const CancelToken = axios.CancelToken;
// const source = CancelToken.source();
const removePending = config => {
  for (const p in pending) {
    if (pending[p].u === config.url + '&' + config.method) {
      // 当当前请求在数组中存在时执行函数体
      pending[p].f(); // 执行取消操作
      pending.splice(p, 1); // 把这条记录从数组中移除
    }
  }
};

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 在一个ajax发送前执行一下取消操作
    removePending(config); 
    config.cancelToken = new CancelToken(c => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({
        u: config.url + '&' + config.method,
        f: c
      });
    });
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    if (getToken() && !isToken) {
      config.headers['token'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

const showStatus = (status) => {
  let message = ''
  // 这一坨代码可以使用策略模式进行优化
  switch (status) {
      case 400:
          message = '请求错误(400)'
          break
      case 401:
          message = '未授权，请重新登录(401)'
          break
      case 403:
          message = '拒绝访问(403)'
          break
      case 404:
          message = '请求出错(404)'
          break
      case 408:
          message = '请求超时(408)'
          break
      case 500:
          message = '服务器错误(500)'
          break
      case 501:
          message = '服务未实现(501)'
          break
      case 502:
          message = '网络错误(502)'
          break
      case 503:
          message = '服务不可用(503)'
          break
      case 504:
          message = '网络超时(504)'
          break
      case 505:
          message = 'HTTP版本不受支持(505)'
          break
      default:
          message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}

// 响应拦截器
service.interceptors.response.use(
  (res) => {
     // 未设置状态码则默认成功状态
    const status = res.status || 200;
    let msg = '';
    if (status < 200 || status >= 300) {
        // 处理http错误，抛到业务代码
        msg = showStatus(status)
        if (typeof res.data === 'string') {
          res.data = { msg }
        } else {
          res.data.msg = msg
        }
    }
   
    // 二进制数据则直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res.data;
    }
    if (status === 401) {
      window.$dialog.warning({
        title: "系统提示",
          content: "登录状态已过期请重新登录",
          positiveText: "重新登录",
          negativeText: "退出",
          onPositiveClick: () => {
            window.localStorage.clear();
          },
          onNegativeClick: () => {
            window.localStorage.clear();
          }
      })
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (status === 500) {
      Message.error(msg);
      return Promise.reject(new Error(msg));
    } else if (status !== 200) {
      window.$notification[error]({
        content: msg,
        duration: 2500,
        keepAliveOnHover: true
      });
      return Promise.reject("error");
    } else {
      return Promise.resolve(res.data);
    }
  },
  (err) => {
    if (err.response.status === 400) {
      window.$message.error(
        err.response.data.msg
      )
    } else{
      let { message } = err;
      if (message == "Network Error") {
        message = "后端接口连接异常";
      } else if (message.includes("timeout")) {
        message = "系统接口请求超时";
      }else if (message.includes("Request failed with status code")) {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
      }
      window.$message.error(
        message
      )
    }
    return Promise.reject(err);
  }
);

// 通用下载方法
// export function download(url, params, filename) {
//   downloadLoadingInstance = ElLoading.service({
//     text: "正在下载数据，请稍候",
//     background: "rgba(0, 0, 0, 0.7)",
//   });
//   return service
//     .get(url, params, {
//       transformRequest: [
//         (params) => {
//           return tansParams(params);
//         },
//       ],
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       responseType: "blob",
//     })
//     .then(async (data) => {
//       const isLogin = await blobValidate(data);
//       if (isLogin) {
//         const blob = new Blob([data]);
//         saveAs(blob, filename);
//       } else {
//         const resText = await data.text();
//         const rspObj = JSON.parse(resText);
//         const errMsg =
//           errorCode[rspObj.code] || rspObj.msg || errorCode["default"];
//         ElMessage.error(errMsg);
//       }
//       downloadLoadingInstance.close();
//     })
//     .catch((r) => {
//       ElMessage.error("下载文件出现错误，请联系管理员！");
//       downloadLoadingInstance.close();
//     });
// }

export default service;
