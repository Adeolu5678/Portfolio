"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// toggle select dropdown
if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

// add event in all select items
if (selectItems.length > 0) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      if (select) elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

const projectAccessMap = {
  "Command Centre": { access: "nda" },
  "VentureDeck": { access: "nda" },
  "Open-Higgsfield-AI": { access: "nda" },
  "LegalEase": { access: "nda" },
  "EchoinWhispr": { access: "live", url: "https://echoinwhispr.vercel.app" },
  "VozParking": { access: "nda" },
  "Exam-Killer": { access: "nda" },
  "Cloud-Terminal": { access: "live", url: "https://cloudterminal.vercel.app" },
  "ATBANSSS Group": { access: "nda" },
  "IntellyDoc": { access: "nda" },
  "PadeeSpace": { access: "nda" },
  "StakeIt": { access: "nda" },
  "Rommel Security (SMW)": { access: "live", url: "https://sikky-smw.vercel.app" },
  "Intelligencia": { access: "live", url: "https://intelli.nuelbuilds.dev" },
  "AI Website Cloner": { access: "nda" },
  "SuperWay": { access: "nda" },
  "KudiFlow": { access: "nda" },
  "NuelBuilds Agency": { access: "live", url: "https://agency.nuelbuilds.dev" },
  "Dr. Mary Adeoye Portfolio": { access: "live", url: "https://adeoye.nuelbuilds.dev" },
  "Comfort Adeoye Portfolio": { access: "live", url: "https://client2-portfolio.vercel.app" },
  "Prof. Ayangunna Portfolio": { access: "live", url: "https://prof.nuelbuilds.dev" },
  "Portfolio": { access: "live", url: "https://www.nuelbuilds.dev" },
  "Telemetry (SaaS Template)": { access: "live", url: "https://template-saas-landing-page.vercel.app" },
  "VIP Concierge Demo": { access: "live", url: "https://demo-flutter-application.vercel.app" },
  "Workflow-Template": { access: "nda" },
  "VozParking Prototype": { access: "nda" },
  "MakeBelieve": { access: "nda" },
  "PCI-Services": { access: "live", url: "https://pci-services.vercel.app" },
  "Garrison-Plumbing": { access: "live", url: "https://garrison-plumbing.vercel.app" },
  "Delron-Services": { access: "live", url: "https://delron-services.vercel.app" },
  "Demo-Project-2": { access: "nda" },
  "stake-it-78583": { access: "nda" }
};

const ndaModalBackdrop = document.querySelector("[data-nda-modal-backdrop]");
const ndaProjectName = document.querySelector("[data-nda-project-name]");
const ndaModalCloseButtons = document.querySelectorAll("[data-nda-modal-close]");

const openNdaModal = function (projectName) {
  if (!ndaModalBackdrop || !ndaProjectName) return;

  ndaProjectName.textContent = projectName;
  ndaModalBackdrop.hidden = false;
  document.body.style.overflow = "hidden";
};

const closeNdaModal = function () {
  if (!ndaModalBackdrop) return;

  ndaModalBackdrop.hidden = true;
  document.body.style.overflow = "";
};

if (ndaModalBackdrop) {
  ndaModalBackdrop.addEventListener("click", function (event) {
    if (event.target === ndaModalBackdrop) {
      closeNdaModal();
    }
  });
}

if (ndaModalCloseButtons.length > 0) {
  for (let i = 0; i < ndaModalCloseButtons.length; i++) {
    ndaModalCloseButtons[i].addEventListener("click", closeNdaModal);
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && ndaModalBackdrop && !ndaModalBackdrop.hidden) {
    closeNdaModal();
  }
});

const projectCards = document.querySelectorAll(".client-work .project-item > .project-content");

