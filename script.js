// Data for news organizations and fact-checkers
const resources = {
    indianNews: [
        { name: "Indian Express", url: "https://indianexpress.com/" },
        { name: "The Hindu", url: "https://www.thehindu.com/" },
        { name: "Deccan Herald", url: "https://www.deccanherald.com/" },
        { name: "Newslaundry", url: "https://www.newslaundry.com/" },
        { name: "The News Minute", url: "https://www.thenewsminute.com/" },
        { name: "The Wire", url: "https://thewire.in/" },
        { name: "The Quint", url: "https://www.thequint.com/" },
        { name: "The Scroll", url: "https://scroll.in/" }
    ],
    internationalNews: [
        { name: "Associated Press", url: "https://apnews.com/" },
        { name: "CNN", url: "https://edition.cnn.com/" },
        { name: "NY Times", url: "https://www.nytimes.com/international/" },
        { name: "Reuters", url: "https://www.reuters.com/" },
        { name: "NPR", url: "https://www.npr.org/" },
        { name: "BBC", url: "https://www.bbc.com/" }
    ],
    factCheckers: [
        { name: "Alt News", url: "https://www.altnews.in/" },
        { name: "Maktoob Media", url: "https://maktoobmedia.com/" },
        { name: "Ravish Kumar", url: "https://www.youtube.com/@ravishkumar.official" }
    ]
};

// Lightweight CSV parser
function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/);
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = [];
        let inQuotes = false, value = '', i = 0;
        while (i < line.length) {
            if (line[i] === '"') {
                inQuotes = !inQuotes;
            } else if (line[i] === ',' && !inQuotes) {
                values.push(value);
                value = '';
            } else {
                value += line[i];
            }
            i++;
        }
        values.push(value);
        const obj = {};
        headers.forEach((h, idx) => obj[h.trim()] = (values[idx] || '').trim());
        return obj;
    });
}

async function fetchAndRenderTrustedSources() {
    const res = await fetch('trusted_sources.csv');
    const text = await res.text();
    const data = parseCSV(text);
    // Group by category
    const grouped = {};
    data.forEach(item => {
        if (!grouped[item.category]) grouped[item.category] = [];
        grouped[item.category].push(item);
    });
    // Render
    const container = document.querySelector('.resources-container');
    container.innerHTML = '';
    Object.entries(grouped).forEach(([category, items]) => {
        const section = document.createElement('div');
        section.className = 'resource-section';
        const h3 = document.createElement('h3');
        h3.textContent = category;
        section.appendChild(h3);
        const ul = document.createElement('ul');
        items.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.url;
            a.textContent = item.name;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            li.appendChild(a);
            ul.appendChild(li);
        });
        section.appendChild(ul);
        container.appendChild(section);
    });
}

async function fetchAndRenderChecklist() {
    const res = await fetch('checklist.csv');
    const text = await res.text();
    const data = parseCSV(text);
    // Group by section
    const grouped = {};
    data.forEach(item => {
        if (!grouped[item.section]) grouped[item.section] = [];
        grouped[item.section].push(item.question);
    });
    // Render
    const checklistContainer = document.querySelector('.checklist-container');
    checklistContainer.innerHTML = '';
    Object.entries(grouped).forEach(([section, questions]) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'checklist-item';
        const h3 = document.createElement('h3');
        h3.textContent = section;
        itemDiv.appendChild(h3);
        const ul = document.createElement('ul');
        questions.forEach(q => {
            const li = document.createElement('li');
            li.textContent = q;
            ul.appendChild(li);
        });
        itemDiv.appendChild(ul);
        checklistContainer.appendChild(itemDiv);
    });
}

// Function to populate a list with resources
function populateList(listId, items) {
    const list = document.getElementById(listId);
    if (!list) return;
    list.innerHTML = '';
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

// Dark mode toggle
function setupDarkModeToggle() {
    const toggle = document.getElementById('dark-mode-toggle');
    const iconSpan = document.getElementById('dark-mode-icon');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('darkMode');
    const sunSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    const moonSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>`;
    function setIcon(isDark) {
        iconSpan.innerHTML = isDark ? moonSVG : sunSVG;
    }
    if (saved === 'dark' || (!saved && prefersDark)) {
        document.body.classList.add('dark-mode');
        setIcon(true);
    } else {
        document.body.classList.remove('dark-mode');
        setIcon(false);
    }
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        setIcon(isDark);
        localStorage.setItem('darkMode', isDark ? 'dark' : 'light');
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await fetchAndRenderTrustedSources();
    await fetchAndRenderChecklist();
    setupChecklist();
    addResetButton();
    setupDarkModeToggle();
}); 