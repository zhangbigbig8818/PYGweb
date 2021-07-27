window.onload = function() {

    // 一、各项数据格式的正则验证
    var regtel = /^1[3|4|5|7|8]\d{9}$/; // 手机号码的正则表达式
    var regqq = /^[1-9]\d{4,}$/; // 10000
    var regnc = /^[\u4e00-\u9fa5]{2,8}$/;
    var regmsg = /^\d{6}$/;
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var nc = document.querySelector('#nc');
    // var msg = document.querySelector('#msg');
    var pwd = document.querySelector('#pwd');
    var surepwd = document.querySelector('#surepwd');
    regexp(tel, regtel); // 手机号码
    regexp(qq, regqq); // qq号码
    regexp(nc, regnc); // 昵称
    // regexp(msg, regmsg); // 短信验证
    regexp(pwd, regpwd); // 密码框
    // 表单验证的函数
    function regexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                // console.log('正确的');
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确';
            } else {
                // console.log('不正确');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确，请重新输入 ';
            }
        }
    };

    surepwd.onblur = function() {
        if (this.value == pwd.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 两次密码输入不一致';

        }
    }


    // 二、发送验证码
    var btn = document.querySelector('.btn');
    var time = 5; // 定义剩下的秒数；
    btn.addEventListener('click', function() {
        btn.disabled = true; // 禁用
        var timer = setInterval(function() {
            if (time == 0) {
                clearInterval(timer); // 移除定时器
                btn.disabled = false;
                btn.innerHTML = '发送验证码';
            } else {
                btn.innerHTML = time + '秒后重新发送';
                time--;
            }
        }, 1000);
    })


    // 三、显示密码强度
    var olnput = document.getElementById('pwd');
    olnput.value = '';
    var ems = document.getElementsByTagName('em');
    olnput.onkeyup = function() {
        ems[0].className = ems[1].className = ems[2].className = 'default';
        var pwd = this.value;
        var result = 0;
        for (var i = 0, len = pwd.length; i < len; ++i) {
            result |= charType(pwd.charCodeAt(i));
        }
        var level = 0;
        //对result进行四次循环，计算其level
        for (var i = 0; i <= 4; i++) {
            if (result & 1) {
                level++;
            }
            //右移一位
            result = result >>> 1;
        }

        if (pwd.length >= 6) {
            switch (level) {
                case 1:
                    ems[0].className = "ruo";
                    break;
                case 2:
                    ems[0].className = "ruo";
                    ems[1].className = "zhong";
                    break;
                case 3:
                case 4:
                    ems[0].className = "ruo";
                    ems[1].className = "zhong";
                    ems[2].className = "qiang";
                    break;
            }
        }
    }

    // 定义一个函数，对给定的数分为四类(判断密码类型)，返回十进制1，2，4，8
    // 数字 0001 -->1  48~57
    // 小写字母 0010 -->2  97~122
    // 大写字母 0100 -->4  65~90
    // 特殊 1000 --> 8 其它
    function charType(num) {
        if (num >= 48 && num <= 57) {
            return 1;
        }
        if (num >= 97 && num <= 122) {
            return 2;
        }
        if (num >= 65 && num <= 90) {
            return 4;
        }
        return 8;
    }
}