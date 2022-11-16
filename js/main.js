/* eslint-disable no-console */

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
    data.showList.push(showDetailObject);
  });
  xhr.send();
}
