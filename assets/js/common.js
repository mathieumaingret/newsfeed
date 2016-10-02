$(document).ready(function(){

	var body = $('body'),
		section = $('#mainContent');

	var progress = $('#progress'),
		progression = 0;

	var overlay = $('#overlay'),
		overlayCurrent = $('#overlay-current'),
		overlayMax = $('#overlay-max');

	var feedNb;

	var navItems = [],
		navList = $('#mainNavigation-list'),
		currentNavItem;

	var search = $('#search');

	var feedLoadingTimer;


	function init() {

		getDatas();

		search.keyup(function(){
			feedSearch();
		});
	};

	init();


	function getDatas() {

		$.ajax({

			type: "GET",
			url: "datas/datas.xml",

			success: function(xml) {
				feedNb = $(xml).find('channel > item').length;
				$(overlayMax).html(feedNb);
				getPosts();
			}
		});
	};

	function addMenuItem(type) {

		// Add type
		if (-1 == $.inArray(type, navItems)) {
			navList.append(
				$('<li/>', {
					'text': type,
					'data-type': type,
					'class': 'accordion-item'
				})
			);
			navList.append(
				$('<ul/>', {
					'class': 'accordion-content'
				})
			);
			navItems.push(type);
		}
		// Add current item
		navList.find('li[data-type="'+type+'"]').append(currentNavItem);
	};

	function updateWaiter() {
		$(progress).css('width', progression / feedNb * 100 + '%');	
		$(overlayCurrent).html(progression);
		$(overlay).append(
			$('<p/>', {
				'class': 'overlay-text',
				text: currentNavItem
			})
		);
	}


	function getPosts() {

		feedLoadingTimer = setTimeout(function() {
			stopWaiting();
		}, 1000);

		for (var feedID = 0; feedID < feedNb; feedID++) {

			$.ajax( {
				type: "GET",
				url: "app/getFeedDatas.php",
				cache: false,
				data: { feedID : feedID },

				success: function(result) {

					if (result) {

						currentNavItem = $(result).find('h2 > a').eq(0).html();
						section.append(result);

						var type = $(result).data('type');
						addMenuItem(type);

						progression++;

						updateWaiter();

						if (progression == feedNb) {
							stopWaiting();
						}

					}
				},
				error: function(result) {
					console.log('Erreur pour le feed n ' + feedID);
				}
			});
		};
	};


	function stopWaiting() {
		body.addClass('is-available');
		menuHandler();
	};


	function menuHandler() {

		$(navList).find('li').click(function() {

			var type = $(this).data('type');

			if ('all' != type) {
				section.find('.section-account').removeClass('is-visible');
				section.find('.section-account[data-type="'+type+'"]').addClass('is-visible');
			} else {
				section.find('.section-account').addClass('is-visible');
			}
		});
	};


	function feedSearch() {

		var value = search.val();

		for (var i = 0, l = $('.section-account.is-visible').length; i < l; i++) {

			var account = $('.section-account.is-visible').eq(i);

			if (-1 !== account.text().toLowerCase().search(value.toLowerCase())) {
				account.addClass('is-visible');
			} else {
				account.removeClass('is-visible');
			}
		};
	};

});