// Siia lisada töötav mängu loogika.

// proovib hoida kindlat keelt läbi koodi
// also lugesin, et js kasutatakse camelCase, seega proovime seda kasutada
class incrementalGame {
    constructor() {
        this.population = 9905.0; // Algne populatsioon
        this.growthRate =  0.01; // Kasvu määr (1%)
        this.popLimit = 10000; // Maksimaale populatsioon
    
        this.wood = 0;
        this.woodRate = 1;

        this.knowledge = 0;
        this.knowledgeRate = 0.1;

        this.food = 1000;
        this.foodRate = 0.5;

        this.Upgrades = {
        // Upgrade objektid, mis sisaldavad iga upgrade taset, maksumust ja tootmisparandusi
            // Tööstuse upgrade'id
            "hoeUpgrade": {
                "maxLevel": 4,
                "initialCost": 20,
                "costPerLevel": 1.4,
                "initialUpgradePerk": 4,
                "initialUpgradePerLevel": 1.2
            },
            "pickaxeUpgrade": {
                "maxLevel": 4,
                "initialCost": 20,
                "costPerLevel": 1.4,
                "initialUpgradeState": 4,
                "initialUpgradePerLevel": 1.2
            },
            "axeUpgrade": {
                "maxLevel": 4,
                "initialCost": 20,
                "costPerLevel": 1.4,
                "initialUpgradeState": 4,
                "initialUpgradePerLevel": 1.2
            }
            // Põllumajanduse upgrade'id

            // Teaduse upgrade'id

        };
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
        this.wood += this.woodRate;
    }

    addToWoodRate(toWoodProduction) {
        // lisab puidu juurdekasvule argumendi väärtuse
        this.woodRate += toWoodProduction;
    }

    addToKnowledge() {
        // Arvutab uue knowledge koguse
        this.knowledge += this.knowledgeRate;
    }

    addToKnowledgeRate(toKnowledgeRate) {
        // lisab knowledge juurdekasvule argumendi vaartuse
        this.knowledgeRate += toKnowledgeRate;
    }

    addToFood() {
        // Arvutab uue toidu koguse
        this.food += this.foodRate;
    }

    addToFoodRate(toFoodRate) {
        // lisab toidu juurdekasvule argumendi vaartuse
        this.foodRate += toFoodRate;
    }

    upgradeHoe() {
        // Kontrollib, kas mängijal on piisavalt ressursse, et teha upgrade
        if (this.wood >= this.Upgrades.hoeUpgrade.initialCost) {
            // Vähendab puidu kogust vastavalt upgrade maksumusele
            this.wood -= this.Upgrades.hoeUpgrade.initialCost;
            // Suurendab puidu tootmise määra vastavalt upgrade perkidele
            this.addToFoodRate(this.Upgrades.hoeUpgrade.initialUpgradePerk);
            // Suurendab upgrade taset
            this.Upgrades.hoeUpgrade.initialUpgradePerk *= this.Upgrades.hoeUpgrade.initialUpgradePerLevel;
        }
    }
}