// To perform search
function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('header-abbreviations');
    resultsContainer.innerHTML = '';
    alert("Looking!");

       // Filter abbreviations based on search input
       const filteredAbbreviations = abbreviations.filter(abbr => {
        return abbr.abbreviation.toLowerCase().includes(searchInput) ||
               abbr.meaning.toLowerCase().includes(searchInput) ||
               abbr.keywords.some(keyword => keyword.toLowerCase().includes(searchInput));
    });

    // To display results
    if (filteredAbbreviations.length === 0) {
        resultsContainer.innerHTML = 'No results found.';
    } else {
        filteredAbbreviations.forEach(abbr => {
            const resultElement = document.createElement('div');
            resultElement.innerHTML = `<strong>${abbr.abbreviation}</strong>: ${abbr.meaning}`;
            resultsContainer.appendChild(resultElement);
        });
    }
}