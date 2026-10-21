# 🐱 Mini Project: Cat Fact Fetcher
## ✨ Features

* **Asynchronous Data Fetching:** Utilizes modern `async/await` syntax alongside the `fetch()` API for seamless data retrieval.
* **Robust Error Handling:** Intelligently catches both network failures and bad HTTP statuses (e.g., 404, 500) within a unified `try/catch` block, providing user-friendly fallback messages.
* **Dynamic State Management:** Automatically manages UI loading states (disabling the fetch button and updating text) using a `finally` block to ensure the UI never gets stuck.
* **Efficient DOM Updates:** Caches DOM references globally and uses `document.createElement()` to safely inject new content and prevent cross-site scripting (XSS) vulnerabilities.
* **Single Source of Truth:** Centralizes API endpoints and UI text strings into constants for easy maintenance and scaling.

## 🚀 Getting Started

This project relies entirely on vanilla web technologies. No build steps, bundlers, or package installations are required.

### Installation & Usage

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/diwakarkd97-cloud/miniproject-fetch-data.git](https://github.com/diwakarkd97-cloud/miniproject-fetch-data.git)
