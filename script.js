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
        noResults.textContent = `No releases found matching "${searchTerm}" ${currentFilter !== 'all' ? `in ${currentFilter}` : ''}.`;
        const br = document.createElement('br');
        noResults.appendChild(br);
        noResults.appendChild(document.createTextNode(' Try a different search term or filter.'));
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

window.addEventListener('DOMContentLoaded', function() {
  const upcomingSection = document.querySelector('.upcoming-highlight');
  if (upcomingSection) {
    setTimeout(() => {
      upcomingSection.scrollIntoView({behavior: 'smooth', block: 'center'});
    }, 400);
  }
});

  // ========== START OF PROMO BANNER & COUNTDOWN TIMER JAVASCRIPT CODE ==========
  <script>
    (function () {
      'use strict';

      // ========== STORAGE MANAGEMENT ==========
      const STORAGE_KEYS = {
        offlineDismissed: 'ddr_offline_banner_dismissed'
      };

      function safeStorageGet(key) {
        try {
          return window.localStorage.getItem(key);
        } catch (error) {
          console.warn('localStorage get failed:', error);
          return null;
        }
      }

      function safeStorageSet(key, value) {
        try {
          window.localStorage.setItem(key, String(value));
          return true;
        } catch (error) {
          console.warn('localStorage set failed:', error);
          return false;
        }
      }

      // ========== OFFLINE BANNER MANAGEMENT ==========
      const offlineBanner = document.getElementById('offlineBanner');
      const closeOfflineBanner = document.getElementById('closeOfflineBanner');

      if (closeOfflineBanner && offlineBanner) {
        closeOfflineBanner.addEventListener('click', function () {
          offlineBanner.style.animation = 'bannerDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) reverse forwards';
          setTimeout(function () {
            offlineBanner.classList.add('hidden');
            safeStorageSet(STORAGE_KEYS.offlineDismissed, 'true');
          }, 500);
        });

        const offlineDismissed = safeStorageGet(STORAGE_KEYS.offlineDismissed);
        if (offlineDismissed === 'true') {
          offlineBanner.classList.add('hidden');
        }

        window.addEventListener('online', function () {
          offlineBanner.classList.remove('hidden');
          offlineBanner.style.animation = 'bannerDown 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
          safeStorageSet(STORAGE_KEYS.offlineDismissed, 'false');
        });
      }

      // ========== COUNTDOWN TIMER (FULLY FUNCTIONAL) ==========
      const countdownDisplay = document.getElementById('countdownDisplay');
      const statusBadge = document.getElementById('statusBadge');
      const preorderBtn = document.getElementById('preorderBtn');

      // Pre-order date: October 30, 2026 at 00:00:00 UTC
      const PRE_ORDER_DATE = new Date('2026-10-30T00:00:00Z').getTime();
      const PRE_RELEASE_DATE = new Date('2026-11-13T00:00:00Z').getTime();
      const RELEASE_DATE = new Date('2026-11-27T00:00:00Z').getTime();

      function formatCountdown() {
        const now = Date.now();

        // Determine which phase we're in
        let targetDate, phase;
        if (now < PRE_ORDER_DATE) {
          targetDate = PRE_ORDER_DATE;
          phase = 'pre-order';
        } else if (now < PRE_RELEASE_DATE) {
          targetDate = PRE_RELEASE_DATE;
          phase = 'pre-release';
        } else if (now < RELEASE_DATE) {
          targetDate = RELEASE_DATE;
          phase = 'release';
        } else {
          // Release is live
          if (countdownDisplay) countdownDisplay.textContent = '🎉 Now Available Worldwide!';
          if (statusBadge) statusBadge.textContent = '✅ Released';
          if (preorderBtn) preorderBtn.textContent = 'Now Available';
          return;
        }

        const diff = targetDate - now;

        if (diff <= 0) {
          formatCountdown();
          return;
        }

        // Calculate time units
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        // Format output
        let displayText = '';
        if (phase === 'pre-order') {
          displayText = `<span class="countdown-value">${days}</span><span class="countdown-label">D</span> ` +
                       `<span class="countdown-value">${hours}</span><span class="countdown-label">H</span> ` +
                       `<span class="countdown-value">${minutes}</span><span class="countdown-label">M</span> ` +
                       `<span class="countdown-value">${seconds}</span><span class="countdown-label">S</span>`;
        } else if (phase === 'pre-release') {
          displayText = `<span class="countdown-value">${days}</span><span class="countdown-label">D</span> ` +
                       `<span class="countdown-value">${hours}</span><span class="countdown-label">H</span> ` +
                       `Until Release`;
        } else if (phase === 'release') {
          displayText = `<span class="countdown-value">${days}</span><span class="countdown-label">D</span> ` +
                       `<span class="countdown-value">${hours}</span><span class="countdown-label">H</span> ` +
                       `Until Release`;
        }

        if (countdownDisplay) {
          countdownDisplay.innerHTML = displayText;
        }

        // Update status badge
        if (statusBadge) {
          if (phase === 'pre-order') {
            statusBadge.textContent = `Coming Oct 30 (${days}d)`;
          } else if (phase === 'pre-release') {
            statusBadge.textContent = `Pre-Release Active (${days}d)`;
          } else if (phase === 'release') {
            statusBadge.textContent = `Releasing Soon (${days}d)`;
          }
        }
      }

      // Initial countdown update
      formatCountdown();

      // Update countdown every second
      const countdownInterval = setInterval(formatCountdown, 1000);

      // Cleanup on page unload
      window.addEventListener('beforeunload', function () {
        clearInterval(countdownInterval);
      });

      // ========== PRE-ORDER BUTTON ==========
      if (preorderBtn) {
        preorderBtn.addEventListener('click', function () {
          const now = Date.now();
          let message = '';

          if (now < PRE_ORDER_DATE) {
            message = '🎵 Pre-orders start October 30, 2026.\n\nAvailable on:\n• Beatport\n• Volumo\n\nThank you for your support!';
          } else if (now < PRE_RELEASE_DATE) {
            message = '🎵 Pre-release is now active!\n\nAvailable on:\n• Beatport\n• Volumo\n\nFull release: November 27, 2026';
          } else if (now < RELEASE_DATE) {
            message = '🎵 Pre-release is active!\n\nFull worldwide release coming November 27, 2026';
          } else {
            message = '🎉 Sunsets In S.A is now available worldwide!\n\nAvailable on all major platforms.';
          }

          window.alert(message);
        });
      }

      // ========== KEYBOARD SHORTCUTS ==========
      document.addEventListener('keydown', function (event) {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
          event.preventDefault();
          if (offlineBanner) {
            offlineBanner.classList.remove('hidden');
            offlineBanner.style.animation = 'bannerDown 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
          }
        }
      });

      // ========== INITIALIZATION LOG ==========
      console.log('✅ Digital Divide Records banner system loaded successfully!');
      console.log('⏱️ Countdown timer is active and updating every second');
      console.log('🎹 Keyboard shortcut: Ctrl+B to show offline banner');
      console.log('📅 Pre-Order: Oct 30, 2026');
      console.log('🔓 Pre-Release: Nov 13, 2026');
      console.log('🚀 Full Release: Nov 27, 2026');
    })();
//========== END OF PROMOTIONAL BANNER & COUNTDOWN TIMER JAVASCRIPT CODE ==========
