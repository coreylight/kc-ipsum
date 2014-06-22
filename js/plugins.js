var plugins = {
	waitForFinalEvent:(function () {
		  var timers = {};
		  return function (callback, ms, uniqueId) {
		    if (!uniqueId) {
		      uniqueId = "Don't call this twice without a uniqueId";
		    }
		    if (timers[uniqueId]) {
		      clearTimeout (timers[uniqueId]);
		    }
		    timers[uniqueId] = setTimeout(callback, ms);
		  };
		})(),
			
	iosfix:function(){	//iOS rotate fix
				if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
				  var viewportmeta = document.querySelector('meta[name="viewport"]');
				  if (viewportmeta) {
				    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
				    document.body.addEventListener('gesturestart', function() {
				      viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
				    }, false);
				  }
				}},
  IETouchEvents:function(){
    if (window.navigator.msMaxTouchPoints >= 2) {/* 2+ touch points*/return 2;}
    else if (window.navigator.msMaxTouchPoints) {/*1 touch point*/return 1;}
    else {/*non-touch device*/return 0;}
  }
}//plugins