import {reactive, onMounted, onBeforeUnmount} from 'vue'
export  default function () {
    //展示的数据  可以通过App.vue 界面去隐藏
    let point = reactive({
        x: 0,
        y: 0
    })

    //获取鼠标点击事件
    function savePoint(event) {
        point.x = event.pageX
        point.y = event.pageY
        // console.log(event.pageX, event.pageY)
    }

    //现实之后调用 挂载完毕
    onMounted(() => {
        window.addEventListener('click', savePoint)
    })

    //在隐藏之前调用 卸载之前
    onBeforeUnmount(() => {
        window.removeEventListener('click', savePoint)
    })

    return point
}