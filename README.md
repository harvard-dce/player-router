player-router
=============

Minimal module for the browser that handles hashtag routing for the Harvard DCE video player. (Currently only needs to handle seek-related routing.)

Intended for use with Browserify.

Installation
------------

    npm install player-router

Usage
-----


    var initPlayerRouter = require('player-router');

    initPlayerRouter({
      seeking: {
        seekParamName: 'range',
        seekResponder: seekToTime
      }
    });

    function seekToTime(startTime, endTime) {
      mediaElement.currentTime = startTime;
    }

Now when the user goes to yourserver.com/yourpath#range=10 in the browser, `seekToTime` will be called with 10 as the startTime.

If the user goes to yourserver.com/yourpath#range=10-16, 10 and 16 will be passed to seekToTime.

**initPlayerRouter** opts:

- seeking: This object groups opts related to parsing seek-related URL components.
    - seekParamName: The name of the seek parameter. If you want to use URLs like 'http://server.com/player#t=30', then you'd specify 't' here. If you want it to be 'http://server.com/player#t=starthere', then you'd specify 'starthere'.
    - seekResponder: A function that will be called when the page is loaded or when the seek param value in the URL changes. It will be passed the (new) start time as a number.

Tests
-----

Run tests with `make test`.

Run Chrome tests with `make test-chrome` and run Firefox tests with `make test-firefox`.

License
-------

The MIT License (MIT)

Copyright (c) 2016 President and Fellows of Harvard College

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
