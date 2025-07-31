document.getElementById("calculateBtn").addEventListener("click", calculateSeries);

function calculateSeries() {
    const baseNumber = parseFloat(document.getElementById("baseNumber").value);
    const iterations = parseInt(document.getElementById("iterations").value);
    const calculationType = document.getElementById("calculationType").value;
    const resultsContainer = document.getElementById("resultsContainer");
    
    // Clear previous results
    resultsContainer.innerHTML = "";
    
    // Validate input
    if (isNaN(baseNumber) || isNaN(iterations)) {
        resultsContainer.innerHTML = "<div class=\"error\">Please enter valid numbers</div>";
        return;
    }
    
    // Calculate and display results
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
        copyBtn.innerHTML = "<i class=\"fas fa-copy\"></i>";
        copyBtn.title = "Copy to clipboard";
        copyBtn.dataset.value = currentValue;
        
        copyBtn.addEventListener("click", function() {
            copyToClipboard(this.dataset.value);
        });
        
        resultItem.appendChild(resultValue);
        resultItem.appendChild(copyBtn);
        resultsContainer.appendChild(resultItem);
        
        // Apply calculation based on selected type
        if (calculationType === "ascending") {
            currentValue *= GOLDEN_RATIO;
        } else {
            currentValue /= GOLDEN_RATIO;
        }
    }
}

function copyToClipboard(value) {
    navigator.clipboard.writeText(value.toString())
        .then(() => {
            showNotification("Copied: " + parseFloat(value).toFixed(4));
        })
        .catch(err => {
            showNotification("Failed to copy!", true);
            console.error("Failed to copy: ", err);
        });
}

function showNotification(message, isError = false) {
    const notification = document.createElement("div");
    notification.className = `copy-notification ${isError ? "error" : ""}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add("show");
    }, 10);
    
    // Hide after 2 seconds
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Update copyright year automatically
document.getElementById("year").textContent = new Date().getFullYear();

document.querySelector(".download-btn").addEventListener("click", function() {
    const downloadCard = this.parentElement;
    let progressBar = downloadCard.querySelector(".progress-bar");

    if (!progressBar) {
        progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        downloadCard.appendChild(progressBar);
    }

    // Reset width and clear any existing interval
    progressBar.style.width = "0%";
    if (progressBar.intervalId) {
        clearInterval(progressBar.intervalId);
    }

    let width = 0;
    progressBar.intervalId = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressBar.intervalId);
        }
        progressBar.style.width = width + "%";
        width++;
    }, 50);

    // Increment download count
    let downloadCount = localStorage.getItem("downloadCount");
    downloadCount = downloadCount ? parseInt(downloadCount) + 1 : 1;
    localStorage.setItem("downloadCount", downloadCount);
    document.getElementById("downloadCountDisplay").textContent = downloadCount;
});

// Display initial download count on page load
document.addEventListener("DOMContentLoaded", () => {
    const downloadCount = localStorage.getItem("downloadCount");
    if (downloadCount) {
        document.getElementById("downloadCountDisplay").textContent = downloadCount;
    }
});        });
        
        resultItem.appendChild(resultValue);
        resultItem.appendChild(copyBtn);
        resultsContainer.appendChild(resultItem);
        
        currentValue *= GOLDEN_RATIO;
    }
}

function copyToClipboard(value) {
    navigator.clipboard.writeText(value.toString())
        .then(() => {
            showNotification("Copied: " + parseFloat(value).toFixed(4));
        })
        .catch(err => {
            showNotification("Failed to copy!", true);
            console.error("Failed to copy: ", err);
        });
}

function showNotification(message, isError = false) {
    const notification = document.createElement("div");
    notification.className = `copy-notification ${isError ? "error" : ""}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add("show");
    }, 10);
    
    // Hide after 2 seconds
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}
// Update copyright year automatically
document.getElementById("year").textContent = new Date().getFullYear();

document.querySelector(".download-btn").addEventListener("click", function() {
    const downloadCard = this.parentElement;
    let progressBar = downloadCard.querySelector(".progress-bar");

    if (!progressBar) {
        progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        downloadCard.appendChild(progressBar);
    }

    // Reset width and clear any existing interval
    progressBar.style.width = "0%";
    if (progressBar.intervalId) {
        clearInterval(progressBar.intervalId);
    }

    let width = 0;
    progressBar.intervalId = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressBar.intervalId);
            // Optional: Remove the progress bar after completion
            // progressBar.remove(); 
        }
        progressBar.style.width = width + "%";
        width++;
    }, 50);

    // Increment download count
    let downloadCount = localStorage.getItem("downloadCount");
    downloadCount = downloadCount ? parseInt(downloadCount) + 1 : 1;
    localStorage.setItem("downloadCount", downloadCount);
    document.getElementById("downloadCountDisplay").textContent = downloadCount;
});

// Display initial download count on page load
document.addEventListener("DOMContentLoaded", () => {
    const downloadCount = localStorage.getItem("downloadCount");
    if (downloadCount) {
        document.getElementById("downloadCountDisplay").textContent = downloadCount;
    }
});


