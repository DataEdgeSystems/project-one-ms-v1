'use strict';

(function(){

class MoviesComponent {
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('movie');
    });

    // will be used inside the page
    this.search = {
      title : '',
      year: 2017
    };
    this.movie = {};
    this.showSearchResult = false;
    this.showSearchError = '';
    this.movies = [];

  }


  $onInit() {
    this.$http.get('/api/movies')
      .then(response => {
        this.movies = response.data;
        this.socket.syncUpdates('movie', this.movies);
      });
  }



  searchMovie() {

    // http://www.omdbapi.com/?t=Don&y=1998
    var searchUrl = 'http://www.omdbapi.com/?t='+this.search.title +'&y='+this.search.year;
    this.$http.get(searchUrl).then(response => {
        console.log(response.data);
        if(response.data.Response == 'False') {
              this.showSearchResult = false;
              this.showSearchError = response.data.Error;
        }else {
          this.showSearchError = '';
          // set the response.data to the movie object
          this.movie = response.data;
          this.showSearchResult = true;
        }

    });

  }

  removeMovie(_id) {
    var self = this;
    bootbox.confirm(
      {
          title: 'Remove Movie',
          message: 'Are you sure you want to remove the movie?',
          size: 'medium',
          callback: function(result) {
            if(result) {
                self.$http.delete('/api/movies/' + _id);
                bootbox.alert({
                  title: 'Information',
                  message: 'Movie deleted successfully!',
                  size: 'medium'
                });
            }
          }
      }
    );
  }


  addMovie() {
    if(this.movie) {
      this.$http.post('/api/movies', this.movie);
    }
    this.refreshPage();
    bootbox.alert({
                  title: 'Information',
                  message: 'Movie added successfully!',
                  size: 'medium'
                });
  }

  // for resetting the entire page!
  refreshPage() {
    this.search = {
      title : '',
      year: 2017
    };
    this.movie = {};
    this.showSearchResult = false;
  }

}

angular.module('yoTemplateApp')
  .component('movies', {
    templateUrl: 'app/movies/movies.html',
    controller: MoviesComponent,
    controllerAs: 'moviesCtrl'
  });

})();
