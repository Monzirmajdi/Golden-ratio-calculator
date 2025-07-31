// GitHub Repository Configuration
const REPO_OWNER = 'your-github-username';
const REPO_NAME = 'your-repo-name';
const FILE_PATH = 'downloads.json'; // ملف لتخزين الإحصائيات
const GITHUB_TOKEN = 'ghp_your_token'; // استبدل ب token خاص بك

document.getElementById("calculateBtn").addEventListener("click", calculateSeries);

// باقي دوال الحاسبة كما هي...
// ... (keep all the existing calculator functions unchanged)

// نظام تتبع التحميلات المعدل
document.querySelector(".download-btn").addEventListener("click", async function(e) {
    e.preventDefault();
    const downloadUrl = this.getAttribute("href");
    const downloadCard = this.parentElement;
    
    // عرض شريط التقدم
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
            // زيادة العداد
            await updateDownloadCount();
            
            // بدء التحميل الفعلي
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
        // جلب البيانات الحالية
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
        
        // تحديث البيانات
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
        
        // تحديث الواجهة
        document.getElementById("downloadCountDisplay").textContent = newCount;
    } catch (error) {
        console.error("Error updating download count:", error);
        // Fallback إلى localStorage إذا فشل الاتصال
        let localCount = localStorage.getItem('downloadCount') || 0;
        localCount = parseInt(localCount) + 1;
        localStorage.setItem('downloadCount', localCount);
        document.getElementById("downloadCountDisplay").textContent = localCount;
    }
}

// جلب عدد التحميلات عند تحميل الصفحة
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
        // Fallback إلى localStorage
        const localCount = localStorage.getItem('downloadCount') || 0;
        document.getElementById("downloadCountDisplay").textContent = localCount;
    }
}

// التهيئة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("year").textContent = new Date().getFullYear();
    loadDownloadCount();
});
