// Tuleb synida mang.js upgrade listi pohjal
const upgradeCategories = {
    farming: [ "hoeUpgrade" ],
    wood: [ "betterAxes", "betterSaws" ],
    mining: [ "pickaxeUpgrade" ],
    education: [ "school" ],
    continents: [ "Africa", "Europe", "Asia", "Australia", "Americas" ],
    nature: [ "fire" ]
};

function showUpgradeCategory(category) {
    // Kustutab vana listi
    const list = document.getElementById("upgrade-list");
    list.replaceChildren();

    for (const upgradeId of upgradeCategories[category] || []) {
        let upgrade = game.Upgrades[upgradeId];
        if (!upgrade) {
            upgrade = game.unlockingUpgrades[upgradeId];
            if (!upgrade) continue;
        }
        
        if (!upgrade.unlocked) continue;
        const item = document.createElement("div");
        item.className = "upgrade-item";
        const name = document.createElement("span");
        name.textContent = `${upgrade.name} (Level ${upgrade.level}/${upgrade.maxLevel})`;

        const cost = document.createElement("span");
        cost.className = "upgrade-cost";
        cost.textContent = upgrade.level >= upgrade.maxLevel
            ? "Max level"
            : `Cost: ${getUpgradeCosts(upgrade).map(([resource, amount]) => `${amount} ${resource}`).join(", ") || "Free"}`;

        const upgradeBonus = document.createElement("span");
        upgradeBonus.className = "upgrade-bonus";
        if (upgrade.productionBonuses) {
        upgradeBonus.textContent = upgrade.level >= upgrade.maxLevel
            ? "Max level"
            : `Bonus: ${getUpgradeBonus(upgrade).map(([resource, amount]) => `${amount} ${resource}`).join(", ")}`;
        }
        else if (upgrade.unlockedUpgrades) {
            const unlockedNames = upgrade.unlockedUpgrades.map((unlockedId) =>
                game.Upgrades[unlockedId]?.name || game.unlockingUpgrades[unlockedId]?.name || unlockedId
            );
            upgradeBonus.textContent = `Unlocks: ${unlockedNames.join(", ") || "Nothing"}`;
        }
        const button = document.createElement("button");
        button.className = "action-btn";
        button.type = "button";
        if (game.Upgrades[upgradeId]) button.onclick = () => upgradeFunction(upgradeId);
        else button.onclick = () => upgradeUnlockFunction(upgradeId);
        button.textContent = "+";
        button.disabled = upgrade.level >= upgrade.maxLevel;
        button.setAttribute("aria-label", `Upgrade ${upgrade.name}`);

        item.append(name, cost, upgradeBonus, button);
        list.append(item);
    }
    renderUnlockedContent();
}

document.addEventListener("DOMContentLoaded", () => {
    showUpgradeCategory(document.getElementById("upgrade-category").value);
});
