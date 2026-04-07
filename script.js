const photos = [
  {
    src: "./assets/flowers/IMG_2911.JPG",
    alt: "Pink flowers and a bird in front of a glass building",
  },
  {
    src: "./assets/flowers/IMG_2902.JPG",
    alt: "Red flowers in green leaves under bright sun",
  },
  {
    src: "./assets/flowers/IMG_2911.JPG",
    alt: "Pink flowers hanging in front of a modern facade",
  },
  {
    src: "./assets/flowers/IMG_2900.JPG",
    alt: "Pink flowers and shadows on a gray wall",
  },
];

const views = {
  home: document.querySelector("#home-view"),
  detail: document.querySelector("#detail-view"),
  fullscreen: document.querySelector("#fullscreen-view"),
};

const detailGallery = document.querySelector("#detail-gallery");
const detailItemTemplate = document.querySelector("#detail-item-template");
const coverTrigger = document.querySelector("#cover-trigger");
const coverTriggerImage = document.querySelector("#cover-trigger-image");
const fullscreenImage = document.querySelector("#fullscreen-image");
const fullscreenClose = document.querySelector("#fullscreen-close");
const aboutButton = document.querySelector("#about-button");
const aboutPanel = document.querySelector("#about-panel");
const brandLink = document.querySelector(".brand");

let currentFullscreenIndex = 0;

function setView(nextView) {
  Object.entries(views).forEach(([key, element]) => {
    const isActive = key === nextView;
    element.classList.toggle("hidden", !isActive);
    element.setAttribute("aria-hidden", String(!isActive));
  });
}

function openFullscreen(index) {
  currentFullscreenIndex = index;
  fullscreenImage.src = photos[index].src;
  fullscreenImage.alt = photos[index].alt;
  setView("fullscreen");
}

photos.forEach((photo, index) => {
  const fragment = detailItemTemplate.content.cloneNode(true);
  const item = fragment.querySelector(".detail-item");
  const image = fragment.querySelector(".detail-image");

  image.src = photo.src;
  image.alt = photo.alt;

  item.addEventListener("click", () => {
    openFullscreen(index);
  });

  detailGallery.appendChild(fragment);
});

coverTrigger.addEventListener("click", () => {
  setView("detail");
});

coverTriggerImage.addEventListener("click", () => {
  setView("detail");
});

brandLink.addEventListener("click", (event) => {
  event.preventDefault();
  setView("home");
});

fullscreenClose.addEventListener("click", () => {
  setView("detail");
});

aboutButton.addEventListener("click", () => {
  const isHidden = aboutPanel.classList.toggle("hidden");
  aboutPanel.setAttribute("aria-hidden", String(isHidden));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !views.fullscreen.classList.contains("hidden")) {
    setView("detail");
  }

  if (event.key === "Escape" && !aboutPanel.classList.contains("hidden")) {
    aboutPanel.classList.add("hidden");
    aboutPanel.setAttribute("aria-hidden", "true");
  }

  if (event.key === "ArrowDown" && !views.fullscreen.classList.contains("hidden")) {
    currentFullscreenIndex = (currentFullscreenIndex + 1) % photos.length;
    fullscreenImage.src = photos[currentFullscreenIndex].src;
    fullscreenImage.alt = photos[currentFullscreenIndex].alt;
  }

  if (event.key === "ArrowUp" && !views.fullscreen.classList.contains("hidden")) {
    currentFullscreenIndex =
      (currentFullscreenIndex - 1 + photos.length) % photos.length;
    fullscreenImage.src = photos[currentFullscreenIndex].src;
    fullscreenImage.alt = photos[currentFullscreenIndex].alt;
  }
});
