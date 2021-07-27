$(function() {
    // 【一、全选或单选商品 + 添加选择背景】
    // 1. 第一部分：全选或全部不选功能
    // 核心思想：里面3个小的复选框按钮（j-checkbox）选中状态（checked）跟着全选按钮（checkall）走。
    $('.checkall').change(function() {
        // console.log($(this).prop('checked'));
        $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'));

        // 2. 添加商品选中背景
        // 核心思想：根据 prop('checked') 选中的状态来判断是否被选中并添加或移除css背景类
        // (1) 全选时：让所有的商品添加 check-cart-item 类名
        if ($(this).prop('checked')) {
            $('.cart-item').addClass('check-cart-item'); // 添加背景
        } else {
            $('.cart-item').removeClass('check-cart-item'); // 移除背景
        }
    });

    // 第二部分：当小复选框都选中则默认选中全选按钮，否则全选按钮不选。
    // 语法：【:checked】判断被选中为选中状态
    $('.j-checkbox').change(function() {
        // if(被选中的小的复选框的个数 === 3) {
        //     就要选中全选按钮
        // } else {
        //     不要选中全选按钮
        // }
        // console.log($('.j-checkbox:checked').length); // 小复选框被选中的个数
        // console.log($('.j-checkbox').length); // 隐式转换 这个是所有的小复选框的个数
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }

        // 2. 添加商品选中背景
        // (2) 单选时：让当前选中的商品添加 check-cart-item 类名
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item"); // 添加背景
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item"); // 移除背景
        }
    });


    // 【二、增减商品数量 + 计算小计】
    // 第一部分：减少商品数量 + 计算小计
    // 1. 减少商品数量：点击 - 号按钮减少商品数量（注意：只能减到 1）
    // 核心思想：首先声明一个变量，当我们点击-号（decrement），就让这个值--，然后赋值给输入框。
    $('.decrement').click(function() {
        var n = $(this).siblings('.itxt').val(); // 得到当前兄弟输入框 .itxt 的值
        if (n == 1) {
            return false; // 当输入框的值为 1 时，则不再能减少
        }
        n--;
        $(this).siblings('.itxt').val(n); // 将当前兄弟输入框 .itxt 的值减 1

        // 2. 减少商品数量时，计算小计模块
        // 核心思想：根据文本框的值 X 当前商品的价格 = 商品的小计（注意：只能计算当前商品的小计）
        // 利用语法：(1) parents()   返回所有的父级层级元素中的指定父级元素
        //          (2) sbustr(1)   抽取从第 1 个开始的指定数目的字符。
        //          (3) toFixed(2)  可以让我们保留2位小数
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        // console.log(p);  // ￥12.60
        p = p.substr(1);
        // console.log(p); // 12.60
        var price = (p * n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html("￥" + price);
        getSum();
    });

    // 第二部分：增加商品数量 + 计算小计 + 计算总件数和总价钱
    // 1. 增加商品数量：点击 + 号按钮增加商品数量
    // 核心思想：首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给输入框。
    $('.increment').click(function() {
        var n = $(this).siblings('.itxt').val(); // 得到当前兄弟输入框 .itxt 的值
        n++;
        $(this).siblings('.itxt').val(n); // 将当前兄弟输入框 .itxt 的值加 1

        // 2. 增加商品数量时，计算小计模块
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        p = p.substr(1);
        $(this).parents('.p-num').siblings('.p-sum').html("￥" + (p * n).toFixed(2));
        getSum();
    });

    // 第三部分：小计补充，当用户手动修改文本框的值来计算小计模块
    $('.itxt').change(function() { // 当输入框的状态改变时
        var n = $(this).val(); // 即获取输入框内的值
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });

    // 第四部分：计算总件数和总价钱（封装函数给上方调用）
    getSum(); // 先调用一次总计函数，优化使用

    function getSum() {
        var count = 0;
        var money = 0;
        // 1. 计算总件数
        $('.itxt').each(function(i, ele) {
            count += parseInt($(ele).val()); // 将各件数的value值改为整数并求和
        });
        $('.amount-sum em').text(count); // 将总计数count赋值给相应的位置值
        // 2. 计算总价钱
        $('.p-sum').each(function(i, ele) {
            money += parseInt($(ele).text().substr(1)); // 将各价钱text值先切割在转换成整数并求和
        });
        $('.price-sum em').text('￥' + money.toFixed(2)); // 将总价钱保留两位小数并拼接字符串显示到相应位置
    }


    // 【三、删除商品】
    // 第一部分：点击商品后面的删除按钮逐一删除（删除的是当前的商品）
    $('.p-action a').click(function() {
        $(this).parents('.cart-item').remove();
        getSum(); // 删除后需重新计算总件数和总价格
    });

    // 第二部分：点击 “删除选中的商品” 按钮进行多个或全部删除（删除的是小的复选框选中的商品）
    $('.remove-batch').click(function() {
        $('.j-checkbox:checked').parents('.cart-item').remove(); // 根据 :checked 来检查商品是否被选中
        getSum();
    });

    // 第三部分：点击 “清空购物车 ” 按钮进行全部删除
    $('.clear-all').click(function() {
        $('.cart-item').remove();
        getSum();
    });
});