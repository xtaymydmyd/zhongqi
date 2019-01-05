$(function (){
    var swiper = new Swiper('#swiper .swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        freeMode : true,
        loop : true,
        autoplay: 5000,
    });
    // var type = getRouterParam("type") ? getRouterParam("type") : 'd1';
    // initActive(type)
    // if(type == 'd1'){
    //     initBaseTab("b1")
    // }
    
    // //中企概况切换
    // $(".tabMinTitleWrap").on("click" , function(){
    //     var dataId = $(this).attr('data-id');
    //     if(dataId == 'd1'){
    //         initBaseTab("b1")
    //     }
    //     initActive(dataId)
    // })
    // //公司简介标签页切换
    // $(".companyTabName").on("click" , function(){
    //     var dataTab = $(this).attr('data-tab');
    //     initBaseTab(dataTab)
    // })
    getServiceMenuList();
});
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
function initBaseTab(dataTab){
    var companyTabName = $(".companyTabName");
    for(var i = 0 ; i < companyTabName.length ; i++){
        if($(companyTabName[i]).hasClass('active')){
            $(companyTabName[i]).removeClass('active');
        }
    }
    //tab被选中
    $('[data-tab=' + dataTab + ']').addClass('active')

    var companyTabContent = $(".companyTabContent")
    for(var i = 0 ; i < companyTabContent.length ; i++){
        if($(companyTabContent[i])[0].style.display == 'inline-block'){
            $(companyTabContent[i])[0].style.display = 'none'
        }
    }
    //内容显示
    $('[data-value=' + dataTab + ']')[0].style.display = 'inline-block';
}
function getRouterParam(name){
    return  decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
}

function getServiceMenuList(){
    $.ajax({
        url: "json/service.json",
        type: "GET",
        dataType: "json", 
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        },
        success: function(data) {
            console.log(data);
        }
     })
}