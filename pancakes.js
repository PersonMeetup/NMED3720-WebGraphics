const skillet = document.getElementById("skillet");
let skilletCooking;

function skilletLid() {
	console.log(skillet);
	switch (skillet.innerText) {
		case "OPEN":
			skillet.children.forEach(pancake => {
				
			});
			skilletCooking = skillet.children;
			skillet.innerText = "CLOSED";
			break;
		case "CLOSED":
			skillet.innerText = "OPEN";
			break;
	}
}

skillet.addEventListener("click", skilletLid);