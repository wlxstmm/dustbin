function initButton(symbol) {                         /* 计算器按钮初始化 */
    var buttons = symbol["member"];
    for (var i = 0;i < buttons.length;i++) {
        var newButton = document.createElement("div"),
            newAudio = new Audio(),
            sign = buttons[i].content,
            voice = buttons[i].url;
        newButton.dataset.v = voice;
        newButton.dataset.s = sign;
        newButton.innerHTML = sign;
        if (isNaN(sign)) {
            newButton.addEventListener("click", function (ev) {
                resultVoiceSwitch = 0;
                newAudio.src = ev.target.dataset.v;
                newAudio.load();
                newAudio.play();
                switch (ev.target.dataset.s) {
                    case ".":
                        doPoint(".");
                        break;
                    case "÷":
                        doSign("/");
                        break;
                    case "×":
                        doSign("*");
                        break;
                    case "＋":
                        doSign("+");
                        break;
                    case "－":
                        doSign("-");
                        break;
                    case "C":
                        doClear();
                        break;
                    case "←":
                        doBack();
                        break;
                    case "=":
                        doSolve();
                        break;
                    case "(":
                        doBrackets("(");
                        break;
                    case ")":
                        doBrackets(")");
                        break;
                    case "√":
                        doRoot();
                        break;
                    case "x²":
                        doSqu();
                        break;
                    case "CE":
                        doClearimp();
                        break;
                    case "1/x":
                        doRec();
                        break;
                }
            });
            if (sign == "=") {
                /*newAudio.addEventListener("ended", function () {
                    resultVoice(simpleMath.newEval(str));
                });*/
                newButton.className = "button solve";
            }
            else {
                newButton.className = "button sign";
            }
        }
        else {
            newButton.addEventListener("click", function (ev) {
                resultVoiceSwitch = 0;
                newAudio.src = ev.target.dataset.v;
                newAudio.load();
                newAudio.play();
                dealNum(ev.target.dataset.s);
            });
            newButton.className = "button number";
        }
        operate.appendChild(newButton);
    }
}

function initKeyboard() {
    document.getElementsByTagName("body")[0].addEventListener("keydown", function (ev) {
        switch (ev.keyCode) {
            case 48:
                alert(1);
                dealNum(0);
                break;
            case 49:
                alert(2);
                dealNum(1);
                console.log(num);
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
            case 96:
                dealNum(0);
                break;
            case 97:
                dealNum(1);
                break;
            case 98:
                dealNum(2);
                break;
            case 99:
                dealNum(3);
                break;
            case 100:
                dealNum(4);
                break;
            case 101:
                dealNum(5);
                break;
            case 102:
                dealNum(6);
                break;
            case 103:
                dealNum(7);
                break;
            case 104:
                dealNum(8);
                break;
            case 105:
                dealNum(9);
                break;
            case 13:
                doSolve();
                break;
            default:
                break;
        }
    })
}