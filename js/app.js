(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE

  //listens for submissions on search form
  let form = document.getElementById('form');
  form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    // gets user's input, empty validation done through html using "required" on the input
    let search = document.getElementById("search").value;
    console.log(search);

    //refreshes previous search results
    movies.length = 0;

    //sends a http request to OMDB API using search result
    let url = `http://www.omdbapi.com/?s=${search}`;

    //handles HTTP response by pushing new `movie` object into global `movies` array
    return fetch(url)
    .then(function(res) {
        return res.json();
    })
    .then(function(val) {
        // console.log(val);
        // console.log(val.Search);
        return val.Search
    })
    .then(function(val){
        console.log(val);
        return val.map(function(obj){
          var rObj = {};
          rObj.id = obj.imdbID;
          rObj.poster = obj.Poster;
          rObj.title = obj.Title;
          rObj.year = obj.Yearl
          console.log(rObj);
          return rObj;
        });
    })
    .then(function(rVal){
      rVal.forEach(function(movie) {
        movies.push(movie);
      });
      renderMovies();
      return rVal;
    })

  }); //eventListener

})();

//
// // testing search and fetch function and handling of HTTP response
// function searchMovie(search) {
//     let url = `http://www.omdbapi.com/?s=${search}`;
//
//     return fetch(url)
//     .then(function(res) {
//         return res.json();
//     })
//     .then(function(val) {
//         // console.log(val);
//         // console.log(val.Search);
//         return val.Search
//     })
//     .then(function(val){
//         console.log(val);
//         // logs an array
//         return val.map(function(obj){
//           var rObj = {};
//           rObj.id = obj.imdbID;
//           rObj.poster = obj.Poster;
//           rObj.title = obj.Title;
//           rObj.year = obj.Year;
//           return rObj;
//         })
//     })
//     .then(function(rVal){
//       console.log(rVal);
//       return rVal;
//     })
// }
//
// searchMovie('Gattaca');
