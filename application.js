var Utils = {}
Utils.Constructor = function() {
}
Utils.Constructor.prototype.isNumeric = function(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
}
Utils.Constructor.prototype.numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// Module Pattern
var imageAnimator = (function() {
	// 'this' is a jQuery object - please
	var zoomtran = function(xoffset, yoffset, zoom, duration) {
		// Zoom into the picture and translate image to desired location on hover
		var scalestr = "scale3d("+zoom+", "+zoom+", "+zoom+")";
		this.css("-webkit-transform", scalestr);
		var offsetstr = xoffset+"% "+ yoffset+"%";
		this.css("background-position", offsetstr);

		// Make the zooming/translation smooth
		this.css("-webkit-transition-property", "-webkit-transform background-position");
		var durationstr = duration+"s";
		this.css("-webkit-transition-duration", durationstr);
		this.css("-webkit-transition-timing-function", "ease-out");
	}

	return {
		zoomtran:zoomtran
	};
})();


$(document).ready(function() {

	// General image affine translation
	$("#grid .proj a .imgContainer img").mouseenter(function() {
		imageAnimator.zoomtran.call($(this), 0, 0, 1.5, 0.4);
	});
	$("#grid .proj a .imgContainer img").mouseout(function() {
		imageAnimator.zoomtran.call($(this), 0, 0, 1.01, 0.3);
	}).trigger('mouseout'); // Force the mouseout state at startup

	// Image specific translations
	$("#grid #stockportfolio a .imgContainer img").mouseenter(function() {
		imageAnimator.zoomtran.call($(this), 55, 10, 1.5, 0.4);
	});

	$("#grid #quizalator a .imgContainer img").mouseenter(function() {
		imageAnimator.zoomtran.call($(this), 0, 100, 1.5, 0.4);
	});

	$("#grid #shoppinglist a .imgContainer img").mouseenter(function() {
		imageAnimator.zoomtran.call($(this), 50, 0, 1.5, 0.4);
	});
	
	$("#grid #hotorcold a .imgContainer img").mouseenter(function() {
		imageAnimator.zoomtran.call($(this), 60, -10, 1.5, 0.4);
	});
	
	$("#grid #tssignals a .imgContainer img").mouseenter(function() {
		//imageAnimator.zoomtran.call($(this), 0, 0, 1.5, 0.4);
	});
	
	$("#grid #googleclone a .imgContainer img").mouseenter(function() {
		imageAnimator.zoomtran.call($(this), 0, 0, 1.5, 0.4);
	});
	$("#grid #googleclone a .imgContainer img").mouseout(function() {
		imageAnimator.zoomtran.call($(this), 100, 0, 1.01, 0.4);
	}).trigger('mouseout');

	// jQuery UI code for tooltips
	$(document).tooltip();
});

