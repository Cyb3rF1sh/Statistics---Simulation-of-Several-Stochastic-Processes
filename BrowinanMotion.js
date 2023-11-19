"use strict";

class BrownianMotion {

    constructor(M, N, drift, volatility, sF) {
        this.M = M; 
        this.N = N;
        this.scalingFunction = sF;  
        this.drift = drift;  
        this.volatility = volatility;  
        this.simValues = Array(this.M).fill().map(() => Array(this.N).fill(0));
        this.coordinates = [];
        this.trajectoriesColor = Array(this.M).fill();
        this.maxValue = 0;
        this.minValue = 0;

        this.simulate();
    }

    simulate() {
        for (let k = 0; k < this.M; k++) {
            let points = [new Point(0, 0)];  // Inizia da 0
            let currentValue = 0;

            for (let i = 1; i < this.N; i++) {
                let randomShock = this.volatility * this.normalRandom();
                currentValue += this.drift + randomShock;  // dt = 1 quindi non è moltiplicato per dt
                
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
