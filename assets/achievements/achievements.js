
import { achievements } from "./assets.js";

const container = document.getElementById("achievements-grid");

if (container) {
    container.innerHTML = achievements.map(item => `
        <div class="achievement-card">

            <div class="achievement-icon">
                <i class="fa-solid ${item.icon}"></i>
            </div>

            <div class="achievement-content">

                <span class="achievement-date">
                    ${item.category}
                </span>

                <h3 class="achievement-title">
                    ${item.title}
                </h3>

                <p class="achievement-desc">
                    ${item.description}
                </p>

                ${item.link ? `
                    <a href="${item.link}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="btn btn-xs btn-outline">
                        View
                    </a>
                ` : ""}

            </div>

        </div>
    `).join("");
}
