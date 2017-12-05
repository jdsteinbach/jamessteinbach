(function() {
  window.addEventListener('load', function() {
    var html = document.getElementsByTagName('html')[0];
    html.classList.remove('no-js');
    html.classList.add('js', 'loaded');
  });
})();

(function() {
  if (typeof TimelineMax !== 'function') return false;

  var progress = function(duration) {
    return duration.in / (duration.in + duration.out);
  };
  var windowHeight = window.innerHeight;
  var duration = {
    in: 1.5,
    out: 4.5,
    delay: 6
  };
  var headshotTL = new TimelineMax({
    ease: Power4.easeIn
  })
    .add('enter')
    .addPause(duration.in)
    .add('exit', duration.in)

  // for (var i = 0; i < 10; i++) {
  //   var pathGrp = document.querySelectorAll('#headshot path:nth-child(' + (i + 1) + 'n)');
  //   var randA = Math.random();
  //   var randB = Math.random();
  //   var posNeg = randB < .5 ? -1 : 1;
  //   var rand = randA * posNeg;
  //   var offset = i < 1 ? '-=' + duration.in : 0;

  //   headshotTL
  //     .set(
  //       pathGrp,
  //       {
  //         scale: 0,
  //         // rotation: -15 * rand,
  //         // skewY: -30 * rand,
  //         // skewX: 30 * rand,
  //         opacity: 0,
  //       }
  //     )
  //     .to(
  //       pathGrp,
  //       duration.in,
  //       {
  //         scale: 1,
  //         rotation: 0,
  //         skewY: 0,
  //         skewX: 0,
  //         opacity: 1
  //       },
  //       'enter'
  //     )
  //     .to(
  //       pathGrp,
  //       duration.out,
  //       {
  //         scale: 3,
  //         // rotation: -15 * rand,
  //         // skewY: 6 * randA,
  //         // skewX: 6 * randA,
  //         opacity: 0,
  //         blur: '3px'
  //       },
  //       'exit'
  //     );
  // }
  var pathGrp = document.querySelectorAll('svg.headshot path');
  var randA = Math.random();
  var randB = Math.random();
  var posNeg = randB < .5 ? -1 : 1;
  var rand = randA * posNeg;

  headshotTL
    .from(
      'enter',
      pathGrp,
      {
        scale: 0,
        // rotation: -15 * rand,
        // skewY: -30 * rand,
        // skewX: 30 * rand,
        opacity: 0,
      }
    )
    .to(
      pathGrp,
      duration.in,
      {
        scale: 1,
        // rotation: 0,
        // skewY: 0,
        // skewX: 0,
        opacity: 1
      },
      'enter'
    )
    .to(
      pathGrp,
      duration.out,
      {
        scale: 3,
        // rotation: -15 * rand,
        // skewY: 6 * randA,
        // skewX: 6 * randA,
        translateX: '3000%',
        translateY: '3000%',
        opacity: 0,
        blur: '3px'
      },
      'exit'
    );

  headshotTL
    .play();

  window.addEventListener('resize', function() {
    windowHeight = window.innerHeight;
  });

  window.addEventListener('scroll', function() {
    var scrollPercent = window.pageYOffset / (windowHeight / 1.15);
    headshotTL.progress(scrollPercent + progress(duration)).pause();
  });
})();
