document.getElementById("saveBtn").addEventListener("click", () => {
    const link = document.getElementById("linkInput").value.trim();
    const tags = document.getElementById("tagInput").value.trim();
    const reminder = document.getElementById("reminderInput").value;

    if (!link) {
        alert("Please enter a link.");
        return;
    }

    const newLink = {
        url: link,
        tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        reminder: reminder,
        addedAt: new Date().toISOString()
    };

    chrome.storage.local.get({ links: [] }, (data) => {
        const updatedLinks = [...data.links, newLink];
        chrome.storage.local.set({ links: updatedLinks }, () => {
            alert("Link saved!");
            displayLinks();
        });
    });
});

function displayLinks() {
    chrome.storage.local.get({ links: [] }, (data) => {
        const linksList = document.getElementById("linksList");
        linksList.innerHTML = "";

        data.links.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "link-item";
            div.innerHTML = `
                <a href="${item.url}" target="_blank">${item.url}</a>
                <p><strong>Tags:</strong> ${item.tags.join(", ") || "None"}</p>
                <button onclick="deleteLink(${index})">Delete</button>
            `;
            linksList.appendChild(div);
        });
    });
}

function deleteLink(index) {
    chrome.storage.local.get({ links: [] }, (data) => {
        const updatedLinks = data.links.filter((_, i) => i !== index);
        chrome.storage.local.set({ links: updatedLinks }, displayLinks);
    });
}

displayLinks();
