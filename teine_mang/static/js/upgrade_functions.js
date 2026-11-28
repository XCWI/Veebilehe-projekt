function upgradeFunction(upgradeId) {
    const upgrade = game.Upgrades[upgradeId];
    if (!upgrade || upgrade.level >= upgrade.maxLevel) return false;

    const costs = getUpgradeCosts(upgrade);
    if (!isEnoughResource(costs)) return false;

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

    if (!isEnoughResource(costs)) return false;

    for (const [resource, cost] of costs) {
        game[resource] -= cost;
    }

    for (const unlockedId of upgrade.unlockedUpgrades) {
        if (game.Upgrades[unlockedId]) game.Upgrades[unlockedId].unlocked = 1;
        else if (game.unlockingUpgrades[unlockedId]) game.unlockingUpgrades[unlockedId].unlocked = 1;
    }
    upgrade.level += 1;
    if (upgrade.category?.toLowerCase() === "continent") {
        if (!game.discoveredContinents.includes(upgrade.name)) {
            game.discoveredContinents.push(upgrade.name);
        }
        renderDiscoveredContinents();
    }
    if (upgrade.content) upgrade.contentRevealed = true;

    renderStats();
    renderUnlockedContent();
    if (typeof showUpgradeCategory === "function") {
        showUpgradeCategory(selectedUpgradeCategory || "farming");
    }
    return true;
}