if (projectCards.length > 0) {
  const activateProjectCard = function (projectName, projectConfig) {
    if (projectConfig.access === "live" && projectConfig.url) {
      window.open(projectConfig.url, "_blank", "noopener,noreferrer");
    } else {
      openNdaModal(projectName);
    }
  };

  for (let i = 0; i < projectCards.length; i++) {
    const card = projectCards[i];
    const titleElement = card.querySelector(".project-title");

    if (!titleElement) continue;

    const projectName = titleElement.textContent.trim();
    const projectConfig = projectAccessMap[projectName] || { access: "nda" };
    const isLive = projectConfig.access === "live" && projectConfig.url;

    card.classList.add("project-card-linkable");
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("data-project-access", isLive ? "live" : "nda");
    card.setAttribute(
      "aria-label",
      isLive
        ? `Visit ${projectName}`
        : `${projectName} is NDA protected`
    );

    const statusRow = document.createElement("div");
    statusRow.className = "project-card-status-row";

    const statusPill = document.createElement("span");
    statusPill.className = `project-card-status ${isLive ? "project-card-status--live" : "project-card-status--nda"}`;
    statusPill.textContent = isLive ? "Live" : "NDA";
    statusRow.appendChild(statusPill);
    card.prepend(statusRow);

    const action = document.createElement("div");
    action.className = "project-card-action";
    action.innerHTML = isLive
      ? '<span>Visit Project</span><ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>'
      : '<span>NDA Protected</span><ion-icon name="lock-closed-outline" aria-hidden="true"></ion-icon>';
    card.appendChild(action);

    card.addEventListener("click", function () {
      activateProjectCard(projectName, projectConfig);
    });

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateProjectCard(projectName, projectConfig);
      }
    });
  }
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formInputs.length > 0 && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.textContent.toLowerCase().trim();

    // Remove active class from all pages and links
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
    }
    for (let k = 0; k < navigationLinks.length; k++) {
      navigationLinks[k].classList.remove("active");
    }

    // Add active class to matching page and clicked link
    let matchFound = false;
    for (let j = 0; j < pages.length; j++) {
      if (targetPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        this.classList.add("active");
        matchFound = true;
        window.scrollTo(0, 0);
        break; // Stop after finding match
      }
    }
    
    if (!matchFound) {
      console.warn(`No page found for: ${targetPage}`);
    }
  });
}

