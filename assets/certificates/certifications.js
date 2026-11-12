import { certificates } from "./assets.js";

const container = document.getElementById("certifications-grid");

container.innerHTML = certificates.map(cert => `
  <div class="cert-card">
    <div class="cert-badge-icon">
      <i class="fa-solid ${cert.icon}"></i>
    </div>

    <div class="cert-body">
      <span class="cert-issuer">${cert.issuer}</span>

      <h3 class="cert-name">${cert.name}</h3>

      <p class="cert-desc">${cert.description}</p>

      <div class="cert-meta">
        <span>
          <i class="fa-solid fa-user"></i>
          ${cert.recipient}
        </span>

        ${cert.certificateId ? `
          <span>
            <i class="fa-solid fa-id-card"></i>
            ID: ${cert.certificateId}
          </span>
        ` : ""}

        <span>
          <i class="fa-regular fa-calendar-check"></i>
          ${cert.date}
        </span>
      </div>

      <a href="${cert.file}"
         target="_blank"
         rel="noopener noreferrer"
         class="btn btn-xs btn-outline">
        View Certificate
      </a>
    </div>
  </div>
`).join("");