import { getSuggestions } from "../utils/getSuggestions.js";
import { debounce } from "../utils/debounce.js";

const searchBox = document.getElementById("search__box");
const suggestionsBox = document.getElementById("suggestions_wrapper");

// Used to hide fragmenr visibility
const resetSearchState = () => {
  suggestionsBox.classList.remove("suggestions-visible");
};

// Step 4 -> Create Document Fragment
// Iterate over result and create div and append in fragmentr
// Append fragment in suggestions box
const rederDropDown = (list) => {
  const suggFrag = document.createDocumentFragment();

  list.forEach((item) => {
    const el = document.createElement("div");
    el.innerHTML = item;
    el.classList.add("dropdown-item");
    el.setAttribute("data-key", item);
    suggFrag.appendChild(el);
  });
  // Clear out previous results/fragments
  suggestionsBox.innerHTML = "";
  suggestionsBox.appendChild(suggFrag);
};

// STep 3 Get Results from utility for matched items
const handleSearch = async (val) => {
  const result = await getSuggestions(val);

  // If results are there use CSS to enable result container visibiloity
  if (result.length) {
    suggestionsBox.classList.add("suggestions-visible");
    rederDropDown(result);
  }
};

// Step 2 Capture input value using event
const handleInputChange = (e) => {
  const value = e.target.value;
  if (value) {
    handleSearch(value);
  } else {
    resetSearchState();
  }
};

const handleSelected = (e) => {
  const { key } = event.target.dataset;
  if (key) {
    searchBox.value = key;
    resetSearchState();
  }
};

// Step 1 -> Listen to input event
(() => {
  searchBox.addEventListener("input", debounce(handleInputChange, 1000));
  suggestionsBox.addEventListener("click", handleSelected);
})();
