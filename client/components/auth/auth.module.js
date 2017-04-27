'use strict';

angular.module('yoTemplateApp.auth', ['yoTemplateApp.constants', 'yoTemplateApp.util', 'ngCookies',
    'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
