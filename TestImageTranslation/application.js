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
			this.css("background-color", "rgba(0,0,0, 0.5)");
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

	// Initialize the ovelay window size to its parent/grid size
	$("#grid .proj").mouseenter(function() {
		imageAnimator.setOverlaySize.call($(this));
	}).trigger('mouseenter');

	/***
	 *** Use to understand Image transformations //vs background posiiton/size
	 *** NOTE: change the selector with "#grid .proj .imageT" to ".image .proj. image"
	 ***       to activate the code
	 ***/

	// Zoom image
	$('#grid .proj .imageT').mouseenter(function(event) {
		// The scale3d doesn't work for the image translation
		// and zooming purposes. When you do a scale3d transform,
		// the image will zoom in or out, but you can't get to
		// the very edges of the image that were "scaled" out.
		// With the background-size, you can change the scale
		// factor by setting the longest side to a percent factor
		// and then setting the shorter side to auto. This works
		// quite well.

		//// Using scale3d transform
		//var scalestr = "scale3d(1.50, 1.50, 1)";
		//$(this).css("-webkit-transform", scalestr);

		//// Using background-size scaling
		if ($(this).hasClass('tall')) {
			$(this).css("background-size", "150% auto");
		} else {
			$(this).css("background-size", "auto 150%");
		}
	});
	// Unzoom image
	$('#grid .proj .imageT').mouseleave(function(event) {
		//// Using scale3d transform
		//var scalestr = "scale3d(1.0, 1.0 ,1)";
		//$(this).css("-webkit-transform", scalestr);

		//// Using background-size scaling
		if ($(this).hasClass('tall')) {
			$(this).css("background-size", "100% auto");
		} else {
			$(this).css("background-size", "auto 100%");
		}
	});

	function computeLocation(obj,event) {
		var xper = 0, yper = 0,
		    width = $(obj).width(), height = $(obj).height(),
			xorig = $(obj).position().left, yorig = $(obj).position().top,
			x = event.pageX - $(obj).offset().left + xorig,
			y = event.pageY - $(obj).offset().top + yorig;

		if (x <= width)
			xper = x/width*100;
		if (y <= height)
			yper = y/height*100;
		return {"xper":xper.toFixed(0), "yper":yper.toFixed(0),
			    "width":width.toFixed(0), "height":height.toFixed(0),
				"xorig":xorig.toFixed(0), "yorig":yorig.toFixed(0)};
	}

	// Get image size in image hover
	function reportElement(obj,event) {
		var loc = computeLocation(obj,event),
			posstr = "xorig=" +loc.xorig+ " yorig=" +loc.yorig;
			sizestr = "Image Size: " +loc.width+ " x " +loc.height,

		$('#work #log').text("Cursor Position x:" +loc.xper+ " y:" +loc.yper +", x:"+obj.x+" y:"+obj.y);
		$('#work #imgSize').text(sizestr +" - "+ posstr);
	}

	// Get mouse position in image and move image according to mouse position
	//$('#grid .proj .imageT').mousemove(function(event) {
	$('#grid .proj .image').click(function(event) {
		var loc = computeLocation(this,event),
		    posstr = loc.xper+"% " + loc.yper+"%";
		// Move with background-position
		$(this).css('background-position', posstr);
		$('#work #movePercent').text("Move Percent x:" +loc.xper+ "% y:" +loc.yper+"%");


		//// Moving with translate3d, again, is not what we want for our portfolio
		//// functionality. It moves image origin around, not the contentes within
		//// the image.

		// Or move with translate3d
		//var transtr = 'translate3d('+loc.xper+'%, '+loc.yper+'%, 0)';
		//$(this).css("-webkit-transform", transtr);
	});

	$('#grid .proj .image').mouseenter(function(event) {
		reportElement(this,event);
		//console.log("reporting on window position and size from mouseenter");
	});
	$('#grid .proj .image').mouseleave(function(event) {
		reportElement(that,event);
		console.log("reporting on window position and size from mouseleave");
	});
	//$('#grid .proj .image').mousemove(function(event) {
	$('#grid .proj .image').click(function(event) {
		reportElement(this,event);
		//console.log("reporting on window position and size from mousemove");
	});

	/***
	 *** Use to test for Portfolio functionality
	 ***/

	function hoverin(event) {
		var xoff = event.data.xoff,
	        yoff = event.data.yoff,
	        zoom = event.data.zoom;

		imageAnimator.zoomtran.call($(this).find('.image'), xoff, yoff, zoom);
		/*imageAnimator.displayOverlay.call($(this).find('a.overlay'), true);
		imageAnimator.setFontSize.call($(this).find('a.overlay h2'), 1.5);
		imageAnimator.setFontSize.call($(this).find('a.overlay h4'), 1.0);
		imageAnimator.centerOverlayTitle.call($(this).find('.description'));*/
	}
	function hoverout(event) {
		var xoff = event.data.xoff,
	        yoff = event.data.yoff,
	        zoom = event.data.zoom;

		imageAnimator.zoomtran.call($(this).find('.image'), xoff, yoff, zoom);
		/*imageAnimator.setFontSize.call($(this).find('a.overlay h2'), 1.0);
		imageAnimator.setFontSize.call($(this).find('a.overlay h4'), 0.7);
		imageAnimator.displayOverlay.call($(this).find('a.overlay'), false);*/
	}
	
	// General image affine translation
	$("#grid .proj").on('mouseleave',outdata,hoverout).trigger('mouseleave');

	// Image specific affine translations
	//indata = {xoff:'55',yoff:'10',zoom:'1.5'};
	indata = {xoff:'50',yoff:'70',zoom:'150'};
	outdata2 = {xoff:'50',yoff:'0',zoom:'100'};
	$("#grid #image1").on('mouseenter',indata,hoverin).on('mouseleave',outdata2,hoverout).trigger('mouseleave');

	indata = {xoff:'50',yoff:'100',zoom:'150'};
	outdata2 = {xoff:'0',yoff:'0',zoom:'100'};
	$("#grid #image2").on('mouseenter',indata,hoverin).on('mouseleave',outdata2,hoverout).trigger('mouseleave');

	//$("#grid #shoppinglist").on('mouseenter',indata,hoverin);
	$("#grid #shoppinglist").on('mouseenter',function(event) {
		var indata = {xoff:'0',yoff:'0',zoom:'1.0'};
		$(this).find('.image').css('background-position', '0 0');
		event.data = indata;
		hoverin.call($(this),event);
	});
	$("#grid #shoppinglist").on('mouseleave',function(event) {
		$(this).find('.image').css('background-position', '90% 0');
		event.data = outdata;
		hoverout.call($(this),event);
	});
});

