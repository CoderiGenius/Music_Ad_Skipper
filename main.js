// ==UserScript==
// @name         Spotify ad skipper DIY
// @version      1.0
// @namespace    http://tampermonkey.net/
// @description  Detects and skips ads on spotify
// @match        https://*.spotify.com/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/CoderiGenius/Music_Ad_Skipper/main/main.js
// @updateURL    https://raw.githubusercontent.com/CoderiGenius/Music_Ad_Skipper/main/main.js
// ==/UserScript==
!async function () {

    setTimeout(startDetecting, 10000);

    setTimeout(startMusic, 5000);
}();

function startMusic(){
    var elements = document.getElementsByClassName("RfidWIoz8FON2WhFoItU");
    var length = elements?elements.length:0;
    var number = getRandomNumber(0,length);

    elements[number].click();
    console.log("Click music:", number);
}

function startDetecting(){
    var interval = setInterval(checkAds,1000);

    console.log("Start detecting ads:", interval)

}
function checkAds(){
    let result = checkTitle();
    if(result){
        location.reload();
    }
}

function checkTitle() {

    var pageTitle = document.title;
    if (pageTitle.includes("Advertisement")) {
        console.log("ad");
        return true;
    } else if(pageTitle.includes("广告")){
        console.log("ad");
        return true;
    }else {
        return false;
    }
}

function getRandomNumber(min, max) {
    // 计算范围内的随机数
    var randomNumber = Math.random() * (max - min) + min;

    // 取整并返回结果
    return Math.floor(randomNumber);
}
// 歌曲范围
var minRange = 1;
var maxRange = 100;

var randomNum = getRandomNumber(minRange, maxRange);
console.log(randomNum);

