/**
 * ITCAST WEB
 * Created by zhousg on 2016/8/19.
 */
$(function(){
    banner();
    initTab();
    $('[data-toggle="tool"]').tooltip();
});
/*动态响应式轮播图*/
function banner(){
    /*
    * 1.图片数据  抽象出来 数据结构
    * 2.判断当前的设备  屏幕的宽度来判断   768px
    * 3.动态渲染轮播图
    * 3.1 准备数据
    * 3.2 把数据转化成html结构  （字符串拼接  模版引擎）
    * 3.3 页面渲染
    * 4.测试  页面尺寸改变的时候要求重新渲染
    * */

    /*1.图片数据  抽象出来 数据结构*/
    var imageList = [
        {
            pcImg:'images/slide_01_2000x410.jpg',
            mImg:'images/slide_01_640x340.jpg'
        },
        {
            pcImg:'images/slide_02_2000x410.jpg',
            mImg:'images/slide_02_640x340.jpg'
        },
        {
            pcImg:'images/slide_03_2000x410.jpg',
            mImg:'images/slide_03_640x340.jpg'
        },
        {
            pcImg:'images/slide_04_2000x410.jpg',
            mImg:'images/slide_04_640x340.jpg'
        }
    ]

    /*渲染的方法*/
    var renderHtml = function(){
        /*2.判断当前的设备*/
        var width = $(window).width();
        /*是不是移动端*/
        var isMobile = width >= 768 ? false:true;
        /*
        * 3.动态渲染轮播图
        * 3.1 准备数据
        * 3.2 把数据转化成html结构  （字符串拼接  模版引擎）
        * 3.3 页面渲染
        * */
        /*1.准备模版*/
        /*2.获取模版的字符串内容*/
        var pointStr = $('#point_template').html();
        var imageStr = $('#image_template').html();
        /*3.转化成模版方法*/
        var pointFuc = _.template(pointStr);
        var imageFuc = _.template(imageStr);
        //console.log(pointFuc);
        //console.log(imageFuc);
        /*4.解析成html结构*/
        var pointHtml = pointFuc({model:imageList});
        var imageHtml = imageFuc({model:imageList,isMobile:isMobile});
        //console.log(pointHtml);
        //console.log(imageHtml);
        $('.carousel-indicators').html(pointHtml);
        $('.carousel-inner').html(imageHtml);
    }

    /*4.测试  页面尺寸改变的时候要求重新渲染*/
    $(window).on('resize',function(){
        renderHtml();
    }).trigger('resize');


    /*5.移动端滑动手势效果*/
    var startX = 0, moveX = 0 , distanceX = 0 , isMove = false;
    $('.wjs_banner').on('touchstart',function(e){
        /*返回的event对象是封装过后的  通过originalEvent可以找到原生事件*/
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend',function(e){
        console.log(distanceX);
        /*滑动超过50px的时候才认作是滑动*/
        /*左滑动  下一张*/
        /*右滑动  上一张*/
        /*滑动了*/
        if(isMove && Math.abs(distanceX) > 50){
            if(distanceX > 0){
                /*右滑动  上一张  ?*/
                $('.carousel').carousel('prev');
            }else{
                /*左滑动  下一张  ?*/
                $('.carousel').carousel('next');
            }
        }
    });

}

/*初始化也签*/
function initTab(){
    /*
    * 1.计算ul的宽度 设置好
    * 2.父容器设置成一个溢出隐藏的盒子
    * 3.初始化 滑动组件
    * */

    /*获取到相关元素*/
    var $parent = $('.wjs_product_box');
    var $child = $parent.find('ul');
    var $lis = $child.find('li');
    /*计算ul的宽度 设置好*/
    var width = 0;

    $lis &&　$lis.each(function(){
        width += $(this).outerWidth(true);
        //console.log($(this).outerWidth(true));
        /*
        * width  取得是内容的宽度
        * innerWidth 取得是 内容 和 内边距
        * outerWidth 取得是 内容 和 内边距 和 边框
        * outerWidth 取得是 内容 和 内边距 和 边框 和 外边距  (传true )
        * */
    });

    //console.log(width);
    /*设置ul的宽度*/
    $child.width(width);

    /*初始化 滑动组件*/
    itcast.iScroll({
        swipeDom:$parent.get(0),
        swipeType:'x',
        swipeDistance:'50'
    });

}