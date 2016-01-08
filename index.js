function initPlayerRouter(opts) {
  var seekParamName;
  var seekResponder;

  if (opts) {
    if (opts.seeking) {
      seekParamName = opts.seeking.seekParamName;
      seekResponder = opts.seeking.seekResponder;
    }
  }

  window.onhashchange = route;

  function route() {
    var segments = window.location.hash.slice(1).split('/');
    if (segments.length > 0) {
      var lastSegment = segments[segments.length - 1];
      var paramAndValue = lastSegment.split('=');
      if (paramAndValue.length === 2) {
        if (paramAndValue[0] === seekParamName) {
          var value = parseInt(paramAndValue[1], 10);
          if (isNaN(value)) {
            value = 0;
          }
          seekResponder(value);
        }
      }
    }

    // If more traditional routing was needed, this is where we would pass the
    // hash off to Director or another routing module.
  }

  return {
    route: route
  };
}

module.exports = initPlayerRouter;
