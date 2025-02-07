//  The DOMContentLoaded event is fired when the HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    fetch('db/data.json')   // Fetching JSON data
        .then(response => response.json())
        .then(data => renderNews(data))
        .catch(error => console.error("Error loading JSON:", error));
});

// Function to dynamically create HTML elements based on JSON data
function renderNews(data) {
    const mainArticle = document.getElementById("main-article");
    const sideArticle = document.getElementById("side-articles");

    //  Validate JSON structure
    if (!data.articles || !Array.isArray(data.articles)) {
        console.error("Invalid JSON structure");
        return;
    }

    let firstArticle = true;
    data.articles.forEach(article => {
        const newsItem = document.createElement("div");

        newsItem.classList.add("article");

        if(firstArticle){
            newsItem.innerHTML = `
            <p>${article.thumbnail.title}</p>
            <img src="${article.thumbnail.src}" alt="${article.thumbnail.title}" width="${article.thumbnail.width}" height="${article.thumbnail.height}">
            <a href="${article.link}" target="_blank">
                <h2>${article.headline}</h2>
            </a>
        `;
            mainArticle.appendChild(newsItem);
            firstArticle = false;
        }else{
            newsItem.innerHTML = `
            <div class="side-main-div">
                <p>${article.thumbnail.title}</p>
                <h2>${article.headline}</h2>
                <div class="side-article">
                    <img src="${article.thumbnail.src}" alt="${article.thumbnail.title}" width="${article.thumbnail.width}" height="${article.thumbnail.height}">
                    <a href="${article.link}" target="_blank">
                        <p>${article.standfirst || "Read more about this news."}</p>
                    </a>
                </div>
            </div>
        `;
            sideArticle.appendChild(newsItem);
        }
    });
}
