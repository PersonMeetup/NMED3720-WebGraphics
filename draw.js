class Shape {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    display() {
        fill('#ff604b');
        rect(this.x, this.y, this.width, this.height);
    }

    click(px, py) {
        if (((px > this.x) && (px < (this.x + this.width)))
            && ((py > this.y) && (py < (this.y + this.height)))) {
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
    display() {
        fill('#e2bea0');
        ellipse(this.x, this.y, this.width, this.height);
    }
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
    display() {
        fill('#b0b4b5');
        rect(this.x, this.y, this.width, this.height);
    }
    event() {
        panFill();
    }
}

class Stove extends Shape {
    display() {
        fill('#2b2b2b');
        rect(this.x, this.y, this.width, this.height);
    }
    event() {
        stoveClick();
    }
}

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
    let render = createCanvas(960, 720);
    render.parent('#game');
    render.id('render')

    /**
     * ORDER OF RENDER PRIORITY:
     * 
     * Spatula > Ladle > Batter > Skillet > Stove
     */
    actionShapes = [
        new Stove(125, 40, 320, 100),
        new Skillet(200, 50, 160, 80),
        new Batter(50, 175, 80, 100),
        new Tool(125, 325, 4, 'spatula'),
        new Tool(350, 325, 4, 'ladle'),
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

    for (const shape of actionShapes) {
        if (shape instanceof Tool)
            shape.fixRatio();

        shape.display();
    }
}

