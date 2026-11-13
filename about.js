// =======================================================
        // PREMIUM EDITORIAL ABOUT PAGE ANIMATIONS
        // =======================================================
        document.addEventListener("DOMContentLoaded", () => {

            // 1. HERO TEXT LINE REVEAL
            const heroLines = document.querySelectorAll(".about-hero-title .about-line");

            if (heroLines.length > 0) {
                heroLines.forEach((line, index) => {
                    line.style.opacity = "0";
                    line.style.transform = "translateY(35px)";
                    line.style.transition = "opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";

                    setTimeout(() => {
                        line.style.opacity = "1";
                        line.style.transform = "translateY(0)";
                    }, 200 + (index * 180));
                });
            }

            // 2. SCROLL REVEAL FOR SECTIONS
            const revealItems = document.querySelectorAll(".about-reveal, .about-value-item, .about-timeline, .about-trust-band");

            if (revealItems.length > 0) {
                const revealObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            revealObserver.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.18,
                    rootMargin: "0px 0px -45px 0px"
                });

                revealItems.forEach((item) => revealObserver.observe(item));
            }

            // 3. STAGGERED VALUE ITEM ANIMATION
            const valueItems = document.querySelectorAll(".about-value-item");

            if (valueItems.length > 0) {
                const valueObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const items = Array.from(valueItems);
                            const itemIndex = items.indexOf(entry.target);

                            setTimeout(() => {
                                entry.target.classList.add("is-visible");
                            }, itemIndex * 150);

                            valueObserver.unobserve(entry.target);
                        }
                    });
                }, {
                    threshold: 0.3
                });

                valueItems.forEach((item) => valueObserver.observe(item));
            }

            // 4. ANIMATED COUNTERS + PROGRESS LINES
            const counterElements = document.querySelectorAll(".m-count-up");
            const trustBand = document.querySelector(".about-trust-band");

            if (counterElements.length > 0 && trustBand) {
                let countersStarted = false;

                const animateCounters = () => {
                    counterElements.forEach((element) => {
                        const target = parseInt(element.getAttribute("data-target"), 10);
                        const duration = 1800;
                        const stepTime = 20;
                        const totalSteps = duration / stepTime;
                        const increment = target / totalSteps;
                        let currentValue = 0;

                        const timer = setInterval(() => {
                            currentValue += increment;

                            if (currentValue >= target) {
                                element.textContent = target.toLocaleString();
                                clearInterval(timer);
                            } else {
                                element.textContent = Math.floor(currentValue).toLocaleString();
                            }
                        }, stepTime);
                    });
                };

                const counterObserver = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !countersStarted) {
                            countersStarted = true;
                            trustBand.classList.add("is-visible");
                            animateCounters();
                        }
                    });
                }, {
                    threshold: 0.35
                });

                counterObserver.observe(trustBand);
            }

        });