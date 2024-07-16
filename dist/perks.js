"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/perks.js
  document.addEventListener("DOMContentLoaded", function() {
    const flipCardElements = document.querySelectorAll(".flip-card");
    const lockedElements = document.querySelectorAll(".locked");
    const unlockedElements = document.querySelectorAll(".unlocked");
    const animation = lottie.loadAnimation({
      container: document.getElementById("lottieAnimationID"),
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "https://uploads-ssl.webflow.com/63413ad4dec8a91fe53f4fb0/66963677c035e42a9e6dafd3_Lock.json"
      // Replace with the file path to your Lottie JSON file
    });
    function playAnimation() {
      animation.play();
    }
    function pauseAnimation() {
      animation.pause();
    }
    function stopAnimation() {
      animation.stop();
      animation.goToAndStop(0, true);
    }
    flipCardElements.forEach((flipCard) => {
      flipCard.classList.add("hover-disabled");
    });
    pauseAnimation();
    var toggle = document.querySelector(".toggle-container");
    var handle = document.querySelector(".toggle-handle");
    var label = document.querySelector(".toggle-label");
    if (!toggle || !handle || !label) {
      console.error("One or more elements are missing:");
      if (!toggle)
        console.error("Missing .toggle-container");
      if (!handle)
        console.error("Missing .toggle-handle");
      if (!label)
        console.error("Missing .toggle-label");
      return;
    }
    var isDragging = false;
    var startX = 0;
    var currentX = 0;
    toggle.addEventListener("mousedown", startDrag, false);
    document.addEventListener("mousemove", onDrag, false);
    document.addEventListener("mouseup", endDrag, false);
    toggle.addEventListener("touchstart", startDrag, false);
    document.addEventListener("touchmove", onDrag, false);
    document.addEventListener("touchend", endDrag, false);
    function enableFlipCards() {
      flipCardElements.forEach((flipCard) => {
        flipCard.classList.remove("hover-disabled");
        flipCard.classList.add("hover-enabled");
      });
      lockedElements.forEach((locked) => {
        locked.classList.add("hide");
        scrolledDown.classList.add("hide");
      });
      unlockedElements.forEach((unlocked) => {
        unlocked.classList.remove("hide");
      });
    }
    function startDrag(evt) {
      isDragging = true;
      startX = evt.type.includes("touch") ? evt.touches[0].clientX : evt.clientX;
      handle.style.transition = "none";
    }
    function onDrag(evt) {
      if (!isDragging)
        return;
      currentX = evt.type.includes("touch") ? evt.touches[0].clientX : evt.clientX;
      var diffX = Math.min(Math.max(currentX - startX, 0), toggle.offsetWidth - handle.offsetWidth);
      handle.style.transform = `translateX(${diffX}px)`;
      toggle.style.opacity = 1 - diffX / (toggle.offsetWidth - handle.offsetWidth);
    }
    function endDrag() {
      if (!isDragging)
        return;
      isDragging = false;
      handle.style.transition = "transform 0.3s";
      if (currentX - startX > toggle.offsetWidth / 2) {
        handle.style.transform = `translateX(${toggle.offsetWidth - handle.offsetWidth}px)`;
        playAnimation();
        setTimeout(function() {
          toggle.style.transition = "opacity 0.3s";
          toggle.style.opacity = "0";
          setTimeout(function() {
            toggle.style.display = "none";
            enableFlipCards();
          }, 300);
        }, 0);
      } else {
        handle.style.transform = "translateX(0)";
        toggle.style.opacity = "1";
        label.textContent = "swipe to unlock";
      }
    }
  });
})();
//# sourceMappingURL=perks.js.map
