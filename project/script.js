// api credentials for rapidapi
const apiKey = "5b631a2cf0msh65cb8ee0fe94bb5p19adcajsn0e2a5b1180a9";
const apiHost = "online-quran-api.p.rapidapi.com";
const surahsListUrl = "https://online-quran-api.p.rapidapi.com/surahs";

// fetch and display all surahs (used on index.html)
function loadSurahs() {
  fetch(surahsListUrl, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    }
  })
  .then(response => response.json())
  .then(result => {
    // check if the data is valid
    if (result && result.surahList && Array.isArray(result.surahList)) {
      displaySurahs(result.surahList);
    } else {
      alert("No Surahs found.");
      console.error("Invalid response:", result);
    }
  })
  .catch(error => {
    alert("Error loading Surahs: " + error.message);
    console.error(error);
  });
}

// create and insert surah cards into the page
function displaySurahs(surahsData) {
  const surahsListDiv = document.getElementById('surahs-list');
  surahsListDiv.innerHTML = ""; // clear previous content

  surahsData.forEach(surah => {
    const surahCard = `
      <div class="col-md-4">
        <div class="card surah-card">
          <div class="card-header">
            Surah ${surah.number}: ${surah.name}
          </div>
          <div class="card-body">
            <p><strong>Bangla:</strong> ${surah.bangla}</p>
            <a href="details.html?name=${encodeURIComponent(surah.name)}" class="btn btn-primary">View Details</a>
          </div>
        </div>
      </div>
    `;
    surahsListDiv.innerHTML += surahCard;
  });
}

// get the 'name' value from the url (used on details.html)
function getSurahNameFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('name');
}

// fetch a specific surah's details
function fetchSurahDetails(name) {
  const surahDetailsUrl = `https://online-quran-api.p.rapidapi.com/surahs/${name}`;

  fetch(surahDetailsUrl, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': apiHost
    }
  })
  .then(response => response.json())
  .then(result => {
    if (result && result.surah) {
      displaySurahDetails(result);
    } else {
      alert("No details found for this Surah.");
    }
  })
  .catch(error => {
    alert("Error loading Surah details: " + error.message);
    console.error(error);
  });
}

// insert full surah info and verses into the page
function displaySurahDetails(surah) {
  const surahDetailsDiv = document.getElementById('surah-details');

  surahDetailsDiv.innerHTML = `
    <div class="card">
      <div class="card-header">
        Surah Details: ${surah.surahName}
      </div>
      <div class="card-body">
        <p><strong>Total Verses:</strong> ${surah.verse}</p>
        <p><strong>Audio Link:</strong> <a href="${surah.audio}" target="_blank">Listen</a></p>
        <p><strong>Bismillah:</strong> ${surah.bismillah || "N/A"}</p>
        <h4>Verses:</h4>
        <ul>
          ${surah.surah.map(v => `
            <li>
              <strong>Verse ${v.verse}:</strong>
              <p><strong>Arabic:</strong> ${v.arabic}</p>
              <p><strong>Bangla:</strong> ${v.bangla}</p>
              <p><strong>English:</strong> ${v.english}</p>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;
}

// auto-load details when on details.html
const pageSurah = getSurahNameFromURL?.();
if (pageSurah) fetchSurahDetails(pageSurah);
