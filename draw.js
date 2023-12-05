function Spatula(x, y) {
    this.x = x;
    this.y = y;
}

function Ladel(x, y) {
    this.x = x;
    this.y = y;
}

function Batter(x, y) {
    this.x = x;
    this.y = y;

    this.display = function() {
        fill('#e2bea0');
        ellipse(this.x, this.y, 80, 80);
    }
}

function Skillet(x, y) {
    this.x = x;
    this.y = y;
}

function Stove(x, y) {
    this.x = x;
    this.y = y;
}

let test = Batter(50, 50);

function setup() {
    let render = createCanvas(960, 720);
    render.parent('#game');
    render.id('render')

    background(135);

    let gameBatter = createDiv();
    gameBatter.parent('#game');
    gameBatter.position(50, 50);
    gameBatter.id('batter');
    gameBatter.mouseClicked(batterClick);
}

function draw() {
    test.display();
}

