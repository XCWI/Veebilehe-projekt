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

        this.iron = 0;
        this.ironRate = 1;

        this.unlockingUpgrades = {
            Africa: {
                name: "Africa",
                category: "Continents",
                unlocked: 1,
                level: 0,
                maxLevel: 1,
                initialCost: 0,
                costPerLevel: 1,
                upgradeCostCategories: {},
                unlockedUpgrades: [ "betterSaws", "Europe" ],
                content: { title: "Africa", text: "Add your Africa story here.", image: "", imageAlt: "" },
            },
            Europe: {
                name: "Europe",
                category: "Continents",
                unlocked: 0,
                level: 0,
                maxLevel: 1,
                initialCost: 0,
                costPerLevel: 1,
                upgradeCostCategories: {},
                unlockedUpgrades: [  ],
                content: { title: "Europe", text: "Add your Europe story here.", image: "", imageAlt: "" },
            },
            Asia: {
                name: "Asia",
                category: "Continents",
                unlocked: 0,
                level: 0,
                maxLevel: 1,
                initialCost: 0,
                costPerLevel: 1,
                upgradeCostCategories: {},
                unlockedUpgrades: [ "betterSaws" ],
                content: { title: "Asia", text: "Add your Asia story here.", image: "", imageAlt: "" },
            },
            Australia: {
                name: "Australia",
                category: "Continents",
                unlocked: 0,
                level: 0,
                maxLevel: 1,
                initialCost: 0,
                costPerLevel: 1,
                upgradeCostCategories: {},
                unlockedUpgrades: [ "betterSaws" ],
                content: { title: "Australia", text: "Add your Australia story here.", image: "", imageAlt: "" },
            },
            Americas: {
                name: "Americas",
                category: "Continents",
                unlocked: 0,
                level: 0,
                maxLevel: 1,
                initialCost: 0,
                costPerLevel: 1,
                upgradeCostCategories: {},
                unlockedUpgrades: [ "betterSaws" ],
                content: { title: "Americas", text: "Add your Americas story here.", image: "", imageAlt: "" },
            },
            fire: {
                name: "Fire",
                category: "Nature",
                unlocked: 1,
                level: 0,
                maxLevel: 1,
                initialCost: 10,
                costPerLevel: 1,
                upgradeCostCategories: { knowledge: 4, wood: 1.2 },
                unlockedUpgrades: [  ],
                content: { title: "Fire", text: "Add your fire discovery here.", image: "", imageAlt: "" },
            },
        };


        this.Upgrades = {
            hoeUpgrade: {
                name: "Improved hoe",
                category: "farming",
                unlocked: 0,
                level: 0,
                maxLevel: 4,
                initialCost: 20,
                costPerLevel: 1.4,
                initialBonus: 1,
                productionBonuses: { food: 4 },
                bonusPerLevel: 1.2,
                upgradeCostCategories: { wood: 1.2, food: 0.8 }
            },
            pickaxeUpgrade: {
                name: "Stone tools",
                category: "mining",
                unlocked: 0,
                level: 0,
                maxLevel: 4,
                initialCost: 20,
                costPerLevel: 1.4,
                initialBonus: 1,
                productionBonuses: { knowledge: 4, iron: 2 },
                bonusPerLevel: 1.2,
                upgradeCostCategories: { wood: 1.2 }
            },
            betterAxes: {
                name: "Better axes",
                category: "wood",
                unlocked: 0,
                level: 0,
                maxLevel: 20,
                initialCost: 20,
                costPerLevel: 4.5,
                initialBonus: 1,
                productionBonuses: { wood: 4 },
                bonusPerLevel: 1.2,
                upgradeCostCategories: { wood: 1.2, knowledge: 4 }
            },
            betterSaws: {
                name: "Better saws",
                category: "wood",
                unlocked: 0,
                level: 0,
                maxLevel: 4,
                initialCost: 20,
                costPerLevel: 1.4,
                initialBonus: 1,
                productionBonuses: { wood: 4, iron: 1 },
                bonusPerLevel: 1.2,
                upgradeCostCategories: { wood: 1.2 , iron: 2, knowledge: 4},
                content: { title: "Better saws", text: "Add your saws discovery here.", image: "", imageAlt: "" }
            },
            school: {
                name: "School",
                category: "knowledge",
                unlocked: 0,
                level: 0,
                maxLevel: 4,
                initialCost: 20,
                costPerLevel: 1.4,
                initialBonus: 1,
                productionBonuses: { knowledge: 4 },
                bonusPerLevel: 1.2,
                upgradeCostCategories: { wood: 1.2 , stone: 2, knowledge: 2}
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
        this.iron += this.ironRate;

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

function getUpgradeBonus(upgrade) {
    return Object.entries(upgrade.productionBonuses || {}).map(
        ([resource, multiplier]) => [
            resource,
            Math.floor(upgrade.initialBonus * (upgrade.bonusPerLevel ** upgrade.level) * multiplier)
        ]
    );
}

function upgradeFunction(upgradeId) {
    const upgrade = game.Upgrades[upgradeId];
    if (!upgrade || upgrade.level >= upgrade.maxLevel) return false;

    const costs = getUpgradeCosts(upgrade);

    // Returnib false, kui game[resource] ei ole normaalne number või kui game[resource] on vaiksem, kui upgrade maksab.
    if (costs.some(([resource, cost]) => !Number.isFinite(game[resource]) || game[resource] < cost)) {
        return false;
    }

    for (const [resource, cost] of costs) {
        game[resource] -= cost;
    }

    const bonuses = getUpgradeBonus(upgrade);

    for (const [resource, bonus] of bonuses) {
        const rateKey = `${resource}Rate`;
        if (Number.isFinite(game[rateKey])) {
            game[rateKey] += bonus;
        }
    }
    upgrade.level += 1;
    if (upgrade.content) upgrade.contentRevealed = true;

    renderStats();
    renderUnlockedContent();
    if (typeof showUpgradeCategory === "function") {
        showUpgradeCategory(selectedUpgradeCategory || "farming");
    }
    return true;
}

function upgradeUnlockFunction(upgradeId) {
    const upgrade = game.unlockingUpgrades[upgradeId];
    if (!upgrade || upgrade.level >= upgrade.maxLevel) return false;

    const costs = getUpgradeCosts(upgrade);

    if (costs.some(([resource, cost]) => !Number.isFinite(game[resource]) || game[resource] < cost)) {
        return false;
    }

    for (const [resource, cost] of costs) {
        game[resource] -= cost;
    }

    for (const unlockedId of upgrade.unlockedUpgrades) {
        if (game.Upgrades[unlockedId]) game.Upgrades[unlockedId].unlocked = 1;
        else if (game.unlockingUpgrades[unlockedId]) game.unlockingUpgrades[unlockedId].unlocked = 1;
    }
    upgrade.level += 1;
    if (upgrade.content) upgrade.contentRevealed = true;

    renderStats();
    renderUnlockedContent();
    if (typeof showUpgradeCategory === "function") {
        showUpgradeCategory(selectedUpgradeCategory || "farming");
    }
    return true;
}
