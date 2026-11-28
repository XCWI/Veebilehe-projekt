function getUpgradeCosts(upgrade) {
    return Object.entries(upgrade.upgradeCostCategories || {}).map(
        ([resource, multiplier]) => [
            resource,
            Math.ceil(upgrade.initialCost * (upgrade.costPerLevel ** upgrade.level) * multiplier)
        ]
    );
}

function isEnoughResource(costs) {
    return costs.every(([resource, cost]) => Number.isFinite(game[resource]) && game[resource] >= cost);
}

function getUpgradeBonus(upgrade) {
    return Object.entries(upgrade.productionBonuses || {}).map(
        ([resource, multiplier]) => [
            resource,
            Math.floor(upgrade.initialBonus * (upgrade.bonusPerLevel ** upgrade.level) * multiplier)
        ]
    );
}