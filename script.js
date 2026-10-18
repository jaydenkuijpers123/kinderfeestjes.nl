
const videos = [
  {
    title: "De mooiste plekken om te ontdekken",
    category: "Entertainment",
    views: 12500,
    date: "2026-10-17",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=640&q=80"
  },
  {
    title: "Muziek en creativiteit",
    category: "Muziek",
    views: 9800,
    date: "2026-10-16",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=640&q=80"
  },
  {
    title: "Een nieuwe sportieve uitdaging",
    category: "Sport",
    views: 8200,
    date: "2026-10-15",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=640&q=80"
  },
  {
    title: "De wereld van gaming",
    category: "Gaming",
    views: 7600,
    date: "2026-10-18",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=640&q=80"
  },
  {
    title: "Inspiratie voor je volgende reis",
    category: "Entertainment",
    views: 6400,
    date: "2026-10-14",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=640&q=80"
  },
  {
    title: "Achter de schermen in de studio",
    category: "Muziek",
    views: 5900,
    date: "2026-10-13",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=640&q=80"
  },
  {
    title: "Training en beweging",
    category: "Sport",
    views: 4300,
    date: "2026-10-12",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=640&q=80"
  },
  {
    title: "Technologie en digitale werelden",
    category: "Gaming",
    views: 3100,
    date: "2026-10-11",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=640&q=80"
  }
];

const grid = document.querySelector("#videoGrid");
const searchInput = document.querySelector("#searchInput");
const searchForm = document.querySelector("#searchForm");
const sortSelect = document.querySelector("#sortSelect");
const emptyMessage = document.querySelector("#emptyMessage");
const sectionTitle = document.querySelector("#sectionTitle");
const navigation = document.querySelector("#navigation");

let activeCategory = "Alles";
let searchTerm = "";

function renderVideos() {
  let filtered = videos.filter(video => {
    const matchesCategory =
      activeCategory === "Alles" ||
      video.category === activeCategory;

    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm) ||
      video.category.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  if (sortSelect.value === "newest") {
    filtered.sort((a, b) => b.date.localeCompare(a.date));
  } else {
    filtered.sort((a, b) => b.views - a.views);
  }

  grid.replaceChildren();

  filtered.forEach(video => {
    const card = document.createElement("article");
    card.className = "video-card";

    const thumbnail = document.createElement("div");
    thumbnail.className = "thumbnail";

    const img = document.createElement("img");
    img.src = video.image;
    img.alt = video.title;
    img.loading = "lazy";

    img.addEventListener("error", () => {
      img.remove();
    });

    const play = document.createElement("span");
    play.className = "play";
    play.textContent = "▶";

    thumbnail.append(img, play);

    const title = document.createElement("h3");
    title.textContent = video.title;

    const details = document.createElement("p");
    details.textContent =
      `${video.category} · ${video.views.toLocaleString("nl-NL")} weergaven`;

    card.append(thumbnail, title, details);
    grid.append(card);
  });

  emptyMessage.hidden = filtered.length > 0;
  sectionTitle.textContent =
    activeCategory === "Alles"
      ? "Populaire video's"
      : activeCategory;
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  searchTerm = searchInput.value.trim().toLowerCase();
  renderVideos();
});

sortSelect.addEventListener("change", renderVideos);

navigation.addEventListener("click", event => {
  const link = event.target.closest("[data-category]");
  if (!link) return;

  event.preventDefault();
  activeCategory = link.dataset.category;

  navigation.querySelectorAll("a").forEach(item => {
    item.classList.toggle("active", item === link);
  });

  navigation.classList.remove("open");
  renderVideos();
});

document.querySelector("#menuToggle").addEventListener("click", () => {
  navigation.classList.toggle("open");
});

renderVideos();
