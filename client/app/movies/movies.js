'use strict';

angular.module('yoTemplateApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movies', {
        template: '<movies></movies>'
      });
  });
