const searchBtn = document.getElementById("search-btn");
const movieList = document.getElementById("movie");
const movieDetailsContent = document.querySelector(".movie-details-content");
const movieCloseBtn = document.getElementById("movie-close-btn");
const movieList1 = document.getElementById("fav-list");


const API_KEY = "3649fa39";

// event listeners
searchBtn.addEventListener("click", getmovieList);
movieList.addEventListener("click", getMovieDetails);
movieList1.addEventListener("click", addFavourite);

movieCloseBtn.addEventListener("click", () => {
  movieDetailsContent.parentElement.classList.remove("showmovie");
});
  



function getmovieList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchInputTxt}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      let html = "";
      if (data.Search) {
        data.Search.forEach((movie) => {
          html += `
                    <div class = "movie-item" data-id = "${movie.imdbID}">
                        <div class = "movie-img">
                            <img src = "${movie.Poster}" alt = "food">
                        </div>
                        <div class = "movie-name">
                            <h3>${movie.Title}</h3>
                            <a href = "#" class = "movie-btn">Show Details</a>
                            


                        </div>
                    </div>
                `;
        });
        movieList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any movie!";
        movieList.classList.add("notFound");
      }
      movieList.innerHTML = html;
    });
}

function getMovieDetails(e) {
  e.preventDefault();
  if (e.target.classList.contains("movie-btn")) {
    let movieItem = e.target.parentElement.parentElement;
    // console.log(movieItem);
    fetch(`https://www.omdbapi.com/?i=${movieItem.dataset.id}&apikey=3649fa39`)
      .then((response) => response.json())
      .then((data) =>
        // movieDetailModal(data)
        // console.log(data)
        movieDetailModal(data)
      );
  }
}

function movieDetailModal(movie) {

  // console.log(Object.values(movie))

  //   movie = movie[0];
  let html = `
    
  <h2 class = "movie-title">Movie: ${movie.Title}</h2>
  <br/>
  <br/>

  <p class = "movie-category">Genre: ${movie.Genre}</p>
  <div class = "movie-instruct">
      <h3>Plot: ${movie.Plot}</h3>
     
  </div>
  <div class = "movie-actors">
      <h3>Actors:${movie.Actors}</h3>
     
  </div>

  <div class = "movie-directors">
  <h3>Directed by: ${movie.Director}</h3>
 
</div>
<div class = "movie-release">
<h3>Released in: ${movie.Released}</h3>

</div>
  <div class = "recipe-meal-img">
      <img src = "${movie.Poster}" alt = "">
  </div>
  

    `;
    // console.log(html)

  movieDetailsContent.innerHTML = html;
  movieDetailsContent.parentElement.classList.add("showmovie");
}

let favouriteMovies = [];

function addFavourite(e) {
  e.preventDefault();
  if (e.target.classList.contains("add-btn")) {
    console.log('btn')
    let movieItem = e.target.parentElement.parentElement;
    // console.log(movieItem);
    fetch(`https://www.omdbapi.com/?i=${movieItem.dataset.id}&apikey=3649fa39`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var getFavData = localStorage.getItem("Favdata");

        console.log(getFavData)
        var parsedData = JSON.parse(getFavData);
         console.log(parsedData)

        var jj = "true";
        if (parsedData != null) {
          for (var i = 0; i < parsedData.length; i++) {
            if (parsedData[i].Title === data.Title) {
              jj = "false";
              return;
            }
          }
        }
        if (jj == "true") {
          favouriteMovies.push(data);
          localStorage.setItem("Favdata", JSON.stringify(favouriteMovies));
        }
        let html = "";
        html += `

      <div class="movie-fav-data">
      <p class="poster">
        <img src${data.Poster}" alt="" class="image" />
      </p>

      <h1 class="fav-name">${data.Title}</h1>
    
    </div>
    `;
        console.log(html);

        movieList1.innerText = html;
      });
  }
}
