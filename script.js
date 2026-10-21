
// ---- Constants: single source of truth for values used more than once ----
const API_ENDPOINT = "https://catfact.ninja/fact";

const BUTTON_TEXT_DEFAULT = "Get a Cat Fact";
const BUTTON_TEXT_LOADING = "Fetching...";
const ERROR_MESSAGE = "Could not load a cat fact right now. Please try again.";

// ---- DOM references (looked up once, reused everywhere) ----
const fetchButton = document.getElementById("fetchButton");
const factCard = document.getElementById("factCard");
const statusMessage = document.getElementById("statusMessage");

document.addEventListener("DOMContentLoaded", () => {
    // Load one fact automatically on first visit, then let the
    // button drive every fetch after that.
    handleFetchButtonClick();
    fetchButton.addEventListener("click", handleFetchButtonClick);
});

async function handleFetchButtonClick() {
    setLoadingState(true);
    clearStatusMessage();

    try {
        const fact = await fetchCatFact();
        renderFact(fact);
    } catch (error) {
        // Catches network failures, a bad HTTP status (thrown below),
        // or a JSON-parsing failure — all in one place.
        showStatusMessage(ERROR_MESSAGE, true);
        console.error("Failed to fetch cat fact:", error);
    } finally {
        // Runs whether the request succeeded or failed, so the button
        // never gets stuck in a disabled/loading state.
        setLoadingState(false);
    }
}


async function fetchCatFact() {
    const response = await fetch(API_ENDPOINT);

    // fetch() only rejects on a network-level failure — it does NOT
    // reject on an HTTP error status like 404 or 500 — so that has
    // to be checked manually.
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json(); // { fact: "...", length: 74 }
}


function renderFact(factData) {
    factCard.innerHTML = "";

    const factText = document.createElement("p");
    factText.className = "fact-text";
    factText.textContent = factData.fact;

    const factLength = document.createElement("span");
    factLength.className = "fact-length";
    factLength.textContent = `${factData.length} characters`;

    factCard.appendChild(factText);
    factCard.appendChild(factLength);
}


function setLoadingState(isLoading) {
    fetchButton.disabled = isLoading;
    fetchButton.textContent = isLoading ? BUTTON_TEXT_LOADING : BUTTON_TEXT_DEFAULT;
}


function showStatusMessage(message, isError) {
    statusMessage.textContent = message;
    statusMessage.classList.toggle("is-error", Boolean(isError));
}


function clearStatusMessage() {
    statusMessage.textContent = "";
    statusMessage.classList.remove("is-error");
}