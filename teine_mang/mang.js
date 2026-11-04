// Siia lisada töötav mängu loogika.

// proovib hoida kindlat keelt läbi koodi
// also lugesin, et js kasutatakse camelCase, seega proovime seda kasutada
class incrementalGame {
    constructor() {
        this.population = 9905.0; // Algne populatsioon
        this.growthRate =  0.01; // Kasvu määr (1%)
        this.popLimit = 10000 // Maksimaale populatsioon
    
        this.wood = 0;
        this.woodRate = 1;

        this.knowledge = 0;
        this.knowledgeRate = 0.1;
    }


    addToPopulation() {
        // Arvutab uue populatsiooni
        this.population = this.population * (1 + this.growthRate);
        // Kontrollib, kas populatsioon on ületanud limiidi
        if (this.population > this.popLimit) {
            this.population = this.popLimit;
        }
    }

    addToWood() {
        // Arvutab uue puidu koguse
        this.wood += this.woodRate
    }

    addToWoodRate(toWoodProduction) {
        // lisab puidu juurdekasvule argumendi väärtuse
        this.woodProduction += toWoodProduction;
    }

    addToKnowledge() {
        // Arvutab uue knowledge koguse
        this.knowledge += this.knowledgeRate;
    }

    addToKnowledgeRate(toKnowledgeRate) {
        // lisab knowledge juurdekasvule argumendi vaartuse
        this.knowledgeRate += toKnowledgeRate;
    }
}
