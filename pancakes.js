// Sourced from https://webtips.dev/webtips/javascript/how-to-clamp-numbers-in-javascript
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const spatula = document.getElementById('spatula');
const ladel = document.getElementById('ladel');

const batter = document.getElementById("batter");
const skillet = document.getElementById("skillet");
const stove = document.getElementById('stove');
const tally = document.getElementById('tally');

// Timings for pancake cooking (ms)
const pancakeMaxTime = 3000;
const pancakeGoldUpper = 2000;
const pancakeGoldLower = 1200;

let pancake, skilletCooking, stoveWaiting;
let stoveClicked = false;
let pancakeTally = 0;

let userState = {
	spatula: 0,
	ladel: 0
};

async function stoveClick() {
	if (toolCheck('spatula', 1)) {
		clearTimeout(stoveWaiting);
		stoveClicked = true;
		stoveWaiting = setTimeout(function() {
			stoveClicked = false;
		}, 4000);
	}
}

function toolCheck(key, target) {
	const value = userState[key];
	if (value == target)
		return true;
	return false;
}

function equip(tool, target = 1) {
	for (const key in userState) {
		if (toolCheck(key, target)) {
			if (key == tool) {
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

function panFill() {
	if (skillet.firstElementChild)
		return false;
	if (toolCheck("ladel", 2)) {
		equip("ladel", 2);
		ladel.innerText = "Ladel Equipped";

		// Create pancake object (Change out for display scripts?)
		pancake = document.createElement('div');
		pancake.id = "pancake";
		pancake.setAttribute('data-current-side', 'bot');
		pancake.setAttribute('data-cooked-top', '0');
		pancake.setAttribute('data-cooked-bot', '0');

		skillet.append(pancake);
		pancake.addEventListener("click", pancakeFlip);

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

	const cookedBot = parseInt(pancake.getAttribute('data-cooked-bot'));
	const cookedTop = parseInt(pancake.getAttribute('data-cooked-top'));

	if ((cookedBot > pancakeGoldLower) && (pancakeGoldUpper > cookedBot)
		&& ((cookedTop > pancakeGoldLower) && (pancakeGoldUpper > cookedTop))) {
			pancakeTally += 1;
			tally.innerText = pancakeTally;
		}
	
	pancake.remove();
}

function pancakeFlip() {
	if (toolCheck('spatula', 1)) {
		const currentSide = pancake.getAttribute('data-current-side');

		if (currentSide == 'bot')
			panFlip();
		else
			panClear();
	}
}

function pancakeCook() {
	const currentSide = pancake.getAttribute('data-current-side');
	let currentTime;

	if (currentSide == 'bot')
		currentTime = parseInt(pancake.getAttribute('data-cooked-bot'));
	else
		currentTime = parseInt(pancake.getAttribute('data-cooked-top'));

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

	if (currentSide == 'bot')
		pancake.setAttribute('data-cooked-bot', currentTime);
	else
		pancake.setAttribute('data-cooked-top', currentTime);
}

spatula.addEventListener('click', function() {
	equip('spatula');

	if (userState.spatula == 1)
		spatula.innerText = "Spatula Equipped";
	else if (userState.spatula == 0)
		spatula.innerText = 'Spatula Unequipped'
});
ladel.addEventListener('click', function() {
	equip('ladel');

	if (userState.ladel == 1)
		ladel.innerText = "Ladel Equipped";
	else if (userState.ladel == 0)
		ladel.innerText = 'Ladel Unequipped'
});
batter.addEventListener('click', function() {
	equip('ladel', 2);

	if (userState.ladel == 2)
		ladel.innerText = "Ladel Filled with Batter";
	else if (userState.ladel == 1)
		ladel.innerText = 'Ladel Equipped'
});

skillet.addEventListener("click", panFill);
stove.addEventListener('click', stoveClick);