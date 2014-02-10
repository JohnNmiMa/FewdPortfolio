// Module Pattern
var imageAnimator = (function() {

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

	var displayOverlay = function(display) {
		if (display)
			this.css('visibility', 'visible');
		else
			this.css('visibility', 'hidden');
	}

	return {
		zoomtran:zoomtran,
		displayOverlay:displayOverlay
	};
})();


$(document).ready(function() {

	var indata = {},
		outdata = {xoff:'0',yoff:'0',zoom:'1.01',duration:'0.4'};

	// Initialize the ovelay window size to its parent/grid size
	$("#grid .proj").mouseenter(function() {
		$(this).find('a').width($(this).width()).height($(this).height());
	}).trigger('mouseenter');

	function hoverin(event) {
		var xoff = event.data.xoff,
	        yoff = event.data.yoff,
	        zoom = event.data.zoom,
	        dur  = event.data.duration;
		imageAnimator.zoomtran.call($(this).find('.image'), xoff, yoff, zoom, dur);
		imageAnimator.displayOverlay.call($(this).find('a'), true);
	}
	function hoverout(event) {
		var xoff = event.data.xoff,
	        yoff = event.data.yoff,
	        zoom = event.data.zoom,
	        dur  = event.data.duration;
		imageAnimator.zoomtran.call($(this).find('.image'), xoff, yoff, zoom, dur);
		imageAnimator.displayOverlay.call($(this).find('a'), false);
	}
	
	// General image affine translation
	$("#grid .proj").on('mouseleave',outdata,hoverout).trigger('mouseleave');

	// Image specific translations
	indata = {xoff:'55',yoff:'10',zoom:'1.5',duration:'0.4'};
	$("#grid #stockportfolio").on('mouseenter',indata,hoverin);

	indata = {xoff:'0',yoff:'100',zoom:'1.5',duration:'0.4'};
	$("#grid #quizalator").on('mouseenter',indata,hoverin);

	indata = {xoff:'50',yoff:'0',zoom:'1.5',duration:'0.4'};
	$("#grid #shoppinglist").on('mouseenter',indata,hoverin);
	
	indata = {xoff:'60',yoff:'-10',zoom:'1.5',duration:'0.4'};
	$("#grid #hotorcold").on('mouseenter',indata,hoverin);
	
	indata = {xoff:'0',yoff:'0',zoom:'1.5',duration:'0.4'};
	$("#grid #tssignals").on('mouseenter',indata,hoverin);
	
	indata = {xoff:'0',yoff:'0',zoom:'1.5',duration:'0.4'};
	var outdata2 = {xoff:'100',yoff:'0',zoom:'1.01',duration:'0.4'};
	$("#grid #googleclone").on('mouseenter',indata,hoverin).on('mouseleave',outdata2,hoverout).trigger('mouseleave');

	// jQuery UI code for tooltips
	$(document).tooltip();
});

