/* exported data */
var data = {
  view: 'search-page',
  currentCard: null,
  savedList: [],
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

window.addEventListener('pagehide', function () {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('form', dataJSON);
});