// Download Resume as PDF function
function downloadResume() {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  // Get resume content
  const resumeArticle = document.querySelector('[data-page="resume"]');
  const name = document.querySelector('.name').textContent;
  const title = document.querySelector('.title').textContent;
  
  // Build resume HTML for PDF
  const resumeHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${name} - Resume</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Poppins', sans-serif; 
          padding: 40px; 
          background: #fff; 
          color: #333;
          max-width: 800px;
          margin: 0 auto;
        }
        .header { 
          text-align: center; 
          margin-bottom: 30px; 
          padding-bottom: 20px;
          border-bottom: 3px solid #ffdb70;
        }
        .header h1 { 
          font-size: 32px; 
          color: #1e1e1f; 
          margin-bottom: 5px;
        }
        .header p { 
          color: #666; 
          font-size: 16px;
        }
        .section { margin-bottom: 25px; }
        .section-title { 
          font-size: 20px; 
          color: #1e1e1f; 
          margin-bottom: 15px;
          padding-bottom: 5px;
          border-bottom: 2px solid #ffdb70;
          display: inline-block;
        }
        .timeline-item { 
          margin-bottom: 15px; 
          padding-left: 15px;
          border-left: 2px solid #ffdb70;
        }
        .timeline-item h4 { 
          font-size: 16px; 
          color: #1e1e1f;
          margin-bottom: 3px;
        }
        .timeline-item span { 
          color: #b8860b; 
          font-size: 14px;
          font-weight: 500;
        }
        .timeline-item p { 
          color: #666; 
          font-size: 14px;
          margin-top: 5px;
          line-height: 1.5;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .skill-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 12px;
          background: #f5f5f5;
          border-radius: 5px;
        }
        .skill-item span:last-child {
          color: #b8860b;
          font-weight: 500;
        }
        @media print {
          body { padding: 20px; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${name}</h1>
        <p>${title}</p>
      </div>
      
      <div class="section">
        <h3 class="section-title">Education</h3>
        <div class="timeline-item">
          <h4>University of Ibadan</h4>
          <span>Current</span>
          <p>B.Sc. Computer Science — Distributed Systems, Cryptography, Database Management</p>
        </div>
        <div class="timeline-item">
          <h4>WASSCE — West African Examination Council</h4>
          <span>August 2023</span>
          <p>West African Senior School Certificate Examination</p>
        </div>
        <div class="timeline-item">
          <h4>Certifications & Achievements</h4>
          <span>2022 — 2026</span>
          <p>• Hedera Certified Developer (HCD) • OpenJS Node.js Application Developer • AWS Certified Developer – Associate • Google Cloud Professional Machine Learning Engineer • Certified Blockchain Developer – Ethereum • Flutter Development Bootcamp (Udemy) • Web Design (iDesign Pro Academy)</p>
        </div>
      </div>
      
      <div class="section">
        <h3 class="section-title">Engineering & Development</h3>
        <div class="timeline-item">
          <h4>PadeeSpace — Backend Engineer</h4>
          <span>Jan 2026 — Present</span>
          <p>Backend infrastructure for collaborative learning marketplace. Escrow protection and SKO payment processing using React and Node.js.</p>
        </div>
        <div class="timeline-item">
          <h4>StakeIt — Backend & Web3 Lead</h4>
          <span>November 2025 (Hedera Hackathon)</span>
          <p>Web3 goal accountability platform on Hedera Network. Secure, decentralized data handling.</p>
        </div>
        <div class="timeline-item">
          <h4>VentureDeck — Founder & Lead Full Stack Developer</h4>
          <span>Oct 2024 — Present</span>
          <p>Dual-interface startup launchpad with AI Traction Scoring, React (Next.js 15), TypeScript, and Convex real-time backend.</p>
        </div>
        <div class="timeline-item">
          <h4>EchoinWhispr — Founder & Lead Engineer</h4>
          <span>July 2023 — Present</span>
          <p>Decentralized social dApp with Next.js, React Native, Solidity smart contracts, E2E encryption (ECIES).</p>
        </div>
      </div>
      
      <div class="section">
        <h3 class="section-title">Additional Experience</h3>
        <div class="timeline-item">
          <h4>Social Media Manager — Great Eminent RE & Smolux Autos</h4>
          <span>Oct 2024 — July 2025</span>
          <p>Digital presence management, content creation, video/photo editing, Jiji.ng optimization.</p>
        </div>
        <div class="timeline-item">
          <h4>Editorial Assistant — The Nigerian Baptist Convention</h4>
          <span>Oct 2023 — Dec 2023</span>
          <p>Manuscript proofreading, content coherence, publication quality assurance.</p>
        </div>
        <div class="timeline-item">
          <h4>Founder / Retail Manager — Self-Employed</h4>
          <span>July 2023 — Present</span>
          <p>Phone resale business management, inventory, sales, and customer relations.</p>
        </div>
      </div>
      
      <div class="section">
        <h3 class="section-title">Technical Skills</h3>
        <div class="skills-grid">
          <div class="skill-item"><span>React / Next.js / TypeScript</span><span>95%</span></div>
          <div class="skill-item"><span>Node.js / Express / Python</span><span>90%</span></div>
          <div class="skill-item"><span>PostgreSQL / Convex / IPFS</span><span>85%</span></div>
          <div class="skill-item"><span>Creative Tools (Adobe / DaVinci)</span><span>85%</span></div>
          <div class="skill-item"><span>Digital Marketing / SEO</span><span>80%</span></div>
          <div class="skill-item"><span>Leadership / Project Management</span><span>75%</span></div>
        </div>
        <p style="margin-top: 10px; color: #666; font-size: 12px;"><strong>Languages:</strong> English (C2), German (B2), Yoruba (Native)</p>
      </div>
      
      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;
  
  printWindow.document.write(resumeHTML);
  printWindow.document.close();
}
