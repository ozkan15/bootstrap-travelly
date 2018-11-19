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
  '0167261',
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

var moviesList = [];

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

function createCard(movieData) {
  var div = document.createElement('DIV');
  div.classList.add('col-lg-3');
  div.classList.add('col-sm-12');
  div.classList.add('with-margin');
  var movieCard = `
  <div class="card" style="height:100%;">
    <img class="card-img-top" src=${movieData.poster} alt="Card image cap" />
    <div class="card-body">
      <a href="https://www.google.com.tr/search?q=${
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
  var moviesList = document.getElementById('movies-list');
  moviesList.append(div);
}
