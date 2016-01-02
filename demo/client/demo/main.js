'use strict';

Meteor.startup(function () {

  var bg = document.querySelectorAll('[data-smart-background]'),
    smartBG = [];

  for (var x=0, y=bg.length; x < y; x++) {
    smartBG[x] = new SmartBackground(bg[x]);
  }

});
