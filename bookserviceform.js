// =======================================================
        // STANDALONE BOOKING SERVICE FORM
        // =======================================================
        document.addEventListener("DOMContentLoaded", () => {
            const bookingForm = document.getElementById("bookingServiceForm");
            const statusMsg = document.getElementById("bookingStatusMsg");
            const dateInput = document.getElementById("startDate");

            // Restrict date picker so users can only pick today or future dates
            if (dateInput) {
                const today = new Date().toISOString().split("T")[0];
                dateInput.min = today;
            }

            if (!bookingForm || !statusMsg) return;

            bookingForm.addEventListener("submit", (e) => {
                e.preventDefault();

                // Check native HTML5 form validity
                if (!bookingForm.checkValidity()) {
                    bookingForm.reportValidity();
                    return;
                }

                // Retrieve field values
                const serviceSelect = document.getElementById("careService");
                const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
                const requesterName = document.getElementById("requesterName").value.trim();

                // Display demonstration confirmation
                statusMsg.hidden = false;
                statusMsg.className = "bk-status-msg is-success";
                statusMsg.innerHTML = `
            <strong><i class="fa-solid fa-circle-check"></i> Demo Consultation Request Received!</strong><br>
            Thank you, <strong>${requesterName}</strong>. Your inquiry for <strong>${serviceText}</strong> 
            has been simulated successfully. No payment or live booking has been made.
        `;

                // Reset the form inputs
                bookingForm.reset();

                // Smooth scroll to the feedback confirmation
                statusMsg.scrollIntoView({behavior: "smooth", block: "nearest"});
            });
        });

        document.addEventListener("DOMContentLoaded", () => {
            // 1. SELECTORS FOR TOGGLE BUTTONS
            const themeToggleBtn = document.getElementById("themeToggle");
            const rtlToggleBtn = document.getElementById("rtlToggle");

            // ==========================================
            // 2. THEME (DARK / LIGHT MODE) LOGIC
            // ==========================================
            const applyTheme = (isDark) => {
                if (isDark) {
                    document.body.classList.add("dark-mode");
                    localStorage.setItem("meridian_theme", "dark");
                    if (themeToggleBtn) {
                        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun" aria-hidden="true"></i>';
                        themeToggleBtn.setAttribute("aria-label", "Switch to light mode");
                    }
                } else {
                    document.body.classList.remove("dark-mode");
                    localStorage.setItem("meridian_theme", "light");
                    if (themeToggleBtn) {
                        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
                        themeToggleBtn.setAttribute("aria-label", "Switch to dark mode");
                    }
                }
            };

            // Load saved theme preference on page load
            const savedTheme = localStorage.getItem("meridian_theme");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            applyTheme(savedTheme === "dark" || (!savedTheme && prefersDark));

            // Theme toggle button click listener
            if (themeToggleBtn) {
                themeToggleBtn.addEventListener("click", () => {
                    const isCurrentlyDark = document.body.classList.contains("dark-mode");
                    applyTheme(!isCurrentlyDark);
                });
            }

            // ==========================================
            // 3. TEXT DIRECTION (RTL / LTR) LOGIC
            // ==========================================
            const applyDirection = (dir) => {
                document.documentElement.setAttribute("dir", dir);
                document.documentElement.setAttribute("lang", dir === "rtl" ? "ar" : "en");
                localStorage.setItem("meridian_direction", dir);

                if (rtlToggleBtn) {
                    if (dir === "rtl") {
                        rtlToggleBtn.classList.add("is-active");
                        rtlToggleBtn.innerHTML = '<i class="fa-solid fa-globe" aria-hidden="true"></i> <span>LTR</span>';
                        rtlToggleBtn.setAttribute("aria-label", "Switch to Left-to-Right direction");
                    } else {
                        rtlToggleBtn.classList.remove("is-active");
                        rtlToggleBtn.innerHTML = '<i class="fa-solid fa-globe" aria-hidden="true"></i> <span>RTL</span>';
                        rtlToggleBtn.setAttribute("aria-label", "Switch to Right-to-Left direction");
                    }
                }
            };

            // Load saved RTL preference on page load
            const savedDir = localStorage.getItem("meridian_direction") || "ltr";
            applyDirection(savedDir);

            // RTL toggle button click listener
            if (rtlToggleBtn) {
                rtlToggleBtn.addEventListener("click", () => {
                    const currentDir = document.documentElement.getAttribute("dir") || "ltr";
                    const newDir = currentDir === "rtl" ? "ltr" : "rtl";
                    applyDirection(newDir);
                });
            }
        });