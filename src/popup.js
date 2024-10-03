const CookieService = {

  setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
      // console.log(`Set cookie: ${name}=${value}; expires=${date.toUTCString()}`);
    } else {
      // console.log(`Set cookie: ${name}=${value}; no expiration`);
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },

  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        // console.log(`Get cookie: ${name}=${c.substring(nameEQ.length, c.length)}`);
        return c.substring(nameEQ.length, c.length);
      }
    }
    // console.log(`Cookie ${name} not found`);
    return null;
  }
};

const hidePopup = () => {
  document.querySelector('.exit-intent-popup-desktop').classList.remove('visible');
  // console.log('Popup hidden');
};


//Simply popup closed
const exit = (e) => {
  if (e.target.className === 'close') {
    hidePopup();
    CookieService.setCookie('exitIntentClosed', true, 2); // Set cookie for 2 days
    // console.log('Exit event triggered');
  }
};

//exit intent mouse above document
const mouseEvent = (e) => {
  const shouldShowExitIntent = !e.toElement && !e.relatedTarget && e.clientY < 10;
  // console.log(`Mouse event detected, should show exit intent: ${shouldShowExitIntent}`);
  if (shouldShowExitIntent && !CookieService.getCookie('exitIntentClosed') && !CookieService.getCookie('formSubmitted')) {
    document.removeEventListener('mouseout', mouseEvent);
    document.querySelector('.exit-intent-popup-desktop').classList.add('visible');
    CookieService.setCookie('exitIntentShown', true, 2); // Set cookie for 2 days
    // console.log('Exit intent popup shown');
  }
};

//
const scrollEvent = () => {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollPosition / scrollHeight) * 100;
  // console.log(`Scroll event detected, scroll percent: ${scrollPercent}%`);
  if (scrollPercent > 15 && !CookieService.getCookie('exitIntentClosed') && !CookieService.getCookie('formSubmitted')) {
    document.removeEventListener('scroll', scrollEvent);
    document.querySelector('.exit-intent-popup-desktop').classList.add('visible');
    CookieService.setCookie('exitIntentShown', true, 2); // Set cookie for 2 days
    // console.log('Exit intent popup shown due to scroll');
  }
};


document.addEventListener('DOMContentLoaded', () => {
  // console.log('DOMContentLoaded event');
  if (!CookieService.getCookie('exitIntentClosed') && !CookieService.getCookie('formSubmitted')) {
    setTimeout(() => {
      if (window.innerWidth > 768) { // Desktop
        document.addEventListener('mouseout', mouseEvent);
        document.addEventListener('click', exit);
        // console.log('Mouseout and click event listeners added for desktop');
      } else { // Mobile and Tablet
        document.addEventListener('scroll', scrollEvent);
        // console.log('Scroll event listener added for mobile/tablet');
      }
    }, 2000);

    // Show popup after 10 seconds if not already shown
    setTimeout(() => {
      if (!CookieService.getCookie('exitIntentShown') && window.innerWidth > 768) {
        const popup = document.querySelector('.exit-intent-popup-desktop');
        if (popup) {
          popup.classList.add('visible');
          // console.log('Popup shown after 10 seconds on desktop');
        } else {
          // console.log('Popup not found after 10 seconds');
        }
      }
    }, 30000);
  }

  // Get all forms with the custom attribute
  const forms = document.querySelectorAll('[data-form-id]');
  // console.log('Number of forms found:', forms.length);

  // Iterate over each form
  forms.forEach(form => {
    const formId = form.getAttribute('data-form-id');
    // console.log('Checking form with ID:', formId);

    // Check if the form has been submitted before
    if (CookieService.getCookie(`formSubmitted_${formId}`)) {
      hidePopup(); // Hide the popup if the form has been submitted before
    } else {
      form.addEventListener('submit', (e) => {
        // e.preventDefault(); // Prevent the default form submission behavior

        // setTimeout(() => {
        //   hidePopup();
        // }, 2000);

        // Set a cookie to indicate that the form has been submitted
        CookieService.setCookie(`formSubmitted_${formId}`, true, 365);

        // console.log(`Form ${formId} submitted, popup hidden`);
      });
    }
  });




  // Close button handler
  document.querySelectorAll('.modal-continue-button, .close').forEach(button => {
    button.addEventListener('click', () => {
      hidePopup();
      CookieService.setCookie('exitIntentClosed', true, 2); // Set cookie for 2 days
      // console.log('Popup closed via button');
    });
  });



});





