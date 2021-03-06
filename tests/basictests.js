var test = require('tape');
var initPlayerRouter = require('../index');

// Uncomment this if you want the test run to pause at the start so that you can
// add breakpoints for debugging.

// test('Pause', function pause(t) {
//   console.log('Enter `c()` in the console to continue.');
//   window.c = t.end;
// });

// These are the positive test cases, in which we expect the seekResponder to
// be called.

// seekParamName is the seekParamName passed to initPlayerRouter.
// hashLocation is the what the hash part of the URL will be changed to in the
// test. e.g. http://localhost:3000/#range=10
// expectedStart is the start value that should be passed to the seekResponder.
// expectedEnd is the start value that should be passed to the seekResponder.

var positiveCases = [
  {
    seekParamName: 'range',
    hashLocation: 'range=10',
    expectedStart: 10,
    expectedEnd: undefined
  },
  {
    seekParamName: 'range',
    hashLocation: 'range=10-15',
    expectedStart: 10,
    expectedEnd: 15
  },
  {
    seekParamName: 't',
    hashLocation: 't=10',
    expectedStart: 10,
    expectedEnd: undefined
  },
  {
    seekParamName: 't',
    hashLocation: 't=10-900',
    expectedStart: 10,
    expectedEnd: 900
  },
  {
    seekParamName: 't',
    hashLocation: 'whatever/something/t=20',
    expectedStart: 20,
    expectedEnd: undefined
  },
  {
    seekParamName: 't',
    hashLocation: 'whatever/something/t=20-21',
    expectedStart: 20,
    expectedEnd: 21
  },
  {
    seekParamName: 'init',
    hashLocation: 'next=hello/init=801-ab3',
    expectedStart: 801,
    expectedEnd: undefined
  },
  {
    seekParamName: 'time',
    hashLocation: 'next=hello/time=801-800',
    expectedStart: 801,
    expectedEnd: undefined
  }
];

// These are the negative test cases, in which we expect the seekResponder to
// NOT be called.

// seekParamName is the seekParamName passed to initPlayerRouter.
// hashLocation is the what the hash part of the URL will be changed to in the
// test. e.g. http://localhost:3000/#range=10

var negativeCases = [
  {
    seekParamName: 'range',
    hashLocation: ''
  },
  {
    seekParamName: 'range',
    hashLocation: 'nothingtodowithseek=50'
  },
  {
    seekParamName: 't',
    hashLocation: 's=10/something-after'
  },
  {
    seekParamName: 'range',
    hashLocation: 'range=abcd20',
  },
  {
    seekParamName: 'range',
    hashLocation: '',
  }
];

// This code executes the tests. It creates a router, then changes the hash of
// the URL to trigger it, then makes assertions in the seekResponder.

positiveCases.forEach(runPositiveCaseTest);
negativeCases.forEach(runNegativeCaseTest);

test('Direct route test', function directTest(t) {
  window.location.hash = 'st=101';

  var router = initPlayerRouter({
    seeking: {
      seekParamName: 'st',
      seekResponder: checkRouting
    }
  });

  router.route();

  function checkRouting(time) {
    t.equal(time, 101, 'Correct time is passed to responder.');
    t.end();
  }
});

function runPositiveCaseTest(testCase) {
  test('Positive test', function positiveTest(t) {
    initPlayerRouter({
      seeking: {
        seekParamName: testCase.seekParamName,
        seekResponder: checkRouting
      }
    });

    window.location.hash = testCase.hashLocation;

    function checkRouting(startTime, endTime) {
      t.equal(
        startTime,
        testCase.expectedStart,
        'Correct start is passed to responder.'
      );
      t.equal(
        endTime,
        testCase.expectedEnd,
        'Correct end is passed to responder.'
      )
      t.end();
    }
  });
}

function runNegativeCaseTest(testCase) {
  test('Negative test', function negativeTest(t) {
    initPlayerRouter({
      seeking: {
        seekParamName: testCase.seekParamName,
        seekResponder: checkRouting
      }
    });

    t.doesNotThrow(
      changeHash,
      'Changing the hash to something bad does not cause an exception.'
    );

    function changeHash() {
      window.location.hash = testCase.hashLocation;
      setTimeout(pass, 0);
    }

    function checkRouting() {
      t.fail('Does not call responder because hash does not contain param.');
    }

    function pass() {
      t.pass('Does not call responder because hash does not contain param.');
      t.end();
    }
  });
}
