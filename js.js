var content;
var city;
window.onload=function () {
    city=localStorage.getItem("defaultCity");
    var bg = document.querySelector(".wrap");
    content = bg.innerHTML;
    if (city){

        search();
    }

    };


function setDefault() {
    var city = document.getElementById("city").value;
    localStorage.setItem('defaultCity',city);
    // console.log(typeof city);
    // var citys=localStorage.getItem("defaultCity");
    // console.log(citys);
}
function search() {

    var citycvalue = document.getElementById("city").value;
    if (citycvalue!=="") {
        city = citycvalue;
    }
    var title = document.querySelector(".title");

    var type =document.getElementById("type");
    var temperature =document.getElementById("temperature");
    var high =document.getElementById("hign");
    var low =document.getElementById("low");
    var rq =document.getElementById("date");
    var date =new Date();
    var bg = document.querySelector(".wrap");

    var todaybox = document.querySelector(".today .weatherpic");
    var futureboxs = document.querySelectorAll(".future .weatherpic");
    console.log(futureboxs);
    var dates =document.querySelectorAll(".date");
    var types = document.querySelectorAll(".type");
    var temperatures = document.querySelectorAll(".temperature");
    var highs =document.querySelectorAll(".hign");
    var lows = document.querySelectorAll(".low");
    console.log(types[1]);

    //获取天气信息
    fetch("http://wthrcdn.etouch.cn/weather_mini?city="+city)
        .then(data => {
            console.log(data);
           return  data.json()}
        ).then(data => {

           if (data.status == "1002"){
                bg.innerHTML =content;
                bg.style.background= "linear-gradient(-45deg, #21edf3, #21edf3, #21edf3)";
                alert("获取城市天气情况失败");
                return
           } else
             if (data.data.forecast[0].type.match("雨")) {
                todaybox.classList.remove(todaybox.classList[1]);
                todaybox.classList.add("rainy");
                 bg.style.background = "url(images/rainy.jpeg) center center no-repeat";
                 bg.style.backgroundSize = "100% 100%";

            }else if(data.data.forecast[0].type.match("雪")){
                todaybox.classList.remove(todaybox.classList[1]);
                todaybox.classList.add("snowy");
                 bg.style.background = "url(images/snowy.jpg) center center no-repeat";
                 bg.style.backgroundSize = "100% 100%";
            }else if (data.data.forecast[0].type.match("阴")||data.data.forecast[0].type.match("云")) {
                todaybox.classList.remove(todaybox.classList[1]);
                todaybox.classList.add("cloudy");
                 bg.style.background = "url(images/cloudy.jpg) center center no-repeat";
                 bg.style.backgroundSize = "100% 100%";

            }else {
                todaybox.classList.remove(todaybox.classList[1]);
                todaybox.classList.add("sunny");
                 bg.style.background = "url(images/sunny.jpg) center center no-repeat";
                 bg.style.backgroundSize = "100% 100%";
            }
        title.innerHTML="你正在查询<h1 style='display: inline-block'>"+city+"</h1>的天气"
            type.innerHTML = "天气类型：" +data.data.forecast[0].type;
            temperature.innerHTML = "平均气温：" +data.data.wendu +"℃";
            high.innerHTML = "最高温度：" + parseInt(data.data.forecast[0].high.slice(2))+"℃";
            low.innerHTML = "最低温度：" + parseInt(data.data.forecast[0].low.slice(2))+"℃";
            rq.innerHTML =  "日期："+(date.getMonth()+1)+"月"+ date.getDate()+"号";
            //Today天气情况


            console.log(data);
            var  i = 0;
            for(var key =1 ; key<4;key++){
                types[i].innerHTML = "天气类型：" +data.data.forecast[key].type;
                temperatures[i].innerHTML = "平均气温：" + (parseInt(data.data.forecast[key].high.slice(2))+parseInt(data.data.forecast[key].low.slice(2)))/2+"℃";
                highs[i].innerHTML = "最高温度：" + parseInt(data.data.forecast[key].high.slice(2))+"℃";
                lows[i].innerHTML = "最低温度：" + parseInt(data.data.forecast[key].low.slice(2))+"℃";
                dates[i].innerHTML =  "日期："+(date.getMonth()+1)+"月"+ (date.getDate()+i+1)+"号";

                console.log(futureboxs[i]);

                if (data.data.forecast[key].type.match("雨")) {
                    futureboxs[i].classList.remove( futureboxs[i].classList[1]);
                    futureboxs[i].classList.add("rainy");

                }else if(data.data.forecast[key].type.match("雪")){
                    futureboxs[i].classList.remove( futureboxs[i].classList[1]);
                    futureboxs[i].classList.add("snowy");

                }else if (data.data.forecast[key].type.match("阴")||data.data.forecast[key].type.match("云")) {
                    futureboxs[i].classList.remove(futureboxs[i].classList[1]);
                    futureboxs[i].classList.add("cloudy");
                }else {
                    futureboxs[i].classList.remove( futureboxs[i].classList[1]);
                    futureboxs[i].classList.add("sunny");
                }
                i++;
            }


            //
            // for (var key in data.data.forecast) {
            //     var i = 0;
            //     var j = key++;
            //     types[i].innerHTML = "天气类型：" +data.data.forecast[0].type;
            //         console.log(data.data.forecast[key].type);
            //     console.log(j);
            // }



        })
            .catch(function (e) {
        console.log(e);
        alert("请检查网络");
    });


}
