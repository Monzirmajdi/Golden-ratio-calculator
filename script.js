// GitHub Repository Configuration
const REPO_OWNER = 'Monzirmajdi';
const REPO_NAME = 'golden-ratio-calculator';
const FILE_PATH = 'downloads.json';
const GITHUB_TOKEN = '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';

// Main Calculator Functionality
document.getElementById("calculateBtn").addEventListener("click", calculateSeries);

function calculateSeries() {
    const baseNumber = parseFloat(document.getElementById("baseNumber").value);
    const iterations = parseInt(document.getElementById("iterations").value);
    const calculationType = document.getElementById("calculationType").value;
    const resultsContainer = document.getElementById("resultsContainer");
    
    resultsContainer.innerHTML = "";
    
    if (isNaN(baseNumber)) {
        resultsContainer.innerHTML = "<div class='error'>Please enter a valid base number</div>";
        return;
    }
    
    if (isNaN(iterations) || iterations < 1) {
        resultsContainer.innerHTML = "<div class='error'>Please enter valid iterations (minimum 1)</div>";
        return;
    }
    
    let currentValue = baseNumber;
    const GOLDEN_RATIO = 1.61803398875;
    
    for (let i = 0; i < iterations; i++) {
        const resultItem = document.createElement("div");
        resultItem.className = "result-item";
        
        const resultValue = document.createElement("span");
        resultValue.className = "result-value";
        resultValue.textContent = currentValue.toFixed(4);
        
        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-btn";
        copyBtn.innerHTML = "<i class='fas fa-copy'></i>";
        copyBtn.title = "Copy to clipboard";
        copyBtn.dataset.value = currentValue;
        
        copyBtn.addEventListener("click", function() {
            copyToClipboard(this.dataset.value);
        });
        
        resultItem.appendChild(resultValue);
        resultItem.appendChild(copyBtn);
        resultsContainer.appendChild(resultItem);
        
        calculationType === "ascending" 
            ? currentValue *= GOLDEN_RATIO 
            : currentValue /= GOLDEN_RATIO;
    }
}

function copyToClipboard(value) {
    navigator.clipboard.writeText(value.toString())
        .then(() => showNotification("Copied: " + parseFloat(value).toFixed(4)))
        .catch(err => {
            showNotification("Failed to copy!", true);
            console.error("Copy error:", err);
        });
}

function showNotification(message, isError = false) {
    const notification = document.createElement("div");
    notification.className = `copy-notification ${isError ? "error" : ""}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add("show"), 10);
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// نظام التحميلات (يبقى كما هو)
document.querySelector(".download-btn").addEventListener("click", async function(e) {
    e.preventDefault();
    const downloadUrl = this.getAttribute("href");
    const downloadCard = this.parentElement;
    
    let progressBar = downloadCard.querySelector(".progress-bar");
    if (!progressBar) {
        progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        downloadCard.appendChild(progressBar);
    }
    
    progressBar.style.width = "0%";
    let width = 0;
    const progressInterval = setInterval(() => {
        width += 5;
        progressBar.style.width = width + "%";
        if (width >= 100) {
            clearInterval(progressInterval);
            simulateDownload();
        }
    }, 50);
    
    async function simulateDownload() {
        try {
            await updateDownloadCount();
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = "";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Download error:", error);
        }
    }
});

async function updateDownloadCount() {
    try {
        const response = await axios.get(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
            {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );
        
        const content = JSON.parse(atob(response.data.content));
        const newCount = (content.downloads || 0) + 1;
        
        await axios.put(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
            {
                message: "Update download count",
                content: btoa(JSON.stringify({ downloads: newCount })),
                sha: response.data.sha
            },
            {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );
        
        document.getElementById("downloadCountDisplay").textContent = newCount;
    } catch (error) {
        console.error("Error updating download count:", error);
        let localCount = localStorage.getItem('downloadCount') || 0;
        localCount = parseInt(localCount) + 1;
        localStorage.setItem('downloadCount', localCount);
        document.getElementById("downloadCountDisplay").textContent = localCount;
    }
}

async function loadDownloadCount() {
    try {
        const response = await axios.get(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
            {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );
        
        const content = JSON.parse(atob(response.data.content));
        document.getElementById("downloadCountDisplay").textContent = content.downloads || 0;
    } catch (error) {
        console.error("Error loading download count:", error);
        const localCount = localStorage.getItem('downloadCount') || 0;
        document.getElementById("downloadCountDisplay").textContent = localCount;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    loadDownloadCount();
});
