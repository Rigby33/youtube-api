const youtubeSearchApiUrl = 'https://www.googleapis.com/youtube/v3/search';
const youtubeSearchApiKey = 'AIzaSyCGfB7cX0Savy7hA_3R__HM2OHhMbjFo9s';

function getDataFromApi (searchTerm, callback) {
  const settings = {
    url: youtubeSearchApiUrl,
    data: {
      part: 'snippet',
      key: youtubeSearchApiKey,
      q: `${searchTerm}`,
      maxResults: '25',
      type: 'video',
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

function renderYoutubeResults (result) {
  return `<div class="videoResult">
  <h2>${result.snippet.title}</h2>
  <a href="http://youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.high.url}" alt="${result.snippet.title}"/></a>
  </div>`
}

function displayYouTubeSearchData(data) {
  const youTubeResults = data.items.map((item, index) => renderYoutubeResults(item));
  $('.js-search-results').html(youTubeResults);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    searchTerm = query
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);


// <iframe width="560" height="315" src="https://www.youtube.com/embed/IZOyzi4W-wg" frameborder="0" allowfullscreen></iframe>
