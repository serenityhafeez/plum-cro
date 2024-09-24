let pollCount = 0;
const maxPolls = 4;

const updateGlossaryAnchors = () => {
    const item_names = document.querySelectorAll('.glossary-h2');
    const letters = [];
    //console.log("SDK Loaded");

    item_names.forEach((item, index) => {
        let name = item.innerHTML;
        let first_char = name.charAt(0);

        const letter_anchor = item.parentElement.parentElement.querySelector('.letter_anchor');
        const hidden_letter = item.parentElement.parentElement.querySelector('.glossary-hidden-letter');

        if (letter_anchor && hidden_letter) {
            letter_anchor.setAttribute("id", first_char);
            hidden_letter.setAttribute("data-letter", first_char);
            hidden_letter.innerHTML = first_char;
        }

        if (letters.indexOf(first_char) === -1) {
            letters.push(first_char);
        }
    });

    // Letter Links
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    const links_wrap = document.getElementById('links_wrap');

    // Clear existing links before reappending
    links_wrap.innerHTML = '';

    alphabet.forEach((letter_link, index) => {
        let a = document.createElement("a");
        a.innerHTML = letter_link;
        a.setAttribute("class", 'term-link');

        if (letters.includes(letter_link)) {
            a.setAttribute("href", '#' + letter_link);
        }

        links_wrap.appendChild(a);
    });

    // Show Letter headlines for each group
    const elementArray = document.getElementsByClassName("glossary-hidden-letter");
    const usedLetters = new Set([]);

    for (let i = 0; i < elementArray.length; i++) {
        const letter = elementArray[i].getAttribute("data-letter");

        if (usedLetters.has(letter) === false) {
            usedLetters.add(letter);
            createLetterLink(elementArray[i]);
        }
    }

    // Call this function to handle checkboxes
    handleCheckboxChange();

    // Ensure new glossary-hidden-letter elements are hidden if the checkbox is already checked
    applyCheckboxState();
}

// Create separation (without g-spacer)
function createLetterLink(element) {
    element.classList.add('glossary-letter');
}

// Function to handle checkbox behavior (for glossary-hidden-letter)
function handleCheckboxChange() {
    const checkboxes = document.querySelectorAll('[id^="Checkbox-3"]');

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                hideGlossaryLetters();
            } else {
                showGlossaryLetters();
            }
        });
    });
}

// Function to hide all glossary-hidden-letter elements
function hideGlossaryLetters() {
    const hiddenLetters = document.querySelectorAll('.glossary-hidden-letter');
    hiddenLetters.forEach((element) => {
        element.style.display = 'none';
    });
}

// Function to show all glossary-hidden-letter elements
function showGlossaryLetters() {
    const hiddenLetters = document.querySelectorAll('.glossary-hidden-letter');
    hiddenLetters.forEach((element) => {
        element.style.display = '';
    });
}

// Function to apply checkbox state to all glossary-hidden-letter elements
function applyCheckboxState() {
    const checkboxes = document.querySelectorAll('#checkbox-3');
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            hideGlossaryLetters();
        }
    });
}

// // Polling mechanism to run only twice
// const pollInterval = setInterval(() => {
//     if (pollCount < maxPolls) {
//         updateGlossaryAnchors();
//         pollCount++;
//     } else {
//         clearInterval(pollInterval);
//     }
// }, 1000); // Polling interval (5 seconds)


const pollInterval = setInterval(() => {
    // Function to check if a term-link with href "#A", "#B", or "#C" is loaded
    function isTermLinkLoaded() {
        return document.querySelector('.term-link[href="#Z"]') ||
            document.querySelector('.term-link[href="#Y"]') ||
            document.querySelector('.term-link[href="#X"]');
    }

    // If any of the term-links is loaded, stop polling
    if (isTermLinkLoaded()) {
        clearInterval(pollInterval);
        // console.log("Polling stopped as term-link Z, Y, or X is loaded.");
    } else {
        // Perform your glossary update function
        updateGlossaryAnchors();
        //console.log("Polling... waiting for term-links Z, Y, or X.");
    }
}, 1000); // Polling interval of 1 second

// Helper function to get the current day of the year
function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    //console.log("Current day of the year:", dayOfYear); // Log the day of the year
    return dayOfYear;
}

// Main function to show one item based on the day of the year
function showDailyItem() {
    const items = document.querySelectorAll('.wod-item-cms'); // Select your CMS items based on your structure
    const totalItems = items.length;

    // Log the total number of items
    // console.log("Total number of items:", totalItems);

    // Get the current day of the year and map it to an item index
    const dayOfYear = getDayOfYear();
    const itemToShow = dayOfYear % totalItems; // Ensure it loops if items > 365
    // Log which item index will be shown
    //console.log("Item to show for today (index):", itemToShow);

    // Hide all items except the one to show for the day
    items.forEach((item, index) => {
        if (index === itemToShow) {
            item.style.display = 'block'; // Show the specific item for the day
            //console.log("Showing item at index:", index);
        } else {
            item.style.display = 'none'; // Hide all others
            //  console.log("Hiding item at index:", index);
        }
    });
}
// Run the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', showDailyItem);

function truncateTextBasedOnScreen() {
    // Helper function to truncate text based on max length
    function truncateText(element, maxLength) {
        const text = element.textContent;

        if (text.length > maxLength) {
            const truncatedText = text.substring(0, maxLength) + ' ...read more';
            element.textContent = truncatedText;
            console.log(`Truncated text: "${truncatedText}"`);
        }
    }

    // Function to handle truncation based on screen size
    function handleTruncate() {
        console.log("Add Truncation")
        const elements = document.querySelectorAll('._14px-glossary');
        const isMobile = window.innerWidth <= 768; // Adjust this breakpoint as needed

        // Set character limits based on screen size
        const maxLength = isMobile ? 160 : 233;

        // Truncate text for each element with class '14px-glossary'
        elements.forEach(element => truncateText(element, maxLength));
    }

    // Run on page load
    document.addEventListener('DOMContentLoaded', handleTruncate);

    // Run on window resize
    window.addEventListener('resize', handleTruncate);
}

// Call the function to start truncating text
truncateTextBasedOnScreen();

// Initial update
updateGlossaryAnchors();
