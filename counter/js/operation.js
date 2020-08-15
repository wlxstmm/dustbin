/* 输入处理函数 */
function dealNum(sign) {                 /* 输入数字处理 */
    if (num == "0") {                   /* 去零操作 */
        num.pop();
    }
    if (num.length < 15) {              /* 限制长度为15位数 */
        num.push(sign);
        imp.innerHTML = num.join("");
    }
}

function doPoint(sign) {              /* 输入小数点处理 */
    if (num.length < 15) {
        num.push(sign);
        imp.innerHTML = num.join("");
    }
}

function doSign(sign) {               /* 输入基本运算符号处理 */
    num = num.join("");
    if (strIndex == 1) {
        if (str[strIndex - 1] == 0) {
            str[strIndex - 1] = parseFloat(num);
        }
    }
    else {
        str.push(parseFloat(num));
        strIndex++;
        imp.innerHTML = simpleMath.newEval(str);                      /* 实时运算 */
    }
    initNum();
    str[strIndex] = sign;
    record.innerHTML = str.join("");
    strIndex++;
}

function doRoot() {                           /* 开方处理 */
    num = num.join("");
    if (strIndex == 1) {
        str[strIndex - 1] = Math.pow(parseFloat(num),0.5);
    }
    else {
        str[strIndex] = Math.pow(parseFloat(num),0.5);
        strIndex++;
    }
    imp.innerHTML = Math.pow(parseFloat(num),0.5);
    initNum();
    record.innerHTML = str.join("");
}

function doRec() {                           /* 倒数处理 */
    num = num.join("");
    if (strIndex == 1) {
        str[strIndex - 1] = 1/parseFloat(num);
    }
    else {
        str[strIndex] = 1/parseFloat(num);
        strIndex++;
    }
    imp.innerHTML = simpleMath.newEval(str);
    initNum();
    record.innerHTML = str.join("");
}

function doSqu() {                                /* 平方处理 */
    var newNum = parseFloat(num.join("")),
        digit = simpleMath.getDecimalPlaces(num);
    if (strIndex == 1) {
        str[strIndex - 1] = Math.pow(newNum * Math.pow(10,digit - 1),2)/Math.pow(Math.pow(10,digit - 1),2);
    }
    else {
        str[strIndex] = Math.pow(newNum * Math.pow(10,digit - 1),2)/Math.pow(Math.pow(10,digit - 1),2);
        strIndex++;
    }
    imp.innerHTML = simpleMath.newEval(str);
    initNum();
    record.innerHTML = str.join("");
}

function doClear() {                                    /* 清空所有数据处理 */
    record.innerHTML = "";
    initStr();
    initNum();
    imp.innerHTML = 0;
}

function doClearimp() {                                 /* 清空当前数据处理 */
    initNum();
    imp.innerHTML = 0;
}

function doBack() {                                     /* 退格处理 */
    if (num.length > 0) {
        num.pop();
        if (num.length == 0) {
            num[0] = "0";
        }
        imp.innerHTML = num.join("");
    }
}

function doSolve() {                                   /* 等号处理 */
    if (str != "0" && testBrackets() == 0)             /* 输入数组不为零且左右括号数相等（合法） */
    {
        if (simpleMath.isBasicSymbol(str[str.length - 1]) && num == 0) {    /* 这里做选择处理目的是防止出现未输入数字而默认乘除0的情况 */
            str.pop();                                          /* 代价是0被献祭了。。。 */
        }
        else if (str[str.length - 1] != ")" && num != 0) {
            num = num.join("");
            str.push(parseFloat(num));
            num = [];
        }
        var result = simpleMath.newEval(str);
        resultVoice(result);
        imp.innerHTML = result;
        initStr();
        num.push(imp.innerHTML);
        record.innerHTML = "";
    }
    else {                                      /* 其余情况（非法） */
        if (testBrackets() != 0) {
            imp.innerHTML = "error";           /* 括号不对报错 */
        }
        initStr();
        initNum();
        record.innerHTML = "";                 /* 没操作则不显示 */
    }
}

function doBrackets(sign) {                                /* 括号处理 */
    if (sign == ")") {
        if (testBrackets() <= 0 && isNaN(str[str.length - 1]));     /* 右括号条件：数量永不大于左括号且前一个元素不为符号 */
        else {
            num = num.join("");
            if (num != "0") {
                str.push(parseFloat(num));
                strIndex++;
            }
            str[strIndex] = sign;
            record.innerHTML = str.join("");
            strIndex++;
            initNum();
        }
    }
    else {
        if (isNaN(str[str.length - 1]) && num == "0" && str[str.length - 1] != ")") {   /* 左括号条件：前一个元素为无或符号，且不能为右括号 */
            str[strIndex] = sign;
            record.innerHTML = str.join("");
            strIndex++;
        }
    }
}

function testBrackets() {                                  /* 所输入字符串的左右括号数量检测 */
    var lNum = 0,
        rNum = 0;
    for (var i = 0;i < str.length;i++) {
        if (str[i] == "(") {
            lNum++;
        }
        else if (str[i] == ")") {
            rNum++;
        }
    }
    if (lNum > rNum) {
        return 1;
    }
    else if (lNum == rNum) {
        return 0;
    }
    else {
        return -1;
    }
}

function initStr() {                            /* 数字输入数组初始化 */
    str = [];
    str[0] = 0;
    strIndex = 1;
}

function initNum() {                            /* 数字处理数组初始化 */
    num = [];
    num[0] = 0;
}