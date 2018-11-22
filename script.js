function movieModel(title, year, plot, poster) {
  this.title = title;
  this.year = year;
  this.plot = plot;
  this.poster = poster;
}

var titleIDs = [
  '0111161',
  '0068646',
  '0071562',
  '0468569',
  '0050083',
  '0108052',
  '0167260',
  '0110912',
  '0060196',
  '0137523',
  '0120737',
  '0109830',
  '0080684',
  '1375666',
  '0209144',
  '0073486',
  '0099685',
  '0133093',
  '0120815',
  '0114814',
  '0118799',
  '0110413',
  '0120689',
  '0816692',
  '0120586',
  '0064116',
  '0034583',
  '1675434',
  '0253474',
  '0407887',
  '0088763',
  '0047396',
  '0082971',
  '0172495'
];

var moviesArray = [];

async function fetchDemo(titleIDs, index) {
  return fetch(`https://www.omdbapi.com/?i=tt${titleIDs[index]}&apikey=c500a780`)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      return json;
    });
}

for (let index = 0; index < titleIDs.length; index++) {
  fetchDemo(titleIDs, index).then(function(doc) {
    var movie = new movieModel(doc.Title, doc.Year, doc.Plot, doc.Poster);
    moviesArray.push(movie);
    createCard(movie);
  });
}

var moviesList = document.getElementById('movies-list');

function createCard(movieData) {
  var div = document.createElement('DIV');
  div.classList.add('col-lg-3');
  div.classList.add('col-sm-12');
  div.classList.add('with-margin');
  var movieCard = `
  <div class="card" style="height:100%;">
    <img class="card-img-top" src=${movieData.poster} alt="Card image cap" />
    <div class="card-body">
      <a target="_blank" href="https://www.google.com.tr/search?q=${
        movieData.title
      }"><h5 class="card-title">${movieData.title +
    ' - ' +
    movieData.year}</h5></a>
      <p class="card-text">
        ${movieData.plot}
      </p>
    </div>
  </div>`;
  div.innerHTML = movieCard;
  moviesList.append(div);
}

document.getElementById('search').addEventListener('click', function(event) {
  event.preventDefault();
});
var userSearches = new Array();
localStorage.setItem('user-previous-searches', null);
document.getElementById('search').addEventListener('click', findMovies);

function findMovies() {
  var inputVal = document.getElementById('search-val').value;
  if (inputVal) {
    userSearches.push(inputVal);
    localStorage.setItem(
      'user-previous-searches',
      JSON.stringify(userSearches)
    );
  }
  moviesList.innerHTML = "<div class='container'>Found nothing...</div>";
  for (let index = 0; index < titleIDs.length; index++) {
    var regex = new RegExp(inputVal, 'i');
    if (moviesArray[index].title.match(regex)) createCard(moviesArray[index]);
  }
}





document.getElementById('search-val').addEventListener('focus', getSearchList);
document.getElementsByTagName('body')[0].addEventListener('click',removeSearchList)

function getSearchList() {
  var userSearches = JSON.parse(localStorage.getItem('user-previous-searches'));
  var dropdown = document.getElementsByClassName('dropdown-menu')[0];
  dropdown.innerHTML = '';
  if (userSearches != null) {
    for (let i = 0; i < userSearches.length; i++) {
      var ul = document.createElement('A');
      ul.classList.add('dropdown-item');
      ul.innerHTML = userSearches[i];
      dropdown.append(ul);
    }
    dropdown.classList.add('show');
  }
}

function removeSearchList(event) {
  if(!document.getElementsByClassName("dropdown")[0].contains(event.target)){
    document.getElementsByClassName('dropdown-menu')[0].classList.remove("show");
  }

}



document
  .getElementsByClassName('dropdown-menu')[0]
  .addEventListener('click', selectPreviousSearch);

function selectPreviousSearch(event) {
  document.getElementById("search-val").value = event.target.innerText;
  document.getElementsByClassName('dropdown-menu')[0].classList.remove("show");
}


































function loadDoc() {
  for (let index = 0; index < titleIDs.length; index++) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(
      'GET',
      `http://www.omdbapi.com/?i=tt${titleIDs[index]}&apikey=c500a780`,
      true
    );
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var doc = JSON.parse(this.responseText);
        var movie = new movieModel(doc.Title, doc.Year, doc.Plot, doc.Poster);
        createCard(movie);
      }
    };
    xhttp.onerror = function() {
      console.log('An error occured...');
    };
    xhttp.send();
  }
}

async function getDoc() {
  for (let index = 0; index < titleIDs.length; index++) {
    await fetch(
      `http://www.omdbapi.com/?i=tt${titleIDs[index]}&apikey=c500a780`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      }
    )
      .then(response => {
        response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.log('Error: ' + error));
  }
}
