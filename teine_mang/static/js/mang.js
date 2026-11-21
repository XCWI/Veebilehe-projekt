// Siia lisada töötav mängu loogika.

// proovib hoida kindlat keelt läbi koodi
// also lugesin, et js kasutatakse camelCase, seega proovime seda kasutada
class incrementalGame {
    constructor() {
        this.gameRunning = 1;
        
        this.population = 9905.0; // Algne populatsioon
        this.growthRate =  0.1; // Kasvu määr (1%)
        this.populationCap = 1000000; // Maksimaale populatsioon
    
        this.wood = 2;
        this.woodRate = 1;

        this.knowledge = 0;
        this.knowledgeRate = 1;
        
        this.food = 0;
        this.foodRate = 1;

        this.Upgrades = {
            // peaks täpsustama mis ressursse on vaja, et teha upgrade
            "hoeUpgrade": {
                "level": 0,
                "maxLevel": 4,
                "initialCost": 20,
                "costPerLevel": 1.4,
                "initialUpgradePerk": 4,
                "initialUpgradePerLevel": 1.2,
                "upgradeCostCategories": {"wood": 1.2, "food": 0.8}
            },
            "pickaxeUpgrade": {
                "level": 0,
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
        this.population = Math.min(this.population * (1 + this.growthRate), this.populationCap);
        // Arvutab teisi stat
        this.wood += this.woodRate;
        this.knowledge += this.knowledgeRate;
        this.food += this.foodRate;
        // Peaks lisama veel stat e
        
        }

    upgradeFunction(upgradeName) {
        const upgrade = this.Upgrades[upgradeName];
        // Kontrollib, kas upgrade on olemas  
        if (!upgrade) {
            return false;
        }
        // Kontrollib, kas upgrade on lubatud (kas upgrade'i tase on väiksem kui maksimaalne tase)
        if (upgrade.level < upgrade.maxLevel) {
                for (let resource of upgrade.upgradeCostCategories) {
                const cost = Math.ceil(
                    upgrade.initialCost *
                    (upgrade.costPerLevel ** (upgrade.level+1)) * upgrade.upgradeCostCategories.resource
                    );
                    // Kontrollib, kas mängijal on piisavalt ressursse upgrade'i ostmiseks,
                    // kui ressursid on olemas, siis tagastab true, muidu false
                    if (cost < this[resource]) {
                        return false;
                    }
            }
                return true;
        }         
    }
}
const game = new incrementalGame;
function updateInfo() {
    game.gameTick();
    const statsList = document.getElementsByClassName('stat-value');
    for(const i of statsList){
        document.getElementById(i.id).textContent = Math.round(game[i.id]);
    }
}
let gameTicker = null;
async function startStopGame() {
    if (gameTicker == null){gameTicker = setInterval(updateInfo, 1000);}
    else {clearInterval(gameTicker);
        gameTicker=null;}
}