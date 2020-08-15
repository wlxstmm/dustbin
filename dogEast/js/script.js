function scrollNews_slideShow() {
    var newSlide = document.getElementsByClassName("scrollNews_scrollSlide")[0];
    setInterval(function () {
        var distance = 0;
        if (newSlide.offsetTop <= 62.1) {
            newSlide.style.top = 0 + "px";
        }
        clearInterval(setInterval(function () {
            distance += 1.38;
            newSlide.style.top = distance + "px";
        },15))
    },2000)
}

function fadeIn_slideShow(index,difference) {
    var distance = -20 * index,
        move = difference * 1.25,
        newSlide = document.getElementsByClassName("fadeIn_slideShow")[0];
    clearInterval(newSlide.timer);
    newSlide.timer = setInterval(function () {
        distance -= move;
        if (distance <= -158.5) {
            index = 0;
            distance = -20 * index;
        }
        else if (distance >= 1.25) {
            index = 7;
            distance = -20 * (index + 1) - move;
        }
        newSlide.style.left = distance + "rem";
        if (distance == -20 * index) {
            clearInterval(newSlide.timer);
        }
        },16);
    index += difference;
    if (index < 0) {
        index += 8;
    }
    else if (index > 7) {
        index -= 8;
    }
    return index;
}
