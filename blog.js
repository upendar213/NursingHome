// ========================================
        // BLOG CATEGORY FILTERS
        // ========================================

        const blogFilterButtons = document.querySelectorAll(".blog-filter");
        const blogCards = document.querySelectorAll(".blog-card");
        const blogEmptyMessage = document.getElementById("blogEmptyMessage");

        if (
            blogFilterButtons.length > 0 &&
            blogCards.length > 0
        ) {
            const filterBlogArticles = (selectedFilter) => {
                let visibleCount = 0;

                blogCards.forEach((card) => {
                    const cardCategory = card.dataset.category;

                    const shouldShow =
                        selectedFilter === "all" ||
                        cardCategory === selectedFilter;

                    if (shouldShow) {
                        card.hidden = false;
                        visibleCount += 1;
                    } else {
                        card.hidden = true;
                    }
                });

                if (blogEmptyMessage) {
                    blogEmptyMessage.hidden = visibleCount > 0;
                }
            };

            blogFilterButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const selectedFilter = button.dataset.filter;

                    blogFilterButtons.forEach((filterButton) => {
                        const isActive =
                            filterButton === button;

                        filterButton.classList.toggle(
                            "is-active",
                            isActive
                        );

                        filterButton.setAttribute(
                            "aria-pressed",
                            isActive ? "true" : "false"
                        );
                    });

                    filterBlogArticles(selectedFilter);
                });
            });
        }