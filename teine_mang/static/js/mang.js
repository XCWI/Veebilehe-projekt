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

        this.stone = 0;
        this.stoneRate = 1;


        this.Upgrades = {
            hoeUpgrade: {
                name: "Improved hoe",
                category: "farming",
                resource: "food",
                level: 0,
                maxLevel: 4,
                initialCost: 20,
                costPerLevel: 1.4,
                initialBonus: 4,
                bonusPerLevel: 1.2,
                upgradeCostCategories: { wood: 1.2, food: 0.8 }
            },
            pickaxeUpgrade: {
                name: "Stone tools",
                category: "mining",
                resource: "knowledge",
                level: 0,
                maxLevel: 4,
                initialCost: 20,
                costPerLevel: 1.4,
                initialBonus: 4,
                bonusPerLevel: 1.2,
                upgradeCostCategories: { wood: 1.2 }
            },
            betterAxes: {
                name: "Better axes",
                category: "wood",
                resource: "wood",
                level: 0,
                maxLevel: 4,
                initialCost: 20,
                costPerLevel: 1.4,
                initialBonus: 4,
                bonusPerLevel: 1.2,
                upgradeCostCategories: { wood: 1.2 }
            }
        };

        this.gameStoryUpates = {
            
        }
    }

    gameTick() {   
        // Arvutab uue populatsiooni ja kontrollib, kas populatsioon on ületanud limiidi
        this.population = Math.min(this.population * (1 + this.growthRate), this.populationCap);
        // Arvutab teisi stat
        this.wood += this.woodRate;
        this.knowledge += this.knowledgeRate;
        this.food += this.foodRate;
        this.stone += this.stoneRate;

        // Peaks lisama veel stat e
        
        }
}
const game = new incrementalGame;
function updateInfo() {
    game.gameTick();
    renderStats();
}

function renderStats() {
    for (const stat of document.getElementsByClassName("stat-value")) {
        stat.textContent = Math.round(game[stat.id]);
    }
}
let gameTicker = null;
async function startStopGame() {
    if (gameTicker == null){gameTicker = setInterval(updateInfo, 1000);}
    else {clearInterval(gameTicker);
        gameTicker=null;}
}

function getUpgradeCosts(upgrade) {
    return Object.entries(upgrade.upgradeCostCategories || {}).map(
        ([resource, multiplier]) => [
            resource,
            Math.ceil(upgrade.initialCost * (upgrade.costPerLevel ** upgrade.level) * multiplier)
        ]
    );
}

function upgradeFunction(upgradeId) {
    const upgrade = game.Upgrades[upgradeId];
    if (!upgrade || upgrade.level >= upgrade.maxLevel) return false;

    const costs = getUpgradeCosts(upgrade);

    // Check every resource first, so a failed purchase never partially charges the player.
    if (costs.some(([resource, cost]) => !Number.isFinite(game[resource]) || game[resource] < cost)) {
        return false;
    }

    for (const [resource, cost] of costs) {
        game[resource] -= cost;
    }

    game[`${upgrade.resource}Rate`] += upgrade.initialBonus * (upgrade.bonusPerLevel ** upgrade.level);
    upgrade.level += 1;

    renderStats();
    const category = document.getElementById("upgrade-category").value;
    showUpgradeCategory(category);
    return true;
}
