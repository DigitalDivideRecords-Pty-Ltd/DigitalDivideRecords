/* ============================================================================
   DIGITAL DIVIDE RECORDS - PRODUCTION JAVASCRIPT
   Cleaned, modularized, and production-ready
   ============================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initializeHamburgerMenu();
  initializeReleasesPagination();
  initializePromoBanner();
});

/* ============================================================================
   HAMBURGER MENU MODULE
   ============================================================================ */

function initializeHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navMenu.classList.contains('active') &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ============================================================================
   RELEASES PAGINATION MODULE
   ============================================================================ */

function initializeReleasesPagination() {
  const releasesContainer = document.querySelector('.releases-container');

  if (!releasesContainer) return;

  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');
  const currentPageElement = document.getElementById('current-page');
  const totalPagesElement = document.getElementById('total-pages');
  const releaseItems = document.querySelectorAll('.release-item');

  if (releaseItems.length === 0) return;

  const releasesPerPage = 8;
  const totalReleases = releaseItems.length;
  const totalPages = Math.ceil(totalReleases / releasesPerPage) || 1;

  let currentPage = 1;
  let isAnimating = false;

  // Set up data-page attributes
  releaseItems.forEach((item, index) => {
    const pageNum = Math.ceil((index + 1) / releasesPerPage);
    item.setAttribute('data-page', pageNum);
  });

  // Update total pages in UI
  if (totalPagesElement) {
    totalPagesElement.textContent = totalPages;
  }

  // Create pagination dots
  createPaginationDots(totalPages);

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

  // Initialize display
  updatePageDisplay();

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!document.querySelector('.releases-container')) return;

    if (e.key === 'ArrowLeft' && prevButton && !prevButton.disabled) {
      prevButton.click();
    } else if (e.key === 'ArrowRight' && nextButton && !nextButton.disabled) {
      nextButton.click();
    }
  });

  // Navigate to page 1 on load
  navigateToPage(1);

  /* ========== Helper Functions ========== */

  function createPaginationDots(totalPages) {
    const pageDotContainer = document.querySelector('.page-dots');
    if (!pageDotContainer) return;

    pageDotContainer.innerHTML = '';

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

  function navigateToPage(page) {
    if (isAnimating) return;
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    isAnimating = true;
    currentPage = page;

    window.requestAnimationFrame(() => {
      // Hide all items
      releaseItems.forEach(item => {
        item.style.opacity = '0';
        item.style.display = 'none';
        item.classList.remove('active');
      });

      // Show items for current page
      const currentPageItems = document.querySelectorAll(`.release-item[data-page="${currentPage}"]`);

      if (currentPageItems.length > 0) {
        currentPageItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.display = 'flex';

            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.classList.add('active');

              if (index === currentPageItems.length - 1) {
                setTimeout(() => {
                  isAnimating = false;
                }, 100);
              }
            });
          }, Math.min(index * 50, 300));
        });
      } else {
        isAnimating = false;
      }

      // Update UI
      updateDotNavigation();
      updatePageDisplay();

      // Scroll to top
      const releaseCatalog = document.querySelector('.release-catalog');
      if (releaseCatalog) {
        releaseCatalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  function updateDotNavigation() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
      dot.classList.remove('active');
      if (parseInt(dot.getAttribute('data-page'), 10) === currentPage) {
        dot.classList.add('active');
      }
    });
  }

  function updatePageDisplay() {
    if (currentPageElement) {
      currentPageElement.textContent = currentPage;
    }

    if (prevButton) {
      prevButton.disabled = currentPage <= 1;
      prevButton.classList.toggle('disabled', prevButton.disabled);
    }

    if (nextButton) {
      nextButton.disabled = currentPage >= totalPages;
      nextButton.classList.toggle('disabled', nextButton.disabled);
    }
  }

  // Search & Filter Functionality
  const searchInput = document.getElementById('release-search');
  const filterButtons = document.querySelectorAll('.filter-btn');
  let currentFilter = 'all';

  if (searchInput) {
    searchInput.addEventListener('input', filterReleases);

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.getAttribute('data-genre');
        filterReleases();
      });
    });

    function filterReleases() {
      const searchTerm = searchInput.value.toLowerCase();
      const releasesGrid = document.getElementById('releases-container');
      const allReleaseItems = document.querySelectorAll('.release-item');

      // Remove existing "no results" message
      const existingNoResults = document.querySelector('.no-results');
      if (existingNoResults) {
        existingNoResults.remove();
      }

      let itemsFound = 0;

      allReleaseItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const description = item.querySelector('.release-description').textContent.toLowerCase();
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);

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
        noResults.textContent = `No releases found matching "${searchTerm}" ${currentFilter !== 'all' ? `in ${currentFilter}` : ''}. Try a different search term or filter.`;
        releasesGrid.appendChild(noResults);
      }

      // Toggle pagination visibility
      const paginationControls = document.querySelector('.pagination-controls');
      const releasesNavigation = document.querySelector('.releases-navigation');

      if (searchTerm !== '' || currentFilter !== 'all') {
        // Hide pagination when filtering
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
        // Restore pagination when filter cleared
        if (paginationControls) paginationControls.style.display = 'flex';
        if (releasesNavigation) releasesNavigation.style.display = 'flex';
        navigateToPage(1);
      }
    }
  }
}

