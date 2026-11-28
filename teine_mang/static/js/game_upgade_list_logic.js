// Tuleb synida mang.js upgrade listi pohjal
const upgradeCategories = {
    farming: [ "hoeUpgrade" ],
    buildings: [],
    wood: [ "betterAxes", "betterSaws" ],
    mining: [ "pickaxeUpgrade" ],
    knowledge: [ "school" ],
    continents: [ "Africa", "Europe", "Asia", "Australia", "Americas" ],
    nature: [ "fire" ]
};

let selectedUpgradeCategory = "farming";

function showUpgradeCategory(category) {
    const list = document.getElementById("upgrades-grid");
    if (!list) return;

    // Accept the old category name while keeping the page tabs aligned to game data.
    if (category === "education") category = "knowledge";
    if (!upgradeCategories[category]) return;
    selectedUpgradeCategory = category;

    list.replaceChildren();

    document.querySelectorAll(".category-tabs .tab-btn").forEach((button) => {
        const isSelected = button.getAttribute("onclick")?.includes(`'${category}'`);
        button.classList.toggle("active", Boolean(isSelected));
    });

    for (const upgradeId of upgradeCategories[category] || []) {
        let upgrade = game.Upgrades?.[upgradeId];
        if (!upgrade) {
            upgrade = game.unlockingUpgrades?.[upgradeId];
            if (!upgrade) continue;
        }
        
        if (!upgrade.unlocked) continue;
        const item = document.createElement("button");
        item.className = "upgrade-item action-btn";
        item.dataset.upgradeId = upgradeId;
        item.setAttribute("aria-label", `Upgrade ${upgrade.name}`);
        if (game.Upgrades?.[upgradeId]) item.onclick = () => upgradeFunction(upgradeId);
        else item.onclick = () => upgradeUnlockFunction(upgradeId);
        item.disabled = upgrade.level >= upgrade.maxLevel;
        

        const name = document.createElement("span");
        name.textContent = `${upgrade.name}: ${upgrade.level}/${upgrade.maxLevel}`;
        
        const linebreak = document.createElement("br");
        const costs = getUpgradeCosts(upgrade);
        item.classList.toggle("affordable", !item.disabled && isEnoughResource(costs));
        const cost = document.createElement("span");
        
        cost.className = "upgrade-cost";
        cost.textContent = upgrade.level >= upgrade.maxLevel
            ? "Max level"
            : `Cost: ${costs.map(([resource, amount]) => `${amount} ${resource}`).join(", ") || "Free"}`;

        const linebreak2 = document.createElement("br");
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
            upgradeBonus.textContent = upgrade.level < upgrade.maxLevel
            ? `Unlocks: ${unlockedNames.join(", ") || "Nothing"}`
            : `Unlocked: ${unlockedNames.join(", ") || "Nothing"}`;
        }
        item.append(name, linebreak, cost, linebreak2, upgradeBonus);
        list.append(item);
    }
    renderUnlockedContent();
}

function refreshUpgradeAffordability() {
    document.querySelectorAll(".upgrade-item[data-upgrade-id]").forEach((item) => {
        const upgradeId = item.dataset.upgradeId;
        const upgrade = game.Upgrades?.[upgradeId] || game.unlockingUpgrades?.[upgradeId];
        const canUpgrade = upgrade && upgrade.level < upgrade.maxLevel && isEnoughResource(getUpgradeCosts(upgrade));
        item.classList.toggle("affordable", Boolean(canUpgrade));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    showUpgradeCategory("farming");
});
