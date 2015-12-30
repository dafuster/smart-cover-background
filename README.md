# smart-background

With responsive web design as the standard today, background images with the `background-size` set to `cover` are frequently
used when setting a background image to a container. 

This allows the designer to essentially take an image and fully wrap a given container and show as much of the image as possible without distorting the image (changing its aspect ratio).

A common challenge with cover backgrounds is that one does not have full control of what the user is able to see in different
responsive view sizes (mobile vs desktop).

Smart background fixes that problem by auto positioning your background image so that a focus point of the image that is
designated will always be visible to the user.

* [Demo](#demo)
* [Usage](#usage)
* [How it works](#how-it-works)

<a name="demo"></a>
## Demo
<a href="http://smart-background.meteor.com/" target="_blank">http://smart-background.meteor.com/</a>

<a name="usage"></a>
## Usage
Let's say you have an image with the dimensions of 800 width by 600 height and you want to focus the center of the image.
Which translates to a 400 left and 300 top:

##### HTML
```
<div class="my-background"
  data-smart-background
  data-width="800"
  data-height="600"
  data-focus-left="400"
  data-focus-top="300">
</div>
```

#### CSS
```
.my-background {
  background-size: cover;
  background-image: url( 800x600-image.jpg );
}
```

#### JS
```
var bg = document.querySelector('[data-smart-background]'),
  smartBG = new SmartBackground(bg);
```


<a name="how-it-works"></a>
## How it works

Typically when using a background image that is set to `cover`, the background image is stretched to fully cover the 
surface area of its container, without distorting the image (maintaining its aspect ratio). To do this, the browser 
figures out the shorter side of the image (width or height) and sets it to 100% of its container's shorter side 
(width or height). 

##### Example:
* An image has a width of 400px and height of 200px.
* The container it is set as a background in has a width 800px and height of 600px.
* When set to 'cover' the background image's height of 200px (the shorter side) is set to 100% of the container's shorter
side which in this case is 600px. This allows for the image to fully cover its container.

Smart background takes a focus point's dimensions (x and y) which translates to the distance left and top from the upper 
left corner of the image. It then calculates an offset that is set as a `background-position: x y` on the container, to
ensure that the focus point is within the visible area of the container.
