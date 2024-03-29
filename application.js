// Module Pattern
var imageAnimator = (function() {

	var zoomtran = function(xoffset, yoffset, zoom) {
		// Zoom into or out of the image
		var zoomstr = zoom+"%";
		if ($(this).hasClass('tall')) {
			zoomstr = zoomstr + " auto";
		} else {
			zoomstr = "auto " + zoomstr;
		}
		$(this).css("background-size", zoomstr);

		// Translate the image to the desired location
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
		outdata = {xoff:'0',yoff:'0',zoom:'100'}, outdata2 = {};

	function doHover(xoff, yoff, zoom, h2size, h4size, hover) {
		imageAnimator.zoomtran.call($(this).find('.image'), xoff, yoff, zoom);
		imageAnimator.displayOverlay.call($(this).find('a.overlay'), hover);
		imageAnimator.setFontSize.call($(this).find('a.overlay h2'), h2size);
		imageAnimator.setFontSize.call($(this).find('a.overlay h4'), h4size);
		imageAnimator.centerOverlayTitle.call($(this).find('.description'));
	}
	function hoverin(event,hoverin) {
		doHover.call(this, event.data.xoff, event.data.yoff, event.data.zoom, 1.5, 1.0, true);
	}
	function hoverout(event) {
		doHover.call(this, event.data.xoff, event.data.yoff, event.data.zoom, 1.0, 0.7, false);
	}
	
	// Initialize the ovelay window size to its parent/grid size
	$("div.grid .proj").mouseenter(function() {
		imageAnimator.setOverlaySize.call($(this));
	}).trigger('mouseenter');

	// Center the overlay description
	$('div.grid .proj a .description').mouseenter(function() {
		imageAnimator.centerOverlayTitle.call($(this));
	}).trigger('mouseenter');

	// General image affine translation
	$("div.grid .proj").on('mouseleave',outdata,hoverout).trigger('mouseleave');

	// Image specific affine translations
	indata = {xoff:'0',yoff:'0',zoom:'150'};
	$("div.grid #stockportfolio").on('mouseenter',indata,hoverin);

	indata = {xoff:'50',yoff:'100',zoom:'150'};
	$("div.grid #quizalator").on('mouseenter',indata,hoverin);

	indata = {xoff:'0',yoff:'0',zoom:'100'};
	outdata2 = {xoff:'93',yoff:'0',zoom:'100'};
	$("div.grid #shoppinglist").on('mouseenter',indata,hoverin).on('mouseleave',outdata2,hoverout).trigger('mouseleave');
	
	indata = {xoff:'50',yoff:'30',zoom:'150'};
	outdata2 = {xoff:'50',yoff:'0',zoom:'100'};
	$("div.grid #hotorcold").on('mouseenter',indata,hoverin).on('mouseleave',outdata2,hoverout).trigger('mouseleave');
	
	indata = {xoff:'50',yoff:'20',zoom:'150'};
	outdata2 = {xoff:'50',yoff:'0',zoom:'100'};
	$("div.grid #tssignals").on('mouseenter',indata,hoverin).on('mouseleave',outdata2,hoverout).trigger('mouseleave');
	
	indata = {xoff:'50',yoff:'70',zoom:'150'};
	outdata2 = {xoff:'50',yoff:'0',zoom:'100'};
	$("div.grid #googleclone").on('mouseenter',indata,hoverin).on('mouseleave',outdata2,hoverout).trigger('mouseleave');

	indata = {xoff:'50',yoff:'0',zoom:'150'};
	outdata2 = {xoff:'50',yoff:'0',zoom:'100'};
	$("div.grid #rgs").on('mouseenter',indata,hoverin).on('mouseleave',outdata2,hoverout).trigger('mouseleave');

	indata = {xoff:'100',yoff:'70',zoom:'150'};
	outdata2 = {xoff:'100',yoff:'70',zoom:'100'};
	$("div.grid #webos").on('mouseenter',indata,hoverin).on('mouseleave',outdata2,hoverout).trigger('mouseleave');

	indata = {xoff:'50',yoff:'50',zoom:'150'};
	outdata2 = {xoff:'50',yoff:'50',zoom:'100'};
	$("div.grid #graphicsdevice").on('mouseenter',indata,hoverin).on('mouseleave',outdata2,hoverout).trigger('mouseleave');

	indata = {xoff:'50',yoff:'100',zoom:'150'};
	outdata2 = {xoff:'50',yoff:'50',zoom:'100'};
	$("div.grid #x11").on('mouseenter',indata,hoverin).on('mouseleave',outdata2,hoverout).trigger('mouseleave');

	indata = {xoff:'10',yoff:'0',zoom:'150'};
	outdata2 = {xoff:'10',yoff:'20',zoom:'100'};
	$("div.grid #seismicprocessing").on('mouseenter',indata,hoverin).on('mouseleave',outdata2,hoverout).trigger('mouseleave');

	indata = {xoff:'0',yoff:'0',zoom:'150'};
	outdata2 = {xoff:'0',yoff:'0',zoom:'100'};
	$("div.grid #seismicacquisition").on('mouseenter',indata,hoverin).on('mouseleave',outdata2,hoverout).trigger('mouseleave');

	$("section .navigator #workbtn").click(function() {
		$("section#experience").css('display', 'none');
		$("section#work").css('display', 'block');
	}).trigger('click');
	$("section .navigator #expbtn").click(function() {
		$("section#work").css('display', 'none');
		$("section#experience").css('display', 'block');
	});

	// jQuery UI code for tooltips
	$(document).tooltip();
});

