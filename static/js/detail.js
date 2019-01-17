var type = getRouterParam('type');
var id = getRouterParam('id');
console.log(type);
console.log(id);
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
        url: "json/dynamic.json",
        type: "GET",
        dataType: "json", 
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        },
        success: function(res) {
            console.log(res);
            
            var menu = [];
            for(var i = 0 ; i < res.data.length ; i++){
                var param = {
                    "id" : res.data[i].id,
                    "name" : res.data[i].name,
                }
                menu.push(param);
            }
            var detail = {};
            for(var i = 0 ; i < res.data.length ; i++){
                if(type == res.data[i].id){
                    for(var j = 0 ; j < res.data[i].list.length ; j++){
                        if(id == res.data[i].list[j].id){
                            detail = res.data[i].list[j].data
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