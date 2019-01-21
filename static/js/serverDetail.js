var type = getRouterParam('type');
var classId = getRouterParam('class');
var id = getRouterParam('id');

$(function (){
    var swiper = new Swiper('#swiper .swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        freeMode : true,
        loop : true,
        autoplay: 5000,
    });
    getDynamicMenuList();
});

//获取数据
function getDynamicMenuList(){
    $.ajax({
        url: "json/service.json",
        type: "GET",
        dataType: "json", 
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        },
        success: function(res) {
            var menu = [];
            for(var i = 0 ; i < res.serviceData.length ; i++){
                var param = {
                    "id" : res.serviceData[i].id,
                    "name" : res.serviceData[i].name,
                }
                menu.push(param);
            }
            var detail = {};
            for(var i = 0 ; i < res.serviceData.length ; i++){
                if(type == res.serviceData[i].id){
                    for(var j = 0 ; j < res.serviceData[i].class.length ; j++){
                        if(classId == res.serviceData[i].class[j].id){
                            for(var k = 0 ; k < res.serviceData[i].class[j].list.length ; k++){
                                if(id == res.serviceData[i].class[j].list[k].id){
                                    detail = res.serviceData[i].class[j].list[k]
                                }
                            }
                        }
                    }
                    
                }
            }
            var data = {
                menu : menu,
                detail : detail
            }
            console.log(data)
            var html = template('content', data);
            document.getElementById("detailContent").innerHTML = html;
            initActive(type)
        }
     })
}
function getRouterParam(name){
    return  decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
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
}