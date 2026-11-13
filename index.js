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