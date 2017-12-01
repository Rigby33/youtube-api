const youtubeSearchApiUrl = 'https://www.googleapis.com/youtube/v3/search';
const youtubeSearchApiKey = 'AIzaSyCGfB7cX0Savy7hA_3R__HM2OHhMbjFo9s';

function getDataFromApi (searchTerm, pageToken, callback) {
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
  if (pageToken) {
    settings.data.pageToken = pageToken;
  }
  $.ajax(settings);
}

function renderYoutubeResults (result) {
  return `<div class="videoResult">
    <a href="https://youtube.com/watch?v=${result.id.videoId}" target="_blank" class="youtubelink"><h2>${result.snippet.title}</h2></a>
  <a href="https://youtube.com/watch?v=${result.id.videoId}" target="_blank" class="youtubelink">
  <img src="${result.snippet.thumbnails.high.url}" alt="${result.snippet.title}"/>
  </a>
  <p>View more videos from <a href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a></p>
  </div>`
}

function displayYouTubeSearchData(data) {
  let nextPageToken = data.nextPageToken;
  let prevPageToken = data.prevPageToken;
  setPageTokens(nextPageToken, prevPageToken);
  const youTubeResults = data.items.map((item, index) => renderYoutubeResults(item, nextPageToken, prevPageToken));
  $('.js-search-results').html(youTubeResults);
}

function setPageTokens (nextPageToken, prevPageToken) {
  if (nextPageToken) {
    $('.next').on('click', function (event) {
      event.preventDefault();
      getDataFromApi($('.js-query').val(), nextPageToken, displayYouTubeSearchData)
    });
  } if (prevPageToken) {
      $('.prev').on('click', function (event) {
        event.preventDefault();
        getDataFromApi($('.js-query').val(), prevPageToken, displayYouTubeSearchData)
      })
  }
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    // searchTerm = query
    // queryTarget.val("");
    getDataFromApi(query, null, displayYouTubeSearchData);
    $('.pagination').show();
    // lightboxRun();
  });
}

// function lightboxRun () {
//   $('.youtubelink').on('click', function (event) {
//     event.preventDefault();
//     $('.lightbox').show();
//   });
// }


$(watchSubmit);
