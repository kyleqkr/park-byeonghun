const photos = [
  {
    src: "./assets/photos/city-pause/00.JPG",
    alt: "Pink flowers and a bird in front of a glass building",
    title: "A color that makes the city pause",
    date: "Apr. 2026",
  },
  {
    src: "./assets/photos/city-pause/01.JPG",
    alt: "Red flowers in green leaves under bright sun",
    title: "A color that makes the city pause",
    date: "Apr. 2026",
  },
  {
    src: "./assets/photos/city-pause/02.JPG",
    alt: "Pink flowers hanging in front of a modern facade",
    title: "A color that makes the city pause",
    date: "Apr. 2026",
  },
  {
    src: "./assets/photos/city-pause/03.JPG",
    alt: "Pink flowers and shadows on a gray wall",
    title: "A color that makes the city pause",
    date: "Apr. 2026",
  },
  {
    src: "./assets/photos/city-pause/04.JPG",
    alt: "Pink flowers framed against a modern building",
    title: "A color that makes the city pause",
    date: "Apr. 2026",
  },
  {
    src: "./assets/photos/city-pause/05.JPG",
    alt: "Clusters of pink flowers against glass and shadow",
    title: "A color that makes the city pause",
    date: "Apr. 2026",
  },
  {
    src: "./assets/photos/city-pause/07.JPG",
    alt: "Pink flowers pausing against a quiet city facade",
    title: "A color that makes the city pause",
    date: "Apr. 2026",
  },
];

const views = {
  about: document.querySelector("#about-view"),
  home: document.querySelector("#home-view"),
  detail: document.querySelector("#detail-view"),
  fullscreen: document.querySelector("#fullscreen-view"),
};

const detailGallery = document.querySelector("#detail-gallery");
const detailItemTemplate = document.querySelector("#detail-item-template");
const coverTriggerImage = document.querySelector("#cover-trigger-image");
const ceramicJarTrigger = document.querySelector("#ceramic-jar-trigger");
const ceramicCupsTrigger = document.querySelector("#ceramic-cups-trigger");
const ceramicPlateTrigger = document.querySelector("#ceramic-plate-trigger");
const fullscreenFrame = document.querySelector(".fullscreen-frame");
const fullscreenImageCurrent = document.querySelector("#fullscreen-image-current");
const fullscreenImageNext = document.querySelector("#fullscreen-image-next");
const fullscreenCaption = document.querySelector("#fullscreen-caption");
const fullscreenClose = document.querySelector("#fullscreen-close");
const fullscreenPrev = document.querySelector("#fullscreen-prev");
const fullscreenNext = document.querySelector("#fullscreen-next");
const aboutButton = document.querySelector("#about-button");
const brandLink = document.querySelector(".brand");

let currentFullscreenIndex = 0;
let swipeStartX = 0;
let swipeStartY = 0;
let isPointerDown = false;
let fullscreenCollection = photos;
let returnView = "detail";

const ceramics = [
  {
    src: "./assets/photos/ceramics/mini-moon-jar/cover.jpg",
    alt: "Mini Moon Jar ceramic piece",
    title: "Mini Moon Jar",
    date: "Mar. 2026",
  },
  {
    src: "./assets/photos/ceramics/cups/cover.jpg",
    alt: "Cups 01-04 ceramic set",
    title: "Cups 01-04",
    date: "Feb. 2026",
  },
  {
    src: "./assets/photos/ceramics/plate/IMG_3400.jpg",
    alt: "Plate ceramic piece",
    title: "Plate",
    date: "Jan. 2026",
  },
];

function setView(nextView) {
  Object.entries(views).forEach(([key, element]) => {
    const isActive = key === nextView;
    element.classList.toggle("hidden", !isActive);
    element.setAttribute("aria-hidden", String(!isActive));
  });
}

function updateFullscreen(index) {
  fullscreenImageCurrent.src = fullscreenCollection[index].src;
  fullscreenImageCurrent.alt = fullscreenCollection[index].alt;
  const { title, date } = fullscreenCollection[index];
  const year = date ? date.match(/\b\d{4}\b/)?.[0] ?? "" : "";
  fullscreenCaption.textContent = year ? `${title},\u00A0${year}` : title;
  fullscreenImageCurrent.classList.add("is-active");
  fullscreenImageNext.classList.remove("is-active", "is-incoming");

  const showNav = fullscreenCollection.length > 1;
  fullscreenPrev.classList.toggle("hidden", !showNav);
  fullscreenNext.classList.toggle("hidden", !showNav);
}

function openFullscreen(index, collection = photos) {
  fullscreenCollection = collection;
  currentFullscreenIndex = index;
  returnView = views.detail.classList.contains("hidden") ? "home" : "detail";
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
  jumpToIndex((currentFullscreenIndex + 1) % fullscreenCollection.length);
}

function showPreviousImage() {
  jumpToIndex(
    (currentFullscreenIndex - 1 + fullscreenCollection.length) %
      fullscreenCollection.length
  );
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

coverTriggerImage.addEventListener("click", () => {
  setView("detail");
});

ceramicJarTrigger.addEventListener("click", () => {
  openFullscreen(0, [ceramics[0]]);
});

ceramicCupsTrigger.addEventListener("click", () => {
  openFullscreen(0, [ceramics[1]]);
});

ceramicPlateTrigger.addEventListener("click", () => {
  openFullscreen(0, [ceramics[2]]);
});

brandLink.addEventListener("click", (event) => {
  event.preventDefault();
  setView("home");
});

fullscreenClose.addEventListener("click", () => {
  setView(returnView);
});

fullscreenPrev.addEventListener("click", () => {
  showPreviousImage();
});

fullscreenNext.addEventListener("click", () => {
  showNextImage();
});

aboutButton.addEventListener("click", () => {
  setView("about");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !views.fullscreen.classList.contains("hidden")) {
    setView(returnView);
  }

  if (event.key === "ArrowDown" && !views.fullscreen.classList.contains("hidden")) {
    showNextImage();
  }

  if (event.key === "ArrowUp" && !views.fullscreen.classList.contains("hidden")) {
    showPreviousImage();
  }
});
