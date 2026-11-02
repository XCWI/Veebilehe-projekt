// Siia lisada töötav mängu loogika.

class incremental_mäng {
    constructor() {
        this.population = 9905.0; // Algne populatsioon
        this.growthRate =  0.01; // Kasvu määr (1%)
        this.pop_limit = 10000 // Maksimaale populatsioon
    }

    populatsiooni_kasv() {
        // Arvutab uue populatsiooni
        this.population = this.population * (1 + this.growthRate);
        // Kontrollib, kas populatsioon on ületanud limiidi
        if (this.population > this.pop_limit) {
            this.population = this.pop_limit;
        }
    }
}
