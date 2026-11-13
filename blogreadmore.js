// =======================================================
        // BLOG DETAILS: SCROLLSPY TABLE OF CONTENTS
        // =======================================================
        document.addEventListener("DOMContentLoaded", () => {
            const articles = document.querySelectorAll(".bd-article");
            const tocLinks = document.querySelectorAll(".bd-toc-link");

            if (articles.length === 0 || tocLinks.length === 0) return;

            const observerOptions = {
                root: null,
                rootMargin: "-25% 0px -65% 0px",
                threshold: 0
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const currentId = entry.target.getAttribute("id");

                        tocLinks.forEach((link) => {
                            const href = link.getAttribute("href").replace("#", "");
                            if (href === currentId) {
                                link.classList.add("is-active");
                                link.setAttribute("aria-current", "true");
                            } else {
                                link.classList.remove("is-active");
                                link.removeAttribute("aria-current");
                            }
                        });
                    }
                });
            }, observerOptions);

            articles.forEach((article) => observer.observe(article));
        });