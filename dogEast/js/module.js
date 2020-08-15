var setFontSize = function() {
    var width = window.innerWidth
    //设置页面最大宽度
    if (width > 600) {
        width = 600
    }
    // 获取默认fontsize
    var fontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16;
    var x = width * 16 / (20 * fontSize);
    document.documentElement.style.fontSize = x + 'px';
}
setFontSize();
DD.createModule({
    name: "pageCard",
    el: ".pageCard",
    dataUrl: "./dataPath/pageCard/pageCard_data.json",
    templateUrl: "./viewPath/pageCard/pageCard_view.html"
});

DD.createModule({
    name: "header_base",
    el: ".header_base",
    dataUrl: "./dataPath/header/header_base_data.json",
    templateUrl: "./viewPath/header/header_base_view.html"
});

DD.createModule({
    name: "header_search",
    el: ".header_search",
    dataUrl: "./dataPath/header/header_search_data.json",
    templateUrl: "./viewPath/header/header_search_view.html"
});

DD.createModule({
    name: "fadeIn",
    el: ".floor_fadeIn",
    data: {
        index: 0,
        slideSwitch: 1,
        slideShow: [
            {slideImg: "img/fadeIn1.png"},
            {slideImg: "img/fadeIn2.png"},
            {slideImg: "img/fadeIn3.png"},
            {slideImg: "img/fadeIn4.png"},
            {slideImg: "img/fadeIn5.png"},
            {slideImg: "img/fadeIn6.png"},
            {slideImg: "img/fadeIn7.png"},
            {slideImg: "img/fadeIn8.png"},
            {slideImg: "img/fadeIn1.png"}
        ],
        dots: [
            {switch: 1,dotsId: "dots0"},
            {switch: 0,dotsId: "dots1"},
            {switch: 0,dotsId: "dots2"},
            {switch: 0,dotsId: "dots3"},
            {switch: 0,dotsId: "dots4"},
            {switch: 0,dotsId: "dots5"},
            {switch: 0,dotsId: "dots6"},
            {switch: 0,dotsId: "dots7"}
        ]
    },
    templateUrl: "viewPath/fadeIn/fadeIn_view.html",
    methods: {
        slideOpen: function (view,e,data) {
            this.data.slideSwitch = 1;
        },
        slideClose: function (view,e,data) {
            this.data.slideSwitch = 0;
        },
        clickDots: function (view,e,data) {
            this.data.dots[this.data.index].switch = 0;
            var order = parseInt(e.dotsId.substr(-1));
            fadeIn_slideShow(order,order-this.data.index);
            this.data.index = order;
            this.data.dots[this.data.index].switch = 1;
        },
        swipeImgLeft: function (view,e,data) {
            this.data.dots[this.data.index].switch = 0;
            this.data.index = fadeIn_slideShow(this.data.index,1);
            this.data.dots[this.data.index].switch = 1;

        },
        swipeImgRight: function (view,e,data) {
            this.data.dots[this.data.index].switch = 0;
            this.data.index = fadeIn_slideShow(this.data.index,-1);
            this.data.dots[this.data.index].switch = 1;
        }
    },
    onFirstRender() {
        var thisModule = this;
        setInterval(function () {
            if (thisModule.data.slideSwitch == 1) {
                thisModule.data.dots[thisModule.data.index].switch = 0;
                thisModule.data.index = fadeIn_slideShow(thisModule.data.index,1);
                thisModule.data.dots[thisModule.data.index].switch = 1;
            }
        },3000)
    }
});

DD.createModule({
    name: "container",
    el: ".floor_container",
    dataUrl: "./dataPath/container/container_data.json",
    templateUrl: "./viewPath/container/container_view.html"
});

DD.createModule({
    name: "nav",
    el: ".floor_nav",
    dataUrl: "./dataPath/nav/nav_data.json",
    templateUrl: "./viewPath/nav/nav_view.html"
});

DD.createModule({
    name: "scrollNews",
    el: ".floor_scrollNews",
    templateUrl: "./viewPath/scrollNews/scrollNews_view.html",
    dataUrl: "./dataPath/scrollNews/scrollNews_data.json",
    onFirstRender() {
        var newSlide = document.getElementsByClassName("scrollNews_scrollSlide"),
            index = 0;
        setInterval(function () {
            var distance = 20.7 * index;
            index++;
            clearInterval(newSlide[0].timer);
            newSlide[0].timer = setInterval(function () {
                if (newSlide[0].offsetTop <= -83) {
                    newSlide[0].style.top = -20.7 + "px";
                    index = 0;
                    distance = 20.7 * index;
                }
                distance += 0.69;
                newSlide[0].style.top = -distance + "px";
                if (-simpleMath.rounding(distance,1) <= -simpleMath.rounding(20.7 * index,1)) {
                    clearInterval(newSlide[0].timer);
                }
            },15);
        },2000)
    }
});

DD.createModule({
    name: "activity",
    el: ".floor_activity",
    dataUrl: "./dataPath/activity/activity_data.json",
    templateUrl: "./viewPath/activity/activity_view.html"
});

DD.createModule({
    name: "jdKill",
    el: ".floor_jdKill",
    dataUrl: "./dataPath/jdKill/jdKill_data.json",
    templateUrl: "./viewPath/jdKill/jdKill_view.html"
});

DD.createModule({
    name: "jdKillDate",
    el: ".jdKill_title_time",
    data: {
        hour: "00",
        minute: "00",
        second: "00"
    },
    templateUrl: "./viewPath/jdKill/jdKill_title_time_view.html",
    onFirstRender(){
        let thisModule = this;
        setInterval(function () {
            util.getJson("./dataPath/jdKill/jdKill_data.json",dateChange);
        },1000);
        function dateChange(jdKillOrder) {
            var nextOrder = jdKillOrder["next"],
                thisDate = new Date();
            if (thisDate.getHours() > nextOrder) {
                thisModule.data.hour = "00";
            }
            else {
                thisModule.data.hour = "0" + (nextOrder - thisDate.getHours());
            }
            if (thisDate.getMinutes() > 49) {
                thisModule.data.minute = "0" + (59 - thisDate.getMinutes());
            }
            else {
                thisModule.data.minute =(59 - thisDate.getMinutes());
            }
            if (thisDate.getSeconds() > 49) {
                thisModule.data.second = "0" + (59 - thisDate.getSeconds());
            }
            else {
                thisModule.data.second = 59 - thisDate.getSeconds() + "";
            }
        }
    }
});
