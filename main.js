const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_IbM0E4tujUoIiJdtZwleFyDSrQe8Rx3TjYi7JtToqLH7qiCae2USnN1v2jcjR1R3';
const API_URL_FAVORITE = 'https://api.thecatapi.com/v1/favourites';
const API_URL_DELETE_FAVORITE = 'https://api.thecatapi.com/v1/favourites'; // Same as API_URL_FAVORITE

const API_KEY = 'live_IbM0E4tujUoIiJdtZwleFyDSrQe8Rx3TjYi7JtToqLH7qiCae2USnN1v2jcjR1R3';

const spanError = document.getElementById('error');

async function catRandomReload() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();

    console.log('Random Cats:', data);

    if (res.status !== 200) {
        spanError.innerHTML = "There was an error: " + res.status;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');

        img1.src = data[0].url;
        img2.src = data[1].url;

        // Assign click events to save images as favorites
        btn1.onclick = () => addFavoriteCat(data[0].id);
        btn2.onclick = () => addFavoriteCat(data[1].id);
    }
}

// Function to add a cat to favorites
async function addFavoriteCat(imageId) {
    const res = await fetch(API_URL_FAVORITE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        },
        body: JSON.stringify({
            image_id: imageId
        })
    });

    const data = await res.json();
    console.log('Added to favorites:', data);

    if (res.status !== 200) {
        spanError.innerHTML = `Error adding favorite: ${res.status} ${data.message}`;
    } else {
        loadFavoriteCats(); // Reload favorite cats after adding one
    }
}

// Function to load favorite cats
async function loadFavoriteCats() {
    const res = await fetch(API_URL_FAVORITE, {
        method: "GET",
        headers: {
            "x-api-key": API_KEY
        }
    });

    const data = await res.json();
    console.log('Favorite Cats:', data);

    if (res.status !== 200) {
        spanError.innerHTML = `Error loading favorites: ${res.status} ${data.message}`;
    } else {
        const favoritesContainer = document.getElementById("favoritesContainer");
        favoritesContainer.innerHTML = ""; // Clear previous favorites

        data.forEach(cat => {
            const article = document.createElement("article");
            const img = document.createElement("img");
            const btn = document.createElement("button");

            img.src = cat.image.url;
            img.width = 300;
            img.alt = "Favorite Cat";
            btn.textContent = "Remove from Favorites";
            btn.onclick = () => removeFavoriteCat(cat.id);

            article.appendChild(img);
            article.appendChild(btn);
            favoritesContainer.appendChild(article);
        });
    }
}

catRandomReload()