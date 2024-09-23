let pollCount = 0;
const maxPolls = 10;

const updateGlossaryAnchors = () => {
    const item_names = document.querySelectorAll('.glossary-h2');
    const letters = [];
    console.log("SDK Loaded");

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
    const checkboxes = document.querySelectorAll('#checkbox-3');

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


function showRandomCollectionItemDaily() {
    // Function to handle the process
    function showRandomCollectionItem() {
        console.log("Starting random item selection...");  // Debugging log

        // Get today's date in a 'YYYY-MM-DD' format
        const today = new Date().toISOString().slice(0, 10);
        console.log("Today's Date:", today);  // Debugging log

        // Check local storage for previously selected item and date
        const storedDate = localStorage.getItem('randomItemDate');
        const storedItemIndex = localStorage.getItem('randomItemIndex');

        console.log("Stored Date:", storedDate);  // Debugging log
        console.log("Stored Item Index:", storedItemIndex);  // Debugging log

        // If it's the same day and there's a stored item index, use the stored item
        if (storedDate === today && storedItemIndex !== null) {
            console.log("Using stored item for today.");  // Debugging log
            showItem(parseInt(storedItemIndex));
            return;
        }

        // Get all collection items (adjust the selector to match your collection)
        const collectionItems = document.querySelectorAll('wod-item-cms');
        console.log("Collection Items Found:", collectionItems.length);  // Debugging log

        if (collectionItems.length > 0) {
            // Randomly select an index for the collection item
            const randomIndex = Math.floor(Math.random() * collectionItems.length);
            console.log("Randomly Selected Index:", randomIndex);  // Debugging log

            // Store the random index and today's date in localStorage
            localStorage.setItem('randomItemDate', today);
            localStorage.setItem('randomItemIndex', randomIndex);

            // Show the randomly selected item
            showItem(randomIndex);
        } else {
            console.log('No collection items found.');
        }
    }

    // Function to display only the randomly selected item and hide others
    function showItem(index) {
        const collectionItems = document.querySelectorAll('wod-item-cms');
        console.log("Showing item at index:", index);  // Debugging log

        collectionItems.forEach((item, i) => {
            if (i === index) {
                item.style.display = 'block';  // Show the selected item
            } else {
                item.style.display = 'none';   // Hide the other items
            }
        });
    }

    // Call the function when the page is fully loaded
    window.onload = function () {
        console.log("Page fully loaded, starting item selection.");  // Debugging log
        showRandomCollectionItem();
    };
}

// Call this function to start showing a random collection item daily
showRandomCollectionItemDaily();



// Polling mechanism to run only twice
const pollInterval = setInterval(() => {
    if (pollCount < maxPolls) {
        updateGlossaryAnchors();
        pollCount++;
    } else {
        clearInterval(pollInterval);
    }
}, 1000); // Polling interval (5 seconds)

// Initial update
updateGlossaryAnchors();
