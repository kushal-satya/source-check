// Data for news organizations and fact-checkers
const resources = {
    newsOrganizations: [
        { name: "Reuters", url: "https://www.reuters.com" },
        { name: "Associated Press (AP)", url: "https://apnews.com" },
        { name: "Al Jazeera English", url: "https://www.aljazeera.com" },
        { name: "BBC World Service", url: "https://www.bbc.co.uk/worldserviceradio" }
    ],
    factCheckers: [
        { name: "Alt News (Mohammed Zubair, Pratik Sinha)", url: "https://www.altnews.in" },
        { name: "BOOM Live", url: "https://www.boomlive.in" },
        { name: "India Today Fact Check", url: "https://www.indiatoday.in/fact-check" },
        { name: "Vishvas News", url: "https://www.vishvasnews.com" }
    ]
};

// Function to populate a list with resources
function populateList(listId, items) {
    const list = document.getElementById(listId);
    if (!list) return;

    items.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.url;
        a.textContent = item.name;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        li.appendChild(a);
        list.appendChild(li);
    });
}

// Function to create and update progress bar
function updateProgressBar(checkedCount, totalCount) {
    let progressBar = document.getElementById('checklist-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'checklist-progress';
        progressBar.className = 'progress-container';
        
        const progressText = document.createElement('div');
        progressText.className = 'progress-text';
        progressBar.appendChild(progressText);
        
        const progressBarInner = document.createElement('div');
        progressBarInner.className = 'progress-bar';
        progressBar.appendChild(progressBarInner);
        
        const checklistSection = document.querySelector('#checklist');
        checklistSection.insertBefore(progressBar, checklistSection.firstChild);
    }
    
    const percentage = (checkedCount / totalCount) * 100;
    const progressText = progressBar.querySelector('.progress-text');
    const progressBarInner = progressBar.querySelector('.progress-bar');
    
    progressText.textContent = `Progress: ${checkedCount}/${totalCount} items checked`;
    progressBarInner.style.width = `${percentage}%`;
}

// Function to save checklist state
function saveChecklistState(checkedItems) {
    localStorage.setItem('checklistState', JSON.stringify(checkedItems));
}

// Function to load checklist state
function loadChecklistState() {
    const savedState = localStorage.getItem('checklistState');
    return savedState ? JSON.parse(savedState) : {};
}

// Function to make checklist items interactive
function setupChecklist() {
    const checklistItems = document.querySelectorAll('.checklist-item ul li');
    const totalItems = checklistItems.length;
    let checkedItems = loadChecklistState();
    
    checklistItems.forEach((item, index) => {
        // Create a checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checklist-checkbox';
        checkbox.id = `checklist-item-${index}`;
        
        // Style the checkbox
        checkbox.style.marginRight = '8px';
        checkbox.style.cursor = 'pointer';
        
        // Insert checkbox at the beginning of the list item
        item.insertBefore(checkbox, item.firstChild);
        
        // Restore saved state
        if (checkedItems[checkbox.id]) {
            checkbox.checked = true;
            item.classList.add('checked');
        }
        
        // Add click event listener to the whole item (not just the checkbox)
        item.addEventListener('click', function(e) {
            // Prevent double toggling if the click is on the checkbox itself
            if (e.target === checkbox) return;
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        });
        // Add change event to the checkbox
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                item.classList.add('checked');
                checkedItems[this.id] = true;
            } else {
                item.classList.remove('checked');
                delete checkedItems[this.id];
            }
            // Update progress
            const checkedCount = Object.keys(checkedItems).length;
            updateProgressBar(checkedCount, totalItems);
            // Save state
            saveChecklistState(checkedItems);
        });
    });
    // Initial progress update
    updateProgressBar(Object.keys(checkedItems).length, totalItems);
}

// Function to reset checklist
function resetChecklist() {
    localStorage.removeItem('checklistState');
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.parentElement.classList.remove('checked');
    });
    updateProgressBar(0, checkboxes.length);
}

// Add reset button
function addResetButton() {
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Checklist';
    resetButton.className = 'reset-button';
    resetButton.addEventListener('click', resetChecklist);
    
    const checklistSection = document.querySelector('#checklist');
    checklistSection.appendChild(resetButton);
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateList('news-orgs-list', resources.newsOrganizations);
    populateList('fact-checkers-list', resources.factCheckers);
    setupChecklist();
    addResetButton();
}); 