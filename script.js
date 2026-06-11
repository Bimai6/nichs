const characters = [
  {
    vanilla: "images/1.png",
    moustache: "images/A.png",

    mouth: {
      x: 0.45,
      y: 0.307
    },

    adjust: {
      x: 0.463,
      y: 0.372
    }
  },

  {
    vanilla: "images/2.png",
    moustache: "images/B.png",

    mouth: {
      x: 0.41,
      y: 0.315
    },

    adjust: {
      x: 0.458,
      y: 0.337
    }
  },

  {
    vanilla: "images/3.png",
    moustache: "images/C.png",

    mouth: {
      x: 0.40,
      y: 0.286
    },

    adjust: {
      x: 0.472,
      y: 0.355
    }
  },

  {
    vanilla: "images/4.png",
    moustache: "images/D.png",

    mouth: {
      x: 0.50,
      y: 0.30
    },

    adjust: {
      x: 0.455,
      y: 0.3625
    }
  }
];

const img = document.getElementById("politician");
const moustache = document.getElementById("moustache");

const character =
  characters[Math.floor(Math.random() * characters.length)];

img.src = character.vanilla;

let isDragging = false;
let locked = false;

let offsetX = 0;
let offsetY = 0;

moustache.addEventListener("mousedown", (e) => {
  if (locked) return;

  isDragging = true;

  offsetX = e.clientX - moustache.offsetLeft;
  offsetY = e.clientY - moustache.offsetTop;

  moustache.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging || locked) return;

  moustache.style.left =
    e.clientX - offsetX + "px";

  moustache.style.top =
    e.clientY - offsetY + "px";

  checkZone();
});

document.addEventListener("mouseup", () => {
  if (locked) return;

  isDragging = false;
  moustache.style.cursor = "grab";
});

function checkZone() {
  const imgRect = img.getBoundingClientRect();
  const moustacheRect = moustache.getBoundingClientRect();

  const centerX =
    moustacheRect.left +
    moustacheRect.width / 2;

  const centerY =
    moustacheRect.top +
    moustacheRect.height / 2;

  const mx =
    (centerX - imgRect.left) /
    imgRect.width;

  const my =
    (centerY - imgRect.top) /
    imgRect.height;

  const dx = mx - character.mouth.x;
  const dy = my - character.mouth.y;

  const distance =
    Math.sqrt(dx * dx + dy * dy);

  if (distance < 0.05) {
    placeMoustache();
  }
}

function updateLockedMoustachePosition() {
  if (!locked) return;

  const rect = img.getBoundingClientRect();

  const x =
    rect.left +
    rect.width * character.adjust.x;

  const y =
    rect.top +
    rect.height * character.adjust.y;

  moustache.style.left = x + "px";
  moustache.style.top = y + "px";
}

function placeMoustache() {
  if (locked) return;

  locked = true;
  isDragging = false;

  moustache.style.cursor = "default";

  moustache.style.transform =
    "translate(-50%, -50%)";

  img.onload = () => {
    updateLockedMoustachePosition();
  };

  img.src = character.moustache;
}

window.addEventListener(
  "resize",
  updateLockedMoustachePosition
);