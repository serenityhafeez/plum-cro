document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".form-block-wrapper");
    const nextButton = document.querySelector(".next-get-quote");
    const backButton = document.querySelector(".go-back-get-quote");
    const submitButton = document.querySelector(".submit-get-quote");

    const freeEmailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
    const lastStepElements = document.querySelectorAll(".last-step");
    const switchToBizElements = document.querySelectorAll(".switch-to-biz");

    let currentStep = 0;
    let isBusinessEmail = false;
    let contactCreated = false;

    const backendEndpoint = "https://backend-eoqisywzm-mohammed-hafeezs-projects.vercel.app/api/hubspot";




    // Show loading indicator
    function showLoading(isLoading) {
        const loader = document.querySelector(".loading-indicator");
        const submitText = document.querySelector(".submit-text");
        const loaderGq = document.querySelector(".loader-gq");

        if (loader) {
            loader.style.display = isLoading ? "block" : "none";
        }

        if (submitText && loaderGq) {
            if (isLoading) {
                submitText.classList.add("hidden"); // Add .hidden class to .submit-text
                loaderGq.classList.remove("hidden"); // Remove .hidden class from .loader-gq
            } else {
                submitText.classList.remove("hidden"); // Remove .hidden class from .submit-text
                loaderGq.classList.add("hidden"); // Add .hidden class to .loader-gq
            }
        }
    }

    function setLastStepFieldsNil() {
        // Ensure nil options are only created for business email users
        if (!isBusinessEmail) {
            console.log("Skipping setting nil options for free email.");
            return; // Exit the function early for free email domains
        }

        const companyTypeSelect = document.getElementById("company_registration_type_gq");
        if (companyTypeSelect && companyTypeSelect.value.trim() === "") {
            addNilOption(companyTypeSelect);
            companyTypeSelect.value = "nil";
        }

        const nilRadio = document.querySelector('input[type="radio"][value="nil"]');
        if (nilRadio) nilRadio.checked = true;

        const industrySelect = document.getElementById("industry_gq");
        if (industrySelect && industrySelect.value.trim() === "") {
            addNilOption(industrySelect);
            industrySelect.value = "nil";
        }

        // For Step 3 fields if business email
        if (currentStep === 2) {
            const stepThreeFields = steps[2].querySelectorAll("select[name], input[name], textarea[name]");
            stepThreeFields.forEach((field) => {
                if (field.tagName === "SELECT" && field.value.trim() === "") {
                    addNilOption(field);
                    field.value = "nil";
                } else if (field.type === "radio" && !steps[2].querySelector(`input[name="${field.name}"]:checked`)) {
                    const nilOption = steps[2].querySelector(`input[name="${field.name}"][value="nil"]`);
                    if (!nilOption) {
                        const nilRadio = document.createElement("input");
                        nilRadio.type = "radio";
                        nilRadio.name = field.name;
                        nilRadio.value = "nil";
                        steps[2].appendChild(nilRadio);
                    }
                    steps[2].querySelector(`input[name="${field.name}"][value="nil"]`).checked = true;
                }
            });
        }
    }

    // Helper to add a "nil" option to a select element (only for business emails)
    function addNilOption(selectElement) {
        // Prevent showing nil in the frontend by ensuring it is not created if already present
        if (!Array.from(selectElement.options).some(option => option.value === "nil")) {
            const nilOption = document.createElement("option");
            nilOption.value = "nil";
            nilOption.textContent = ""; // Empty text ensures nil isn't visible in the frontend
            selectElement.appendChild(nilOption);
        }
    }


    function collectStepData() {
        const currentFormStep = steps[currentStep];
        const fields = currentFormStep.querySelectorAll("input[name], select[name], textarea[name]");
        const data = {};

        fields.forEach((field) => {
            if (field.name) {
                if (field.type === "radio" && !field.checked) return; // Skip unchecked radios
                data[field.name] = field.value.trim();
            }
        });

        const emailField = document.querySelector("input[type='email']");
        if (emailField) {
            data.email = emailField.value.trim();
        }

        console.log("Collected Step Data:", data); // Debug collected data
        return data;
    }

    function validateStep() {
        const currentFormStep = steps[currentStep];
        const requiredFields = currentFormStep.querySelectorAll("[required]");
        let isValid = true;

        requiredFields.forEach((field) => {
            const errorMessage = field.closest(".form-input-holder").querySelector(".required-field");
            const isFieldEmpty = field.type === "radio"
                ? !currentFormStep.querySelector(`input[name="${field.name}"]:checked`)
                : !field.value.trim();

            if (isFieldEmpty) {
                errorMessage.classList.add("visible");
                isValid = false;
            } else {
                errorMessage.classList.remove("visible");
            }

            field.addEventListener("input", () => errorMessage.classList.remove("visible"));
        });

        return isValid;
    }

    async function checkIfContactExists(email) {
        const url = `${backendEndpoint}?email=${encodeURIComponent(email)}`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            // Parse the response body
            const responseBody = await response.json();
            console.log("GET Response Status:", response.status);
            console.log("GET Response Body:", responseBody);

            // Check the contactExists field in the response body
            if (responseBody.contactExists === true) {
                console.log("Contact exists (contactExists: true)."); // Debug log
                return true; // Contact exists
            }

            if (responseBody.contactExists === false) {
                console.log("Contact does not exist (contactExists: false)."); // Debug log
                return false; // Contact does not exist
            }

            // Handle unexpected cases
            console.error("Unexpected response body or format:", responseBody);
            return false; // Assume contact does not exist on unexpected format
        } catch (error) {
            console.error("Error during contact existence check:", error.message);
            return false; // Assume contact does not exist on error
        }
    }

    async function sendDataToBackend(data, isCreate) {
        const method = isCreate ? "POST" : "PATCH";

        const payload = {
            email: data.email,
            properties: { ...data },
        };

        console.log("Sending Payload:", payload); // Debug payload

        try {
            showLoading(true);
            const response = await fetch(backendEndpoint, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || `Failed: ${response.statusText}`);
            }

            console.log(`${method} Successful:`, result);
            return result;
        } catch (error) {
            console.error("Error submitting data:", error.message);
            throw error;
        }
        finally {
            showLoading(false); // Hide the loading indicator after the operation
        }
    }



    //Handle email input
    function handleEmailInput() {
        const emailField = steps[0].querySelector("input[type='email']");

        // Ensure `lastStepElements` and `switchToBizElements` are hidden initially
        lastStepElements.forEach((el) => el.classList.add("remove"));

        emailField.addEventListener("input", () => {
            const emailValue = emailField.value.trim();
            const domain = emailValue.split("@")[1]?.toLowerCase(); // Extract the domain after "@"

            if (domain && freeEmailDomains.includes(domain)) {
                isBusinessEmail = false; // Free email domain
                lastStepElements.forEach((el) => el.classList.remove("remove"));
                switchToBizElements.forEach((el) => el.classList.add("visible"));
            } else if (domain) {
                isBusinessEmail = true; // Business email domain
                switchToBizElements.forEach((el) => el.classList.remove("visible"));
                lastStepElements.forEach((el) => el.classList.add("remove"));
            } else {
                isBusinessEmail = false; // Incomplete or invalid input
                lastStepElements.forEach((el) => el.classList.add("remove"));
                switchToBizElements.forEach((el) => el.classList.add("remove"));
            }

            setLastStepFieldsNil();

            // Update the button visibility dynamically
            showStep(currentStep);
        });
    }

    function showStep(stepIndex) {
        steps.forEach((step, index) => step.classList.toggle("hidden", index !== stepIndex));
        backButton.classList.toggle("visible", stepIndex > 0);

        // Logic for showing or hiding buttons based on the step and email type
        if (stepIndex === 1 && isBusinessEmail) {
            nextButton.style.display = "none"; // Hide Next button
            submitButton.classList.add("visible"); // Show Submit button
        } else {
            nextButton.style.display = (stepIndex === steps.length - 1 || (stepIndex === 1 && isBusinessEmail)) ? "none" : "inline-block";
            submitButton.classList.toggle("visible", stepIndex === steps.length - 1 || (stepIndex === 1 && isBusinessEmail));
        }
    }

    nextButton.addEventListener("click", async () => {
        if (validateStep()) {
            const data = collectStepData();

            if (currentStep === 0 && !contactCreated) {
                console.log("Checking if contact exists for email:", data.email);
                const exists = await checkIfContactExists(data.email);

                if (exists) {
                    console.log("Contact exists, sending PATCH...");
                    await sendDataToBackend(data, false); // PATCH
                } else {
                    console.log("Contact does not exist, sending POST...");
                    await sendDataToBackend(data, true); // POST
                    contactCreated = true;
                }
            } else {
                console.log("Sending PATCH for step data...");
                await sendDataToBackend(data, false); // PATCH
            }

            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        }
    });

    submitButton.addEventListener("click", async () => {
        if (validateStep()) {
            const data = collectStepData();
            console.log("Submitting final data with PATCH...");
            await sendDataToBackend(data, false); // PATCH
            console.log("Form submitted successfully!");
            // triggerRevenueHero();
        }
    });


    backButton.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });

    setLastStepFieldsNil();
    showStep(currentStep);
    handleEmailInput();
});



