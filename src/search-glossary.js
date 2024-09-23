// Function to handle search
function handleSearch() {
    const searchInput = document.querySelector('.search-glossary'); // Search input field

    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const searchValue = searchInput.value.toLowerCase().trim();
        applySearch(searchValue);  // Apply search when input changes
    });
}

// Function to apply the search logic
function applySearch(searchValue) {
    const cmsHeadings = document.querySelectorAll('.glossary-h2'); // CMS item headings with class .glossary-h2

    if (!cmsHeadings) return;

    cmsHeadings.forEach((heading) => {
        const headingText = heading.getAttribute('data-heading')
            ? heading.getAttribute('data-heading').toLowerCase()
            : heading.textContent.toLowerCase().trim(); // Use textContent as fallback if data-heading is missing

        // Check if the heading text includes the search value
        if (headingText.includes(searchValue)) {
            // Show the parent CMS item with class .glossary-item-group if it matches
            heading.closest('.glossary-item-group').style.display = 'block';
        } else {
            // Hide the parent CMS item if it doesn't match
            heading.closest('.glossary-item-group').style.display = 'none';
        }
    });
}

// Apply search after polling or whenever new content is added
function applySearchAfterPolling() {
    const searchInput = document.querySelector('.search-glossary');
    if (!searchInput) return;

    const currentSearchValue = searchInput.value.toLowerCase().trim();
    if (currentSearchValue !== '') {
        applySearch(currentSearchValue);  // Apply the current search value to new items
    }
}




// Initialize the search functionality
handleSearch();

// Call this function after each polling or when new items are loaded
applySearchAfterPolling();
