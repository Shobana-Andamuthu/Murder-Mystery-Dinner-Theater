/**
 * THE GRAND ENIGMA — MURDER MYSTERY DINNER THEATER
 * Master JavaScript Foundation
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Theme (Light / Dark Mode) Management
  // -------------------------------------------------------------------------
  const THEME_KEY = 'grand_enigma_theme';
  const htmlRoot = document.documentElement;

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    // Default to dark mode for Murder Mystery Dinner Theater theatrical atmosphere
    return 'dark';
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update all theme toggle buttons across desktop & mobile
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    themeToggles.forEach((btn) => {
      const isDark = theme === 'dark';
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
      btn.setAttribute('title', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');      // Update icon SVG
      if (isDark) {
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
          </svg>
        `;
      } else {
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.29 1.29c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.29 1.29c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-1.29-1.29zm1.41-12.37c-.39-.39-1.02-.39-1.41 0l-1.29 1.29c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.29-1.29c.39-.39.39-1.02 0-1.41zM7.28 16.95a.996.996 0 0 0-1.41 0l-1.29 1.29a.996.996 0 1 0 1.41 1.41l1.29-1.29c.38-.39.38-1.03 0-1.41z"/>
          </svg>
        `;
      }
    });

    // Update branding logos between Dark and Light mode for optimum contrast
    const isDark = theme === 'dark';
    const targetLogo = isDark ? 'assets/images/branding/logo.svg' : 'assets/images/branding/logo-light.svg';
    const targetEmblem = isDark ? 'assets/images/branding/logo-emblem.svg' : 'assets/images/branding/logo-emblem-light.svg';

    document.querySelectorAll('.navbar-logo-img, .mobile-drawer-logo, .footer-logo-img, .dash-topbar-brand-logo').forEach((img) => {
      img.src = targetLogo;
    });

    const faviconLink = document.querySelector('link[rel="icon"]');
    if (faviconLink) {
      faviconLink.href = targetEmblem;
    }
  }

  // Initialize Theme immediately
  applyTheme(getPreferredTheme());

  // -------------------------------------------------------------------------
  // 2. RTL / LTR Direction Management
  // -------------------------------------------------------------------------
  const DIR_KEY = 'grand_enigma_dir';

  function getPreferredDir() {
    return localStorage.getItem(DIR_KEY) || 'ltr';
  }

  function applyDir(dir) {
    htmlRoot.setAttribute('dir', dir);
    localStorage.setItem(DIR_KEY, dir);

    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
    rtlToggles.forEach((btn) => {
      const textElem = btn.querySelector('.rtl-toggle-text');
      if (textElem) {
        textElem.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left to Right' : 'Switch to Right to Left');
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to Left to Right' : 'Switch to Right to Left');
    });
  }

  // Initialize Direction immediately
  applyDir(getPreferredDir());

  // -------------------------------------------------------------------------
  // 3. Document Ready Initialization
  // -------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    // A. Theme Toggle Event Listeners
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    });

    // B. RTL Toggle Event Listeners
    document.querySelectorAll('.rtl-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const currentDir = htmlRoot.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyDir(nextDir);
      });
    });

    // C. Sticky Header (Static solid glass styling, zero jitter on scroll)
    // Master header maintains fixed position without dynamic state changes

    // D. Desktop Home Dropdown Click & Keyboard Toggle
    const desktopDropdown = document.querySelector('.nav-item.dropdown');
    if (desktopDropdown) {
      const toggleLink = desktopDropdown.querySelector('.dropdown-toggle');
      if (toggleLink) {
        toggleLink.addEventListener('click', (e) => {
          // If on a touch-enabled screen or clicking explicitly
          e.preventDefault();
          const isOpen = desktopDropdown.classList.contains('is-open');
          desktopDropdown.classList.toggle('is-open', !isOpen);
          toggleLink.setAttribute('aria-expanded', !isOpen);
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
          if (!desktopDropdown.contains(e.target)) {
            desktopDropdown.classList.remove('is-open');
            toggleLink.setAttribute('aria-expanded', 'false');
          }
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && desktopDropdown.classList.contains('is-open')) {
            desktopDropdown.classList.remove('is-open');
            toggleLink.setAttribute('aria-expanded', 'false');
            toggleLink.focus();
          }
        });
      }
    }

    // E. Mobile Navigation Drawer Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const mobileBackdrop = document.querySelector('.mobile-drawer-backdrop');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');

    function openMobileDrawer() {
      if (!mobileDrawer || !mobileBackdrop) return;
      // Ensure dropdowns start in closed state
      document.querySelectorAll('.mobile-nav-item.dropdown').forEach((item) => {
        item.classList.remove('is-open');
        const btn = item.querySelector('.mobile-dropdown-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      mobileDrawer.classList.add('is-active');
      mobileBackdrop.classList.add('is-active');
      if (mobileToggle) {
        mobileToggle.classList.add('is-active');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
      document.body.classList.add('drawer-is-open');
      document.documentElement.classList.add('drawer-is-open');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
      if (!mobileDrawer || !mobileBackdrop) return;
      mobileDrawer.classList.remove('is-active');
      mobileBackdrop.classList.remove('is-active');
      if (mobileToggle) {
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
      document.body.classList.remove('drawer-is-open');
      document.documentElement.classList.remove('drawer-is-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      // Reset all mobile dropdown accordions to closed state
      document.querySelectorAll('.mobile-nav-item.dropdown').forEach((item) => {
        item.classList.remove('is-open');
        const btn = item.querySelector('.mobile-dropdown-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }

    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer && mobileDrawer.classList.contains('is-active');
        if (isOpen) {
          closeMobileDrawer();
        } else {
          openMobileDrawer();
        }
      });
    }

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', closeMobileDrawer);
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMobileDrawer);
      mobileBackdrop.addEventListener('touchmove', (e) => {
        e.preventDefault();
      }, { passive: false });
    }

    // Auto close drawer when tapping non-dropdown navigation links
    if (mobileDrawer) {
      mobileDrawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          closeMobileDrawer();
        });
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-active')) {
        closeMobileDrawer();
      }
    });

    // F. Mobile Accordion for Home Dropdown (Starts closed, toggles on click)
    document.querySelectorAll('.mobile-nav-item.dropdown').forEach((item) => {
      const btn = item.querySelector('.mobile-dropdown-btn');
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = item.classList.contains('is-open');
        item.classList.toggle('is-open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    });

    // G. Back-to-Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
      const toggleBackToTop = () => {
        if (window.scrollY > 350) {
          backToTopBtn.classList.add('is-visible');
        } else {
          backToTopBtn.classList.remove('is-visible');
        }
      };

      window.addEventListener('scroll', toggleBackToTop, { passive: true });
      toggleBackToTop();

      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // H. Highlight Active Navigation Item & Dropdown State Based on URL
    let currentPath = window.location.pathname.split('/').pop().toLowerCase();
    if (!currentPath || currentPath === '' || currentPath === 'index' || currentPath === 'index.php') {
      currentPath = 'index.html';
    } else if (currentPath === 'home-2') {
      currentPath = 'home-2.html';
    }

    // Reset dropdown items & sub links
    document.querySelectorAll('.dropdown-item, .mobile-sub-link').forEach(el => el.classList.remove('active'));

    const isHome = currentPath === 'index.html' || currentPath === 'home-2.html';
    if (isHome) {
      document.querySelectorAll(`.dropdown-item[href*="${currentPath}"], .mobile-sub-link[href*="${currentPath}"]`).forEach(el => {
        el.classList.add('active');
      });
    }

    // Ensure parent nav items reflect active page
    document.querySelectorAll('.navbar-nav .nav-item, .mobile-nav-list .mobile-nav-item').forEach(item => {
      const links = item.querySelectorAll('a');
      let matches = false;
      links.forEach(a => {
        const href = a.getAttribute('href');
        if (href && (href === currentPath || href.endsWith('/' + currentPath))) {
          matches = true;
        }
      });
      if (matches) {
        item.classList.add('active');
      }
    });

    // I. Newsletter Simulation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('.newsletter-input');
        if (input && input.value.trim()) {
          window.showToast(`Thank you! Exclusive mystery dispatches sent to ${input.value.trim()}`, 'success');
          input.value = '';
        }
      });
    }

    // J. Hero Quick Booking Widget Interaction
    const heroBookingForm = document.querySelector('.hero-booking-form');
    if (heroBookingForm) {
      heroBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const dateSelect = document.getElementById('bookingDate');
        const showSelect = document.getElementById('bookingShow');
        const guestsSelect = document.getElementById('bookingGuests');

        const showName = showSelect ? showSelect.options[showSelect.selectedIndex].text : 'Selected Mystery';
        const partySize = guestsSelect ? guestsSelect.value : '2';

        window.showToast(`Table reserved for ${partySize} at "${showName}"! Preparing your evidence packet...`, 'success');
      });
    }

    // K. Upcoming Shows Category Filter
    const filterButtons = document.querySelectorAll('.shows-filter-bar .filter-btn');
    const showCards = document.querySelectorAll('.shows-cards-grid .show-card');

    if (filterButtons.length && showCards.length) {
      filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          filterButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          const category = btn.getAttribute('data-filter') || 'all';

          showCards.forEach((card) => {
            const cardCat = card.getAttribute('data-category') || '';
            if (category === 'all' || cardCat.includes(category)) {
              card.style.display = 'flex';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // L. Home 2: Secret Speakeasy Passcode Whisper Handler
    const passcodeForm = document.querySelector('.passcode-form');
    if (passcodeForm) {
      passcodeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = passcodeForm.querySelector('.passcode-input');
        const code = input ? input.value.trim() : '';
        if (code) {
          window.showToast(`Passcode "${code.toUpperCase()}" verified! VIP Booth in The Velvet Chamber Unlocked.`, 'success');
          input.value = '';
        } else {
          window.showToast('Please whisper a secret passcode...', 'info');
        }
      });
    }

    // M. Home 2: Secret Tasting Menu Tabs
    const tastingTabs = document.querySelectorAll('.tasting-tab-btn');
    const tastingPanels = document.querySelectorAll('.tasting-panel-card');
    if (tastingTabs.length && tastingPanels.length) {
      tastingTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          tastingTabs.forEach((t) => t.classList.remove('active'));
          tastingPanels.forEach((p) => p.classList.remove('active'));

          tab.classList.add('active');
          const targetId = tab.getAttribute('data-tab');
          const targetPanel = document.getElementById(targetId);
          if (targetPanel) {
            targetPanel.classList.add('active');
          }
        });
      });
    }

    // N. Home 2: Interactive Speakeasy Detective Persona Quiz
    const quizForm = document.getElementById('detectiveQuizForm');
    const quizResultCard = document.getElementById('quizResultCard');
    if (quizForm && quizResultCard) {
      quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedWeapon = quizForm.querySelector('input[name="weapon"]:checked');
        const selectedAlibi = quizForm.querySelector('input[name="alibi"]:checked');

        const personas = [
          {
            title: 'The Elusive Mastermind',
            desc: 'You sit quietly in the corner booth with a notebook and dry martini. You planned every detail three weeks before the corpse hit the floor.',
            quote: '"I do not pull triggers; I merely arrange chess pieces."'
          },
          {
            title: 'The Glamorous Blackmailer',
            desc: 'Draped in Parisian silk with a fountain pen in your evening clutch. You know every secret spoken between the second and third courses.',
            quote: '"Silence is expensive tonight, darling."'
          },
          {
            title: 'The Undercover Pinkerton',
            desc: 'Observant, steady-handed, and wearing a discreet badge beneath your waistcoat. You let the suspects talk until their alibis unravel.',
            quote: '"The fingerprint on the champagne flute tells the entire story."'
          }
        ];

        const randomIdx = Math.floor(Math.random() * personas.length);
        const persona = personas[randomIdx];

        const titleElem = quizResultCard.querySelector('.quiz-result-title');
        const descElem = quizResultCard.querySelector('.quiz-result-desc');
        const quoteElem = quizResultCard.querySelector('.quiz-result-quote');

        if (titleElem) titleElem.textContent = `Your Persona: ${persona.title}`;
        if (descElem) descElem.textContent = persona.desc;
        if (quoteElem) quoteElem.textContent = persona.quote;

        quizResultCard.style.display = 'block';
        quizResultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        window.showToast(`Dossier decoded! You are: ${persona.title}`, 'success');
      });
    }

    // O. Home 2: Live Speakeasy Curtain Call Countdown Timer
    const daysElem = document.getElementById('countdownDays');
    const hoursElem = document.getElementById('countdownHours');
    const minsElem = document.getElementById('countdownMins');
    const secsElem = document.getElementById('countdownSecs');

    if (daysElem && hoursElem && minsElem && secsElem) {
      // Set target countdown to upcoming Friday 7:00 PM
      let targetTime = new Date().getTime() + (2 * 86400000) + (14 * 3600000) + (28 * 60000);

      const updateClock = () => {
        const now = new Date().getTime();
        let distance = targetTime - now;
        if (distance < 0) {
          targetTime = now + (3 * 86400000);
          distance = targetTime - now;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysElem.textContent = String(days).padStart(2, '0');
        hoursElem.textContent = String(hours).padStart(2, '0');
        minsElem.textContent = String(minutes).padStart(2, '0');
        secsElem.textContent = String(seconds).padStart(2, '0');
      };

      setInterval(updateClock, 1000);
      updateClock();
    }

    // P. Phase 4: Shows Interactive Mystery Genre Matcher Tab Filter
    const genreFilterBtns = document.querySelectorAll('.genre-filter-btn');
    const genreCards = document.querySelectorAll('.genre-item-card');

    if (genreFilterBtns.length && genreCards.length) {
      genreFilterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          genreFilterBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.getAttribute('data-filter') || 'all';

          genreCards.forEach((card) => {
            const cardGenre = card.getAttribute('data-genre');
            if (filter === 'all' || cardGenre === filter) {
              card.style.display = 'flex';
              card.style.animation = 'fadeIn 0.35s ease forwards';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // Q. Phase 5: Calendar Interactive Filters & View Switcher
    const calFilterBtns = document.querySelectorAll('.cal-filter-btn');
    const calCards = document.querySelectorAll('.cal-card');
    const calAgendaRows = document.querySelectorAll('.cal-agenda-row');

    if (calFilterBtns.length) {
      calFilterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          calFilterBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.getAttribute('data-show') || 'all';

          calCards.forEach((card) => {
            const cardShow = card.getAttribute('data-show');
            if (filter === 'all' || cardShow === filter) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });

          calAgendaRows.forEach((row) => {
            const rowShow = row.getAttribute('data-show');
            if (filter === 'all' || rowShow === filter) {
              row.style.display = 'grid';
            } else {
              row.style.display = 'none';
            }
          });
        });
      });
    }

    // Calendar View Switcher (Grid vs Agenda)
    const calViewBtns = document.querySelectorAll('.cal-view-btn');
    const calGridView = document.getElementById('calGridView');
    const calAgendaView = document.getElementById('calAgendaView');

    if (calViewBtns.length && calGridView && calAgendaView) {
      calViewBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          calViewBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          const viewMode = btn.getAttribute('data-view');
          if (viewMode === 'agenda') {
            calGridView.style.display = 'none';
            calAgendaView.classList.add('active');
          } else {
            calGridView.style.display = 'grid';
            calAgendaView.classList.remove('active');
          }
        });
      });
    }

    // Calendar Buyout Estimator Widget
    const buyoutGuestPills = document.querySelectorAll('.cal-pill-guests');
    const buyoutTierPills = document.querySelectorAll('.cal-pill-tier');
    const buyoutEstFigure = document.getElementById('buyoutEstimateFig');

    if (buyoutGuestPills.length && buyoutEstFigure) {
      let currentGuests = 40;
      let currentTierRate = 135;

      const updateEstimate = () => {
        const total = currentGuests * currentTierRate;
        buyoutEstFigure.textContent = '$' + total.toLocaleString();
      };

      buyoutGuestPills.forEach((pill) => {
        pill.addEventListener('click', () => {
          buyoutGuestPills.forEach((p) => p.classList.remove('active'));
          pill.classList.add('active');
          currentGuests = parseInt(pill.getAttribute('data-guests') || '40', 10);
          updateEstimate();
        });
      });

      buyoutTierPills.forEach((pill) => {
        pill.addEventListener('click', () => {
          buyoutTierPills.forEach((p) => p.classList.remove('active'));
          pill.classList.add('active');
          currentTierRate = parseInt(pill.getAttribute('data-rate') || '135', 10);
          updateEstimate();
        });
      });
    }

    // Instant Date Finder Widget Form Submission
    const dateFinderForm = document.getElementById('dateFinderForm');
    if (dateFinderForm) {
      dateFinderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const showVal = document.getElementById('finderShowSelect')?.value || 'all';
        const partyVal = document.getElementById('finderPartySelect')?.value || '2';
        
        if (typeof window.showToast === 'function') {
          window.showToast(`Checking live inventory for ${partyVal} guests... Filtered to schedule matrix.`, 'info');
        }

        // Apply filter to schedule matrix
        const matchBtn = document.querySelector(`.cal-filter-btn[data-show="${showVal}"]`);
        if (matchBtn) {
          matchBtn.click();
        } else {
          document.querySelector('.cal-filter-btn[data-show="all"]')?.click();
        }

        const scheduleMatrix = document.getElementById('scheduleMatrix');
        if (scheduleMatrix) {
          scheduleMatrix.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // R. Phase 6: Events Quick Inquiry & Proposal Form
    const eventsHeroForm = document.getElementById('eventsHeroInquiryForm');
    const eventsProposalForm = document.getElementById('eventsProposalForm');

    if (eventsHeroForm) {
      eventsHeroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventType = document.getElementById('heroEventType')?.value;
        const guestCount = document.getElementById('heroGuestCount')?.value;
        const targetMonth = document.getElementById('heroTargetMonth')?.value;

        // Pre-fill bottom proposal form if available
        const propTypeSelect = document.getElementById('propEventType');
        const propGuestInput = document.getElementById('propGuestCount');
        const propDateInput = document.getElementById('propTargetDate');

        if (propTypeSelect && eventType) propTypeSelect.value = eventType;
        if (propGuestInput && guestCount) propGuestInput.value = guestCount;
        if (propDateInput && targetMonth) propDateInput.value = targetMonth;

        if (typeof window.showToast === 'function') {
          window.showToast('Transferred inquiry parameters to proposal builder below.', 'info');
        }

        const ctaSection = document.getElementById('eventsInquiryCta');
        if (ctaSection) {
          ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Package Tier Select buttons on events.html
    const packageSelectBtns = document.querySelectorAll('.events-select-tier-btn');
    if (packageSelectBtns.length) {
      packageSelectBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const tier = btn.getAttribute('data-tier') || 'imperial';
          const propTierSelect = document.getElementById('propPackageTier');
          if (propTierSelect) {
            propTierSelect.value = tier;
          }
          if (typeof window.showToast === 'function') {
            window.showToast(`Selected "${tier.toUpperCase()}" package. Complete contact details below.`, 'info');
          }
          const ctaSection = document.getElementById('eventsInquiryCta');
          if (ctaSection) {
            ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }

    // Venue Select buttons on events.html
    const venueSelectBtns = document.querySelectorAll('.events-select-venue-btn');
    if (venueSelectBtns.length) {
      venueSelectBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const venue = btn.getAttribute('data-venue') || 'venue';
          if (typeof window.showToast === 'function') {
            window.showToast(`Selected "${venue.toUpperCase()}" venue room. Complete inquiry details below.`, 'info');
          }
          const ctaSection = document.getElementById('eventsInquiryCta');
          if (ctaSection) {
            ctaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }

    if (eventsProposalForm) {
      eventsProposalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const contactName = document.getElementById('propContactName')?.value || 'Guest';
        const refId = 'EVT-' + Math.floor(1000 + Math.random() * 9000);

        if (typeof window.showToast === 'function') {
          window.showToast(`Thank you, ${contactName}! Proposal dossier ${refId} received. Our producer will contact you within 4 business hours.`, 'success');
        }
        eventsProposalForm.reset();
      });
    }

    // S. Phase 7: Menu Quick Dietary Filter Pills
    const menuFilterBtns = document.querySelectorAll('.menu-filter-btn');
    const menuDishes = document.querySelectorAll('.menu-dish-item');

    if (menuFilterBtns.length && menuDishes.length) {
      menuFilterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          menuFilterBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.getAttribute('data-filter') || 'all';

          menuDishes.forEach((dish) => {
            const dietType = dish.getAttribute('data-diet') || '';
            if (filter === 'all' || dietType.includes(filter)) {
              dish.style.display = 'flex';
              dish.style.animation = 'fadeIn 0.35s ease forwards';
            } else {
              dish.style.display = 'none';
            }
          });
        });
      });
    }

    // Dietary Substitutions Tab Switcher
    const dietaryTabBtns = document.querySelectorAll('.dietary-tab-btn');
    const dietaryPanels = document.querySelectorAll('.dietary-panel');

    if (dietaryTabBtns.length && dietaryPanels.length) {
      dietaryTabBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          dietaryTabBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          const targetId = btn.getAttribute('data-target');
          dietaryPanels.forEach((panel) => {
            if (panel.id === targetId) {
              panel.classList.add('active');
            } else {
              panel.classList.remove('active');
            }
          });
        });
      });
    }

    // T. Phase 8: Our Story — Blackwood Vault Evidence File Toggle
    const storyEvidenceBtn = document.getElementById('storyEvidenceBtn');
    const storyEvidenceContent = document.getElementById('storyEvidenceContent');

    if (storyEvidenceBtn && storyEvidenceContent) {
      storyEvidenceBtn.addEventListener('click', () => {
        const isOpen = storyEvidenceContent.classList.toggle('open');
        storyEvidenceBtn.classList.toggle('active', isOpen);
        storyEvidenceBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (isOpen && typeof window.showToast === 'function') {
          window.showToast('Archival File #1932-B unsealed: Inspecting coroner dispatch log.', 'info');
        }
      });
    }

    // Wall of Fame Card Click Inspection
    const fameCards = document.querySelectorAll('.story-fame-card');
    if (fameCards.length) {
      fameCards.forEach((card) => {
        card.addEventListener('click', () => {
          const rec = card.querySelector('.story-fame-record')?.textContent || 'Record';
          const title = card.querySelector('.story-fame-title')?.textContent || 'Achievement';
          if (typeof window.showToast === 'function') {
            window.showToast(`Archived Record: ${title} (${rec})`, 'info');
          }
        });
      });
    }

    // U. Phase 9: Contact & Box Office Concierge Interactivity
    const contactForm = document.getElementById('contactInquiryForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const guestName = document.getElementById('contactName')?.value || 'Valued Patron';
        const inquiryType = document.getElementById('contactTopic')?.value || 'general';
        const refTicket = 'ENC-' + Math.floor(100000 + Math.random() * 900000);

        if (typeof window.showToast === 'function') {
          window.showToast(
            `Inquiry dispatched, ${guestName}! Ticket #${refTicket} logged with Box Office Concierge. Response guaranteed within 2 hours.`,
            'success'
          );
        }
        contactForm.reset();
      });
    }

    // Box Office FAQ Accordion Logic
    const faqButtons = document.querySelectorAll('.contact-faq-btn');
    if (faqButtons.length) {
      faqButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const content = btn.nextElementSibling;
          const isCurrentlyExpanded = btn.getAttribute('aria-expanded') === 'true';

          // Close all other accordions for clean accordion behavior
          faqButtons.forEach((otherBtn) => {
            if (otherBtn !== btn) {
              otherBtn.setAttribute('aria-expanded', 'false');
              otherBtn.classList.remove('active');
              if (otherBtn.nextElementSibling) {
                otherBtn.nextElementSibling.classList.remove('open');
              }
            }
          });

          // Toggle current
          if (isCurrentlyExpanded) {
            btn.setAttribute('aria-expanded', 'false');
            btn.classList.remove('active');
            if (content) content.classList.remove('open');
          } else {
            btn.setAttribute('aria-expanded', 'true');
            btn.classList.add('active');
            if (content) content.classList.add('open');
          }
        });
      });
    }

    // V. Phase 10: Theatrical Dashboard Interactivity
    // 1. Digital Boarding Pass Download & Wallet Actions
    const passDownloadBtn = document.getElementById('dashDownloadPassBtn');
    const passWalletBtn = document.getElementById('dashWalletPassBtn');

    if (passDownloadBtn) {
      passDownloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof window.showToast === 'function') {
          window.showToast('Generating encrypted PDF pass #TKT-8849-VIP... Download complete.', 'success');
        }
      });
    }

    if (passWalletBtn) {
      passWalletBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof window.showToast === 'function') {
          window.showToast('Boarding Pass dispatched to Apple / Google Wallet passbook.', 'info');
        }
      });
    }

    // 2. Interactive Seating Spot Inspector
    const seatSpots = document.querySelectorAll('.dash-seat-spot:not(.booked)');
    const seatDetailText = document.getElementById('dashSeatDetailText');
    if (seatSpots.length) {
      seatSpots.forEach((spot) => {
        spot.addEventListener('click', () => {
          seatSpots.forEach((s) => s.classList.remove('active-table'));
          spot.classList.add('active-table');
          const tableNum = spot.getAttribute('data-table') || '7';
          const tierName = spot.getAttribute('data-tier') || "Director's Circle";
          if (seatDetailText) {
            seatDetailText.textContent = `Table #${tableNum} &bull; ${tierName} &bull; 100% Unobstructed Stage Sightline`;
          }
          if (typeof window.showToast === 'function') {
            window.showToast(`Selected Table #${tableNum} (${tierName}). Prime crime-scene acoustic clarity.`, 'info');
          }
        });
      });
    }

    // 3. Sommelier Wine Pairing Selector
    const wineOptions = document.querySelectorAll('.dash-wine-option');
    const wineTotalFig = document.getElementById('dashWineTotalFig');
    if (wineOptions.length) {
      wineOptions.forEach((opt) => {
        opt.addEventListener('click', () => {
          wineOptions.forEach((o) => o.classList.remove('selected'));
          opt.classList.add('selected');
          const wineName = opt.querySelector('.dash-wine-option-title')?.textContent || 'Selection';
          const winePrice = opt.getAttribute('data-price') || '$0';
          if (wineTotalFig) {
            wineTotalFig.textContent = winePrice;
          }
          if (typeof window.showToast === 'function') {
            window.showToast(`Cellar pairing updated to: ${wineName} (${winePrice}/patron). Chef notified.`, 'success');
          }
        });
      });
    }

    // 4. Suspect Mini-Card Intelligence Reveal
    const suspectCards = document.querySelectorAll('.dash-suspect-mini-card');
    if (suspectCards.length) {
      suspectCards.forEach((card) => {
        card.addEventListener('click', () => {
          const name = card.querySelector('.dash-suspect-mini-name')?.textContent || 'Suspect';
          const alibi = card.getAttribute('data-secret-alibi') || 'Claims they were in the library.';
          if (typeof window.showToast === 'function') {
            window.showToast(`Classified Clue for ${name}: "${alibi}"`, 'info');
          }
        });
      });
    }

    // 5. Box Office Concierge Chat Messenger
    const chatForm = document.getElementById('dashConciergeChatForm');
    const chatInput = document.getElementById('dashConciergeInput');
    const chatHistory = document.getElementById('dashChatHistory');

    if (chatForm && chatInput && chatHistory) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Append patron message
        const patronMsg = document.createElement('div');
        patronMsg.className = 'dash-chat-msg patron';
        patronMsg.innerHTML = `
          <span>${text}</span>
          <span class="dash-chat-time">${timeStr} &bull; Sent</span>
        `;
        chatHistory.appendChild(patronMsg);
        chatInput.value = '';
        chatHistory.scrollTop = chatHistory.scrollHeight;

        if (typeof window.showToast === 'function') {
          window.showToast('Concierge message dispatched to Lead Usher.', 'info');
        }

        // Usher auto response simulation
        setTimeout(() => {
          const usherMsg = document.createElement('div');
          usherMsg.className = 'dash-chat-msg usher';
          usherMsg.innerHTML = `
            <span>Lord Vance, your request has been logged with the stage director. Table #7 sommelier flight is locked.</span>
            <span class="dash-chat-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &bull; Lead Usher</span>
          `;
          chatHistory.appendChild(usherMsg);
          chatHistory.scrollTop = chatHistory.scrollHeight;
        }, 1400);
      });
    }

    // 6. Mobile Dashboard Sidebar Toggle
    const dashSidebarToggle = document.getElementById('dashSidebarToggle');
    const dashSidebar = document.getElementById('dashAppSidebar');
    if (dashSidebarToggle && dashSidebar) {
      dashSidebarToggle.addEventListener('click', () => {
        dashSidebar.classList.toggle('open');
      });
      // Close sidebar when clicking outside on mobile
      document.addEventListener('click', (e) => {
        if (
          dashSidebar.classList.contains('open') &&
          !dashSidebar.contains(e.target) &&
          !dashSidebarToggle.contains(e.target)
        ) {
          dashSidebar.classList.remove('open');
        }
      });
    }

    // 7. Check-In Today Button
    const dashCheckInBtn = document.getElementById('dashCheckInBtn');
    if (dashCheckInBtn) {
      dashCheckInBtn.addEventListener('click', () => {
        if (typeof window.showToast === 'function') {
          window.showToast('Pass #TKT-8849-VIP checked in! Table #7 and Valet Concierge activated.', 'success');
        }
      });
    }

    // 8. Dashboard Tab Navigation (Sidebar + Mobile Tab Bar)
    window.dashSwitchTab = function (targetTabId) {
      // Hide all panes
      document.querySelectorAll('.dash-tab-pane').forEach((pane) => {
        pane.classList.remove('active');
      });
      // Deactivate all sidebar buttons
      document.querySelectorAll('.dash-menu-btn').forEach((btn) => {
        btn.classList.remove('active');
      });
      // Deactivate all mobile tab bar buttons
      document.querySelectorAll('.dash-mobile-tab-btn').forEach((btn) => {
        btn.classList.remove('active');
      });

      // Activate target pane
      const targetPane = document.getElementById(targetTabId);
      if (targetPane) {
        targetPane.classList.add('active');
        // Scroll to top of content area
        const content = document.getElementById('mainContent');
        if (content) content.scrollTop = 0;
      }

      // Activate matching sidebar button
      const sidebarBtn = document.querySelector(`.dash-menu-btn[data-tab="${targetTabId}"]`);
      if (sidebarBtn) sidebarBtn.classList.add('active');

      // Activate matching mobile tab button
      const mobileBtn = document.querySelector(`.dash-mobile-tab-btn[data-tab="${targetTabId}"]`);
      if (mobileBtn) {
        mobileBtn.classList.add('active');
        // Scroll the mobile tab bar so active button is visible
        mobileBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }

      // Close mobile sidebar overlay after navigation
      if (dashSidebar && dashSidebar.classList.contains('open')) {
        dashSidebar.classList.remove('open');
      }
    };

    // Attach click handlers to all sidebar menu buttons
    document.querySelectorAll('.dash-menu-btn[data-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.dashSwitchTab(btn.getAttribute('data-tab'));
      });
    });

    // Attach click handlers to all mobile tab bar buttons
    document.querySelectorAll('.dash-mobile-tab-btn[data-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.dashSwitchTab(btn.getAttribute('data-tab'));
      });
    });

    // Initialize Scroll Reveal, Stat Counters & Accessible Custom Selects & Datepickers
    initScrollReveal();
    initStatCounters();
    initAccessibleCustomSelects();
    initAccessibleCustomDatepickers();
  });

  // -------------------------------------------------------------------------
  // 4. Global Toast Notification System
  // -------------------------------------------------------------------------
  window.showToast = function (message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    toast.setAttribute('role', 'alert');

    const iconSvg = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-6h-2v6zm0-8h2V7h-2v2z"/>
      </svg>
    `;

    toast.innerHTML = `
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3800);
  };

  // -------------------------------------------------------------------------
  // 5. Page Preloader Initialization
  // -------------------------------------------------------------------------
  function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;

    let hasHidden = false;
    const hideLoader = () => {
      if (hasHidden) return;
      hasHidden = true;
      loader.classList.add('page-loader--hidden');
      setTimeout(() => {
        if (loader.parentNode) {
          loader.style.display = 'none';
        }
      }, 600);
    };

    if (document.readyState === 'complete') {
      setTimeout(hideLoader, 250);
    } else {
      window.addEventListener('load', () => {
        setTimeout(hideLoader, 300);
      });
      // Safety fallback so user is never blocked
      setTimeout(hideLoader, 1400);
    }
  }

  // Run page loader handler immediately
  initPageLoader();

  // -------------------------------------------------------------------------
  // 6. Master Dynamic Scroll Reveal & Stagger Animation System
  // -------------------------------------------------------------------------
  function initScrollReveal() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Selectors for automatic reveal across all pages and sections (clean block-level reveal)
    const autoSelectors = [
      '.section-header',
      '.act-card',
      '.show-card',
      '.shows-card',
      '.menu-course-item',
      '.menu-course-card',
      '.events-format-card',
      '.events-script-card',
      '.events-package-card',
      '.events-venue-featured',
      '.events-venue-card-small',
      '.events-assurance-card',
      '.events-proposal-box',
      '.story-pillar-card',
      '.story-timeline-item',
      '.story-atelier-box',
      '.cal-timeline-card',
      '.calendar-filter-bar',
      '.calendar-event-card',
      '.contact-card',
      '.contact-form-card',
      '.contact-hero-stat-card',
      '.contact-office-card',
      '.faq-item',
      '.auth-card-inner',
      '.dash-card',
      '.final-cta-box',
      '.footer-col'
    ];

    const elements = document.querySelectorAll(autoSelectors.join(', '));
    if (!elements.length) return;

    // Filter elements: only elements below the initial viewport fold should be animated on scroll
    // Elements already visible at page load stay 100% static to prevent any navbar or page vibration
    const windowH = window.innerHeight || document.documentElement.clientHeight;
    const belowFoldElements = [];
    const parentGrids = new Set();

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top >= windowH * 0.85) {
        el.classList.add('reveal-init');
        belowFoldElements.push(el);
        const parent = el.parentElement;
        if (parent) parentGrids.add(parent);
      }
    });

    if (!belowFoldElements.length) return;

    // Compute stagger index for siblings in below-the-fold grids/lists
    parentGrids.forEach((grid) => {
      const children = Array.from(grid.children).filter((child) =>
        child.classList.contains('reveal-init')
      );
      if (children.length > 1) {
        children.forEach((child, index) => {
          child.setAttribute('data-stagger-i', Math.min(index + 1, 8));
        });
      }
    });

    // Setup IntersectionObserver for below-the-fold elements
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    belowFoldElements.forEach((el) => revealObserver.observe(el));
  }

  // -------------------------------------------------------------------------
  // 7. Dynamic Stat Counter Animation System
  // -------------------------------------------------------------------------
  function initStatCounters() {
    const counterElements = document.querySelectorAll(
      '.hero-stat-num, .contact-stat-val, .story-stat-num, .stat-value, .dash-stat-val'
    );
    if (!counterElements.length) return;

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          observer.unobserve(el);

          const rawText = el.textContent.trim();
          const match = rawText.match(/^([^0-9]*)([0-9,.]+)([^0-9]*)$/);
          if (!match) return;

          const prefix = match[1] || '';
          const numStr = match[2].replace(/,/g, '');
          const suffix = match[3] || '';
          const targetNum = parseFloat(numStr);
          if (isNaN(targetNum)) return;

          const isDecimal = numStr.includes('.');
          const decimalPlaces = isDecimal ? numStr.split('.')[1].length : 0;
          const duration = 1300; // ms
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = targetNum * easeOut;

            let formattedVal;
            if (isDecimal) {
              formattedVal = currentVal.toFixed(decimalPlaces);
            } else {
              formattedVal = Math.floor(currentVal).toLocaleString();
            }

            el.textContent = `${prefix}${formattedVal}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = rawText;
            }
          }

          requestAnimationFrame(updateCounter);
        }
      });
    }, { threshold: 0.15 });

    counterElements.forEach((el) => counterObserver.observe(el));
  }

  // -------------------------------------------------------------------------
  // 8. Accessible Custom Select Dropdown System
  // -------------------------------------------------------------------------
  function initAccessibleCustomSelects() {
    const selects = document.querySelectorAll('select:not(.no-custom-select)');
    if (!selects.length) return;

    selects.forEach((select) => {
      // Check if already transformed
      if (select.parentElement && select.parentElement.classList.contains('custom-select-wrap')) {
        return;
      }
      if (select.dataset.customized === 'true') {
        return;
      }
      select.dataset.customized = 'true';

      const options = Array.from(select.options);
      if (!options.length) return;

      const selectedOption = select.options[select.selectedIndex] || options[0];
      const initialText = selectedOption ? selectedOption.text : '';

      // Create Custom Wrapper
      const wrap = document.createElement('div');
      wrap.className = 'custom-select-wrap';
      if (select.id) wrap.setAttribute('data-select-id', select.id);

      // Create Trigger Button
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'custom-select-trigger';
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');

      const label = document.createElement('span');
      label.className = 'custom-select-label';
      label.textContent = initialText;

      const arrow = document.createElement('span');
      arrow.className = 'custom-select-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z"/>
        </svg>
      `;

      trigger.appendChild(label);
      trigger.appendChild(arrow);
      wrap.appendChild(trigger);

      // Create Menu List
      const menu = document.createElement('ul');
      menu.className = 'custom-select-menu';
      menu.setAttribute('role', 'listbox');
      menu.setAttribute('tabindex', '-1');

      options.forEach((opt, idx) => {
        const item = document.createElement('li');
        item.className = 'custom-select-item';
        item.setAttribute('role', 'option');
        item.setAttribute('data-value', opt.value);
        item.setAttribute('data-index', idx);
        item.textContent = opt.text;

        if (opt.selected || idx === select.selectedIndex) {
          item.classList.add('is-selected');
          item.setAttribute('aria-selected', 'true');
        } else {
          item.setAttribute('aria-selected', 'false');
        }

        item.addEventListener('click', (e) => {
          e.stopPropagation();
          select.selectedIndex = idx;
          select.value = opt.value;
          label.textContent = opt.text;

          menu.querySelectorAll('.custom-select-item').forEach((i) => {
            i.classList.remove('is-selected');
            i.setAttribute('aria-selected', 'false');
          });
          item.classList.add('is-selected');
          item.setAttribute('aria-selected', 'true');

          wrap.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          trigger.focus();

          // Dispatch native events
          select.dispatchEvent(new Event('change', { bubbles: true }));
          select.dispatchEvent(new Event('input', { bubbles: true }));
        });

        menu.appendChild(item);
      });

      wrap.appendChild(menu);

      // Insert wrap before select and move select inside wrap
      select.parentNode.insertBefore(wrap, select);
      wrap.appendChild(select);
      select.classList.add('has-custom-select');

      // Trigger Click Toggle
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = wrap.classList.contains('is-open');

        // Close all other custom dropdowns first
        document.querySelectorAll('.custom-select-wrap.is-open').forEach((other) => {
          if (other !== wrap) {
            other.classList.remove('is-open');
            const otherTrigger = other.querySelector('.custom-select-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          wrap.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          wrap.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });

      // Keyboard navigation
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!wrap.classList.contains('is-open')) {
            wrap.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
          }
        } else if (e.key === 'Escape') {
          wrap.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Keep custom UI in sync if select value is altered externally
      select.addEventListener('change', () => {
        const curOpt = select.options[select.selectedIndex];
        if (curOpt) {
          label.textContent = curOpt.text;
          menu.querySelectorAll('.custom-select-item').forEach((i, idx) => {
            const isMatch = idx === select.selectedIndex;
            i.classList.toggle('is-selected', isMatch);
            i.setAttribute('aria-selected', isMatch ? 'true' : 'false');
          });
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      document.querySelectorAll('.custom-select-wrap.is-open').forEach((wrap) => {
        if (!wrap.contains(e.target)) {
          wrap.classList.remove('is-open');
          const trg = wrap.querySelector('.custom-select-trigger');
          if (trg) trg.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.custom-select-wrap.is-open').forEach((wrap) => {
          wrap.classList.remove('is-open');
          const trg = wrap.querySelector('.custom-select-trigger');
          if (trg) {
            trg.setAttribute('aria-expanded', 'false');
            trg.focus();
          }
        });
      }
    });
  }

  // -------------------------------------------------------------------------
  // 9. Accessible Custom Datepicker System (100% Contained, Viewport-Aware)
  // -------------------------------------------------------------------------
  function initAccessibleCustomDatepickers() {
    const dateInputs = document.querySelectorAll('input[type="date"]:not(.no-custom-datepicker)');
    if (!dateInputs.length) return;

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const weekdayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    dateInputs.forEach((input) => {
      if (input.parentElement && input.parentElement.classList.contains('custom-datepicker-wrap')) {
        return;
      }
      if (input.dataset.customized === 'true') {
        return;
      }
      input.dataset.customized = 'true';

      // Parse initial value or fallback
      let selectedDate = null;
      if (input.value) {
        const parts = input.value.split('-');
        if (parts.length === 3) {
          selectedDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        }
      }

      let currentViewYear = selectedDate ? selectedDate.getFullYear() : new Date().getFullYear();
      let currentViewMonth = selectedDate ? selectedDate.getMonth() : new Date().getMonth();

      // Create Custom Wrapper
      const wrap = document.createElement('div');
      wrap.className = 'custom-datepicker-wrap';
      if (input.id) wrap.setAttribute('data-datepicker-id', input.id);

      // Create Trigger Button
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'custom-datepicker-trigger';
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-label', input.getAttribute('aria-label') || 'Select date');

      const label = document.createElement('span');
      label.className = 'custom-datepicker-label';

      function formatDisplayDate(date) {
        if (!date) return '';
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
      }

      function formatValueDate(date) {
        if (!date) return '';
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
      }

      if (selectedDate) {
        label.textContent = formatDisplayDate(selectedDate);
      } else {
        label.textContent = input.placeholder || 'mm/dd/yyyy';
        label.classList.add('is-placeholder');
      }

      const icon = document.createElement('span');
      icon.className = 'custom-datepicker-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
        </svg>
      `;

      trigger.appendChild(label);
      trigger.appendChild(icon);
      wrap.appendChild(trigger);

      // Create Popover
      const popover = document.createElement('div');
      popover.className = 'custom-datepicker-popover';
      popover.setAttribute('role', 'dialog');
      popover.setAttribute('aria-modal', 'false');
      popover.setAttribute('tabindex', '-1');

      // Popover Header
      const header = document.createElement('div');
      header.className = 'cdp-header';

      const prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'cdp-nav-btn cdp-prev-btn';
      prevBtn.setAttribute('aria-label', 'Previous month');
      prevBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      `;

      const title = document.createElement('span');
      title.className = 'cdp-title';

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'cdp-nav-btn cdp-next-btn';
      nextBtn.setAttribute('aria-label', 'Next month');
      nextBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      `;

      header.appendChild(prevBtn);
      header.appendChild(title);
      header.appendChild(nextBtn);
      popover.appendChild(header);

      // Popover Weekdays
      const weekdaysRow = document.createElement('div');
      weekdaysRow.className = 'cdp-weekdays';
      weekdayNames.forEach((name) => {
        const wd = document.createElement('div');
        wd.className = 'cdp-weekday';
        wd.textContent = name;
        weekdaysRow.appendChild(wd);
      });
      popover.appendChild(weekdaysRow);

      // Popover Days Grid
      const grid = document.createElement('div');
      grid.className = 'cdp-grid';
      popover.appendChild(grid);

      // Popover Footer
      const footer = document.createElement('div');
      footer.className = 'cdp-footer';

      const todayBtn = document.createElement('button');
      todayBtn.type = 'button';
      todayBtn.className = 'cdp-action-btn cdp-today-btn';
      todayBtn.textContent = 'Today';

      const clearBtn = document.createElement('button');
      clearBtn.type = 'button';
      clearBtn.className = 'cdp-action-btn cdp-clear-btn';
      clearBtn.textContent = 'Clear';

      footer.appendChild(todayBtn);
      footer.appendChild(clearBtn);
      popover.appendChild(footer);

      wrap.appendChild(popover);

      // Render calendar month view
      function renderCalendar() {
        title.textContent = `${monthNames[currentViewMonth]} ${currentViewYear}`;
        grid.innerHTML = '';

        const today = new Date();
        const firstDayOfMonth = new Date(currentViewYear, currentViewMonth, 1).getDay();
        const daysInMonth = new Date(currentViewYear, currentViewMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentViewYear, currentViewMonth, 0).getDate();

        // Prev month padding days
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
          const dayNum = daysInPrevMonth - i;
          const dayBtn = document.createElement('button');
          dayBtn.type = 'button';
          dayBtn.className = 'cdp-day-btn is-other-month';
          dayBtn.textContent = dayNum;
          dayBtn.setAttribute('tabindex', '-1');
          dayBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentViewMonth === 0) {
              currentViewMonth = 11;
              currentViewYear--;
            } else {
              currentViewMonth--;
            }
            selectDay(new Date(currentViewYear, currentViewMonth, dayNum));
          });
          grid.appendChild(dayBtn);
        }

        // Current month days
        for (let d = 1; d <= daysInMonth; d++) {
          const dayBtn = document.createElement('button');
          dayBtn.type = 'button';
          dayBtn.className = 'cdp-day-btn';
          dayBtn.textContent = d;

          const isCurrentToday =
            today.getDate() === d &&
            today.getMonth() === currentViewMonth &&
            today.getFullYear() === currentViewYear;
          if (isCurrentToday) dayBtn.classList.add('is-today');

          const isCurrentSelected =
            selectedDate &&
            selectedDate.getDate() === d &&
            selectedDate.getMonth() === currentViewMonth &&
            selectedDate.getFullYear() === currentViewYear;
          if (isCurrentSelected) {
            dayBtn.classList.add('is-selected');
            dayBtn.setAttribute('aria-selected', 'true');
          }

          dayBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectDay(new Date(currentViewYear, currentViewMonth, d));
          });

          grid.appendChild(dayBtn);
        }

        // Next month trailing days to complete standard 35 or 42 grid cells
        const totalRendered = firstDayOfMonth + daysInMonth;
        const totalCells = totalRendered <= 35 ? 35 : 42;
        const nextDays = totalCells - totalRendered;
        for (let d = 1; d <= nextDays; d++) {
          const dayBtn = document.createElement('button');
          dayBtn.type = 'button';
          dayBtn.className = 'cdp-day-btn is-other-month';
          dayBtn.textContent = d;
          dayBtn.setAttribute('tabindex', '-1');
          dayBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentViewMonth === 11) {
              currentViewMonth = 0;
              currentViewYear++;
            } else {
              currentViewMonth++;
            }
            selectDay(new Date(currentViewYear, currentViewMonth, d));
          });
          grid.appendChild(dayBtn);
        }
      }

      function selectDay(date) {
        selectedDate = date;
        currentViewYear = date.getFullYear();
        currentViewMonth = date.getMonth();

        const valStr = formatValueDate(date);
        input.value = valStr;
        label.textContent = formatDisplayDate(date);
        label.classList.remove('is-placeholder');

        closeDatepicker();
        renderCalendar();
        trigger.focus();

        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }

      function clearDate() {
        selectedDate = null;
        input.value = '';
        label.textContent = input.placeholder || 'mm/dd/yyyy';
        label.classList.add('is-placeholder');

        closeDatepicker();
        renderCalendar();
        trigger.focus();

        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }

      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentViewMonth === 0) {
          currentViewMonth = 11;
          currentViewYear--;
        } else {
          currentViewMonth--;
        }
        renderCalendar();
      });

      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentViewMonth === 11) {
          currentViewMonth = 0;
          currentViewYear++;
        } else {
          currentViewMonth++;
        }
        renderCalendar();
      });

      todayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectDay(new Date());
      });

      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearDate();
      });

      // Insert wrap before input and move input inside wrap
      input.parentNode.insertBefore(wrap, input);
      wrap.appendChild(input);
      input.classList.add('has-custom-datepicker');

      renderCalendar();

      function checkViewportPosition() {
        const rect = wrap.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const popoverHeight = 310;
        if (spaceBelow < popoverHeight && rect.top > popoverHeight) {
          wrap.classList.add('is-open-above');
        } else {
          wrap.classList.remove('is-open-above');
        }
      }

      function openDatepicker() {
        // Close any other open datepickers or selects
        document.querySelectorAll('.custom-datepicker-wrap.is-open').forEach((other) => {
          if (other !== wrap) {
            other.classList.remove('is-open', 'is-open-above');
            const otherTrg = other.querySelector('.custom-datepicker-trigger');
            if (otherTrg) otherTrg.setAttribute('aria-expanded', 'false');
          }
        });
        document.querySelectorAll('.custom-select-wrap.is-open').forEach((other) => {
          other.classList.remove('is-open');
          const otherTrg = other.querySelector('.custom-select-trigger');
          if (otherTrg) otherTrg.setAttribute('aria-expanded', 'false');
        });

        checkViewportPosition();
        wrap.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }

      function closeDatepicker() {
        wrap.classList.remove('is-open', 'is-open-above');
        trigger.setAttribute('aria-expanded', 'false');
      }

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (wrap.classList.contains('is-open')) {
          closeDatepicker();
        } else {
          openDatepicker();
        }
      });

      // Keyboard navigation on trigger
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!wrap.classList.contains('is-open')) {
            openDatepicker();
          }
        } else if (e.key === 'Escape') {
          closeDatepicker();
        }
      });

      // Keep custom UI in sync if input value is changed externally
      input.addEventListener('change', () => {
        if (input.value) {
          const parts = input.value.split('-');
          if (parts.length === 3) {
            selectedDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
            currentViewYear = selectedDate.getFullYear();
            currentViewMonth = selectedDate.getMonth();
            label.textContent = formatDisplayDate(selectedDate);
            label.classList.remove('is-placeholder');
            renderCalendar();
          }
        } else {
          selectedDate = null;
          label.textContent = input.placeholder || 'mm/dd/yyyy';
          label.classList.add('is-placeholder');
          renderCalendar();
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      document.querySelectorAll('.custom-datepicker-wrap.is-open').forEach((wrap) => {
        if (!wrap.contains(e.target)) {
          wrap.classList.remove('is-open', 'is-open-above');
          const trg = wrap.querySelector('.custom-datepicker-trigger');
          if (trg) trg.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.custom-datepicker-wrap.is-open').forEach((wrap) => {
          wrap.classList.remove('is-open', 'is-open-above');
          const trg = wrap.querySelector('.custom-datepicker-trigger');
          if (trg) {
            trg.setAttribute('aria-expanded', 'false');
            trg.focus();
          }
        });
      }
    });

    // Recalculate position on scroll/resize if open
    window.addEventListener('scroll', () => {
      document.querySelectorAll('.custom-datepicker-wrap.is-open').forEach((wrap) => {
        const rect = wrap.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        if (spaceBelow < 310 && rect.top > 310) {
          wrap.classList.add('is-open-above');
        } else {
          wrap.classList.remove('is-open-above');
        }
      });
    }, { passive: true });
  }
})();



