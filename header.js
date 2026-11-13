const root = document.documentElement;
                const body = document.body;

                const mainNav = document.getElementById("mainNav");
                const homeToggle = document.getElementById("homeToggle");
                const homeDropdown = document.getElementById("homeDropdown");
                const menuToggle = document.getElementById("menuToggle");
                const darkModeToggle = document.getElementById("darkModeToggle");
                const rtlToggle = document.getElementById("rtlToggle");

                const darkIcon = darkModeToggle.querySelector("i");
                const menuIcon = menuToggle.querySelector("i");

                /* ========================================
                   PREFERENCES
                ======================================== */

                function readPreference(key) {
                    try {
                        return localStorage.getItem(key);
                    } catch {
                        return null;
                    }
                }

                function savePreference(key, value) {
                    try {
                        localStorage.setItem(key, value);
                    } catch {
                        // Controls remain usable if storage is unavailable.
                    }
                }

                /* ========================================
                   CURRENT-PAGE HIGHLIGHT
                ======================================== */

                function getPageName(url) {
                    const pathname = new URL(url, window.location.href).pathname;
                    const filename = pathname.split("/").pop();

                    return decodeURIComponent(filename || "index.html").toLowerCase();
                }

                function highlightCurrentPage() {
                    const currentPage = getPageName(window.location.href);
                    const links = mainNav.querySelectorAll(".nav-list a");

                    homeToggle.classList.remove("is-current");

                    links.forEach((link) => {
                        link.removeAttribute("aria-current");

                        if (getPageName(link.href) === currentPage) {
                            link.setAttribute("aria-current", "page");

                            if (link.closest(".home-dropdown")) {
                                homeToggle.classList.add("is-current");
                            }
                        }
                    });
                }

                highlightCurrentPage();

                window.addEventListener("pageshow", highlightCurrentPage);

                /* ========================================
                   DARK MODE
                ======================================== */

                function applyTheme(isDark) {
                    body.classList.toggle("dark-mode", isDark);

                    darkModeToggle.setAttribute("aria-pressed", String(isDark));

                    const label = isDark ? "Enable light mode" : "Enable dark mode";

                    darkModeToggle.setAttribute("aria-label", label);
                    darkModeToggle.title = label;

                    darkIcon.classList.toggle("fa-moon", !isDark);
                    darkIcon.classList.toggle("fa-sun", isDark);
                }

                applyTheme(readPreference("nursing-theme") === "dark");

                darkModeToggle.addEventListener("click", () => {
                    const isDark = !body.classList.contains("dark-mode");

                    applyTheme(isDark);
                    savePreference("nursing-theme", isDark ? "dark" : "light");
                });

                /* ========================================
                   RTL / LTR
                ======================================== */

                function applyDirection(isRTL) {
                    root.dir = isRTL ? "rtl" : "ltr";

                    rtlToggle.setAttribute("aria-pressed", String(isRTL));

                    const label = isRTL
                        ? "Switch to left-to-right layout"
                        : "Switch to right-to-left layout";

                    rtlToggle.setAttribute("aria-label", label);
                    rtlToggle.title = label;
                }

                applyDirection(readPreference("nursing-direction") === "rtl");

                rtlToggle.addEventListener("click", () => {
                    const isRTL = root.dir !== "rtl";

                    applyDirection(isRTL);
                    savePreference("nursing-direction", isRTL ? "rtl" : "ltr");
                });

                /* ========================================
                   HOME DROPDOWN
                ======================================== */

                function setHomeDropdown(isOpen) {
                    homeToggle.setAttribute("aria-expanded", String(isOpen));
                    homeDropdown.hidden = !isOpen;
                }

                homeToggle.addEventListener("click", () => {
                    const isOpen = homeToggle.getAttribute("aria-expanded") === "true";
                    setHomeDropdown(!isOpen);
                });

                /* ========================================
                   MOBILE MENU
                ======================================== */

                function setMobileMenu(isOpen) {
                    mainNav.classList.toggle("is-open", isOpen);

                    menuToggle.setAttribute("aria-expanded", String(isOpen));
                    menuToggle.setAttribute(
                        "aria-label",
                        isOpen ? "Close navigation" : "Open navigation"
                    );

                    menuIcon.classList.toggle("fa-bars", !isOpen);
                    menuIcon.classList.toggle("fa-xmark", isOpen);

                    if (!isOpen) {
                        setHomeDropdown(false);
                    }
                }

                menuToggle.addEventListener("click", () => {
                    setMobileMenu(!mainNav.classList.contains("is-open"));
                });

                mainNav.querySelectorAll("a").forEach((link) => {
                    link.addEventListener("click", () => {
                        setMobileMenu(false);
                    });
                });

                /* ========================================
                   CLOSE CONTROLS
                ======================================== */

                document.addEventListener("click", (event) => {
                    if (!event.target.closest(".home-dropdown")) {
                        setHomeDropdown(false);
                    }

                    if (!event.target.closest(".site-header")) {
                        setMobileMenu(false);
                    }
                });

                homeToggle.closest(".home-dropdown").addEventListener(
                    "focusout",
                    (event) => {
                        const dropdownContainer = homeToggle.closest(".home-dropdown");

                        if (!dropdownContainer.contains(event.relatedTarget)) {
                            setHomeDropdown(false);
                        }
                    }
                );

                document.addEventListener("keydown", (event) => {
                    if (event.key !== "Escape") return;

                    if (homeToggle.getAttribute("aria-expanded") === "true") {
                        setHomeDropdown(false);
                        homeToggle.focus();
                        return;
                    }

                    if (mainNav.classList.contains("is-open")) {
                        setMobileMenu(false);
                        menuToggle.focus();
                    }
                });

                /* Reset menus when the layout breakpoint changes */
                const desktopQuery = window.matchMedia("(min-width: 1201px)");

                desktopQuery.addEventListener("change", () => {
                    setMobileMenu(false);
                });
                //footer 
                /* Update the footer copyright year */
                document.querySelectorAll(".footer-year").forEach((element) => {
                    element.textContent = new Date().getFullYear();
                });



                document.addEventListener("DOMContentLoaded", () => {

                    // 1. ROTATING HEADLINE WORDS
                    const words = document.querySelectorAll(".m-rotating-word");
                    if (words.length > 1) {
                        let currentIndex = 0;
                        setInterval(() => {
                            const currentWord = words[currentIndex];
                            currentWord.classList.remove("is-visible");
                            currentWord.classList.add("is-exiting");

                            currentIndex = (currentIndex + 1) % words.length;
                            const nextWord = words[currentIndex];

                            setTimeout(() => {
                                currentWord.classList.remove("is-exiting");
                            }, 500);

                            nextWord.classList.add("is-visible");
                        }, 2600);
                    }

                    // 2. SCROLL-DRIVEN NUMBER COUNTER ANIMATION
                    const counterElements = document.querySelectorAll(".m-count-up");
                    if (counterElements.length > 0) {
                        let counterStarted = false;

                        const animateCounters = () => {
                            counterElements.forEach((el) => {
                                const target = parseInt(el.getAttribute("data-target"), 10);
                                const duration = 1800;
                                const stepTime = 20;
                                const totalSteps = duration / stepTime;
                                const increment = target / totalSteps;
                                let current = 0;

                                const timer = setInterval(() => {
                                    current += increment;
                                    if (current >= target) {
                                        el.textContent = target.toLocaleString();
                                        clearInterval(timer);
                                    } else {
                                        el.textContent = Math.floor(current).toLocaleString();
                                    }
                                }, stepTime);
                            });
                        };

                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting && !counterStarted) {
                                    counterStarted = true;
                                    animateCounters();
                                }
                            });
                        }, {threshold: 0.3});

                        const counterSection = document.querySelector(".m-counter-bar");
                        if (counterSection) observer.observe(counterSection);
                    }

                    // 3. INTERACTIVE CONDITION TAB SWITCHER
                    const tabPills = document.querySelectorAll(".m-tab-pill");
                    const tabPanels = document.querySelectorAll(".m-tab-panel");

                    if (tabPills.length > 0 && tabPanels.length > 0) {
                        tabPills.forEach((pill) => {
                            pill.addEventListener("click", () => {
                                const targetId = pill.getAttribute("data-tab");

                                tabPills.forEach((p) => {
                                    p.classList.remove("is-active");
                                    p.setAttribute("aria-selected", "false");
                                });
                                pill.classList.add("is-active");
                                pill.setAttribute("aria-selected", "true");

                                tabPanels.forEach((panel) => {
                                    if (panel.id === targetId) {
                                        panel.classList.add("is-active");
                                    } else {
                                        panel.classList.remove("is-active");
                                    }
                                });
                            });
                        });
                    }

                    // 4. TESTIMONIAL SLIDER CAROUSEL
                    const slides = document.querySelectorAll(".m-slide");
                    const dots = document.querySelectorAll(".m-dot");
                    const prevBtn = document.getElementById("sliderPrev");
                    const nextBtn = document.getElementById("sliderNext");

                    if (slides.length > 0) {
                        let activeIndex = 0;

                        const showSlide = (index) => {
                            if (index < 0) activeIndex = slides.length - 1;
                            else if (index >= slides.length) activeIndex = 0;
                            else activeIndex = index;

                            slides.forEach((s, idx) => {
                                s.classList.toggle("is-active", idx === activeIndex);
                            });

                            dots.forEach((d, idx) => {
                                d.classList.toggle("is-active", idx === activeIndex);
                            });
                        };

                        if (prevBtn) prevBtn.addEventListener("click", () => showSlide(activeIndex - 1));
                        if (nextBtn) nextBtn.addEventListener("click", () => showSlide(activeIndex + 1));

                        dots.forEach((dot) => {
                            dot.addEventListener("click", () => {
                                const targetIdx = parseInt(dot.getAttribute("data-index"), 10);
                                showSlide(targetIdx);
                            });
                        });

                        setInterval(() => {
                            showSlide(activeIndex + 1);
                        }, 5000);
                    }

                });
