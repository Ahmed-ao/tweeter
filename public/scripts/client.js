const renderTweets = function (tweets) {
	if (!tweets) return;
	if (typeof tweets === 'object' && tweets.length > 0) {
		tweets.map((tweet) => {
			$('#tweets-container').prepend(createTweetElement(tweet));
		});
	}
	jQuery('time.timeago').timeago();
};

const createTweetElement = function (tweet) {
	if (!tweet) return;
	if (typeof tweet === 'object') {
		let $tweet = `
		<article>
			<div>
				<span id="name">
					<img src="${tweet.user.avatars}" alt="account picture" />
					<span>
					${tweet.user.name}
					</span>
				</span>
				<h4>
				</h4>
				<h4 id="tag">${tweet.user.handle}</h4>
				</div>
			<h3>${escapeMe(tweet.content.text)}</h3>
			<time class="timeago" style="color:#d3d3d3" datetime="2008-07-17T09:24:17Z"></time>
			
			<footer>
				<span><i class="fas fa-flag"></i></span>
				<span><i class="fas fa-retweet"></i></span>
				<span><i class="fas fa-heart"></i></span>	
			</footer>
		</article>`;
		return $tweet;
	}
};
// Post Data
// FIXME
$('#submit').on('click', function (event) {
	const len = $('#tweet-text').val().length;

	if (len > 140) {
		$('#error')
			.css('	display', 'block')
			.slideDown('slow	', function () {
				console.log('Done!');
			});
		event.preventDefault();
	}
	if (len <= 0) {
		$('#warn')
			.css('display', 'block')
			.slideDown('slow', function () {
				console.log('Done!');
			});
		event.preventDefault();
	}
	$.ajaxSetup({
		cache: false,
	});
	if (len >= 1 && len <= 140) {
		$('#warn').css('display', 'none');
		$('#error').css('display', 'none');
		$.ajax({
			type: 'POST',
			url: '/tweets/',
			data: $('#tweet-text').serialize(),
			success: function (data) {
				$('#tweets-container').append(data);
				$('#tweet-text').val('');
				location.reload();
			},
			error: function (err) {
				console.log(err);
			},
		});
		event.preventDefault();
	}
});
// Load Data
$(document).ready(function () {
	$.ajax({
		type: 'GET',
		url: '/tweets/',
		success: function (data) {
			renderTweets(data);
		},
		error: function () {},
	});
});
// Escaping
const escapeMe = function (str) {
	let div = document.createElement('div');
	div.appendChild(document.createTextNode(str));
	return div.innerHTML;
};

jQuery(document).ready(function () {
	jQuery('time.timeago').timeago();
});
