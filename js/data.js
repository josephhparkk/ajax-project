/* exported data */
var data = {
  view: 'search-page',
  shows: [],
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('form');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function () {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('form', dataJSON);
});

function getShowId(title) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.watchmode.com/v1/search/?apiKey=QE6cb8xjAt1kyYahavgtImCXbtkO5RVOIRNCP3Or&search_field=name&types=tv&search_value=breaking');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response);
  });
  xhr.send();
}

getShowId('love is blind');
