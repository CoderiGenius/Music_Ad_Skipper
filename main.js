// ==UserScript==
// @name         Spotify ad skipper DIY
// @version      1.2
// @namespace    http://tampermonkey.net/
// @description  Detects and skips ads on spotify
// @match        https://*.spotify.com/*
// @grant        GM_addStyle
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/CoderiGenius/Music_Ad_Skipper/main/main.js
// @updateURL    https://raw.githubusercontent.com/CoderiGenius/Music_Ad_Skipper/main/main.js
// ==/UserScript==

GM_addStyle(`
    #custom-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: #fff;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: none;
    }
`);

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
    showNotification('Started music successfully!');
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
// 随机歌曲范围
var minRange = 1;
var maxRange = 100;

var randomNum = getRandomNumber(minRange, maxRange);
console.log(randomNum);

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'custom-notification';
    notification.textContent = message;

    // Append notification to the body
    document.body.appendChild(notification);

    // Show notification
    notification.style.display = 'block';

    // Automatically hide after 3 seconds
    setTimeout(() => {
        notification.style.display = 'none';
        // Remove notification element from the DOM after hiding
        document.body.removeChild(notification);
    }, 3000);
}
