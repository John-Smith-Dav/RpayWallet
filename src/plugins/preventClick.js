import Vue from 'vue'

// 防止重复提交指令
const preventReClick = Vue.directive('preventReClick', {
    inserted(el, binding) {
        el.addEventListener('click', () => {
            console.log(binding.value)
            if (!el.disabled) {
                let className = el.className
                el.className = className + ' is-disabled'
                el.disabled = true
                setTimeout(() => {
                    el.className = className
                    el.disabled = false
                    console.log(binding.value)
                }, binding.value || 3000)
            }
        })
    }
})

export default preventReClick