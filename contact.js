/* ========================================
   SIMPLE HELP FORM
======================================== */

        const helpForm = document.getElementById("helpForm");

        if (helpForm) {
            const helpName = document.getElementById("helpName");
            const helpMessage = document.getElementById("helpMessage");
            const helpFormStatus = document.getElementById("helpFormStatus");

            helpForm.addEventListener("input", (event) => {
                helpFormStatus.textContent = "";

                if (
                    event.target === helpName ||
                    event.target === helpMessage
                ) {
                    event.target.setCustomValidity("");
                }
            });

            helpForm.addEventListener("submit", (event) => {
                event.preventDefault();

                helpName.setCustomValidity("");
                helpMessage.setCustomValidity("");

                if (!helpName.value.trim()) {
                    helpName.setCustomValidity("Please enter your full name.");
                }

                if (!helpMessage.value.trim()) {
                    helpMessage.setCustomValidity("Please enter your message.");
                }

                if (!helpForm.reportValidity()) {
                    return;
                }

                helpFormStatus.textContent =
                    "Demo form checked successfully. " +
                    "Your message has not been sent or saved.";
            });
        }






        