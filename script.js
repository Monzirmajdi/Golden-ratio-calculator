document.getElementById('calculateBtn').addEventListener('click', calculateSeries);

function calculateSeries() {
    const baseNumber = parseFloat(document.getElementById('baseNumber').value);
    const iterations = parseInt(document.getElementById('iterations').value);
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Validate input
    if (isNaN(baseNumber) || isNaN(iterations)) {
        resultsContainer.innerHTML = '<div class="error">Please enter valid numbers</div>';
        return;
    }
    
    // Calculate and display results
    let currentValue = baseNumber;
    const GOLDEN_RATIO = 1.61803398875;
    
    for (let i = 0; i < iterations; i++) {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        
        const resultValue = document.createElement('span');
        resultValue.className = 'result-value';
        resultValue.textContent = currentValue.toFixed(4);
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.title = 'Copy to clipboard';
        copyBtn.addEventListener('click', () => copyToClipboard(currentValue));
        
        resultItem.appendChild(resultValue);
        resultItem.appendChild(copyBtn);
        resultsContainer.appendChild(resultItem);
        
        currentValue *= GOLDEN_RATIO;
    }
}

function copyToClipboard(value) {
    navigator.clipboard.writeText(value.toString())
        .then(() => {
            // Optional: Show copied feedback
            alert('Copied: ' + value.toFixed(4));
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}
