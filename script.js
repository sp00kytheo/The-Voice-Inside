/*
==================================================

THE VOICE INSIDE

VERSION 1.9.8
"The Cleanup Update"

DEVELOPED BY:
TH3O'S PRODUCTIONS

CURRENT STATUS:
STABLE

Keep creating. 💜
==================================================
*/

// ==================================================
//                    ELEMENTS
// ==================================================
const saveButton = document.getElementById("saveButton");
const thoughtInput = document.getElementById("thoughtInput");
const thoughtsContainer = document.getElementById("thoughtsContainer");
const deleteButton = document.getElementById("deleteButton");
const themeButton = document.getElementById("themeButton");

const happyCount = document.getElementById("happyCount");
const neutralCount = document.getElementById("neutralCount");
const sadCount = document.getElementById("sadCount");
const mainMood = document.getElementById("mainMood");

const searchInput = document.getElementById("searchInput");
const clearSearchButton = document.getElementById("clearSearchButton");

const searchResults = document.getElementById("searchResults");

const exportButton = document.getElementById("exportButton");

const characterCount = document.getElementById("characterCount");
const wordCount = document.getElementById("wordCount");

const totalThoughts = document.getElementById("totalThoughts");

const favoritesTitle = document.getElementById("favoritesTitle");

const showAllButton = document.getElementById("showAllButton");
const showFavoritesButton = document.getElementById("showFavoritesButton");

const searchSection = document.getElementById("searchSection");
const statsSection = document.getElementById("statsSection");
const thoughtsSection = document.getElementById("thoughtsSection");
const favoritesSection = document.getElementById("favoritesSection");
// ==================================================
//                    ELEMENTS
// ==================================================

let currentFilter = "all";

// ==================================================
//                    MESSAGES
// ==================================================
const messages = {
  allThoughts: "Εμφανίζονται όλες οι καταγραφές.", 
  oneResult: "🔍 Βρέθηκε 1 καταγραφή που ταιριάζει με την αναζήτησή σου.",
  multipleResults: "🔍 Βρέθηκαν", 
  noResultsSearch: "Δεν βρέθηκαν καταγραφές που ταιριάζουν με την αναζήτησή σου.",
  noThoughts: "Δεν βρέθηκαν καταγραφές.",
  noFavorites: "Δεν υπάρχουν αγαπημένες καταγραφές.",
  dominantMood: "Κυρίαρχη διάθεση: ",
  totalThoughts: "Συνολικές καταγραφές: "
};
// ==================================================
//                    MESSAGES
// ==================================================

// ==================================================
//                    THEME
// ==================================================
const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );

    themeButton.textContent =
        "Light Theme";

}

themeButton.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeButton.textContent = "Light Theme";

        localStorage.setItem(
            "theme",
            "dark"
        );

    }
    else {

        themeButton.textContent = "Dark Theme";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});

// ==================================================
//                    THEME
// ==================================================

// ==================================================
//                    EVENT LISTENERS
// ==================================================
deleteButton.addEventListener("click", function() {
    if (confirm('Είσαι σίγουρος/-η ότι θέλεις να διαγράψεις όλες τις σκέψεις σου;')) {
        thoughts = [];
        localStorage.removeItem("thoughts");
        displayThoughts();
        updateMoodStats();
}
});
// ==================================================
//                    EVENT LISTENERS
// ==================================================

const moodButtons = document.querySelectorAll(".moodButton");

// ==================================================
//                    MOOD SYSTEM
// ==================================================
let selectedMood = "😐";

moodButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedMood = button.dataset.mood;
  });
});

// ==================================================
//                    LOCAL STORAGE
// ==================================================
let thoughts = JSON.parse(localStorage.getItem("thoughts")) || [];
let favorited = JSON.parse(localStorage.getItem("favorited")) || [];
// ==================================================
//                    LOCAL STORAGE
// ==================================================

