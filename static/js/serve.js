console.log("aaa")
var serviceData = {};
var type = "";
var contentId = "";
$(function (){
    var swiper = new Swiper('#swiper .swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        freeMode : true,
        loop : true,
        autoplay: 5000,
    });
   
    
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




function getServiceMenuList(){
    $.ajax({
        url: "json/service.json",
        type: "GET",
        dataType: "json", 
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        },
        success: function(res) {
            console.log(res);
            serviceData = res.serviceData;
            var html = template('content', res);
            document.getElementById("dynamicContainer").innerHTML = html;
            initJQSelect()
            initSelect()
        }
     })
}

function initSelect(){
    type = getRouterParam("type") ? getRouterParam("type") : 's1';
    
    for(var i = 0 ; i < serviceData.length ; i++){
        if(type == serviceData[i].id){
            contentId = serviceData[i].list[0].id;
            console.log(contentId)
        }
    }
    initActive(type)
    initSelectContent(type)
}
//服务业务下标签页被选中
function initActive(dataId){
    var tabMinTitleWrap = $(".tabMinTitleWrap");
    for(var i = 0 ; i < tabMinTitleWrap.length ; i++){
        if($(tabMinTitleWrap[i]).hasClass('active')){
            $(tabMinTitleWrap[i]).removeClass('active');
        }
    }
    //tab被选中
    $('[data-id=' + dataId + ']').addClass('active')
}
function initSelectContent(dataId){
    var tabWrapContent = $(".tabWrapContent")
    for(var i = 0 ; i < tabWrapContent.length ; i++){
        console.log($(tabWrapContent[i])[0].style.display)
        if($(tabWrapContent[i])[0].style.display == 'inline-block'){
            $(tabWrapContent[i])[0].style.display = 'none'
        }
    }
    //内容显示
    $('[data-id-content=' + dataId + ']')[0].style.display = 'inline-block';
    initSelectContentWrap()
}

function initSelectContentWrap(){
    var companyTabName = $('[data-id-content=' + type + '] .companyTab [data-tab=' + contentId + ']');
    
    var companyTabNameList = $('[data-id-content=' + type + '] .companyTab .companyTabName')
    for(var i = 0 ; i < companyTabNameList.length ; i++){
        if($(companyTabNameList[i]).hasClass('active')){
            $(companyTabNameList[i]).removeClass('active');
        }
    }
    $(companyTabName).addClass("active");
    selectContentListWrap(contentId);
}

//列表展示
function selectContentListWrap(id){
    var companyTabContainer = $('[data-id-content=' + type + '] .companyTabContainer');
    for(var i = 0 ; i < companyTabContainer.length ; i++){
        if($(companyTabContainer[i])[0].style.display == 'inline-block'){
            $(companyTabContainer[i])[0].style.display = 'none'
        }
    }
    //内容显示
    $('[data-id-content=' + type + '] .companyBaseInfoTab [data-list-id=' + id + ']')[0].style.display = 'inline-block';
}
//初始化点击插件
function initJQSelect(){
    $(".tabMinTitleWrap").on("click" , function(){
        type = $(this).attr('data-id');
        for(var i = 0 ; i < serviceData.length ; i++){
            if(type == serviceData[i].id){
                contentId = serviceData[i].list[0].id;
                console.log(contentId)
            }
        }
        initActive(type)
        initSelectContent(type)
    })
    $(".companyTabName").on("click" , function(){
        contentId = $(this).attr('data-tab');
        initSelectContentWrap();
    })
}

function getRouterParam(name){
    return  decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
}