/**
 * Academic Portfolio JavaScript
 * Author: R. Yogesh (Associate Professor & Ph.D. Scholar)
 * Pure Vanilla JavaScript (ES6+) - Zero External Framework Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. THEME SWITCHER (LIGHT / DARK MODE WITH LOCAL STORAGE PERSISTENCE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme preference or query system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  htmlRoot.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }


  /* ==========================================================================
     2. MOBILE RESPONSIVE HAMBURGER NAVIGATION
     ========================================================================== */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    // Toggle mobile menu visibility
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Close menu on ESC key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileNav();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileNav();
      }
    });
  }

  function openMobileNav() {
    navMenu.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.classList.add('active');
  }

  function closeMobileNav() {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('active');
  }


  /* ==========================================================================
     3. ACTIVE NAVIGATION LINK ON SCROLL (INTERSECTION OBSERVER)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }


  /* ==========================================================================
     4. HERO SECTION TYPING ANIMATION
     ========================================================================== */
  const typingElement = document.getElementById('typingText');
  
  if (typingElement) {
    const roles = [
      'Associate Professor in Computer Science',
      'Ph.D. Scholar in AI & Machine Learning',
      'Dedicated Academic Mentor (18+ Years)',
      'Systems & Distributed Networks Researcher',
      'Engineering Curriculum & Lab Specialist'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 95;
      }

      // Logic when word is completely typed
      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at end of text
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next word
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }


  /* ==========================================================================
     5. SKILLS PROGRESS BAR ANIMATION ON VIEW
     ========================================================================== */
  const skillsSection = document.getElementById('skills');
  const progressFills = document.querySelectorAll('.progress-fill');

  if (skillsSection && progressFills.length > 0) {
    let animated = false;

    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          progressFills.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            if (progress) {
              bar.style.width = progress;
            }
          });
          animated = true; // Animate only once
        }
      });
    }, { threshold: 0.15 });

    skillsObserver.observe(skillsSection);
  }


  /* ==========================================================================
     6. PROJECT CATEGORY FILTERING
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class on buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');

          if (filterValue === 'all' || filterValue === cardCategory) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }


  /* ==========================================================================
     7. PROJECT DETAILS MODAL SYSTEM
     ========================================================================== */
  const modalBackdrop = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalBody = document.getElementById('modalBody');
  const modalRepoLink = document.getElementById('modalRepoLink');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalSecondaryClose = document.getElementById('modalSecondaryClose');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');

  // Comprehensive Project Repository Data
  const projectData = {
    'p2p-broadcaster': {
      title: 'Peer to Peer Audio Broadcaster and Listener',
      category: 'Distributed & Networking Systems',
      subtitle: 'Industry Software Development Project • Dreams Software Solutions, Hyderabad',
      content: `
        <h4>Project Overview &amp; Research Problem</h4>
        <p>In conventional client-server audio streaming, central servers experience catastrophic bandwidth bottlenecks as listeners scale. While peer-to-peer (P2P) systems leverage collective peer upload capacities, real-world peers exhibit heterogeneous bandwidth and asymmetric participation (e.g., leeching behaviors and packet dropping).</p>
        
        <h4>Key Technical Contributions</h4>
        <ul>
          <li><strong>Oversight Enforcement Protocol:</strong> Implemented a distributed rate-enforcement protocol in Java 1.5 that dynamically measures peer upload-to-download ratios, penalizing uncooperative nodes.</li>
          <li><strong>Dynamic Branching Tree:</strong> Transformed internet radio broadcast into an adaptive multicast tree where downstream listener peers concurrently re-stream chunks to new incoming peers.</li>
          <li><strong>Malicious Request Defense:</strong> Built socket-level throttles to prevent malicious peer nodes from exhausting system buffers and connection queues.</li>
        </ul>

        <h4>Technologies &amp; Architecture</h4>
        <p><strong>Environment:</strong> Java 1.5, Windows 2000 Professional / Windows XP, Java Socket Programming, Multi-threaded Buffer Buffering, Network Packet Chunking.</p>

        <h4>Outcome</h4>
        <p>Achieved seamless audio playback with 65% reduction in root server bandwidth consumption during multi-node streaming tests.</p>
      `,
      repoUrl: 'https://github.com'
    },
    'edm-framework': {
      title: 'Intelligent Educational Data Mining (EDM) Framework',
      category: 'Artificial Intelligence & Data Mining',
      subtitle: 'Ph.D. Doctoral Research Experimentation • SR University',
      content: `
        <h4>Research Problem</h4>
        <p>Engineering colleges collect substantial scholastic metrics, yet legacy evaluation systems lack predictive mechanisms to pinpoint early indicators of student academic distress before semester examinations.</p>

        <h4>Methodology &amp; Architecture</h4>
        <ul>
          <li>Aggregated anonymized academic records, laboratory attendance indices, and internal assessment test results.</li>
          <li>Applied data preprocessing, SMOTE balancing for imbalanced student cohort labels, and feature selection using Random Forest importance.</li>
          <li>Constructed ensemble classifiers (Random Forest, XGBoost, and MLP) to predict final course mastery levels.</li>
        </ul>

        <h4>Key Results</h4>
        <p>The framework achieved an 89.4% F1-score in accurately flagging at-risk students three weeks prior to university examinations, facilitating targeted academic remediation.</p>
      `,
      repoUrl: 'https://github.com'
    },
    'cpu-simulator': {
      title: 'Multiprocessor CPU Scheduling & Deadlock Simulator',
      category: 'Operating Systems & Architecture',
      subtitle: 'Instructional Software Tool for Computer Science Laboratories',
      content: `
        <h4>Purpose &amp; Design</h4>
        <p>Engineered to bridge theoretical operating system concepts with interactive graphical visualizers for undergraduate B.Tech CSE cohorts.</p>

        <h4>Core Modules</h4>
        <ul>
          <li><strong>Scheduling Visualizer:</strong> Side-by-side Gantt chart comparison of FCFS, Shortest Job First (preemptive &amp; non-preemptive), and Multilevel Feedback Queues.</li>
          <li><strong>Banker's Algorithm Matrix:</strong> Dynamic step-by-step state verification verifying whether resource allocations maintain a safe execution state.</li>
          <li><strong>Memory Paging Simulator:</strong> Visual representation of FIFO, LRU, and Optimal page replacement hit/miss ratios.</li>
        </ul>
      `,
      repoUrl: 'https://github.com'
    },
    'testing-suite': {
      title: 'Performance Benchmark & Automated Regression Suite',
      category: 'Software Testing & Quality Engineering',
      subtitle: 'Testing Suite for Campus Portals & Enterprise Databases',
      content: `
        <h4>Context</h4>
        <p>Stress-testing university academic databases during peak semester registration intervals to avoid HTTP 500 errors and transaction deadlocks.</p>

        <h4>Methodology</h4>
        <ul>
          <li>Simulated 500 to 2,000 concurrent virtual users using <strong>Mercury LoadRunner</strong> virtual user generators.</li>
          <li>Monitored CPU load, memory leak thresholds, and SQL query execution plans with <strong>TestDirector</strong>.</li>
          <li>Identified database index locking bottlenecks and recommended normalized query structures reducing page latency by 42%.</li>
        </ul>
      `,
      repoUrl: 'https://github.com'
    },
    'cnn-classification': {
      title: 'Convolutional Neural Network for Image Classification',
      category: 'Artificial Intelligence & Deep Learning',
      subtitle: 'Applied Machine Learning Research Exploration',
      content: `
        <h4>Objective</h4>
        <p>Building high-accuracy, resource-efficient neural network vision models capable of real-time inference on edge devices.</p>

        <h4>Implementation Details</h4>
        <ul>
          <li>Trained deep CNN backbones (ResNet-50 and MobileNetV2) using transfer learning on curated multi-class benchmarks.</li>
          <li>Employed data augmentation (rotations, color jittering, affine transforms) and AdamW weight decay regularization.</li>
          <li>Converted models to quantized formats for rapid edge execution with minimal accuracy loss.</li>
        </ul>
      `,
      repoUrl: 'https://github.com'
    },
    'academic-erp': {
      title: 'Three-Tier Academic ERP & Examination System',
      category: 'Web & Distributed Systems',
      subtitle: 'Full-Stack Enterprise College Management Portal',
      content: `
        <h4>System Architecture</h4>
        <p>A multi-tier enterprise architecture built on Java Servlets, JSP, JDBC, and Oracle Database.</p>

        <h4>Features</h4>
        <ul>
          <li>Role-based access control (Admin, Faculty, Student) with hashed session authentication.</li>
          <li>Automated calculation of student attendance percentages and eligibility condonation lists.</li>
          <li>Dynamic generation of university-standard transcript formats with cryptographic checksum verification.</li>
        </ul>
      `,
      repoUrl: 'https://github.com'
    }
  };

  if (modalBackdrop && openModalButtons.length > 0) {
    openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project-id');
        const project = projectData[projectId];

        if (project) {
          modalTitle.textContent = project.title;
          modalCategory.textContent = project.category;
          modalSubtitle.textContent = project.subtitle;
          modalBody.innerHTML = project.content;
          if (modalRepoLink) {
            modalRepoLink.href = project.repoUrl || 'https://github.com';
          }
          openModal();
        }
      });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalSecondaryClose) modalSecondaryClose.addEventListener('click', closeModal);

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }

  function openModal() {
    modalBackdrop.style.display = 'flex';
    // Delay to trigger CSS transition
    setTimeout(() => {
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent page scrolling
    }, 10);
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      modalBackdrop.style.display = 'none';
    }, 250);
  }


  /* ==========================================================================
     8. CONTACT FORM VALIDATION & INTERACTION
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  if (contactForm) {
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const subjectInput = document.getElementById('userSubject');
    const messageInput = document.getElementById('userMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    // Email validation regex helper
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Live validation error clearing on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('error');
          const errorSpan = document.getElementById(input.name + 'Error') || document.getElementById(input.id.replace('user', '').toLowerCase() + 'Error');
          if (errorSpan) errorSpan.textContent = '';
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
        nameInput.classList.add('error');
        nameError.textContent = 'Please provide your full name (minimum 3 characters).';
        isValid = false;
      } else {
        nameInput.classList.remove('error');
        nameError.textContent = '';
      }

      // Validate Email
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        emailInput.classList.add('error');
        emailError.textContent = 'Please enter a valid academic or professional email address.';
        isValid = false;
      } else {
        emailInput.classList.remove('error');
        emailError.textContent = '';
      }

      // Validate Subject
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 5) {
        subjectInput.classList.add('error');
        subjectError.textContent = 'Please enter a subject with at least 5 characters.';
        isValid = false;
      } else {
        subjectInput.classList.remove('error');
        subjectError.textContent = '';
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 15) {
        messageInput.classList.add('error');
        messageError.textContent = 'Please provide your message details (minimum 15 characters).';
        isValid = false;
      } else {
        messageInput.classList.remove('error');
        messageError.textContent = '';
      }

      if (isValid) {
        // Success state
        if (formAlert) {
          formAlert.style.display = 'flex';
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            <div>
              <strong>Inquiry Received!</strong> Thank you, ${nameInput.value.trim()}. Your message regarding "<em>${subjectInput.value.trim()}</em>" has been validated and prepared for delivery. (To receive live email submissions directly to your inbox, connect this form to Formspree or EmailJS).
            </div>
          `;
        }

        // Reset form fields
        contactForm.reset();

        // Auto-hide alert after 8 seconds
        setTimeout(() => {
          if (formAlert) {
            formAlert.style.display = 'none';
          }
        }, 8000);
      } else {
        if (formAlert) {
          formAlert.style.display = 'flex';
          formAlert.className = 'form-alert error';
          formAlert.innerHTML = `
            <i class="fa-solid fa-triangle-exclamation"></i>
            <div>Please review the highlighted fields above and correct the errors before submitting.</div>
          `;
        }
      }
    });
  }


  /* ==========================================================================
     9. DYNAMIC COPYRIGHT YEAR
     ========================================================================== */
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* ==========================================================================
     10. BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
