// Siia lisada töötav mängu loogika.

// proovib hoida kindlat keelt läbi koodi
// also lugesin, et js kasutatakse camelCase, seega proovime seda kasutada
class incrementalGame {
    constructor() {
        this.gameRunning = 1;
        
        this.population = 9905.0; // Algne populatsioon
        this.growthRate =  0.1; // Kasvu määr (10%)
        this.populationCap = 1000000; // Maksimaale populatsioon

        this.world = {
            'Africa': [0, {'food': 1000, 'population_cap': 1000000}], 
            'Europe': [10000, {'food': 500, 'population_cap': 2000000}], 
            'Asia': [50000, {'food': 500, 'population_cap': 2000000}], 
            'Oceania': [100000, {'food': 500, 'population_cap': 2000000}], 
            'North-America': [1000000, {'food': 500, 'population_cap': 2000000}], 
            'South-America':[ 1500000, {'food': 0, 'population_cap': 0}], 
            'North Pole': [20000000, {'food': 0, 'population_cap': 0}],
            'Antarctica': [100000000, {'food': 0, 'population_cap': 0}]
    }
        this.continents = ['Africa', 'Europe', 'Asia', 'Oceania', 'North-America', 'South-America', 'North Pole', 'Antarctica']
        this.discoveredContintns = ['Africa']

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


        this.Upgrades = {
            hoeUpgrade: {
                name: "Improved hoe",
                category: "farming",
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
                level: 0,
                maxLevel: 4,
                initialCost: 20,
                costPerLevel: 1.4,
                initialBonus: 1,
                productionBonuses: { wood: 4, iron: 1 },
                bonusPerLevel: 1.2,
                upgradeCostCategories: { wood: 1.2 , iron: 2, knowledge: 4}
            },
            school: {
                name: "School",
                category: "knowledge",
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

    renderStats();
    const category = document.getElementById("upgrade-category").value;
    showUpgradeCategory(category);
    return true;
}

function showDiscoveryPopup(world, discoveredContinent) {
    const bonuses = world[discoveredContinent][1];

    document.getElementById("discoveryTitle").textContent =
        `${discoveredContinent} has been discovered!`;

    document.getElementById("discoveryDescription").textContent =
        `Our explorers have discovered ${discoveredContinent}.`;

    const bonusList = document.getElementById("discoveryBonuses");

    bonusList.innerHTML = "";

    for (const resource in bonuses) {
        const amount = bonuses[resource];

        const item = document.createElement("li");

        item.textContent = `+${amount.toLocaleString("en-US")} ${resource}`;

        bonusList.appendChild(item);
    }

    document.getElementById("discoveryPopup").hidden = false;
}

function ifContinentDiscovered(params) {
    /* kontrollime, kas uus kontinent on avastatud
       Kui uut kontinenti pole avastatud return ' '
       Kui uus kontinent on avastatud lisame kontinendi avastatud kontinentide listi ja kuvame popupi
       assert kontinent_discovered() == False
       return avastatud kontinendi nimi stringina
    */
}