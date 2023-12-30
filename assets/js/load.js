function loadArticle(article) {
    fetch("./assets/articles/" + article)
        .then(response => response.text())
        .then(articleContent => {
            // Insert the article content into the article element
            document.getElementById('articleContent').innerHTML = '<p>' + articleContent.replace(/\n/g, '<br>') + '</p>';
        })
        .catch(error => console.error('Error fetching article content:', error));

        console.log("article loaded")
}


async function loadArticles(articles){
    for (const article of articles) {
        try {
            // Fetch the content of the article page
            const response = await fetch(article);
            const content = await response.text();

            // Create a DOM parser
            var parser = new DOMParser();

            // Parse the content
            var doc = parser.parseFromString(content, 'text/html');

            // Extract the title and the first paragraph of the article
            var title = doc.querySelector('h1').textContent;
            var image = doc.querySelector('img').src;
            var category = doc.querySelector('p').textContent;
            var paragraph = doc.querySelector('#description').textContent;
            //var author = doc.querySelector('#author').textContent;
            var date = doc.querySelector('#date').textContent;

            // Create a card with the title and the paragraph
            var card = `
                <div class="row mb-2 ml-2 mr-2">
                    <div class="customCard">
                    <img class="customCard-image" src="${image}">
                        <div class="pl-2 pl-md-3">
                            <h2 class="mb-2 h6 font-weight-bold">
                                <a class="text-dark" href="${article}">${title}</a>
                                <small class="text-danger">${category}</small>
                            </h2>
                           
                            <div class="card-text text-muted small">
                                ${paragraph}
                            </div>
                           

                            <small class="text-muted">${date} &middot; 5 min read</small>
                        </div>
                    </div>
                </div>
            `;

            // Insert the card into the container
            document.getElementById('articleCards').innerHTML += card;
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

