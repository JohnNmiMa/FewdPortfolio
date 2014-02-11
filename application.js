// Module Pattern
var imageAnimator = (function() {

	var zoomtran = function(xoffset, yoffset, zoom, durationSeconds) {
		// Zoom into the picture and translate image to desired location
		var scalestr = "scale3d("+zoom+", "+zoom+", "+zoom+")";
		this.css("-webkit-transform", scalestr);
		var offsetstr = xoffset+"% "+ yoffset+"%";
		this.css("background-position", offsetstr);
	}

	var displayOverlay = function(display) {
		if (display) {
			// Make the overlay visible and darken the background
			this.css("background-color", "rgba(0,0,0, 0.6)");
			this.css('visibility', 'visible');
		} else {
			// Make the overlay hidden and brighten the background
			this.css("background-color", "rgba(0,0,0, 0.0)");
			var delayobj = this;
			setTimeout(function() {
				delayobj.css('visibility', 'hidden');
			}, 200);
		}
	}

	var setOverlaySize = function() {
		$(this).find('a.overlay').width($(this).width()).height($(this).height());
	}

	var centerOverlayTitle = function() {
		var parentHeight = $(this).parent().height();
		var thisHeight = $(this).height();
		var topMargin = (parentHeight - thisHeight) / 2;
		$(this).css('margin-top', topMargin);
	}

	var setFontSize = function(emsize) {
		var emstr = emsize+'em';
		this.css('font-size', emstr);
	}

	return {
		zoomtran:zoomtran,
		displayOverlay:displayOverlay,
		setOverlaySize:setOverlaySize,
		setFontSize:setFontSize,
		centerOverlayTitle:centerOverlayTitle
	};
})();


$(document).ready(function() {

	var indata = {},
		outdata = {xoff:'0',yoff:'0',zoom:'1.01',duration:'0.4'};

	function hoverin(event) {
		var xoff = event.data.xoff,
	        yoff = event.data.yoff,
	        zoom = event.data.zoom,
	        dur  = event.data.duration;
		imageAnimator.zoomtran.call($(this).find('.image'), xoff, yoff, zoom, dur);
		imageAnimator.displayOverlay.call($(this).find('a.overlay'), true);
		imageAnimator.setFontSize.call($(this).find('a.overlay h2'), 1.5);
		imageAnimator.setFontSize.call($(this).find('a.overlay h4'), 1.0);
		imageAnimator.centerOverlayTitle.call($(this).find('.description'));
	}
	function hoverout(event) {
		var xoff = event.data.xoff,
	        yoff = event.data.yoff,
	        zoom = event.data.zoom,
	        dur  = event.data.duration;
		imageAnimator.zoomtran.call($(this).find('.image'), xoff, yoff, zoom, dur);
		imageAnimator.setFontSize.call($(this).find('a.overlay h2'), 1.0);
		imageAnimator.setFontSize.call($(this).find('a.overlay h4'), 0.7);
		imageAnimator.displayOverlay.call($(this).find('a.overlay'), false);
	}
	
	// Initialize the ovelay window size to its parent/grid size
	$("#grid .proj").mouseenter(function() {
		imageAnimator.setOverlaySize.call($(this));
	}).trigger('mouseenter');

	// Center the overlay description
	$('#grid .proj a .description').mouseenter(function() {
		imageAnimator.centerOverlayTitle.call($(this));
	}).trigger('mouseenter');

	// General image affine translation
	$("#grid .proj").on('mouseleave',outdata,hoverout).trigger('mouseleave');

	// Image specific affine translations
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

