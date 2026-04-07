const photos = [
  {
    src: "./assets/flowers/IMG_2911.JPG",
    alt: "Pink flowers and a bird in front of a glass building",
    caption: "April 7, 2026",
  },
  {
    src: "./assets/flowers/IMG_2902.JPG",
    alt: "Red flowers in green leaves under bright sun",
    caption: "April 7, 2026",
  },
  {
    src: "./assets/flowers/IMG_2911.JPG",
    alt: "Pink flowers hanging in front of a modern facade",
    caption: "April 7, 2026",
  },
  {
    src: "./assets/flowers/IMG_2900.JPG",
    alt: "Pink flowers and shadows on a gray wall",
    caption: "April 7, 2026",
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
const fullscreenFrame = document.querySelector(".fullscreen-frame");
const fullscreenImageCurrent = document.querySelector("#fullscreen-image-current");
const fullscreenImageNext = document.querySelector("#fullscreen-image-next");
const fullscreenCaption = document.querySelector("#fullscreen-caption");
const fullscreenClose = document.querySelector("#fullscreen-close");
const fullscreenPrev = document.querySelector("#fullscreen-prev");
const fullscreenNext = document.querySelector("#fullscreen-next");
const aboutButton = document.querySelector("#about-button");
const aboutPanel = document.querySelector("#about-panel");
const brandLink = document.querySelector(".brand");

let currentFullscreenIndex = 0;
let swipeStartX = 0;
let swipeStartY = 0;
let isPointerDown = false;

function setView(nextView) {
  Object.entries(views).forEach(([key, element]) => {
    const isActive = key === nextView;
    element.classList.toggle("hidden", !isActive);
    element.setAttribute("aria-hidden", String(!isActive));
  });
}

function updateFullscreen(index) {
  fullscreenImageCurrent.src = photos[index].src;
  fullscreenImageCurrent.alt = photos[index].alt;
  fullscreenCaption.textContent = photos[index].caption;
  fullscreenImageCurrent.classList.add("is-active");
  fullscreenImageNext.classList.remove("is-active", "is-incoming");
}

function openFullscreen(index) {
  currentFullscreenIndex = index;
  updateFullscreen(index);
  setView("fullscreen");
}

function jumpToIndex(nextIndex) {
  if (nextIndex === currentFullscreenIndex) {
    return;
  }

  currentFullscreenIndex = nextIndex;
  updateFullscreen(nextIndex);
}

function showNextImage() {
  jumpToIndex((currentFullscreenIndex + 1) % photos.length);
}

function showPreviousImage() {
  jumpToIndex((currentFullscreenIndex - 1 + photos.length) % photos.length);
}

fullscreenFrame.addEventListener("pointerdown", (event) => {
  if (views.fullscreen.classList.contains("hidden")) {
    return;
  }

  isPointerDown = true;
  swipeStartX = event.clientX;
  swipeStartY = event.clientY;
});

fullscreenFrame.addEventListener("pointerup", (event) => {
  if (!isPointerDown || views.fullscreen.classList.contains("hidden")) {
    return;
  }

  isPointerDown = false;

  const deltaX = event.clientX - swipeStartX;
  const deltaY = event.clientY - swipeStartY;

  if (Math.abs(deltaX) < 24 || Math.abs(deltaX) < Math.abs(deltaY)) {
    return;
  }

  if (deltaX < 0) {
    showNextImage();
  } else {
    showPreviousImage();
  }
});

fullscreenFrame.addEventListener("pointercancel", () => {
  isPointerDown = false;
});

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

fullscreenPrev.addEventListener("click", () => {
  showPreviousImage();
});

fullscreenNext.addEventListener("click", () => {
  showNextImage();
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
    showNextImage();
  }

  if (event.key === "ArrowUp" && !views.fullscreen.classList.contains("hidden")) {
    showPreviousImage();
  }
});
