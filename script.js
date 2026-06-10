const img = document.getElementById('politician');
const imagesVanilla = [
    'images/1.png',
    'images/2.png',
    'images/3.png',
    'images/4.png',
    ]
const imagesMoustache = [
    'images/A.png',
    'images/B.png',
    'images/C.png',
    'images/D.png',
]
if (img) {
    const rng = Math.floor(Math.random() * imagesVanilla.length);
    img.src = imagesVanilla[rng];
}