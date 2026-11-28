const renderedDiscoveryIds = new Set();

function renderUnlockedContent(upgradeId) {
    if (!upgradeId || renderedDiscoveryIds.has(upgradeId)) return;

    const storyLog = document.getElementById("story-log");
    if (!storyLog || typeof game === "undefined") return;

    const item = game.unlockingUpgrades?.[upgradeId] || game.Upgrades?.[upgradeId];
    if (!item?.content || !item.contentRevealed) return;

    // Replace the initial prompt once the first discovery is logged.
    storyLog.querySelector(".story-entry[data-start-prompt]")?.remove();

    const entry = document.createElement("p");
    entry.className = "story-entry";
    entry.dataset.discoveryId = upgradeId;
    const heading = document.createElement("strong");
    heading.textContent = item.content.title || item.name || upgradeId;
    storyLog.prepend(entry);
    if (item.content.text) {
        entry.prepend(`: ${item.content.text}`);
    }
    entry.prepend("› ", heading);
    renderedDiscoveryIds.add(upgradeId);
    storyLog.scrollTop = storyLog.scrollHeight;
}

// Keep purchase logic in mang.js intact and pass its ID into the discovery renderer.
for (const actionName of ["upgradeFunction", "upgradeUnlockFunction"]) {
    const originalAction = window[actionName];
    if (typeof originalAction !== "function") continue;

    window[actionName] = function (upgradeId, ...args) {
        const purchased = originalAction.call(this, upgradeId, ...args);
        if (purchased) renderUnlockedContent(upgradeId);
        return purchased;
    };
}
