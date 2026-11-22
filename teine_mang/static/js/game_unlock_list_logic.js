const renderedDiscoveryIds = new Set();

function renderUnlockedContent(upgradeId) {
    if (!upgradeId || renderedDiscoveryIds.has(upgradeId)) return;

    const panel = document.getElementById("unlocked-content");
    const entries = document.getElementById("unlocked-content-list");
    if (!panel || !entries || typeof game === "undefined") return;

    const item = game.unlockingUpgrades?.[upgradeId] || game.Upgrades?.[upgradeId];
    if (!item?.content || !item.contentRevealed) return;

    for (const oldEntry of entries.children) {
        const currentOpacity = Number(oldEntry.style.opacity || 1);
        oldEntry.style.opacity = String(Math.max(0.18, currentOpacity * 0.72));
    }

    const article = document.createElement("article");
    article.className = "unlocked-content-item discovery-new";
    article.dataset.discoveryId = upgradeId;

    const heading = document.createElement("h3");
    heading.textContent = item.content.title || item.name || upgradeId;
    article.append(heading);

    if (item.content.image) {
        const image = document.createElement("img");
        image.src = item.content.image;
        image.alt = item.content.imageAlt || item.content.title || item.name || "";
        article.append(image);
    }

    if (item.content.text) {
        const text = document.createElement("p");
        text.textContent = item.content.text;
        article.append(text);
    }

    entries.prepend(article);
    renderedDiscoveryIds.add(upgradeId);
    panel.hidden = false;
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
