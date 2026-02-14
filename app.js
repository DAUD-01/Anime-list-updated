const animeListContainer = document.getElementById('anime-list');
const searchInput = document.getElementById('anime-input');
const searchButton = document.getElementById('search-button');
let animeData = []; // global variable

document.addEventListener('DOMContentLoaded', () => {
  fetch("animeData.json")
    .then(res => res.json())
    .then(data => {
      animeData = data; // save fetched data globally
      const animeListContainer = document.getElementById("anime-list");

      animeData.forEach((anime, index) => {
        const animeHtml = `
<div id="anime-${index}" class="anime-card-container">

  <a href="${anime.trailerUrl}" target="_blank" class="anime-image">
  <img class="anime-card"
        src="${anime.imageUrl}"
        alt="${anime.title} image"
        width="960"
        height="394"
        loading="lazy"
        decoding="async"
        data-aos="fade-left"
        data-aos-duration="400"
        data-aos-easing="ease-in-out"
        data-aos-delay="50">

    <div class="play-overlay"></div>
  </a>

  <!-- Title -->
  <li class="AnimeName" id="CardEl"
      data-aos="fade-right" 
      data-aos-duration="400" 
      data-aos-easing="ease-in-out" 
      data-aos-delay="50">
    <strong> ${index + 1}. ${" "}  ${anime.title}</strong>
  </li>

  <!-- Specs -->
  <ul class="Anime-specs"
      id="CardEl"
      data-aos="fade-left" 
      data-aos-duration="400" 
      data-aos-easing="ease-in-out" 
      data-aos-delay="50">
    <li><b>Genre:</b> ${anime.genre}</li>
    <li><b>Aired:</b> ${anime.aired}</li>
    <li><b>Rating:</b> ${anime.rating}</li>
    <li><b>Duration:</b> ${anime.duration}</li>
    <li><b>Studio:</b> ${anime.studio}</li>
  </ul>

  <!-- Story -->
    <p class="anime-description"     id="desc-${index} id="CardEl""
         data-aos="fade"  
         data-aos-duration="200" 
         data-aos-easing="ease-in-out">

      <b>Story: </b>${anime.description}
    </p>
    <button class="read-more" id="CardEl" data-id="${index}">Read More</button>


  <!-- Links -->
  <p class="anime-links" id="CardEl">
    <a href="${anime.imdbUrl}" class = "linkEl"target="_blank"><img src="https://cdn.iconscout.com/icon/free/png-256/free-imdb-logo-icon-svg-png-download-461804.png" alt="IMDB" style="width:40px; height:auto;"></a> 
    <a href="${anime.malUrl}" class = "linkEl" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/MyAnimeList_favicon.svg" alt="My Anime List" style="width:40px; height:auto;"></a> 
  </p>
</div>
       `;
// animeListContainer.innerHtml += animeHtml;       
 animeListContainer.insertAdjacentHTML("beforeend", animeHtml);
});

    })
    .catch(err => console.error("Error loading JSON:", err));
});
  // Search Anime 
function searchAnime(e) {
  e.preventDefault(); // prevent deafult mean prevent from reloading page on search
  const query = searchInput.value.toLowerCase().trim();
  const index = animeData.findIndex(anime =>
    anime.title.toLowerCase().includes(query)
  );
  if (index !== -1) {
    const target = document.getElementById(`anime-${index}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
       target.style.boxShadow = "0 0 25px 8px hsl(240, 100%, 65%)";
       setTimeout(() => target.style.boxShadow = "", 2000); // remove after 2s
      }
  } else { alert("⚠️ No Anime Found!"); } 
}
searchButton.addEventListener("click", searchAnime);


// To Add the Read More/Less Button

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("read-more")) {
    const id = e.target.getAttribute("data-id");
    const desc = document.getElementById(`desc-${id}`);

    if (desc.classList.contains("expanded")) {
      desc.classList.remove("expanded");
      desc.style.webkitLineClamp = "4";  // back to 4 lines
      e.target.textContent = "Read More";
    } else {
      desc.classList.add("expanded");
      desc.style.webkitLineClamp = "unset";  // show full text
      e.target.textContent = "Read Less";
    }
  }
});

// Random anime selection 

const randomButton = document.getElementById("random-button");

randomButton.addEventListener("click", () => {
  if (animeData.length > 0) {
    const randomIndex = Math.floor(Math.random() * animeData.length);
    const target = document.getElementById(`anime-${randomIndex}`);
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    target.style.boxShadow = "0 0 25px 8px hsl(240, 100%, 65%)";
    setTimeout(() => target.style.boxShadow = "", 2000); // remove after 2s
  }
});
