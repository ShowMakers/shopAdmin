import axios from "axios";
import { useCookies } from '@vueuse/integrations/useCookies';
import { useUserStore } from '@/store';
import { getToken, removeToken } from "@/utils/auth";
// import errorCode from "@/utils/errorCode";

const cookies = useCookies();

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000,
});
// axios 全局拦截
const pending = [];
const CancelToken = axios.CancelToken;

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

const statusMessageMap = {
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
  505: 'HTTP版本不受支持(505)',
};

const showStatus = (status) => {
  let message = statusMessageMap[status] || `连接出错(${status})!`;
  return `${message}，请检查网络或联系管理员！`;
}

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    const status = res.status || 200;
    let msg = '';
    if (status < 200 || status >= 300) {
        msg = showStatus(status)
        if (typeof res.data === 'string') {
          res.data = { msg }
        } else {
          res.data.msg = msg
        }
    }

    if (res.request.responseType === "blob" || res.request.responseType === "arraybuffer") {
      return res.data;
    }

    if (status === 401) {
      handle401Error();
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (status === 500) {
      Message.error(msg);
      return Promise.reject(new Error(msg));
    } else if (status !== 200) {
      handleNon200Error(msg);
      return Promise.reject("error");
    } else {
      return Promise.resolve(res.data);
    }
  },
  (err) => {
    handleNetworkError(err);
    return Promise.reject(err);
  }
);

/**
 * handle401Error 处理401错误
 * 当服务器返回401 Unauthorized（未授权）响应时调用此函数
 * 通常表示用户的登录会话已过期或无效
 * 此函数将显示一个警告对话框，提示用户重新登录，并在用户点击“重新登录”或“退出”时清除本地存储
 */
function handle401Error() {
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
  });
}

/**
 * handleNon200Error 处理非200状态码的错误
 * 当服务器返回非200的状态码时调用此函数
 * 此函数将显示一个错误通知，内容为服务器返回的错误消息
 * @param {string} msg - 服务器返回的错误消息
 */
function handleNon200Error(msg) {
  window.$notification[error]({
    content: msg,
    duration: 2500,
    keepAliveOnHover: true
  });
}

/**
 * handleNetworkError 处理网络错误
 * 当请求失败（例如，网络断开或请求超时）时调用此函数
 * 此函数将根据错误的类型显示不同的错误消息
 * @param {Error} err - 请求失败时抛出的错误对象
 */
function handleNetworkError(err) {
  const userStore = useUserStore();
  if(err.response?.data.msg=='非法token，请先登录！'){
    userStore.LogOut();
    location.reload();
  } else{
    let { message,response } = err;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    window.$message.error(
      response.data.msg || "未知错误，请联系管理员"
    )
  }
}
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
