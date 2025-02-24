const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_IbM0E4tujUoIiJdtZwleFyDSrQe8Rx3TjYi7JtToqLH7qiCae2USnN1v2jcjR1R3';
const API_URL_FAVORITE = 'https://api.thecatapi.com/v1/favourites';
const API_URL_DELETE_FAVORITE = 'https://api.thecatapi.com/v1/favourites'; // Misma URL para borrar, se añade el id al final

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

        // Asigna los eventos para guardar en favoritos
        btn1.onclick = () => addFavoriteCat(data[0].id);
        btn2.onclick = () => addFavoriteCat(data[1].id);
    }
}

// Función para agregar un gato a favoritos
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
        loadFavoriteCats(); // Recarga la lista de favoritos
    }
}

// Función para cargar y mostrar los gatos favoritos
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
        // Asegúrate de que el id coincida con el HTML (favoriteContainer)
        const favoritesContainer = document.getElementById("favoriteContainer");
        favoritesContainer.innerHTML = ""; // Limpia favoritos anteriores

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

// Función para eliminar un gato de favoritos
async function removeFavoriteCat(favoriteId) {
    const res = await fetch(`${API_URL_DELETE_FAVORITE}/${favoriteId}`, {
        method: "DELETE",
        headers: {
            "x-api-key": API_KEY,
        }
    });

    const data = await res.json();
    console.log("Removed from favorites:", data);

    if (res.status !== 200) {
        spanError.innerHTML = `Error removing favorite: ${res.status} ${data.message}`;
    } else {
        loadFavoriteCats(); // Recarga la lista de favoritos
    }
}

// Carga las imágenes aleatorias al iniciar la aplicación
catRandomReload();
