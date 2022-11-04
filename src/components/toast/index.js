/**
 * this.$toast.show('your text')
 */
import Vue from 'vue'
import ToastComponent from './toast'
import i18n from '../../i18n/index'
let toastNode = null,
    showToast = false,
    timer = null;
const ToastContructor = Vue.extend(ToastComponent)

const toast = {
    install: (Vue, options) => {
        const option = {
            duration: '1500'
        }
        for (let o in options) {
            option[o] = options[o]
        }
        Vue.prototype.$toast = (content, type, time) => {
            // authorized  密码错误
            if(/WebSocket/gi.test(content) || /network/gi.test(content)){
                content = i18n.t('lang154');
            }
            if(/fee\./gi.test(content)){
                content = i18n.t('lang173');
            }
            if(content.length <= 0){
                content = i18n.t('lang154');
            }
            if (type == 'hide') {
                toastNode.isShowToast = showToast = false;
            } else {
                if (!toastNode) {
                    toastNode = new ToastContructor({
                        data () {
                            return {
                                isShowToast: showToast,
                                content
                            }
                        }
                    });
                    toastNode.$mount();
                    document.body.appendChild(toastNode.$el)
                }
                toastNode.content = content;
                toastNode.isShowToast = showToast = true;
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    toastNode.isShowToast = showToast = false
                }, time || option.duration)
            }
        }
        ['show', 'hide'].forEach((type, time) => {
            Vue.prototype.$toast[type] = (tips, time) => {
                return Vue.prototype.$toast(tips, type, time)
            }
        })
    }
}

export default toast;