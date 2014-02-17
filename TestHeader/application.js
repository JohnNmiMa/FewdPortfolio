
$(document).ready(function() {

	$("section .navigator #workbtn").click(function() {
		$("section#experience").css('display', 'none');
		$("section#work").css('display', 'block');
	}).trigger('click');
	$("section .navigator #expbtn").click(function() {
		$("section#work").css('display', 'none');
		$("section#experience").css('display', 'block');
	});
});

