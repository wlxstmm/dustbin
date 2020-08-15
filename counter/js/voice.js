function resultVoice(result) {
    console.log(result);
    var times = 0,
        newNum = result,
        voice = [],
        sendVoice = [];
    if (newNum < 0) {                                 /* 负数处理：先变负，最后处理 */
        newNum = -newNum;
    }
    while (simpleMath.isDecimal(newNum)) {          /* 小数处理：先变整，进位记为负进位 */
        newNum *= 10;
        times--;
    }
    while (newNum >= 10) {
        // console.log(newNum);
        newNum /= 10;
        // console.log(newNum);
        voice.push(simpleMath.rounding(simpleMath.getDecimal(newNum) * 10, 0));
        /*console.log(simpleMath.getDecimal(newNum) * 10);
        console.log(simpleMath.getDecimal(newNum));*/
        newNum = Math.floor(newNum);
        times++;
        switch (times % 4) {
            case 0:
                switch (times / 4) {
                    case 0:
                        voice.push("dot");
                        break;
                    case 1:
                        voice.push("tenThousand");
                        break;
                    case 2:
                        voice.push("oneHundredMillion");
                        break;
                    case 3:
                        voice.push("trillion");
                        break;
                }
                break;
            case 1:
                voice.push("ten");
                break;
            case 2:
                voice.push("hundred");
                break;
            case 3:
                voice.push("thousand");
                break;
            default:
                break;
        }
    }
    voice.push(simpleMath.rounding(newNum, 0));
    if (result > -1 && result < 1 && result != 0) {
        voice.push("dot");
        voice.push(0);
    }
    if (result < 0) {
        voice.push("negative");
    }
    while (voice.length > 0) {
        sendVoice.push(voice.pop());
    }
    resultVoiceSwitch = 1;                         /* 此处打开结果语音开关 */
    makeVoice(sendVoice);
}

function makeVoice(nameArray) {
    var urlArray = nameArray,
        voiceArray = [];
    for (var i = 0;i < urlArray.length;i++) {
        var newAudio = new Audio();
        newAudio.src = "voice/" + urlArray[i] + ".mp3";
        newAudio.load();
        newAudio.dataset.o = i;
        voiceArray.push(newAudio);
        if (i < urlArray.length - 1) {
            newAudio.addEventListener("timeupdate", function (ev) {
                if (resultVoiceSwitch == 0) {
                    return 0;
                }
                var newNum = parseInt(ev.target.dataset.o);
                if (voiceArray[newNum].currentTime > 0.3) {
                    voiceArray[newNum].pause();
                    voiceArray[newNum + 1].play();
                }
            })
        }
    }
    setTimeout(function () {
        voiceArray[0].load();
        voiceArray[0].play();
    }, 700);
}