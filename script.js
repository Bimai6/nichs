const characters = [
{
    vanilla: "images/1.png",
    moustache: "images/A.png",
    zone: { xMin: 0.44, xMax: 0.50, yMin: 0.34, yMax: 0.36 },
    adjust: { left: "47%", top: "40%" }
  },
  {
    vanilla: "images/2.png",
    moustache: "images/B.png",
    zone: { xMin: 0.40, xMax: 0.55, yMin: 0.25, yMax: 0.45 },
    adjust: { left: "50%", top: "45%" }
  },
  {
    vanilla: "images/3.png",
    moustache: "images/C.png",
    zone: { xMin: 0.40, xMax: 0.55, yMin: 0.25, yMax: 0.45 },
    adjust: { left: "50%", top: "45%" }
  },
  {
    vanilla: "images/4.png",
    moustache: "images/D.png",
    zone: { xMin: 0.40, xMax: 0.55, yMin: 0.25, yMax: 0.45 },
    adjust: { left: "50%", top: "45%" }
  }
];

const img = document.getElementById("politician");
const moustache = document.getElementById("moustache");


const character = characters[Math.floor(Math.random() * characters.length)];
img.src = character.vanilla;


let isDragging = false;
let locked = false;

let offsetX = 0;
let offsetY = 0;

let pos = { x: 0, y: 0 };

moustache.addEventListener("mousedown", (e) => {
  if (locked) return;

  isDragging = true;

  offsetX = e.clientX - moustache.offsetLeft;
  offsetY = e.clientY - moustache.offsetTop;

  moustache.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging || locked) return;

  pos.x = e.clientX - offsetX;
  pos.y = e.clientY - offsetY;

  moustache.style.left = pos.x + "px";
  moustache.style.top = pos.y + "px";

  checkZone(e);
});

document.addEventListener("mouseup", () => {
  if (!isDragging || locked) return;

  isDragging = false;
  moustache.style.cursor = "grab";
});


function checkZone(e) {
  const rect = img.getBoundingClientRect();

  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;

  const z = character.zone;

  const inside =
    x >= z.xMin &&
    x <= z.xMax &&
    y >= z.yMin &&
    y <= z.yMax;

  if (inside) {
    placeMoustache();
  }
}

function placeMoustache() {
  if (locked) return;

  locked = true;
  isDragging = false;

  moustache.style.cursor = "default";

  img.src = character.moustache;
  moustache.style.left = character.adjust.left;
  moustache.style.top = character.adjust.top;
  moustache.style.transform = "translate(-50%, -50%)";
}