$(function (){
    var swiper = new Swiper('#swiper .swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        freeMode : true,
        loop : true,
        autoplay: 5000,
    });
    
    getDynamicMenuList()
});
//获取数据
function getDynamicMenuList(){
    $.ajax({
        url: "json/dynamic.json",
        type: "GET",
        dataType: "json", 
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        },
        success: function(res) {
            console.log(res);
            var html = template('content', res);
            document.getElementById("dynamicContainer").innerHTML = html;
            initSelect();
        }
     })
}
//初始化标签页
function initSelect(){
    var type = getRouterParam("type") ? getRouterParam("type") : 'd1';
    initActive(type)
    $(".tabMinTitleWrap").on("click" , function(){
        var dataId = $(this).attr('data-id');
        initActive(dataId)
    })
}
function initActive(dataId){
    var tabMinTitleWrap = $(".tabMinTitleWrap");
    for(var i = 0 ; i < tabMinTitleWrap.length ; i++){
        if($(tabMinTitleWrap[i]).hasClass('active')){
            $(tabMinTitleWrap[i]).removeClass('active');
        }
    }
    //tab被选中
    $('[data-id=' + dataId + ']').addClass('active')

    var tabWrapContent = $(".tabWrapContent")
    for(var i = 0 ; i < tabWrapContent.length ; i++){
        if($(tabWrapContent[i])[0].style.display == 'inline-block'){
            $(tabWrapContent[i])[0].style.display = 'none'
        }
    }
    //内容显示
    $('[data-href=' + dataId + ']')[0].style.display = 'inline-block';
}
function getRouterParam(name){
    return  decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
}