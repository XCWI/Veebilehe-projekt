// Tuleb synida mang.js upgrade listi pohjal
const upgradeCategories = {
    farming: ["hoeUpgrade"],
    wood: ["betterAxes", "betterSaws"],
    mining: ["pickaxeUpgrade"],
    education: ["school"]
};

function showUpgradeCategory(category) {
    // Kustutab vana listi
    const list = document.getElementById("upgrade-list");
    list.replaceChildren();

    for (const upgradeId of upgradeCategories[category] || []) {
        const upgrade = game.Upgrades[upgradeId];
        if (!upgrade) continue;

        const item = document.createElement("div");
        item.className = "upgrade-item";
        const name = document.createElement("span");
        name.textContent = `${upgrade.name} (Level ${upgrade.level}/${upgrade.maxLevel})`;

        const cost = document.createElement("span");
        cost.className = "upgrade-cost";
        cost.textContent = upgrade.level >= upgrade.maxLevel
            ? "Max level"
            : `Cost: ${getUpgradeCosts(upgrade).map(([resource, amount]) => `${amount} ${resource}`).join(", ")}`;

        const upgradeBonus = document.createElement("span");
        upgradeBonus.className = "upgrade-bonus";
        upgradeBonus.textContent = upgrade.level >= upgrade.maxLevel
            ? "Max level"
            : `Bonus: ${getUpgradeBonus(upgrade).map(([resource, amount]) => `${amount} ${resource}`).join(", ")}`;

        const button = document.createElement("button");
        button.className = "action-btn";
        button.type = "button";
        button.onclick = () => upgradeFunction(upgradeId);
        button.textContent = "+";
        button.disabled = upgrade.level >= upgrade.maxLevel;
        button.setAttribute("aria-label", `Upgrade ${upgrade.name}`);

        item.append(name, cost, upgradeBonus, button);
        list.append(item);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    showUpgradeCategory(document.getElementById("upgrade-category").value);
});
