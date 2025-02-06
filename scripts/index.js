//  The DOMContentLoaded event is fired when the HTML is fully loaded
//  Fetching data after HTML is loaded.
document.addEventListener("DOMContentLoaded", () => {
    fetch('db/data.json')   //  Returns a Promise
        .then(response => response.json())
        .then(data => renderNews(data))
        .catch(error => console.error("Error loading JSON:", error)); //    Catch gets executed in case Promise was rejected
});

//  Function to read JSON data and dynamically create HTML elements
function renderNews(data) {
    const container = document.getElementById("news-container");

    //  Check if article array is empty
    if (!data.articles) {
        console.error("Invalid JSON structure");
        return;
    }

    //  Loops through each article
    data.articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item"); // Adds css class to each div element

        newsItem.innerHTML = `
            <img src="${article.thumbnail.src}" alt="${article.thumbnail.title}" width="${article.thumbnail.width}" height="${article.thumbnail.height}">
            <h2>${article.headline}</h2>
            <p>${article.standfirst}</p>
            <a href="${article.link}" target="_blank">Read More</a>
        `;

        container.appendChild(newsItem);
    });
}
