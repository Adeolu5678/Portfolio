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
select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
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
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
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

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
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
        <h3 class="section-title">Education & Certifications</h3>
        <div class="timeline-item">
          <h4>University of Ibadan</h4>
          <span>Current</span>
          <p>B.Sc. Computer Science — Distributed Systems, Cryptography, Database Management</p>
        </div>
        <div class="timeline-item">
          <h4>Certifications</h4>
          <span>2022 — 2023</span>
          <p>• Flutter Development Bootcamp (Udemy) • Web Design (iDesign Pro Academy) • 3x RC Drone Competition Winner</p>
        </div>
      </div>
      
      <div class="section">
        <h3 class="section-title">Professional Experience</h3>
        <div class="timeline-item">
          <h4>VentureDeck — Founder & Lead Full Stack Developer</h4>
          <span>Oct 2024 — Present</span>
          <p>Dual-interface startup launchpad with React (Next.js), TypeScript, and Convex real-time backend.</p>
        </div>
        <div class="timeline-item">
          <h4>EchoinWhispr — Founder & Lead Engineer</h4>
          <span>July 2023 — Present</span>
          <p>Decentralized social dApp with Next.js, React Native, Solidity smart contracts, E2E encryption.</p>
        </div>
        <div class="timeline-item">
          <h4>Freelance — Software Developer & Digital Marketing</h4>
          <span>July 2023 — Present</span>
          <p>Full-stack apps with PostgreSQL/Express/React. Social media management and content creation.</p>
        </div>
      </div>
      
      <div class="section">
        <h3 class="section-title">Technical Skills</h3>
        <div class="skills-grid">
          <div class="skill-item"><span>React / Next.js / TypeScript</span><span>95%</span></div>
          <div class="skill-item"><span>Node.js / Express / APIs</span><span>90%</span></div>
          <div class="skill-item"><span>PostgreSQL / Convex / IPFS</span><span>85%</span></div>
          <div class="skill-item"><span>Digital Marketing / Content</span><span>80%</span></div>
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
