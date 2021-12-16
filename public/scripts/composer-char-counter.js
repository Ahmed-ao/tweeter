$(document).ready(function () {
	$('#tweet-text').keyup(function (event) {
		$('#counter').text(140 - $(this).val().length);
		var x = $(this).val().length;
		if (x > 140) {
			$('#counter').css('color', 'red');
			$(this).css('border', '1px solid red');
		} else if (x === 0) {
			$('#submit').css('disabled');
		} else {
			$('#counter').css('color', 'black');
			$(this).css('border', '1px solid ');
		}
	});
});
