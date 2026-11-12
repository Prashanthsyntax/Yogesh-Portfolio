
import { projects } from "./assets.js";

const container = document.getElementById("projectsGrid");

if (container) {
    container.innerHTML = projects.map(project => `
        <div class="project-card" data-category="${project.category.toLowerCase()}">

            <div class="project-card-image">
                <img
                    src="${project.image}"
                    alt="${project.imageAlt}"
                    loading="lazy"
                >
                <span class="project-badge">
                    ${project.badge}
                </span>
            </div>

            <div class="project-card-body">

                <div class="project-meta">
                    <span>
                        <i class="fa-regular fa-calendar"></i>
                        ${project.timeline}
                    </span>

                    <span>
                        <i class="fa-solid fa-tag"></i>
                        ${project.category}
                    </span>
                </div>

                <h3 class="project-title">
                    ${project.title}
                </h3>

                <p class="project-desc">
                    ${project.description}
                </p>

                <div class="project-tech-tags">
                    ${project.technologies.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join("")}
                </div>

                ${project.repository ? `
                    <div class="project-links">
                        <a
                            href="${project.repository}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-sm btn-secondary"
                        >
                            <i class="fa-brands fa-github"></i>
                            View Project
                        </a>
                    </div>
                ` : ""}

            </div>
        </div>
    `).join("");
}
