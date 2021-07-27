window.addEventListener('load', function() {
    // 二、点击搜索框隐藏默认文本
    var text = document.querySelector('#search');
    text.onfocus = function() { // 获得焦点事件 onfocus
        if (this.placeholder === '手机') {
            this.placeholder = '';
        }
        // 获得焦点需要把文本框里面的文字颜色变黑(即用户输入的文本)
        this.style.color = '#333';
    }
    text.onblur = function() { //  失去焦点事件 onblur
        if (this.placeholder === '') {
            this.placeholder = '手机';
        }
        // 失去焦点需要把文本框里面的文字颜色变浅色
        this.style.color = '#999';
    }
})