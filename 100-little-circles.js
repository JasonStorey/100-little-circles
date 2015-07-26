function OneHundredLittleCircles() {
    this.movement = 'fizz';
    this._movement = MOVEMENTS[this.movement];
    this.movers = [];
    this.fill = '#000';
    this.background = '#fff';
    this.velocity = 1;
}

OneHundredLittleCircles.prototype = {
    init: function() {
        var NUMBER_OF_MOVERS = 100;
        var self = this;

        Sketch.create({
            setup: function () {
                for (var j = 0; j < NUMBER_OF_MOVERS; j++) {
                    self.movers.push(new Mover(random(this.width), random(this.height), this));
                }
            },
            update: function () {
                self._movement = MOVEMENTS[self.movement];
                self.movers.forEach(function (mover) {
                    mover.update(self._movement, self.fill, self.velocity);
                });
            },
            draw: function () {
                this.canvas.style.backgroundColor = self.background;
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
    shrink: {
        setup: function(mover) {
            mover.radius = random(40, 500);
            mover.theta = random(TWO_PI);
        },
        update: function(mover) {
            MOVEMENTS.weave.update(mover);
            mover.radius /= random(1, 1.03);
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
            mover.drag = 0.4;
            mover.theta = random(TWO_PI);
            mover.radius = random(1, 70);
        },
        update: function(mover) {
            mover.theta += random(-0.3, 0.3);
            mover.vx += sin(mover.theta);
            mover.vy += cos(mover.theta) - 3 - (mover.radius * 0.08);
            mover.vx *= 1 - mover.drag;
            mover.vy *= 1 - mover.drag;
        }
    },
    rave: {
        setup: function(mover) {
           mover.radius = random(10, 60); 
        },
        update: function(mover) {
            mover.theta += 0.3;
            mover.vx += sin(mover.theta);
            mover.vy += cos(mover.theta);
            mover.vx *= 1 - mover.drag;
            mover.vy *= 1 - mover.drag;
            mover.radius = random(1,30);
        }
    },
    wobble: {
        setup: function(mover) {
           mover.radius = random(10, 60); 
        },
        update: function(mover) {
            mover.theta += 1;
            mover.vx += sin(mover.theta);
            mover.vy += cos(mover.theta);
            mover.vx *= 1 - mover.drag;
            mover.vy *= 1 - mover.drag;
        }
    },
    dizzy: {
        setup: function(mover) {
           mover.radius = random(5, 10); 
        },
        update: function(mover) {
            mover.theta += 0.11;
            mover.vx += sin(mover.theta);
            mover.vy += cos(mover.theta);
            mover.vx *= 1 - mover.drag;
            mover.vy *= 1 - mover.drag;
        }
    },
    static: {
        setup: function(mover) {
            mover.radius = random(1, 3);
            mover.theta = random(1, 2);
        },
        update: function(mover) {
            mover.theta += random(0.1);
            if(sin(mover.theta) > 0) {
                mover.vy += 50;
            } else {
                mover.vy -= 30;
            }
            mover.vx -= random(1, 5);
            mover.vx *= 1 - mover.drag;
            mover.vy *= 1 - mover.drag;
        }
    },
    rowing: {
        setup: function(mover) {
            mover.radius = random(5, 40);
        },
        update: function(mover) {
            mover.theta += 0.03;
            if(sin(mover.theta) > 0) {
                mover.vx += mover.radius * 0.02;
                mover.vy += mover.radius * 0.05;
            } else {
                mover.vx -= mover.radius * 0.2;
                mover.vy -= mover.radius * 0.03;
            }

            mover.vx *= 1 - mover.drag;
            mover.vy *= 1 - mover.drag;
        }
    },
    twoOr3D: {
        setup: function(mover) {
            mover.radius = random(10, 100);
        },
        update: function(mover) {
            mover.theta += 0.02;
            if(sin(mover.theta) > 0) {
                mover.vx += mover.radius * 0.05;
                mover.vy -= mover.radius * 0.02;
            } else {
                mover.vx += 1;
                mover.vy -= 1;
            }

            mover.vx *= 1 - mover.drag;
            mover.vy *= 1 - mover.drag;
        }
    },
    swimmers: {
        setup: function(mover) {
            mover.param1 = random(10, 50);
            mover.param2 = random(TWO_PI);
            mover.theta = random(TWO_PI);
        },
        update: function(mover) {
            mover.param2 += 1 / mover.param1;
            mover.radius = 5 + Math.abs(sin(mover.param2 + mover.param1)) * mover.param1;
            mover.theta += 0.1;
            mover.vx += (mover.radius / 40);
            mover.vy += sin(mover.theta);
            mover.vx *= 1 - mover.drag;
            mover.vy *= 1 - mover.drag;
        }
    }
};

function Mover(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.fillStyle = '#000';
    this.reset();
}

Mover.prototype = {
    reset: function() {
        this.radius = 1;
        this.theta = 0;
        this.drag = 0.2;
        this.vx = 0;
        this.vy = 0;
        this.param1 = 0;
        this.param2 = 0;
    },
    update: function(movement, fillstyle, velocity) {
        this.fillStyle = fillstyle;

        if(this.movement !== movement) {
            this.reset();
            this.movement = movement;
            this.movement.setup(this);
        }

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

        this.movement.update(this);

        this.x += this.vx * velocity;
        this.y += this.vy * velocity;
    },
    draw: function() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.fill();
    }
};

(function init(OneHundredLittleCircles, dat) {
    var oneHundredLittleCircles = new OneHundredLittleCircles();
    oneHundredLittleCircles.init();

    var gui = new dat.GUI();
    gui.add(oneHundredLittleCircles, 'movement', ['fizz', 'flutter', 'grow', 'waves', 'rowing', 'weave', 'dizzy', 'shrink', 'static', 'rave', 'twoOr3D', 'swimmers', 'wobble']);
    gui.add(oneHundredLittleCircles, 'velocity', -5, 5);
    gui.addColor(oneHundredLittleCircles, 'fill');
    gui.addColor(oneHundredLittleCircles, 'background');

}(OneHundredLittleCircles, dat));
