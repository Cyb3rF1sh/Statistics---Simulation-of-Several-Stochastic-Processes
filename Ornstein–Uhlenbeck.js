"use strict";

class OrnsteinUhlenbeckProcess {

    constructor(M, N, mu, theta, sigma, sF) {
        this.M = M;  
        this.N = N;  
        this.mu = mu;
        this.theta = theta;  
        this.sigma = sigma; 
        this.scalingFunction = sF;  
        this.coordinates = [];
        this.trajectoriesColor = Array(this.M).fill();
        this.maxValue = Number.MIN_VALUE;
        this.minValue = Number.MAX_VALUE;

        this.simulate();
    }

    simulate() {
        for (let k = 0; k < this.M; k++) {
            let points = [new Point(0, this.mu)]; 
            let currentValue = this.mu;

            for (let i = 1; i < this.N; i++) {
                let dt = 1;  
                let randomShock = this.sigma * Math.sqrt(dt) * this.normalRandom();
                currentValue += this.theta * (this.mu - currentValue) * dt + randomShock;

                let scaledValue = this.scalingFunction(currentValue, i);
                points.push(new Point(i, scaledValue));

                this.updateMinMax(scaledValue);
            }

            this.coordinates.push(points);
            this.trajectoriesColor[k] = this.getRandomColor();
        }
    }

    updateMinMax(value) {
        if (value > this.maxValue) {
            this.maxValue = value;
        } else if (value < this.minValue) {
            this.minValue = value;
        }
    }

    getRandomColor() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }

    normalRandom() {
        let u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }
}
