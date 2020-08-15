document.onselectstart = function(){return false;};
var button = document.getElementsByClassName("button"),
    operate = document.getElementById("operate"),
    record = document.getElementById("record"),
    imp = document.getElementById("import"),
    str = [],                                       /* 算式输入数组 */
    strIndex = 1,
    num = [],                                       /* 数字处理数组 */
    resultVoiceSwitch = 0;                         /* 结果语音播放开关 */
window.onload = function () {
    imp.innerHTML = "0";                                    /* 开始的归零操作 */
    util.getJson("json/symbol.json",initButton);
    initKeyboard();
    initStr();
    initNum();
    window.onkeypress = function (e) {
        switch (e.keyCode) {
            case 48:
                dealNum(0);
                break;
            case 49:
                dealNum(1);
                break;
            case 50:
                dealNum(2);
                break;
            case 51:
                dealNum(3);
                break;
            case 52:
                dealNum(4);
                break;
            case 53:
                dealNum(5);
                break;
            case 54:
                dealNum(6);
                break;
            case 55:
                dealNum(7);
                break;
            case 56:
                dealNum(8);
                break;
            case 57:
                dealNum(9);
                break;
            case 13:
                doSolve();
                break;
        }
    }
}