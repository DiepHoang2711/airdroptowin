var attackBox = "_card_1ymyk_1";
var clickEvent = new MouseEvent('pointerdown', { view: null, bubbles: true, cancelable: true});

var tabFight = function() {
    var clickableArea = document.getElementsByClassName('clickableArea');
    if(clickableArea) {
        clickableArea[0]?.dispatchEvent(clickEvent);
        clickableArea[0]?.click();
    }
}

var startMatch = function() {
    var ele = document.querySelector('button[class*="_button_"][class*="_purple_"][class*="_outlined_"][class*="_textUppercase_"]');
    if(ele) {
        ele?.dispatchEvent(clickEvent);
        ele?.click();
    }
}

var newMatch = function() {
 	
    var ele = document.querySelectorAll('button[class*="_button_"][class*="_purple_"][class*="_textUppercase_"]');
    if(ele[ele.length - 1]) {
        ele[ele.length - 1]?.dispatchEvent(clickEvent);
        ele[ele.length - 1]?.click();
		console.clear();
    }
}


var randomAttack = function() {
	var attacks = document.getElementsByClassName(attackBox);
	var randomPosition = Math.floor(Math.random() * 3) + 0;
	if(attacks && attacks[randomPosition]) {
		console.log("attack");
        attacks[randomPosition]?.dispatchEvent(clickEvent);
        attacks[randomPosition]?.click();
    }
}

var autoclickBtn = function() {
    var ele = document.querySelector('button[class*="_button_"][class*="_purple_"][class*="_textUppercase_"]');
    if(ele) {
        ele?.dispatchEvent(clickEvent);
        ele?.click();
    }
}

function start(){
    if(window.tabFight) clearInterval(window.tabFight);
    if(window.randomAttack) clearInterval(window.randomAttack);
    window.tabFight = setInterval(tabFight, 100);
    window.randomAttack = setInterval(randomAttack, 2000);
	
	if(window.startMatch) clearInterval(window.startMatch);
    window.startMatch = setInterval(startMatch, 5000);
	
	
	if(window.newMatch) clearInterval(window.newMatch);
    window.newMatch = setInterval(newMatch, 5000);
}

function stop(){
	if(window.tabFight) clearInterval(window.tabFight);
	if(window.randomAttack) clearInterval(window.randomAttack);
	if(window.startMatch) clearInterval(window.startMatch);
	if(window.newMatch) clearInterval(window.newMatch);
}

start();
