// Sourced from https://webtips.dev/webtips/javascript/how-to-clamp-numbers-in-javascript
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// const spatula = document.getElementById('spatula');
const ladle = document.getElementById('ladle');

const tally = document.getElementById('tally');

// Timings for pancake cooking (ms)
const pancakeMaxTime = 3000;
const pancakeGoldUpper = 2000;
const pancakeGoldLower = 1200;

let skilletCooking, stoveWaiting;
let stoveClicked = false;

let pancake = {
	currentSide: '',
	cookedBot: 0,
	cookedTop: 0
};
let pancakeTally = 0;

/**
 * Tracks state of equipable tools
 * 
 * 0: Not Equipped / 1: Equipped, Droppable / 2: Equipped, in use
 */
let userState = {
	spatula: 0,
	ladle: 0
};

function toolCheck(key, target) {
	const value = userState[key];
	if (value >= target)
		return true;
	return false;
}

function equip(tool, target = 1) {
	for (const key in userState) {
		if (toolCheck(key, target)) {
			if ((key == tool) && !(userState[tool] > target)) {
				userState[tool] -= 1;
				// Display scripts
				return true;
			} else {
				return false
			}
		} 
	}
	if (userState[tool] == target - 1) {
		userState[tool] = target;
		// Display scripts
		return true;
	} else {
		return false;
	}
}

async function stoveClick() {
	if (toolCheck('spatula', 1)) {
		clearTimeout(stoveWaiting);
		stoveClicked = true;
		stoveWaiting = setTimeout(function() {
			stoveClicked = false;
		}, 4000);
	}
}

function panFill() {
	if (!pancake.currentSide && toolCheck("ladle", 2)) {
		equip("ladle", 2);
		equipImage('ladle')

		// Reset pancake object
		pancake.currentSide = 'bot';

		// Display pancake

		skilletCooking = setInterval(pancakeCook, 1000);
	}
}

function panFlip() {
	clearInterval(skilletCooking);
	clearTimeout(stoveWaiting);
	stoveClicked = false;

	const currentSide = pancake.getAttribute('data-current-side');

	if (currentSide == 'bot')
		pancake.setAttribute('data-current-side', 'top');
	else
		pancake.setAttribute('data-current-side', 'bot');

	// Trigger animation

	skilletCooking = setInterval(pancakeCook, 1000);
}

function panClear() {
	clearInterval(skilletCooking);

	if ((pancake.cookedBot > pancakeGoldLower) 
			&& (pancakeGoldUpper > pancake.cookedBot)
		&& ((pancake.cookedTop > pancakeGoldLower)
			&& (pancakeGoldUpper > pancake.cookedTop))
		) {
			pancakeTally += 1;
			tally.innerText = pancakeTally;
		}
	
	// Reset pancake object
	pancake = {
		currentSide: '',
		cookedBot: 0,
		cookedTop: 0
	}
}

function pancakeFlip() {
	if (toolCheck('spatula', 1)) {
		if (pancake.currentSide == 'bot')
			panFlip();
		else if (pancake.currentSide == 'top')
			panClear();
	}
}

function pancakeCook() {
	let currentTime;

	if (pancake.currentSide == 'bot')
		currentTime = pancake.cookedBot;
	else if (pancake.currentSide == 'top')
		currentTime = pancake.cookedTop;

	// Exponentiate the rate of cooking if the user isn't interacting with stove
	// (Remember: All time is given in milliseconds)
	if (stoveClicked)
		currentTime += 100;
	else
		if (currentTime <= 100)
			currentTime += 5;
		else
			currentTime += currentTime;
	currentTime = clamp(currentTime, 0, pancakeMaxTime);

	if (pancake.currentSide == 'bot')
		pancake.cookedBot = currentTime;
	else if (pancake.currentSide == 'top')
		pancake.cookedTop = currentTime;
}
