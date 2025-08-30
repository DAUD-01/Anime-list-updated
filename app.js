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
     <li class="AnimeName" 
      data-aos="fade-right" 
      data-aos-duration="400" 
      data-aos-easing="ease-in-out" 
      data-aos-delay="50"><strong>${anime.title}</strong></li>

    <ul data-aos="fade-left" 
      data-aos-duration="400" 
      data-aos-easing="ease-in-out" 
      data-aos-delay="50">
        <li>Genre: ${anime.genre}</li>
        <li>Aired: ${anime.aired}</li>
        <li>Rating: ${anime.rating}</li>
        <li>Duration per Episode: ${anime.duration}</li>
        <li>Studio: ${anime.studio}</li>
  </ul>
  <a href="${anime.trailerUrl}" target="_blank">
    <img class="anime-card" 
         src="${anime.imageUrl}" 
         alt="${anime.title} image" 
         width="700" 
         data-aos="fade-right"  
         data-aos-duration="400" 
         data-aos-easing="ease-in-out"
         data-aos-delay="50">
    <div class="play-overlay">Watch Trailer</div>
  </a>
  <p class="anime-description"><b>Story: </b>${anime.description}</p>
  <p>
    <a href="${anime.imdbUrl}" target="_blank">IMDb</a> | 
    <a href="${anime.malUrl}" target="_blank">MyAnimeList</a>
    <br>
  </p>
</div>
       `;
        animeListContainer.innerHTML += animeHtml;
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
      }
  } else { alert("⚠️ No Anime Found!"); } 
}
searchButton.addEventListener("click", searchAnime);
