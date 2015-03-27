/**
 * @fileoverview syncscroll - scroll several areas simultaniously
 * @version 0.0.1
 * 
 * @license MIT, see http://github.com/asvd/intence
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this,
function (exports) {
    
    

    var names = [];
    

    var destroySync = function() {
        for (var name in names) {
            if (names.hasOwnProperty(name)) {
                for (var i = 0; i < names[name].length; i++) {
                    names[name][i].addEventListener(
                        'scroll', names[name][i].syn, 0
                    );
                }
            }
        }
    }

    var createSync = function() {
        var elems = document.getElementsByClassName('syncscroll');

        var i, j, el, name;
        for (i = 0; i < elems.length; i++) {
            el = elems[i];
            if (!(name = el.getAttribute('name'))) {
                continue;
            }

            el = el.scroller||el;

            if (!names[name]) {
                names[name] = [];
            }

            var found = false;
            for (j = 0; j < names[name].length; j++) {
                if (names[name][j] == el) {
                    found = true;
                }
            }

            if (!found) {
                names[name].push(el);
            }

            el.lastXRate = 0;
            el.lastYRate = 0;

            (function(el, name) {
                el.syn = function(e) {
                    var elems = names[name];

                    var xTotal = el.scrollWidth - el.clientWidth;
                    var yTotal = el.scrollHeight - el.clientHeight;

                    var xRate = el.scrollLeft / xTotal;
                    var yRate = el.scrollTop / yTotal;

                    var updateX = false;
                    var updateY = false;

                    if (xRate != el.lastXRate) {
                        updateX = true;
                        el.lastXRate = xRate;
                    }

                    if (yRate != el.lastYRate) {
                        updateY = true;
                        el.lastYRate = yRate;
                    }

                    var i, otherEl;
                    for (i = 0; i < elems.length; i++) {
                        otherEl = elems[i];
                        if (otherEl != el) {
                            if (updateX) {
                                xTotal = otherEl.scrollWidth -
                                         otherEl.clientWidth;

                                otherEl.lastXRate = xRate;

                                otherEl.scrollLeft =
                                    Math.round(xTotal * xRate);
                            }
                            
                            if (updateY) {
                                yTotal = otherEl.scrollHeight -
                                         otherEl.clientHeight;

                                otherEl.lastYRate = yRate;

                                otherEl.scrollTop =
                                    Math.round(yTotal * yRate);
                            }
                        }
                    }
                };
                 
                el.addEventListener('scroll', el.syn, 0);
             })(el, name);
        }
    }
    


    var reset = function() {
        destroySync();
        createSync();
    }
    
    
       
    if (document.readyState == "complete") {
        reset();
    } else {
        window.addEventListener("load", reset, 0);
    }

    exports.reset = reset;
}));


