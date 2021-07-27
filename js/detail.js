window.addEventListener('load', function() {

    // 一、商品主图放大镜
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');

    // 1. 当我们鼠标经过 preview_img 就显示和隐藏 mask 遮挡层 和 big 大盒子
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    // 2. 鼠标移动的时候，让黄色的盒子跟着鼠标来走
    preview_img.addEventListener('mousemove', function(e) {
        // (1). 先计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // console.log(x, y);
        // (2) 减去盒子高度 300的一半 是 150 就是我们mask 的最终 left 和top值了
        // (3) 我们mask 移动的距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // (4) 如果x 坐标小于了0 就让他停在0 的位置
        // 遮挡层的最大移动距离
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 3. 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        // 大图
        var bigIMg = document.querySelector('.bigImg');
        // 大图片最大移动距离
        var bigMax = bigIMg.offsetWidth - big.offsetWidth;
        // 大图片的移动距离 X Y
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigIMg.style.left = -bigX + 'px';
        bigIMg.style.top = -bigY + 'px';
    })


    // 二、商品tab栏切换
    // 1.获取元素
    var tab_list = document.querySelector('.detail_tab_list');
    var lis = tab_list.querySelectorAll('li');
    var items = document.querySelectorAll('.item');
    // 2.循环绑定注册事件 处理程序
    for (var i = 0; i < lis.length; i++) {
        // 给5个小li 设置索引号 
        lis[i].setAttribute('index', i);
        lis[i].onclick = function() {
            // (1) 点击某一个模块选项卡，当前这一个底色会是红色，其余不变（排他思想） 修改类名的方式
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = ''; // 干掉所有人
            }
            this.className = 'current'; // 留下我自己 

            // (2) 显示相应选项卡下的内容模块
            var index = this.getAttribute('index');
            // console.log(index);
            for (var i = 0; i < items.length; i++) {
                items[i].style.display = 'none'; // 干掉所有人：让其余的item 这些div 隐藏
            }
            items[index].style.display = 'block'; // 留下我自己 让对应的item 显示出来
        }
    }
})