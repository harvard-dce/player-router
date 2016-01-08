var test = require('tape');
var initPlayerRouter = require('../index');

// test('Pause', function pause(t) {
//   console.log('Enter `c()` in the console to continue.');
//   window.c = t.end;
// });

var positiveCases = [
  {
    seekParamName: 'start',
    hashLocation: 'start=10',
    expected: 10
  },
  {
    seekParamName: 's',
    hashLocation: 's=10',
    expected: 10
  },
  {
    seekParamName: 's',
    hashLocation: 'whatever/something/s=20',
    expected: 20
  },
  {
    seekParamName: 'start',
    hashLocation: 'start=abcd20',
    expected: 0
  },
  {
    seekParamName: 'init',
    hashLocation: 'next=hello/init=801',
    expected: 801
  }
];

var negativeCases = [
  {
    seekParamName: 'start',
    hashLocation: ''
  },
  {
    seekParamName: 'start',
    hashLocation: 'nothingtodowithseek=50'
  },
  {
    seekParamName: 's',
    hashLocation: 's=10/something-after'
  }
];

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

    function checkRouting(time) {
      t.equal(time, testCase.expected, 'Correct time is passed to responder.');
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

    window.location.hash = testCase.hashLocation;

    setTimeout(pass, 0);

    function checkRouting() {
      t.fail('Does not call responder because hash does not contain param.');
    }

    function pass() {
      t.pass('Does not call responder because hash does not contain param.');
      t.end();
    }
  });
}