// ==================================================
//                  THOUGHTS SYSTEM
// ==================================================
function displayThoughts(searchText = "") {
  thoughtsContainer.innerHTML = "";

  let filteredThoughts = thoughts.filter(function(thought) {
    return thought.toLowerCase().includes(searchText.toLowerCase());
  });

  if (currentFilter === "favorites") {
    filteredThoughts = filteredThoughts.filter(function(thought) {
      return favorited.includes(thought);
    });
  }

  const count = filteredThoughts.length;

  if (searchText === "") {
    searchResults.textContent = messages.allThoughts;
  }
  else if (count === 0) {
    searchResults.textContent = messages.noResultsSearch;
  }
  else if (count === 1) {
    searchResults.textContent = messages.oneResult;
  }
  else {
    searchResults.textContent = `${messages.multipleResults} ${count} καταγραφές που ταιριάζουν με την αναζητησή σου.`;
  }

  if (count === 0) {
    searchResults.textContent = messages.noResultsSearch;
    thoughtsContainer.innerHTML = "<p>" + messages.noThoughts + "</p>";
    return;
  }

  filteredThoughts.forEach(function(thought) {

    const isFavorited = favorited.includes(thought);

    thoughtsContainer.innerHTML += `
  <div class="thought-card">
    <p>${thought}</p>
    <button class="favoriteButton"
      data-thought="${thought}">
        ${isFavorited ? "✅ Στα αγαπημένα" : "⭐ Προσθήκη στα αγαπημένα"}
    </button>
    <hr>
  </div>
  `;
  });

  const favoriteButtons =
document.querySelectorAll(".favoriteButton");
// ==================================================
//                  THOUGHTS SYSTEM
// ==================================================

// ==================================================
//                    MOOD SYSTEM
// ==================================================

// ==================================================
//                    FAVORITES
// ==================================================
favoriteButtons.forEach(function(button) {

  button.addEventListener("click", function() {

    const thought =
      button.dataset.thought;

    if (!favorited.includes(thought)) {

      favorited.push(thought);

    }

    else {

      favorited =
        favorited.filter(
          item => item !== thought
        );

    }

    localStorage.setItem(
      "favorited",
      JSON.stringify(favorited)
    );

    displayThoughts();
    displayFavorites();

  });

});

}
// ==================================================
//                    FAVORITES
// ==================================================


// ==================================================
//                    EVENT LISTENERS
// ==================================================
showAllButton.addEventListener("click", function() {

  currentFilter = "all";

    searchSection.style.display = "block";
    statsSection.style.display = "block";
    thoughtsSection.style.display = "block";

    favoritesSection.style.display = "block";
  displayThoughts();
});

 showFavoritesButton.addEventListener("click", function() {

    currentFilter = "favorites";

    searchSection.style.display = "none";
    statsSection.style.display = "none";
    thoughtsSection.style.display = "none";

    favoritesSection.style.display = "block";
  displayThoughts();
});

function displayFavorites() {
  favoritesTitle.textContent = `⭐ Αγαπημένες σκέψεις (${favorited.length})`;

  favoritesContainer.innerHTML = "";

  if (favorited.length === 0) {
    favoritesContainer.innerHTML = "<p>" + messages.noFavorites + "</p>";
    return;
  }

  favorited.forEach(function(thought) {
    favoritesContainer.innerHTML += `
      <p>${thought}</p>
      <hr>
    `;
  });
}

// ==================================================
//                    MOOD SYSTEM
// ==================================================
function updateMoodStats() {
  let happy = 0;
  let neutral = 0;
  let sad = 0;

  thoughts.forEach(function(thought) {
    if (thought.includes("🙂")) {
      happy++;
    }
    else if (thought.includes("😐")) {
      neutral++;
    }
    else if (thought.includes("😔")) {
      sad++;
    }
  });

  happyCount.textContent = "🙂" + happy;
  neutralCount.textContent = "😐" + neutral;
  sadCount.textContent = "😔" + sad;

  const total = happy + neutral + sad;

  totalThoughts.textContent = messages.totalThoughts + total;

  let dominantMood = "😐";

  if (happy > neutral && happy > sad) {
    dominantMood = "🙂";
  }
  else if (neutral > sad) {
    dominantMood = "😐";
  }
  else {
    dominantMood = "😔";
  }

  mainMood.textContent = messages.dominantMood + dominantMood;
}
// ==================================================
//                    MOOD SYSTEM
// ==================================================

// ==================================================
//                    EVENT LISTENERS
// ==================================================

saveButton.addEventListener("click", function () {
  const thought = thoughtInput.value;

  if (thought.trim() === "") return;

  const now = new Date();

  const timestamp =
    now.toLocaleDateString() +
    " " +
    now.toLocaleTimeString();
  
  thoughts.push(
     selectedMood +
     " [" + timestamp + "]\n\n" +
     thought
  );

  localStorage.setItem("thoughts", JSON.stringify(thoughts));

  displayThoughts();
  updateMoodStats();
  thoughtInput.value = "";
});

// ==================================================
//                  SEARCH SYSTEM
// ==================================================
searchInput.addEventListener("input", function() {

  displayThoughts(searchInput.value);
});

clearSearchButton.addEventListener("click", function() {
  searchInput.value = "";
  displayThoughts();
  }
);
// ==================================================
//                  SEARCH SYSTEM
// ==================================================

// ==================================================
//                    EVENT LISTENERS
// ==================================================
exportButton.addEventListener("click", function() {

  const content = thoughts.join("\n\n--------------------\n\n");

  const blob = new Blob([content], { type: "text/plain" });

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);

  link.download = "TheVoiceInside_Journal.txt";

  link.click();
});

thoughtInput.addEventListener("input", function() {

  characterCount.textContent = "Χαρακτήρες:" + thoughtInput.value.length;

  const words = thoughtInput.value.trim().split(/\s+/);

  const wordTotal = thoughtInput.value.trim() === "" ? 0 : words.length;

  wordCount.textContent = "Λέξεις:" + wordTotal;
});
// ==================================================
//                    EVENT LISTENERS
// ==================================================


displayThoughts();
displayFavorites();
updateMoodStats();