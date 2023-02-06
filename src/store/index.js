import { createPinia } from 'pinia';
import useUserStore from './modules/user';
//两种写法
// const store = createPinia({
//   modules: {
//     useUserStore
//   },
// });
const store = createPinia();
export { useUserStore }
export default store;