// Siia lisada töötav mängu loogika.

// proovib hoida kindlat keelt läbi koodi
// also lugesin, et js kasutatakse camelCase, seega proovime seda kasutada
class incrementalGame {
    constructor() {
        this.gameRunning = 0;
        
        this.population = 9905.0; // Algne populatsioon
        this.growthRate =  0.01; // Kasvu määr (1%)
        this.popLimit = 10000; // Maksimaale populatsioon
    
        this.wood = 0;
        this.woodRate = 1;

        this.knowledge = 0;
        this.knowledgeRate = 0.1;
        
        this.Upgrades = {
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
            }
        };
    }

    gameTick() {
        // Arvutab uue populatsiooni ja kontrollib, kas populatsioon on ületanud limiidi
        this.population = min(this.population * (1 + this.growthRate), this.popLimit);
        // Arvutab teisi stat
        this.wood += this.woodRate;
        this.knowledge += this.knowledgeRate;
        // Peaks lisama veel stat e

        }
    updateInfo() {

    }

    upgradesFunction(upgradeName) {
        let upgrade = this.Upgrades[upgradeName];
        
    }
}
game = incrementalGame;
async function startStopGame() {
    document.getElementById('pop')
    if (!game.gameRunning){var gameTicker = setInterval(game.gameTick, 1000);}
    else {clearInterval(gameTicker);}
}