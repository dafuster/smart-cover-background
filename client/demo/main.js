'use strict';

Meteor.startup(function () {

  function SmartBackground(element) {
    var _this = this;

    this.element = element;
    this.elementStyle = this.element.style;
    this.originalImage = {
      src: element.getAttribute('data-smart-background'),
      width: element.getAttribute('data-width'),
      height: element.getAttribute('data-height'),
      orientation: {}
    };
    this.imageFocus = {
      top: element.getAttribute('data-focus-top'),
      left: element.getAttribute('data-focus-left'),
    };

    this.originalImage.ratio = this.originalImage.width/ this.originalImage.height;

    if (this.originalImage.ratio > 1) {
      this.originalImage.orientation.landscape = true;
    } else if (this.originalImage.ratio < 1) {
      this.originalImage.orientation.portrait = true;
    } else {
      this.originalImage.orientation.square = true;
    }

    // this.renderElement();
    this.focusElement();

    window.addEventListener('resize', function () {
      _this.focusElement();
    });
  }

  SmartBackground.prototype.renderFocusPoint = function (left, top) {
    if (!this.focusPoint) {
      this.focusPoint = document.createElement('DIV');
      this.element.appendChild(this.focusPoint);
    }
    this.focusPoint.className = 'smart-background-focus';
    this.focusPoint.style.left = left + 'px';
    this.focusPoint.style.top = top + 'px';

  };

  SmartBackground.prototype.renderElement = function () {
    this.elementStyle.backgroundImage = 'url('+ this.originalImage.src +')';
    this.elementStyle.backgroundSize = 'cover';
    this.elementStyle.backgroundRepeat = 'no-repeat';
  };

  SmartBackground.prototype.focusElement = function () {
    var elementDimensions = this.getElementDimensions(),
      elementRatio = elementDimensions.width / elementDimensions.height,
      imageToElementRatio;

    if (elementRatio < this.originalImage.ratio) {
      imageToElementRatio = elementDimensions.height / this.originalImage.height;
    } else {
      imageToElementRatio = elementDimensions.width / this.originalImage.width;
    }

    var elementImageWidth = imageToElementRatio * this.originalImage.width,
      elementImageHeight = imageToElementRatio * this.originalImage.height,
      elementImageFocusLeft = imageToElementRatio * this.imageFocus.left,
      elementImageFocusTop = imageToElementRatio * this.imageFocus.top,

      elementYCenter = elementDimensions.height / 2,
      elementYOffset = elementImageFocusTop - elementYCenter,
      elementYRelief = elementImageHeight - elementDimensions.height,
      elementBackgroundY = elementYOffset <= elementYRelief ?
        -elementYOffset : -elementYRelief;

    this.renderFocusPoint(
      elementImageFocusLeft,
      elementImageFocusTop + (elementBackgroundY < 0 ? elementBackgroundY : 0));

    this.positionElement(0,  elementBackgroundY < 0 ? elementBackgroundY : 0);

  };

  SmartBackground.prototype.positionElement = function (x, y) {
    this.elementStyle.backgroundPosition = x + 'px ' + y + 'px';
  };

  SmartBackground.prototype.getElementDimensions = function () {
    return {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    };
  };


  var bg = document.querySelectorAll('[data-smart-background]'),
    smartBG = [];

  for (var x=0, y=bg.length; x < y; x++) {
    smartBG[x] = new SmartBackground(bg[x]);
  }

});
