var mdown = new MouseEvent('pointerdown', { view: null, bubbles: true, cancelable: true});
var autoclick = function() {
    var clickableArea = document.getElementsByClassName('take-bee-fly');
    if (clickableArea) {
        clickableArea[0]?.dispatchEvent(mdown);
        clickableArea[0]?.click();
    }
}

var claimBee = function () {
    const element = document.querySelector('.btn.p-5.w-full');
    if (element) {
        element.dispatchEvent(mdown);
        element.click();
    }
}

var claimCoin = function() {
    const element = document.querySelector('.rung');
    if (element) {
        element.dispatchEvent(mdown);
        element.click();

        const elements = document.querySelectorAll('.flex-row.gap-2.items-center.w-full.cursor-pointer');
        if (elements) {
            elements[1]?.dispatchEvent(mdown);
            elements[1]?.click();
        }
    }
}



function start(){
    if (window.click) clearInterval(window.click);
    if (window.claimBee) clearInterval(window.claimBee);
    if (window.claimCoin) clearInterval(window.claimCoin);
    window.click = setInterval(autoclick, 1000);
    window.claimBee = setInterval(claimBee, 2000);
    window.claimCoin = setInterval(claimCoin, 10000);
}

function stop(){
    if(window.click) clearInterval(window.click);
    if(window.claimBee) clearInterval(window.claimBee);
    if(window.claimCoin) clearInterval(window.claimCoin);
}
start();

