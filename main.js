console.log("Hello World")

const API_URL = 'https://api.thecatapi.com/v1/images/search'

// document.getElementById('loadCat').addEventListener('click', () => {
//     fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         const img = document.querySelector('img');
//         img.src = data[0].url;
//     })
//     .catch (error => console.error('There is a error loading the image',error));
// });

async function catReload() {
    const res = await fetch(API_URL)
    const data = await res.json();
    const img = document.querySelector('img');
    img.src = data[0].url;
    //.catch (error => console.error('There is a error loading the image',error));
}

catReload();