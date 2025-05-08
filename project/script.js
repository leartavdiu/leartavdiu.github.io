const apiKey = "5b631a2cf0msh65cb8ee0fe94bb5p19adcajsn0e2a5b1180a9"; 
const apiHost = "online-quran-api.p.rapidapi.com"; 
const surahsListUrl = "https://online-quran-api.p.rapidapi.com/surahs"; 

// array to store surahs
let allSurahs = [];

// this function talks to the API and gets the list of surahs
function loadSurahs() {
  fetch(surahsListUrl, {
    method: 'GET', 
    headers: {
      'x-rapidapi-key': apiKey, // sends api key to get access
      'x-rapidapi-host': apiHost // tells rapidapi which API im using
    }
  })
  .then(response => response.json()) // turns response into real JavaScript object
  .then(result => {
    // makes sure result has a surahList array
    if (result && result.surahList && Array.isArray(result.surahList)) {
      allSurahs = result.surahList; // saves it in the global variable
      displaySurahs(allSurahs); // calls the function to actually show the surahs
    }
  })
  .catch(error => {
    alert("Error loading Surahs: " + error.message);
    console.error(error); 
  });
}

// this function takes surah data and puts it into HTML cards
function displaySurahs(surahsData) {
  const surahsListDiv = document.getElementById('surahs-list'); // finds the div where surahs will go
  surahsListDiv.innerHTML = ""; // clears it out first so it doesn't duplicate

  surahsData.forEach(surah => { // loops through each surah
    const surahCard = `
      <div class="col-md-4"> <!-- makes a 3-column layout using Bootstrap -->
        <div class="card surah-card">
          <div class="card-header">
            Surah ${surah.number}: ${surah.name}
          </div>
          <div class="card-body">
            <p><strong>Bangla:</strong> ${surah.bangla}</p>
            <a href="details.html?name=${encodeURIComponent(surah.name)}" class="btn btn-primary">View Details</a>
            <!-- puts the surah name in the URL to load the details page -->
          </div>
        </div>
      </div>
    `;
    surahsListDiv.innerHTML += surahCard; // adds the new card to the page
  });
}

// this function filters surahs when you type in the search box
function filterSurahs() {
  const query = document.getElementById('search-input').value.toLowerCase(); // get the text user typed and lowercase it
  const filtered = allSurahs.filter(s => s.name.toLowerCase().includes(query)); // only keep surahs that match
  displaySurahs(filtered); // show the filtered ones
}
