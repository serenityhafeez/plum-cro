"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/get-quote-form.js
  document.addEventListener("DOMContentLoaded", function() {
    const steps = document.querySelectorAll(".form-block-wrapper");
    const nextButton = document.querySelector(".next-get-quote");
    const backButton = document.querySelector(".go-back-get-quote");
    const submitButton = document.querySelector(".submit-get-quote");
    const freeEmailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    const lastStepElements = document.querySelectorAll(".last-step");
    const switchToBizElements = document.querySelectorAll(".switch-to-biz");
    let currentStep = 0;
    let isBusinessEmail = false;
    function validateField(field) {
      const errorMessage = field.closest(".form-input-holder").querySelector(".required-field");
      if (field.type === "radio") {
        const radioGroup = field.closest(".form-block-wrapper").querySelectorAll(
          `input[name="${field.name}"]`
        );
        const isChecked = Array.from(radioGroup).some((radio) => radio.checked);
        errorMessage.classList.toggle("visible", !isChecked);
        return isChecked;
      } else if (field.tagName === "SELECT") {
        const isEmpty = field.value.trim() === "";
        errorMessage.classList.toggle("visible", isEmpty);
        return !isEmpty;
      } else {
        const isEmpty = !field.value.trim();
        errorMessage.classList.toggle("visible", isEmpty);
        return !isEmpty;
      }
    }
    function setupValidationListeners() {
      steps.forEach((step) => {
        const inputs = step.querySelectorAll('input[type="text"], input[type="email"]');
        inputs.forEach((input) => {
          input.addEventListener("input", () => {
            if (input.value.trim()) {
              const errorMessage = input.closest(".form-input-holder").querySelector(".required-field");
              errorMessage.classList.remove("visible");
            }
          });
        });
        const selects = step.querySelectorAll("select");
        selects.forEach((select) => {
          select.addEventListener("change", () => {
            if (select.value.trim()) {
              const errorMessage = select.closest(".form-input-holder").querySelector(".required-field");
              errorMessage.classList.remove("visible");
            }
          });
        });
        const radioGroups = /* @__PURE__ */ new Set();
        const radioButtons = step.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radio) => {
          radioGroups.add(radio.name);
        });
        radioGroups.forEach((groupName) => {
          const radios = step.querySelectorAll(`input[type="radio"][name="${groupName}"]`);
          radios.forEach((radio) => {
            radio.addEventListener("change", () => {
              const errorMessage = radio.closest(".form-input-holder").querySelector(".required-field");
              errorMessage.classList.remove("visible");
            });
          });
        });
      });
    }
    function validateStep() {
      const currentFormStep = steps[currentStep];
      const requiredFields = currentFormStep.querySelectorAll("[required]");
      let isValid = true;
      requiredFields.forEach((field) => {
        const errorMessage = field.closest(".form-input-holder").querySelector(".required-field");
        if (field.type === "radio") {
          const radioGroup = currentFormStep.querySelectorAll(
            `input[name="${field.name}"]`
          );
          const isChecked = Array.from(radioGroup).some((radio) => radio.checked);
          if (!isChecked) {
            errorMessage.classList.add("visible");
            isValid = false;
          }
        } else if (field.tagName === "SELECT") {
          if (field.value.trim() === "") {
            errorMessage.classList.add("visible");
            isValid = false;
          }
        } else if (!field.value.trim()) {
          errorMessage.classList.add("visible");
          isValid = false;
        }
      });
      return isValid;
    }
    function showStep(stepIndex) {
      steps.forEach((step, index) => {
        if (index === stepIndex) {
          step.classList.remove("hidden");
        } else {
          step.classList.add("hidden");
        }
      });
      backButton.classList.toggle("visible", stepIndex > 0);
      if (isBusinessEmail && stepIndex === 1) {
        nextButton.style.display = "none";
        submitButton.classList.add("visible");
      } else if (!isBusinessEmail && stepIndex === steps.length - 1) {
        nextButton.style.display = "none";
        submitButton.classList.add("visible");
      } else {
        nextButton.style.display = "inline-block";
        submitButton.classList.remove("visible");
      }
    }
    function markLastStepFieldsNil() {
      const companyTypeSelect = document.getElementById("company-type");
      if (companyTypeSelect) {
        if (!Array.from(companyTypeSelect.options).some((option) => option.value === "nil")) {
          const nilOption = document.createElement("option");
          nilOption.value = "nil";
          nilOption.textContent = "Nil";
          companyTypeSelect.appendChild(nilOption);
        }
        companyTypeSelect.value = "nil";
      }
      const nilRadio = document.querySelector('input[type="radio"][value="nil"]');
      if (nilRadio) {
        nilRadio.checked = true;
      }
      const industrySelect = document.getElementById("industry");
      if (industrySelect) {
        if (!Array.from(industrySelect.options).some((option) => option.value === "nil")) {
          const nilOption = document.createElement("option");
          nilOption.value = "nil";
          nilOption.textContent = "Nil";
          industrySelect.appendChild(nilOption);
        }
        industrySelect.value = "nil";
      }
    }
    function resetLastStepFields() {
      const companyTypeSelect = document.getElementById("company-type");
      if (companyTypeSelect) {
        const nilOption = companyTypeSelect.querySelector('option[value="nil"]');
        if (nilOption) {
          nilOption.remove();
        }
        companyTypeSelect.value = "";
      }
      const nilRadio = document.querySelector('input[type="radio"][value="nil"]');
      if (nilRadio) {
        nilRadio.checked = false;
      }
      const industrySelect = document.getElementById("industry");
      if (industrySelect) {
        const nilOption = industrySelect.querySelector('option[value="nil"]');
        if (nilOption) {
          nilOption.remove();
        }
        industrySelect.value = "";
      }
    }
    function handleEmailInput() {
      const emailField = steps[0].querySelector("input[type='email']");
      emailField.addEventListener("input", function() {
        const emailValue = emailField.value.trim();
        isBusinessEmail = !freeEmailDomains.includes(emailValue.split("@")[1]);
        if (isBusinessEmail) {
          lastStepElements.forEach((el) => el.classList.add("remove"));
          switchToBizElements.forEach((el) => el.classList.remove("visible"));
        } else {
          resetLastStepFields();
          lastStepElements.forEach((el) => el.classList.remove("remove"));
          switchToBizElements.forEach((el) => el.classList.add("visible"));
        }
      });
    }
    nextButton.addEventListener("click", function() {
      if (validateStep()) {
        if (currentStep === 0 && isBusinessEmail) {
          markLastStepFieldsNil();
        }
        if (currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
        }
      }
    });
    backButton.addEventListener("click", function() {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
    submitButton.addEventListener("click", function() {
      if (validateStep()) {
        console.log("Form Submitted Successfully!");
      }
    });
    steps.forEach((step, index) => {
      if (index > 0) {
        step.classList.add("hidden");
      }
    });
    handleEmailInput();
    setupValidationListeners();
  });
})();
//# sourceMappingURL=get-quote-form.js.map
