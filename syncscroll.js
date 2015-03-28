/**
 * @fileoverview syncscroll - scroll several areas simultaniously
 * @version 0.0.2
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
        factory((root.syncscroll = {}));
    }
}(this,
function (exports) {
    var Width = 'Width';
    var Height = 'Height';
    var Top = 'Top';
    var Left = 'Left';
    var scroll = 'scroll';
    var client = 'client';
    var names = [];

    var reset = function() {
        var elems = document.getElementsByClassName('syncscroll');
        var i, j, el, found, name;
        for (name in names) {
            if (names.hasOwnProperty(name)) {
                for (i = 0; i < names[name].length; i++) {
                    names[name][i].removeEventListener(
                        'scroll', names[name][i].syn, 0
                    );
                }
            }
        }

        for (i = 0; i < elems.length; i++) {
            found = 0;
            el = elems[i];
            if (!(name = el.getAttribute('name'))) {
                continue;
            }

            el = el.scroller||el;

            if (!names[name]) {
                names[name] = [];
            }

            for (j = 0; j < names[name].length; j++) {
                if (names[name][j] == el) {
                    found = 1;
                }
            }

            if (!found) {
                names[name].push(el);
            }

            el.eX = el.eY = 0;

            (function(el, name) {
                el.addEventListener(
                    'scroll',
                    el.syn = function() {
                        var elems = names[name];

                        var scrollX = el[scroll+Left];
                        var scrollY =  el[scroll+Top];

                        var xRate =
                            scrollX /
                            (el[scroll+Width] - el[client+Width]);
                        var yRate =
                            scrollY /
                            (el[scroll+Height] - el[client+Height]);

                        var updateX = 0;
                        var updateY = 0;

                        var otherEl, i;

                        if (scrollX != el.eX) {
                            updateX = 1;
                            el.eX = scrollX;
                        }

                        if (scrollY != el.eY) {
                            updateY = 1;
                            el.eY = scrollY;
                        }

                        for (i = 0; i < elems.length; i++) {
                            otherEl = elems[i];
                            if (otherEl != el) {
                                if (updateX) {
                                    scrollX = Math.round(
                                        xRate *
                                        (otherEl[scroll+Width] -
                                         otherEl[client+Width])
                                    );

                                    otherEl.eX =
                                       otherEl[scroll+Left] = scrollX;
                                }
                                
                                if (updateY) {
                                    scrollY =Math.round(
                                        yRate *
                                        (otherEl[scroll+Height] -
                                         otherEl[client+Height])
                                    ); 

                                    otherEl.eY =
                                        otherEl[scroll+Top] = scrollY;
                                }
                            }
                        }
                    }, 0
                );
            })(el, name);
        }
    }
    
    
       
    if (document.readyState == "complete") {
        reset();
    } else {
        window.addEventListener("load", reset, 0);
    }

    exports.reset = reset;
}));


