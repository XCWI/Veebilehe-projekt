const upgradeCategories = {
            farming: ["Improved hoe", "Crop rotation", "Irrigation"],
            wood: ["Better axes", "Managed forest", "Sawmill"],
            mining: ["Stone tools", "Deep mining", "Ore processing"],
            education: ["Learning hall", "Written records", "Research network"]
        };

        function showUpgradeCategory(category) {
            const list = document.getElementById("upgrade-list");
            list.replaceChildren();
            for (const upgrade of upgradeCategories[category] || []) {
                const item = document.createElement("div");
                item.className = "upgrade-item";
                const name = document.createElement("span");
                name.textContent = upgrade;
                const button = document.createElement("button");
                button.className = "action-btn";
                button.type = "button";
                button.textContent = "+";
                button.setAttribute("aria-label", `Upgrade ${upgrade}`);
                item.append(name, button);
                list.append(item);
            }
        }

        showUpgradeCategory(document.getElementById("upgrade-category").value);