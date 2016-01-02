# smart-background

With responsive web design as the standard today, background images with the `background-size` set to `cover` are frequently
used when setting a background image to a container.

A common challenge with cover backgrounds is that one does not have full control of what the user is able to see in different
responsive view sizes (mobile vs desktop).

Smart background fixes that problem by auto positioning your background image so that a focus point of the image that is
designated will always be visible to the user.

* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
* [How it works](#how-it-works)

<a name="demo"></a>
## Demo
[http://smart-background.meteor.com/] (http://smart-background.meteor.com/)

The demo was built with [Meteor] (https://www.meteor.com/).

To run it locally, you'll need Meteor installed, if you do not have it, run:

	curl https://install.meteor.com/ | sh

Then navigate to demo directory and simply type:

	meteor


<a name="installation"></a>
## Installation

	bower install smart-background


<a name="usage"></a>
## Usage

Let's say you have an image with the dimensions of 800 width by 600 height and you want to focus the center of the image.
Which translates to a 400 left and 300 top:

#### HTML

	<div class="my-background"
	  data-smart-background
	  data-width="800"
	  data-height="600"
	  data-focus-left="400"
	  data-focus-top="300">
	</div>

#### CSS

	.my-background {
	  background-size: cover;
	  background-image: url( 800x600-image.jpg );
	}

#### JS

	var bg = document.querySelector('[data-smart-background]'),
	  smartBG = new SmartBackground(bg);


<a name="how-it-works"></a>
## How it works

Typically when using a background image that is set to `cover`, the background image is stretched to fully cover the
surface area of its container, without distorting the image (maintaining its aspect ratio). To do this, the browser
figures out the shorter side of the image (width or height) and sets it to 100% of its container's shorter side
(width or height).

#### Example:
* An image has a width of 400px and height of 200px.
* The container the image is set as a background in has a width 800px and height of 600px.

When the container is set to `background-size: cover;`

* The image's height of 200px (the shorter side) is translated to equal 100% of the container's shorter side which in this case is 600px.
* The width of the image is naturally translated to px which maintains the image's initial aspect ratio.
* This allows for the image to fully cover its container.

Smart background starts by taking a focus point's position  from the upper left corner of the image. This is collected in pixels as a left and top variables (see diagram).

It then calculates an offset of the background image `background-position: left top;` that will maintain the cover effect of the background but also ensure that the focus point designated is in the center of the container.
