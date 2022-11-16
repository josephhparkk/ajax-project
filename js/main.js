/* eslint-disable no-console */
var $oneCard = document.querySelector('.one-card');
var $search = document.querySelector('#searching');

$search.addEventListener('submit', getSearchValue);

function getSearchValue(event) {
  event.preventDefault();
  var text = $search.elements.search.value;
  getShowId(text);
  $search.reset();
}

function getShowId(title) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.watchmode.com/v1/search/?apiKey=QE6cb8xjAt1kyYahavgtImCXbtkO5RVOIRNCP3Or&search_field=name&types=tv&search_value=' + title);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
    var titleResults = xhr.response.title_results;
    for (var i = 0; i < titleResults.length; i++) {
      if (title.toLowerCase() === titleResults[i].name.toLowerCase()) {
        var titleId = titleResults[i].id;
        getShowDetail(titleId);
      }
    }
  });
  xhr.send();
}

function getShowDetail(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.watchmode.com/v1/title/' + id + '/details/?apiKey=QE6cb8xjAt1kyYahavgtImCXbtkO5RVOIRNCP3Or&append_to_response=sources');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);

    var showDetailObject = {
      title: xhr.response.title,
      rating: xhr.response.user_rating,
      year: xhr.response.year,
      usRating: xhr.response.us_rating,
      seasons: xhr.response.sources[0].seasons,
      plot: xhr.response.plot_overview,
      poster: xhr.response.poster,
      genre: xhr.response.genre_names
    };
    console.log(showDetailObject);
    $oneCard.append(renderSummary(showDetailObject));
    goToSummaryPage(showDetailObject);
  });
  xhr.send();
}

function renderSummary(entry) {
  var smallContainer = document.createElement('div');
  smallContainer.setAttribute('class', 'small-container');

  var card = document.createElement('div');
  card.setAttribute('class', 'card');
  smallContainer.appendChild(card);

  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  card.appendChild(row);

  var posterHolder = document.createElement('div');
  posterHolder.setAttribute('class', 'column-third');
  row.appendChild(posterHolder);

  var img = document.createElement('img');
  img.setAttribute('class', 'poster');
  img.setAttribute('src', entry.poster);
  posterHolder.appendChild(img);

  var tvShowHeadHolder = document.createElement('div');
  tvShowHeadHolder.setAttribute('class', 'column-two-third');
  row.appendChild(tvShowHeadHolder);

  var tvShowHeader = document.createElement('div');
  tvShowHeader.setAttribute('class', 'row title');
  tvShowHeadHolder.appendChild(tvShowHeader);

  var title = document.createElement('h3');
  title.textContent = entry.title;
  var rating = document.createElement('h4');
  rating.textContent = entry.rating;
  rating.setAttribute('class', 'rating');
  var star = document.createElement('i');
  star.setAttribute('class', 'fa-solid fa-star');

  tvShowHeader.appendChild(title);
  tvShowHeader.appendChild(rating);
  tvShowHeader.appendChild(star);

  var tvShowInfo = document.createElement('div');
  tvShowInfo.setAttribute('class', 'row summary-styling');
  tvShowHeadHolder.appendChild(tvShowInfo);

  var listOfInfo = document.createElement('ul');
  listOfInfo.setAttribute('class', 'first-line');
  tvShowInfo.appendChild(listOfInfo);

  var yearSpan = document.createElement('span');
  var usRatingSpan = document.createElement('span');
  var seasonSpan = document.createElement('span');

  var year = document.createElement('li');
  year.appendChild(yearSpan);
  year.setAttribute('class', 'year');
  yearSpan.textContent = entry.year;
  listOfInfo.appendChild(year);

  var usRating = document.createElement('li');
  usRating.appendChild(usRatingSpan);
  usRating.setAttribute('class', 'us-rating');
  usRatingSpan.textContent = entry.usRating;
  listOfInfo.appendChild(usRating);

  var seasons = document.createElement('li');
  seasons.appendChild(seasonSpan);
  seasons.setAttribute('class', 'seasons');
  seasonSpan.textContent = entry.seasons + ' Season';
  listOfInfo.appendChild(seasons);

  var row2 = document.createElement('div');
  row2.setAttribute('class', 'row');
  tvShowHeadHolder.appendChild(row2);

  var genreHolder = document.createElement('ul');
  genreHolder.setAttribute('class', 'genre-line');
  row2.appendChild(genreHolder);

  var genre = document.createElement('li');
  genre.setAttribute('class', 'genre');
  genreHolder.appendChild(genre);
  var genreSpan = document.createElement('span');
  genre.appendChild(genreSpan);
  genreSpan.textContent = entry.genre;

  var row3 = document.createElement('div');
  row3.setAttribute('class', 'row');
  tvShowHeadHolder.appendChild(row3);

  var playButton = document.createElement('button');
  playButton.setAttribute('class', 'play');
  row3.appendChild(playButton);

  var playIcon = document.createElement('i');
  playIcon.setAttribute('class', 'fa-solid fa-play');
  playButton.appendChild(playIcon);

  var plotSummary = document.createElement('div');
  plotSummary.setAttribute('class', 'row summary');
  card.appendChild(plotSummary);

  var summary = document.createElement('p');
  plotSummary.appendChild(summary);
  summary.textContent = entry.plot;

  return smallContainer;
}

var $searchPage = document.querySelector('.search-page');

function goToSummaryPage(event) {
  $searchPage.classList.add('hidden');
}

var $homeButton = document.querySelector('.fa-house');
$homeButton.addEventListener('click', goHome);
function goHome(event) {
  $searchPage.classList.remove('hidden');
  var $oneCard = document.querySelector('.one-card');
  $oneCard.replaceChildren();
}

var $searchLogo = document.querySelector('.search-logo');
$searchLogo.addEventListener('click', search);

function search(event) {
  if (event.target && event.target.matches('.search-logo')) {
    var text = $search.elements.search.value;
    $search.reset();
    getShowId(text);
  }
}
