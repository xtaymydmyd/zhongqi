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
            var html = template('content', res);
            document.getElementById("technologyContainer").innerHTML = html;
        }
     })
}