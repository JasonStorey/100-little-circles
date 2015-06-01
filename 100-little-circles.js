function OneHundredLittleCircles() {
    this.movement = MOVEMENTS.weave;
    this.movers = [];
}

OneHundredLittleCircles.prototype = {
    init: function() {
        var self = this;
        var NUMBER_OF_MOVERS = 100;

        Sketch.create({
            setup: function () {
                for (var j = 0; j < NUMBER_OF_MOVERS; j++) {
                    self.movers.push(new Mover(random(this.width), random(this.height), self.movement));
                }
            },
            update: function () {
                self.movers.forEach(function (mover) {
                    mover.update(this);
                }.bind(this));
            },
            draw: function () {
                self.movers.forEach(function (mover) {
                    mover.draw(this);
                }.bind(this));
            }
        });
    },
    reset: function() {
        this.movers.forEach(function (mover) {
            mover.reset();
        });
    },
    update: function() {
        this.movers.forEach(function (mover) {
            mover.reset();
            mover.setMovement(this.movement)
        }.bind(this));
    }
};

var MOVEMENTS = {
    weave: function(mover) {
        mover.theta += random(-0.3, 0.3);
        mover.vx += sin(mover.theta);
        mover.vy += cos(mover.theta);
        mover.vx *= 1 - mover.drag;
        mover.vy *= 1 - mover.drag;
    },
    grow: function(mover) {
        MOVEMENTS.weave(mover);
        mover.radius *= random(1, 1.03);
    },
    flutter: function(mover) {
        mover.drag = 0.1;
        mover.radius = random(10);
        mover.theta += random(0.15);
        mover.vx += sin(mover.theta);
        mover.vy += (cos(mover.theta) / 3) - random(0.3);
        mover.vx *= 1 - mover.drag;
        mover.vy *= 1 - mover.drag;
    }
};

function Mover(x, y, movement) {
    this.x = x;
    this.y = y;
    this.movement = movement;
    this.reset();
}

Mover.prototype = {
    reset: function() {
        this.radius = 3;
        this.theta = random(TWO_PI);
        this.drag = 0.2;
        this.vx = 0;
        this.vy = 0;
    },
    setMovement: function(movement) {
        this.reset();
        this.movement = movement;
    },
    update: function(ctx) {
        this.x += this.vx;
        this.y += this.vy;

        if(this.x + this.radius > ctx.width + (this.radius * 2)) {
            this.x = 0 - this.radius;
        } else if(this.x - this.radius < 0 - (this.radius * 2)) {
            this.x = ctx.width + this.radius;
        }

        if(this.y + this.radius > ctx.height + (this.radius * 2)) {
            this.y = 0 - this.radius;
        } else if(this.y - this.radius < 0 - (this.radius * 2)) {
            this.y = ctx.height + this.radius;
        }

        this.movement(this);
    },
    draw: function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
        ctx.fillStyle = '#000';
        ctx.fill();
    }
};

(function init(OneHundredLittleCircles, dat) {
    var config = {
        movement: 'weave'
    };

    var oneHundredLittleCircles = new OneHundredLittleCircles();
    oneHundredLittleCircles.init();

    var gui = new dat.GUI();
    var movementController = gui.add(config, 'movement', ['weave', 'flutter', 'grow']);

    movementController.onChange(function (value) {
        oneHundredLittleCircles.movement = MOVEMENTS[value];
        oneHundredLittleCircles.update();
    });
}(OneHundredLittleCircles, dat));
