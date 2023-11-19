"use strict";

class GeometricBrownianMotion {

    constructor(M, N, drift, volatility, sF) {
        this.M = M;  // Numero di traiettorie
        this.N = N;  // Numero di step temporali
        this.scalingFunction = sF;  // Funzione di scala per la visualizzazione
        this.drift = drift;  // Drift (mu)
        this.volatility = volatility;  // Volatilità (sigma)
        this.simValues = Array(this.M).fill().map(() => Array(this.N).fill(0));
        this.coordinates = [];
        this.trajectoriesColor = Array(this.M).fill();
        this.maxValue = Number.MIN_VALUE; // Inizializza a un valore molto piccolo
        this.minValue = Number.MAX_VALUE; // Inizializza a un valore molto grande

        this.simulate();
    }

    simulate() {
        for (let k = 0; k < this.M; k++) {
            let points = [new Point(0, 1)];  // Inizia da 1
            let currentValue = 1;  // Il prezzo iniziale S0 è 1

            for (let i = 1; i < this.N; i++) {
                let dt = 1;  // Intervallo temporale per step
                let randomShock = Math.exp((this.drift - (Math.pow(this.volatility, 2) / 2)) * dt + this.volatility * Math.sqrt(dt) * this.normalRandom());
                currentValue *= randomShock;

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
