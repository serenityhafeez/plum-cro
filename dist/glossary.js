"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/glossary.js
  var updateGlossaryAnchors = () => {
    const item_names = document.querySelectorAll(".glossary-h2");
    const letters = [];
    item_names.forEach((item, index) => {
      let name = item.innerHTML;
      let first_char = name.charAt(0);
      const letter_anchor = item.parentElement.parentElement.querySelector(".letter_anchor");
      const hidden_letter = item.parentElement.parentElement.querySelector(".glossary-hidden-letter");
      if (letter_anchor && hidden_letter) {
        letter_anchor.setAttribute("id", first_char);
        hidden_letter.setAttribute("data-letter", first_char);
        hidden_letter.innerHTML = first_char;
      }
      if (letters.indexOf(first_char) === -1) {
        letters.push(first_char);
      }
    });
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    const alphabet = alpha.map((x) => String.fromCharCode(x));
    const links_wrap = document.getElementById("links_wrap");
    links_wrap.innerHTML = "";
    alphabet.forEach((letter_link, index) => {
      let a = document.createElement("a");
      a.innerHTML = letter_link;
      a.setAttribute("class", "term-link");
      if (letters.includes(letter_link)) {
        a.setAttribute("href", "#" + letter_link);
      }
      links_wrap.appendChild(a);
    });
    const elementArray = document.getElementsByClassName("glossary-hidden-letter");
    const usedLetters = /* @__PURE__ */ new Set([]);
    for (let i = 0; i < elementArray.length; i++) {
      const letter = elementArray[i].getAttribute("data-letter");
      if (usedLetters.has(letter) === false) {
        usedLetters.add(letter);
        createLetterLink(elementArray[i]);
      }
    }
    handleCheckboxChange();
    applyCheckboxState();
  };
  function createLetterLink(element) {
    element.classList.add("glossary-letter");
  }
  function handleCheckboxChange() {
    const checkboxes = document.querySelectorAll('[id^="Checkbox-3"]');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
          hideGlossaryLetters();
        } else {
          showGlossaryLetters();
        }
      });
    });
  }
  function hideGlossaryLetters() {
    const hiddenLetters = document.querySelectorAll(".glossary-hidden-letter");
    hiddenLetters.forEach((element) => {
      element.style.display = "none";
    });
  }
  function showGlossaryLetters() {
    const hiddenLetters = document.querySelectorAll(".glossary-hidden-letter");
    hiddenLetters.forEach((element) => {
      element.style.display = "";
    });
  }
  function applyCheckboxState() {
    const checkboxes = document.querySelectorAll("#checkbox-3");
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        hideGlossaryLetters();
      }
    });
  }
  var pollInterval = setInterval(() => {
    function isTermLinkLoaded() {
      return document.querySelector('.term-link[href="#Z"]') || document.querySelector('.term-link[href="#Y"]') || document.querySelector('.term-link[href="#X"]');
    }
    if (isTermLinkLoaded()) {
      clearInterval(pollInterval);
    } else {
      updateGlossaryAnchors();
    }
  }, 1e3);
  function getDayOfYear() {
    const now = /* @__PURE__ */ new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1e3 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear;
  }
  function showDailyItem() {
    const items = document.querySelectorAll(".wod-item-cms");
    const totalItems = items.length;
    const dayOfYear = getDayOfYear();
    const itemToShow = dayOfYear % totalItems;
    items.forEach((item, index) => {
      if (index === itemToShow) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
  document.addEventListener("DOMContentLoaded", showDailyItem);
  function truncateTextBasedOnScreen() {
    function truncateText(element, maxLength) {
      const text = element.textContent;
      if (text.length > maxLength) {
        const truncatedText = text.substring(0, maxLength) + ' <span class="read-more">...read more</span>';
        element.textContent = truncatedText;
        console.log(`Truncated text: "${truncatedText}"`);
      }
    }
    function handleTruncate() {
      console.log("Add Truncation");
      const elements = document.querySelectorAll("._14px-glossary");
      const isMobile = window.innerWidth <= 768;
      const maxLength = isMobile ? 160 : 233;
      elements.forEach((element) => truncateText(element, maxLength));
    }
    document.addEventListener("DOMContentLoaded", handleTruncate);
    window.addEventListener("resize", handleTruncate);
  }
  truncateTextBasedOnScreen();
  updateGlossaryAnchors();
})();
//# sourceMappingURL=glossary.js.map
