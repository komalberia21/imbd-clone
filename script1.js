
function getMovieIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('id');
  return movieId;
}

const imdbID = getMovieIdFromUrl();
console.log('Movie ID:', imdbID);
// Retrieve the movies object from localStorage
const storedMovies = localStorage.getItem('movies');
const favorites=localStorage.getItem("favourites");
let fav={};
if(favorites){
  fav=JSON.parse(favorites);
}
if (storedMovies) {
  // Parse the stored movies object
  const movies = JSON.parse(storedMovies);
// Retrieve the specific movie using the ID
 const movie = movies.find(movie => movie.imdbID === imdbID); 
 console.log(movie);
 const moviedisplay=document.querySelector(".movieonedisplay");
const movieElement = document.createElement('div');
      movieElement.classList.add('movieone');
      movieElement.innerHTML = `
      <div>
        <img class="postermovie" src="${movie.Poster}" alt="image"/>
        </div>
      <div class="detailmovie">
        <h1 class="titlemovie">${movie.Title}</h1>
          <p class="yearmovie"><b>Year: </b> ${movie.Year}</p>
          <p class="type"><b>Type:</b>${movie.Type}</p>
          <i id="heartone" data-id="${imdbID}" class="fas fa-heart card-heart"></i>
       </div>`;
     moviedisplay.appendChild(movieElement);

      
    
// Set up click event listeners for each heart icon
    const cardhearts = document.querySelectorAll(".card-heart");
    cardhearts.forEach(cardheart => {
      cardheart.addEventListener("click", function () {
        cardheart.classList.toggle("heart-pink");
        if(cardheart.classList.contains("heart-pink")){
        const imdbID = cardheart.getAttribute("data-id") // Get the IMDb ID from data attribute
       // Add the movie to the fav object
          fav[imdbID] = {
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
          };
          localStorage.setItem("favourites",JSON.stringify(fav));
         alert("Added to favourites");
          }
        else {
          // Remove the movie from the fav object if the heart is unclicked
          const imdbID = cardheart.getAttribute("data-id") ;
          delete fav[imdbID];
          localStorage.setItem("favourites",JSON.stringify(fav));
          alert("Deleted from favorites");
           }
        console.log(fav);
       });
    });
  }
  else{
    console.log("movies not found");
  }

  
  const navheart=document.getElementById("nav-heart");
  navheart.addEventListener("click",toggleSidebar);
  const myfavlist = document.querySelector(".myfavlist");

  function toggleSidebar() {
    myfavlist.classList.toggle("sidebar-visible");
    displayfav();
   }

 //function to display favourites
   function displayfav() {
  if (Object.keys(fav).length > 0) {
    myfavlist.innerHTML = ''; // Clear existing content
    for (const imdbID in fav) {
     const favdata = fav[imdbID];
      createfavElement(favdata,imdbID);
    }
  } else {
    myfavlist.innerHTML = `<div class="">nothing to display</div>`;
     // Show/hide the sidebar based on content
  }
}


 function createfavElement(favdata,imdbID) {
  const movieElement = document.createElement('div');
  movieElement.classList.add('moviefav');
  movieElement.innerHTML = `
    <img class="posterfav" src="${favdata.Poster}" alt="image"/>
    <div class="f">
      <h5 class="titlefav">${favdata.Title}</h5>
      <div class="detailfav">
        <p class="yearfav">Year: ${favdata.Year}</p>
        <i data-id="${imdbID}"  class="fas fa-heart heart-pink heartfav"></i>
      </div>
    </div>
  `;
  myfavlist.appendChild(movieElement);
// Use querySelectorAll to select all elements with the class "heartfav"
const heartfavList = document.querySelectorAll(".heartfav");
// Iterate over the NodeList and add click event listeners to each element
heartfavList.forEach(heartIcon => {
  heartIcon.addEventListener("click", () => {
    console.log("heartfavclicked")
    const imdbID = heartIcon.getAttribute("data-id");
    delete fav[imdbID];
    localStorage.setItem("favourites",JSON.stringify(fav));
    displayfav();
  });
});
}



  
  
