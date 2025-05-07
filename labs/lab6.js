async function loadCatFacts() {
    const response = await fetch("https://brianobruno.github.io/cats.json");
    const data = await response.json();

    data.facts.sort((a, b) => a.factId - b.factId);

    const table = document.getElementById("factsTable");
    table.innerHTML = "";

    data.facts.forEach(fact => {
        table.innerHTML += `<tr><td>${fact.factId}</td><td>${fact.text}</td></tr>`;
    });

    const img = document.getElementById("catImage");
    img.onerror = () => {
        img.src = "https://cdn.pixabay.com/photo/2018/05/04/16/50/cat-3374422_1280.jpg";
    };
    img.src = data.catPhoto;
}
