console.log("Hello World")

const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_IbM0E4tujUoIiJdtZwleFyDSrQe8Rx3TjYi7JtToqLH7qiCae2USnN1v2jcjR1R3'

async function catRandomReload() {
    const res = await fetch(API_URL)
    const data = await res.json();

    console.log(data)
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    img1.src = data[0].url;
    img2.src = data[1].url;


    //.catch (error => console.error('There is a error loading the image',error));
}

catRandomReload()