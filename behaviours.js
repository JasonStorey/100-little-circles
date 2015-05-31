var NUMBER_OF_MOVERS = 100;
var movers = [];

function Mover(x, y) {
    this.radius = 5;
    this.theta = random(TWO_PI);
    this.drag = 0.2;

    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;
}

Mover.prototype = {
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

        this.theta += random(-0.5, 0.5);

        this.vx += sin(this.theta);
        this.vy += cos(this.theta);

        this.vx *= 1 - this.drag;
        this.vy *= 1 - this.drag;
    },
    draw: function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
        ctx.fillStyle = '#000';
        ctx.fill();
    }
};

Sketch.create({
    setup: function() {
        for(var j = 0; j < NUMBER_OF_MOVERS; j++) {
            movers.push(new Mover(random(this.width), random(this.height)));
        }
    },
    update: function() {
        movers.forEach(function(mover) {
            mover.update(this);
        }.bind(this));
    },
    draw: function() {
        movers.forEach(function(mover) {
            mover.draw(this);
        }.bind(this));
    }
});
