import { ref } from 'vue';

export default function useLoading(initValue = false) {
  const loading = ref(initValue);
  const setLoading = (value) => {
    loading.value = value;
    if(value){
      window.$loadingBar.start();
    }else{
      window.$loadingBar.finish();
    }
  };
  const toggle = () => {
    loading.value = !loading.value;
  };
  return {
    loading,
    setLoading,
    toggle,
  };
}