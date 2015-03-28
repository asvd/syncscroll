syncscroll
==========


Syncscroll is a tiny javascript library (991 bytes minified) which allows to scroll two or more scrollable areas simultaneously ([online
demo](http://asvd.github.io/syncscroll/)).


### Usage


Download the
[distribution](https://github.com/asvd/syncscroll/releases/download/v0.0.2/syncscroll-0.0.2.tar.gz),
unpack it and load the `syncscroll.js` in a preferable way (that is an UMD module):

```html
<script src="syncscroll.js"></script>
```

Create the scrollable elements which you need to be synchroniously
scrolled, add the `syncscroll` class for them, and set the `name`
attribute to the same value:


```html
<div class=syncscroll name=myElements>
    First big text goes here...
</div>

<div class=syncscroll name=myElements>
    Second big text goes there...
</div>
```

That's it! Now the elements will be scrolled simultaneously. Keep in
mind that scrolling is synchronized proportionally, and not by
amount of pixels.

If you update a set of synchronized elements by changing the classes
or attributes, invoke `syncscroll.reset()` to update the listeners.

Have fun!
