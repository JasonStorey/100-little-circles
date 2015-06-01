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
                    self.movers.push(new Mover(random(this.width), random(this.height), this, self.movement));
                }
            },
            update: function () {
                self.movers.forEach(function (mover) {
                    mover.update();
                });
            },
            draw: function () {
                self.movers.forEach(function (mover) {
                    mover.draw();
                });
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
    weave: {
        setup: function(mover) {
            mover.radius = 5;
            mover.theta = random(TWO_PI);
        },
        update: function(mover) {
            mover.theta += random(-0.3, 0.3);
            mover.vx += sin(mover.theta);
            mover.vy += cos(mover.theta);
            mover.vx *= 1 - mover.drag;
            mover.vy *= 1 - mover.drag;
        }
    },
    grow: {
        setup: function(mover) {
            mover.radius = random(1, 5);
            mover.theta = random(TWO_PI);
        },
        update: function(mover) {
            MOVEMENTS.weave.update(mover);
            mover.radius *= random(1, 1.03);
        }
    },
    flutter: {
        setup: function(mover) {
            mover.theta = random(TWO_PI);
        },
        update: function(mover) {
            mover.drag = 0.1;
            mover.radius = random(10);
            mover.theta += random(0.15);
            mover.vx += sin(mover.theta);
            mover.vy += (cos(mover.theta) / 3) - random(0.3);
            mover.vx *= 1 - mover.drag;
            mover.vy *= 1 - mover.drag;
        }
    },
    waves: {
        setup: function(mover) {
            mover.theta = random(TWO_PI);
            mover.radius = 1 + (mover.theta * 2);
            mover.vx = mover.radius * -0.2;
        },
        update: function(mover) {
            mover.theta += 0.05;
            mover.vy = cos(mover.theta) * (mover.radius / 5) + 0.4;
        }
    },
    fizz: {
        setup: function(mover) {
            mover.theta = random(TWO_PI);
            mover.radius = random(1, 70);
        },
        update: function(mover) {
            mover.radius *= 1.0005;

            if(mover.radius > 70) {
                mover.radius *= 1.02;
                mover.vy += -5;
            }

            mover.theta += random(-0.3, 0.3);
            mover.vx += sin(mover.theta);
            mover.vy += cos(mover.theta) - 2;
            mover.vx *= 1 - mover.drag;
            mover.vy *= 1 - mover.drag;

            if(mover.y + mover.vy - mover.radius < 0 - (mover.radius * 2)) {
                mover.radius = random(1, 70);
                mover.vy = -1;
                mover.y = mover.ctx.height + mover.radius;
            }
        }
    }
};

function Mover(x, y, ctx, movement) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.setMovement(movement);
}

Mover.prototype = {
    reset: function() {
        this.radius = 1;
        this.theta = 0;
        this.drag = 0.2;
        this.vx = 0;
        this.vy = 0;
    },
    setMovement: function(movement) {
        this.reset();
        this.movement = movement;
        this.movement.setup(this);
    },
    update: function() {
        this.movement.update(this);

        this.x += this.vx;
        this.y += this.vy;

        if(this.x + this.radius > this.ctx.width + (this.radius * 2)) {
            this.x = 0 - this.radius;
        } else if(this.x - this.radius < 0 - (this.radius * 2)) {
            this.x = this.ctx.width + this.radius;
        }

        if(this.y + this.radius > this.ctx.height + (this.radius * 2)) {
            this.y = 0 - this.radius;
        } else if(this.y - this.radius < 0 - (this.radius * 2)) {
            this.y = this.ctx.height + this.radius;
        }
    },
    draw: function() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
        this.ctx.fillStyle = '#000';
        this.ctx.fill();
    }
};

(function init(OneHundredLittleCircles, dat) {
    var config = {
        movement: 'weave'
    };

    var oneHundredLittleCircles = new OneHundredLittleCircles();
    oneHundredLittleCircles.init();

    var gui = new dat.GUI();
    var movementController = gui.add(config, 'movement', ['weave', 'flutter', 'grow', 'waves', 'fizz']);

    movementController.onChange(function (value) {
        oneHundredLittleCircles.movement = MOVEMENTS[value];
        oneHundredLittleCircles.update();
    });
}(OneHundredLittleCircles, dat));
