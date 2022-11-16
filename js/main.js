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
  var div1 = document.createElement('div');
  div1.setAttribute('class', 'small-container');

  var div2 = document.createElement('div');
  div2.setAttribute('class', 'card');
  div1.appendChild(div2);

  var div3 = document.createElement('div');
  div3.setAttribute('class', 'row');
  div2.appendChild(div3);

  var div4 = document.createElement('div');
  div4.setAttribute('class', 'column-third');
  div3.appendChild(div4);

  var img = document.createElement('img');
  img.setAttribute('class', 'poster');
  img.setAttribute('src', entry.poster);
  div4.appendChild(img);

  var div5 = document.createElement('div');
  div5.setAttribute('class', 'column-two-third');
  div3.appendChild(div5);

  var div6 = document.createElement('div');
  div6.setAttribute('class', 'row title');
  div5.appendChild(div6);

  var title = document.createElement('h3');
  title.textContent = entry.title;
  var rating = document.createElement('h4');
  rating.textContent = entry.rating;
  rating.setAttribute('class', 'rating');
  var star = document.createElement('i');
  star.setAttribute('class', 'fa-solid fa-star');

  div6.appendChild(title);
  div6.appendChild(rating);
  div6.appendChild(star);

  var div7 = document.createElement('div');
  div7.setAttribute('class', 'row summary-styling');
  div5.appendChild(div7);

  var ul1 = document.createElement('ul');
  ul1.setAttribute('class', 'first-line');
  div7.appendChild(ul1);

  var year = document.createElement('li');
  year.setAttribute('class', 'year');
  year.textContent = entry.year;
  ul1.appendChild(year);

  var usRating = document.createElement('li');
  usRating.setAttribute('class', 'us-rating');
  usRating.textContent = entry.usRating;
  ul1.appendChild(usRating);

  var seasons = document.createElement('li');
  seasons.setAttribute('class', 'seasons');
  seasons.textContent = entry.seasons + ' Season';
  ul1.appendChild(seasons);

  var div8 = document.createElement('div');
  div8.setAttribute('class', 'row');
  div5.appendChild(div8);

  var ul2 = document.createElement('ul');
  div8.appendChild(ul2);

  var genre = document.createElement('li');
  genre.setAttribute('class', 'genre');
  genre.textContent = entry.genre;
  ul2.appendChild(genre);

  var div9 = document.createElement('div');
  div9.setAttribute('class', 'row');
  div5.appendChild(div9);

  var playButton = document.createElement('button');
  playButton.setAttribute('class', 'play');
  div9.appendChild(playButton);

  var playIcon = document.createElement('i');
  playIcon.setAttribute('class', 'fa-solid fa-play');
  playButton.appendChild(playIcon);

  var div10 = document.createElement('div');
  div10.setAttribute('class', 'row summary');
  div2.appendChild(div10);

  var summary = document.createElement('p');
  div10.appendChild(summary);
  summary.textContent = entry.plot;

  return div1;
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
  $oneCard.innerHTML = '';
}

var $searchLogo = document.querySelector('.search-logo');
$searchLogo.addEventListener('click', search);

function search(event) {
  if (event.target && event.target.matches('.search-logo')) {
    var text = $search.elements.search.value;
    getShowId(text);
  }
}