/* ============================================================================
   PROMOTIONAL BANNER & COUNTDOWN TIMER MODULE
   ============================================================================ */

function initializePromoBanner() {
  const countdownDisplay = document.getElementById('countdownDisplay');
  const statusBadge = document.getElementById('statusBadge');
  const preorderBtn = document.getElementById('preorderBtn');
  const offlineBanner = document.getElementById('offlineBanner');
  const closeOfflineBanner = document.getElementById('closeOfflineBanner');

  // Pre-order & release dates
  const PRE_ORDER_DATE = new Date('2026-10-30T00:00:00Z').getTime();
  const PRE_RELEASE_DATE = new Date('2026-11-13T00:00:00Z').getTime();
  const RELEASE_DATE = new Date('2026-11-27T00:00:00Z').getTime();

  // Storage keys
  const STORAGE_KEYS = {
    offlineDismissed: 'ddr_offline_banner_dismissed'
  };

  /* ========== Countdown Timer ========== */

  function updateCountdown() {
    const now = Date.now();
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
      updateCountdown();
      return;
    }

    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Format display text
    let displayText = '';
    if (phase === 'pre-order') {
      displayText = `<span class="countdown-value">${days}</span><span class="countdown-label">D</span> ` +
        `<span class="countdown-value">${hours}</span><span class="countdown-label">H</span> ` +
        `<span class="countdown-value">${minutes}</span><span class="countdown-label">M</span> ` +
        `<span class="countdown-value">${seconds}</span><span class="countdown-label">S</span>`;
    } else if (phase === 'pre-release' || phase === 'release') {
      displayText = `<span class="countdown-value">${days}</span><span class="countdown-label">D</span> ` +
        `<span class="countdown-value">${hours}</span><span class="countdown-label">H</span> Until Release`;
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

  // Initial update
  updateCountdown();

  // Update every second
  const countdownInterval = setInterval(updateCountdown, 1000);

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(countdownInterval);
  });

  /* ========== Pre-Order Button ========== */

  if (preorderBtn) {
    preorderBtn.addEventListener('click', () => {
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

  /* ========== Offline Banner ========== */

  if (closeOfflineBanner && offlineBanner) {
    closeOfflineBanner.addEventListener('click', () => {
      offlineBanner.style.animation = 'bannerDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) reverse forwards';
      setTimeout(() => {
        offlineBanner.classList.add('hidden');
        safeStorageSet(STORAGE_KEYS.offlineDismissed, 'true');
      }, 500);
    });

    // Check if banner was previously dismissed
    const offlineDismissed = safeStorageGet(STORAGE_KEYS.offlineDismissed);
    if (offlineDismissed === 'true') {
      offlineBanner.classList.add('hidden');
    }

    // Show banner when coming back online
    window.addEventListener('online', () => {
      offlineBanner.classList.remove('hidden');
      offlineBanner.style.animation = 'bannerDown 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
      safeStorageSet(STORAGE_KEYS.offlineDismissed, 'false');
    });
  }

  /* ========== Keyboard Shortcuts ========== */

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'b') {
      event.preventDefault();
      if (offlineBanner) {
        offlineBanner.classList.remove('hidden');
        offlineBanner.style.animation = 'bannerDown 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
      }
    }
  });

  /* ========== Storage Helper Functions ========== */

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
}

/* ========== INITIALIZATION COMPLETE ========== */
console.log('✅ Digital Divide Records app initialized successfully');
