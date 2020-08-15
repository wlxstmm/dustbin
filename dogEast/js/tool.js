var util = {
    getJson(url,fn){                        /* json读入方法 */
        var request = new XMLHttpRequest();
        request.onload = function () {
            var Text = request.response;
            var labels = JSON.parse(Text);
            fn(labels);
        }
        request.open('GET',url);
        request.responseType = "text";
        request.send();
    }
    /*getJsonData(url,name) {
        function getData(newJson) {
            return newJson[name];
        }
        return util.getJson(url,getData);
    }*/
    /*getJson (url,fn) {
        var newJson = new JSON();
        newJson.src = "" + url;
        var obj = JSON.parse(newJson);
        return fn(obj);
    }*/
};

var simpleMath = {
    makeRandomInt(from,to) {                /* 返回输入范围内的随机整数 */
        return Math.floor(Math.random() * (to - from + 1) + from);
    },
    isDecimal(testNum) {                 /* 小数检测 */
        if (Math.floor(testNum) != testNum) {
            return true;
        }
        else {
            return false;
        }
    },
    getDecimal(num) {                   /* 获得小数 */
        return num - Math.floor(num);
    },
    getDecimalPlaces(num) {             /* 获得小数位数 */
        var newNum = "" + num;
        if (newNum.indexOf(".") == -1) {
            return 0;
        }
        else {
            return (newNum.length - 1 - newNum.indexOf("."));
        }
    },
    isBasicSymbol (symbol) {                    /* 是否为基本运算符（加减乘除）检测 */
        if (symbol == "+" || symbol == "-" || symbol == "*" || symbol == "/") {
            return true;
        }
        else {
            return false;
        }
    },
    getSymbolOrder (symbol) {                           /* 获得运算符的优先级 */
        var prio;
        switch (symbol) {
            case "(":
                prio = 0;
                break;
            case "+":
                prio = 1;
                break;
            case "-":
                prio = 1;
                break;
            case "*":
                prio = 2;
                break;
            case "/":
                prio = 2;
                break;
            case "#":
                prio = -1;
                break;
            default:
                prio = "error";
                break;
        }
        return prio;
    },
    newEval (formula) {
        if (isNaN(formula)) {                   /* 先检测式子是否合法，不合法则返回原值 */
            var newFormula = formula,
                dealStack = [],
                inStack = [],
                outStack = [];
            for (var i = 0;i < newFormula.length;i++) {         /* 中缀转后缀 */
                if (isNaN(newFormula[i])) {
                    if (newFormula[i] == ")") {
                        while (dealStack[dealStack.length - 1] != "(") {
                            inStack[inStack.length] = dealStack.pop();
                        }
                        dealStack.pop();
                    } 
                    else if (newFormula[i] == "(") {
                        dealStack.push(newFormula[i]);
                    } 
                    else {
                        if (isNaN(simpleMath.getSymbolOrder(newFormula[i]))) {
                            return false;
                        } 
                        else {
                            while (simpleMath.getSymbolOrder(dealStack[dealStack.length - 1]) >=
                                simpleMath.getSymbolOrder(newFormula[i])) {
                                inStack[inStack.length] = dealStack.pop();
                            }
                            dealStack.push(newFormula[i]);
                        }
                    }
                }
                else {
                    inStack[inStack.length] = newFormula[i];
                }
            }
            while (simpleMath.getSymbolOrder(dealStack[dealStack.length - 1]) > 0) {
                inStack[inStack.length] = dealStack.pop();
            }

            for (var i = 0;i < inStack.length;i++) {        /* 后缀式计算 */
                if (isNaN(inStack[i])) {
                    var num2 = outStack.pop(),
                        num1 = outStack.pop(),
                        places = Math.pow(10, Math.max(simpleMath.getDecimalPlaces(num1),
                            simpleMath.getDecimalPlaces(num2)));
                    num1 *= places;
                    num2 *= places;
                    switch (inStack[i]) {
                        case "+":
                            outStack.push((num1 + num2) / places);
                            break;
                        case "-":
                            outStack.push((num1 - num2) / places);
                            break;
                        case "*":
                            outStack.push((num1 * num2) / (places * places));
                            break;
                        case "/":
                            outStack.push((num1 / num2) / (places * places));
                            break;
                        default:
                            return false;
                    }
                }
                else {
                    outStack.push(inStack[i]);
                }
            }
            return outStack.pop();
        }
        else {
            return formula;
        }
    },
    rounding (num,places) {                     /* 四舍五入 */
        var newPlaces = simpleMath.getDecimalPlaces(num),
            newNum = "" + num;
        if (newPlaces <= places) {
            for (var i = 0;i < places - newPlaces;i++) {
                newNum += "0";
            }
            return parseFloat(newNum);
        }
        else {
            newNum = newNum.split("");
            if (newNum[newNum.length - (newPlaces - places)] >= 5) {
                for (var i = 0;i < newPlaces - places;i++) {
                    newNum.pop();
                }
                newNum = parseFloat(newNum.join(""));
                return newNum + Math.pow(10, -places);
            }
            else {
                for (var i = 0;i < newPlaces - places;i++) {
                    newNum.pop();
                }
                newNum = parseFloat(newNum.join(""));
                return newNum;
            }
        }
    }
}