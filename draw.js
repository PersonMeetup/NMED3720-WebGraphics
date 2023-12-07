class Shape {
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
    }

    display() {
        fill(this.color);
        ellipse(this.x, this.y, this.r);
    }

    click(px, py) {
        if (dist(px, py, this.x, this.y) < this.r) {
            this.event();
            // return true;
        }
        // return false;
    }

    event() {
        console.log("Hello, World!");
    }
}

class Tool {
    constructor(x, y, shrink, tool) {
        this.x = x;
        this.y = y;
        this.shrink = shrink;
        this.tool = tool;
        this.img = {
            rest: loadImage(`/img/${tool}.png`),
            use: loadImage(`/img/${tool}-use.png`)
        }
    }

    fixRatio() {
        this.width = this.img.use.width / this.shrink;
        this.height = this.img.use.height / this.shrink;
    }

    click(px, py) {
        if (((px > this.x) && (px < (this.x + this.width)))
            && ((py > this.y) && (py < (this.y + this.height)))) {
            this.event();
            // return true;
        }
        // return false;
    }

    display() {
        if (userState[this.tool] >= 1) 
            image(this.img.use, this.x, this.y, this.width, this.height);
        else
            image(this.img.rest, this.x, this.y, this.width, this.height);
    }

    event() {
        if (equip(this.tool)) {
            if (userState[this.tool] == 1){
                equipImage(this.tool);
            }
            else if (userState[this.tool] == 0)
                equipImage('');
        }
    }
}

class Batter extends Shape {
    event() {
        if (equip('ladle', 2)) {
            if (userState.ladle == 2)
                equipImage('batter');
            else if (userState.ladle == 1)
                equipImage('ladle');
        }
    }
}

class Skillet extends Shape {
    event() {
        panFill();
    }
}

class Stove extends Shape {
    event() {
        stoveClick();
    }
}

class Pancake extends Shape {
    event() {
        pancakeFlip();
    }
}

const width = 720;
const height = width * 4 / 3;

let equipped, actionShapes;

function equipImage(tool) {
    if (document.getElementById('tool')) 
        equipped.remove()

    if (!tool)
        document.body.classList.remove('nocursor');
    else {
        switch (tool) {
            case 'spatula':
                equipped = createImg('/img/spatula.png', 'Carrying Spatula');
                break;
            case 'ladle':
                equipped = createImg('/img/ladle.png', 'Carrying Ladle');
                break;
            case 'batter':
                equipped = createImg('/img/batter.png', 'Carrying Ladle Filled with Batter');
                break;
        }
        equipped.id('tool');
        equipped.position(mouseX - 30, mouseY + 80);

        // document.body.classList.add('nocursor');
    }
}

function setup() {
    let render = createCanvas(height, width);
    render.parent('#game');
    render.id('render')

    ellipseMode(RADIUS);

    /**
     * ORDER OF RENDER PRIORITY:
     * 
     * Spatula > Ladle > Batter > Skillet > Stove
     */
    actionShapes = [
        new Stove(675, 500, 175, '#2b2b2b'),
        new Stove(675, 125, 110, '#2b2b2b'),
        new Skillet(675, 500, 160, '#b0b4b5'),
        new Batter(250, 250, 100, '#e2bea0'),
        new Tool(85, 425, 4, 'spatula'),
        new Tool(50, 25, 4, 'ladle'),
    ];

    background(135);
}

function mousePressed() {
    for (const shape of actionShapes) {
        shape.click(mouseX, mouseY)
    }
}

function mouseMoved() {
    if (document.getElementById('tool') && equipped)
        equipped.position(mouseX - 30, mouseY + 80);
}

function draw() {
    background(135);

    // Counter Top
    fill('#9d5951');
    rect(0, 0, 400, height);

    // Stove Body
    fill('#e8e6e1');
    rect(430, 0, width, height);

    for (const shape of actionShapes) {
        if (shape instanceof Tool)
            shape.fixRatio();

        shape.display();
    }
}

