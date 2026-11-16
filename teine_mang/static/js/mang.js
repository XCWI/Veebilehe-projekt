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
            // peaks täpsustama mis ressursse on vaja, et teha upgrade
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

    upgradeFunction(upgradeName) {
        const upgrade = this.Upgrades[upgradeName];
        // Kontrollib, kas upgrade on olemas  
        if (!upgrade) {
            return false;
        }
        // Kontrollib, kas upgrade on lubatud (kas upgrade'i tase on väiksem kui maksimaalne tase)
        if (!upgrade || upgrade.level < upgrade.maxLevel) {
                for (let resource in upgrade.initialCost) {
                const cost = Math.ceil(
                    upgrade.initialCost[resource] *
                    upgrade.costPerLevel ** upgrade.level
                    );
                    // Kontrollib, kas mängijal on piisavalt ressursse upgrade'i ostmiseks,
                    // kui ressursid on olemas, siis tagastab true, muidu false
                    if ((this.Resources[resource] ?? 0) < cost) {
                        return false;
                    }
            }
                return true;
        }         
    }
}
game = incrementalGame;
async function startStopGame() {
    document.getElementById('pop')
    if (!game.gameRunning){var gameTicker = setInterval(game.gameTick, 1000);}
    else {clearInterval(gameTicker);}
}