document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    // Toggle hamburger menu with a slight delay for better animation
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Prevent scrolling when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';

    // Add touch feedback
    hamburger.style.transform = 'scale(0.9)';
    setTimeout(() => {
      hamburger.style.transform = 'scale(1)';
    }, 150);
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Release pagination functionality
  if (document.querySelector('.releases-container')) {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const currentPageElement = document.getElementById('current-page');
    const totalPagesElement = document.getElementById('total-pages');
    const releaseItems = document.querySelectorAll('.release-item');

    // Calculate total pages dynamically based on number of releases
    // Each page can hold up to 8 releases
    const releasesPerPage = 8;
    const totalReleases = releaseItems ? releaseItems.length : 0;
    const totalPages = Math.ceil(totalReleases / releasesPerPage) || 1;

    // Initialize page variables
    let currentPage = 1;
    let isAnimating = false;

    // Set data-page attribute for all release items if not already set
    if (totalReleases > 0 && releaseItems) {
      releaseItems.forEach((item, index) => {
        const pageNum = Math.ceil((index + 1) / releasesPerPage);
        if (!item.getAttribute('data-page')) {
          item.setAttribute('data-page', pageNum);
        }
      });

      // Update total pages in UI
      if (totalPagesElement) {
        totalPagesElement.textContent = totalPages;
      }

      // Create page dots dynamically if needed
      const pageDotContainer = document.querySelector('.page-dots');
      if (pageDotContainer) {
        // Clear existing dots
        pageDotContainer.innerHTML = '';

        // Create new dots based on total pages
        for (let i = 1; i <= totalPages; i++) {
          const dot = document.createElement('span');
          dot.classList.add('dot');
          if (i === 1) dot.classList.add('active');
          dot.setAttribute('data-page', i);
          dot.addEventListener('click', () => {
            if (!isAnimating && currentPage !== i) {
              navigateToPage(i);
            }
          });
          pageDotContainer.appendChild(dot);
        }
      }
    }

    // Initialize page display
    updatePageDisplay();

    // Event listeners for navigation buttons
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (!isAnimating && currentPage > 1) {
          navigateToPage(currentPage - 1);
        }
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (!isAnimating && currentPage < totalPages) {
          navigateToPage(currentPage + 1);
        }
      });
    }

    // Make sure buttons are properly initialized
    updatePageDisplay();

    // Add click event listeners to all dot elements
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const pageNum = parseInt(dot.getAttribute('data-page'), 10);
        if (!isAnimating && currentPage !== pageNum) {
          navigateToPage(pageNum);
        }
      });
    });

    // Function to navigate to a specific page with optimized performance
    function navigateToPage(page) {
      if (isAnimating) return;
      if (page < 1) page = 1;
      if (page > totalPages) page = totalPages;

      isAnimating = true;
      currentPage = page;

      console.log("Navigating to page", page, "of", totalPages);

      // Use requestAnimationFrame for smoother animations
      window.requestAnimationFrame(() => {
        // Hide all release items efficiently with a smooth fade
        releaseItems.forEach(item => {
          item.style.opacity = '0';
          item.style.display = 'none';
          item.classList.remove('active');
        });

        // Show only items for current page with staggered animation
        const currentPageItems = document.querySelectorAll(`.release-item[data-page="${currentPage}"]`);

        // Use a more efficient way to handle staggered animations
        if (currentPageItems.length > 0) {
          currentPageItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.display = 'flex';

              // Use another requestAnimationFrame to ensure CSS transitions work properly
              requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.classList.add('active');

                // Mark animation as complete after the last item
                if (index === currentPageItems.length - 1) {
                  setTimeout(() => {
                    isAnimating = false;
                  }, 100);
                }
              });
            }, Math.min(index * 50, 300)); // Better staggered animation
          });
        } else {
          isAnimating = false;
        }

        // Update dot navigation
        updateDotNavigation();

        // Update navigation buttons state
        updatePageDisplay();

        // Scroll to top of releases grid for better UX
        const releaseCatalog = document.querySelector('.release-catalog');
        if (releaseCatalog) {
          releaseCatalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Function to update the dot navigation based on current page
    function updateDotNavigation() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach(dot => {
        dot.classList.remove('active');
        if (parseInt(dot.getAttribute('data-page'), 10) === currentPage) {
          dot.classList.add('active');
        }
      });
    }

    // Update page number display and button states
    function updatePageDisplay() {
      try {
      if (currentPageElement) {
        currentPageElement.textContent = currentPage;
      }

      if (totalPagesElement) {
        totalPagesElement.textContent = totalPages;
      }

      if (prevButton) {
        prevButton.disabled = currentPage <= 1;
        prevButton.style.opacity = prevButton.disabled ? "0.5" : "1";
        prevButton.classList.toggle("disabled", prevButton.disabled);
      }

      if (nextButton) {
        nextButton.disabled = currentPage >= totalPages;
        nextButton.style.opacity = nextButton.disabled ? "0.5" : "1";
        nextButton.classList.toggle("disabled", nextButton.disabled);
      }

      console.log("Page display updated:", currentPage, "of", totalPages);
      } catch (error) {
        console.error("Error updating page display:", error);
      }
    }

    // Add search and filter functionality
    const searchInput = document.getElementById('release-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';

    if (searchInput) {
      // Add search functionality
      searchInput.addEventListener('input', filterReleases);

      // Add filter functionality
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          currentFilter = button.getAttribute('data-genre');
          filterReleases();
        });
      });
    }

    function filterReleases() {
      const searchTerm = searchInput.value.toLowerCase();
      const releasesContainer = document.getElementById('releases-container');
      const allReleaseItems = document.querySelectorAll('.release-item');

      // Remove existing "no results" message if present
      const existingNoResults = document.querySelector('.no-results');
      if (existingNoResults) {
        existingNoResults.remove();
      }

      let itemsFound = 0;

      allReleaseItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('.release-description').textContent.toLowerCase();
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);

        // Match genre filter
        let matchesGenre = true;
        if (currentFilter !== 'all') {
          matchesGenre = description.includes(currentFilter.toLowerCase());
        }

        if (matchesSearch && matchesGenre) {
          item.classList.remove('filtered-out');
          itemsFound++;
        } else {
          item.classList.add('filtered-out');
        }
      });

      // Show "no results" message if needed
      if (itemsFound === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `No releases found matching "${searchTerm}" ${currentFilter !== 'all' ? `in ${currentFilter}` : ''}. <br> Try a different search term or filter.`;
        releasesContainer.appendChild(noResults);
      }

      // Reset pagination when filtering
      if (searchTerm !== '' || currentFilter !== 'all') {
        // Hide pagination controls
        const paginationControls = document.querySelector('.pagination-controls');
        const releasesNavigation = document.querySelector('.releases-navigation');
        if (paginationControls) paginationControls.style.display = 'none';
        if (releasesNavigation) releasesNavigation.style.display = 'none';

        // Show all matching items
        allReleaseItems.forEach(item => {
          if (!item.classList.contains('filtered-out')) {
            item.style.display = 'flex';
            item.style.opacity = '1';
          } else {
            item.style.display = 'none';
            item.style.opacity = '0';
          }
        });
      } else {
        // Restore pagination when filter is cleared
        const paginationControls = document.querySelector('.pagination-controls');
        const releasesNavigation = document.querySelector('.releases-navigation');
        if (paginationControls) paginationControls.style.display = 'flex';
        if (releasesNavigation) releasesNavigation.style.display = 'flex';

        // Reset to page 1
        navigateToPage(1);
      }
    }

    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
      if (document.querySelector('.releases-container')) {
        if (e.key === 'ArrowLeft' && prevButton && !prevButton.disabled) {
          prevButton.click();
        } else if (e.key === 'ArrowRight' && nextButton && !nextButton.disabled) {
          nextButton.click();
        }
      }
    });

    // Initial setup - make sure only page 1 items are visible
    // Set data attributes for all release items based on their index
    releaseItems.forEach((item, index) => {
      const pageNum = Math.ceil((index + 1) / releasesPerPage);
      item.setAttribute('data-page', pageNum);
    });

    // Make sure navigation works properly
    navigateToPage(1);

    // Force button state update
    if (totalPages > 1 && nextButton) {
      nextButton.disabled = false;
      nextButton.style.opacity = "1";
    }
  }
});