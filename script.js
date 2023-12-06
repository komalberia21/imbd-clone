    const searchInput=document.getElementById("searchInput");
    const searchButton = document.getElementById('searchButton');
    const resultContainer= document.querySelector('.movies-result');
    const apiKey = '340bf72f';
     const imdbID = 'tt3896198';
     const favorites=localStorage.getItem("favourites");
    let fav={};
    if(favorites){
      fav=JSON.parse(favorites);
    }

      //getting movie from local storage
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
    // Parsing the stored movies object
     const movies = JSON.parse(storedMovies);
     displayResults(movies);
    }

     //searching for movies
     searchInput.addEventListener('input', async function () {
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {
      try {
        const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
          const data = await response.json();

         if (data.Search) {
          localStorage.setItem('movies', JSON.stringify(data.Search));
          displayResults(data.Search);
        } else {
          resultContainer.innerHTML = '<div class="no-results">No results found.</div>';
        }
      } catch (error) {
        console.error(`Fetch error: ${error.message}`);
      }
    }
  });
 
  //function to display serached movies
  function displayResults(results) {
    resultContainer.innerHTML = '';
    results.forEach(movie => {
      const movieElement = createMovieElement(movie);
      resultContainer.appendChild(movieElement);
    });

    function createMovieElement(movie) {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');
      movieElement.innerHTML = `
        <img class="poster" src="${movie.Poster}" alt="image"/>
        <h5 class="title">${movie.Title}</h5>
        <div class="detail">
          <p class="year">Year: ${movie.Year}</p>
          <i data-id="${movie.imdbID}" class="fas fa-heart card-heart"></i>
        </div>`;
  
      const poster = movieElement.querySelector('.poster');
      poster.addEventListener('click', event => movieInfo(movie.imdbID, event));
  
      return movieElement;
    }

   

// Set up click event listeners for each heart icon
const cardhearts = document.querySelectorAll('.card-heart');
cardhearts.forEach(cardheart => {
  cardheart.addEventListener('click', () => handleFavorites(cardheart, results));
});
}

function handleFavorites(cardheart, results) {
  cardheart.classList.toggle('heart-pink');
  const imdbID = cardheart.getAttribute('data-id');
  const movie = results.find(movie => movie.imdbID === imdbID);

  if (cardheart.classList.contains('heart-pink')) {
    fav[imdbID] = {
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
    };
  } else {
    delete fav[imdbID];
  }
 localStorage.setItem('favourites', JSON.stringify(fav));
  displayfav();
}


  const navheart=document.getElementById("nav-heart");
  //adding event listener to navbar like button
  navheart.addEventListener("click",toggleSidebar);
  const myfavlist = document.querySelector(".myfavlist");

//function to toggle favourites list
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
    <div class="favdiv">
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


//function to get single movie deatil
function movieInfo(movieId,event) {
  // Construct the URL for the new page
  event.preventDefault();
  const newPageUrl = `/index1.html?id=${movieId}`; // Replace with your actual page URL

  // Navigate to the new page
  window.location.href = newPageUrl;
}






  