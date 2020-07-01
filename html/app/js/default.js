'use strict';
var Home = function () {

	let shopCatalog = function () {
		let $itemsGallery = $('.product-gallery');

		if ($itemsGallery.length) {
			$.each($itemsGallery, function () {
				let that = $(this),
					imageItem = that.find('.gallery-item');

				that.on('afterChange', function (event, slick, currentSlide) {
					let slide = slick.$slides.get(currentSlide),
						item = $(slide).find('.gallery-item');

					switchImage(item);
				});

				if (imageItem.length > 0) {
					that.slick({
						slidesToShow: 4,
						slidesToScroll: 1,
						autoplay: false,
						arrows: true,
						dots: false,
						prevArrow: '<a class="slick-prev"><i class="fa fa-long-arrow-alt-left"></i></a>',
						nextArrow: '<a class="slick-next"><i class="fa fa-long-arrow-alt-right"></i></a>',
						adaptiveHeight: true
					});
				}

				imageItem.on("click", function (e) {
					e.preventDefault();
					let that = $(this);

					switchImage(that);
				});
			});
		}

		$('.catalog-nav').on('click', '> a', function (e) {
			e.preventDefault();
			let that = $(this);
			that.addClass('active').siblings().removeClass('active');
		})
	}

	function switchImage(image, zoom_size) {
		var that = image,
			target = that.closest('.product').find('.product-image'),
			newSrc = that.attr('href'),
			$zoom = 250;

		if (zoom_size !== undefined) {
			$zoom = zoom_size;
		}

		if (that.data('source') == 'image') {
			const zoomId = that.data('zoom-id');
			target.html('<a id="' + zoomId + '" class="MagicZoom" rel="preload-selectors-small:false;preload-selectors-big:false;initialize-on:mouseover;smoothing-speed:70;fps:40;selectors-effect:false;show-title:false;loading-msg:Загрузка...;background-opacity:10;zoom-width:' + $zoom + ';zoom-height:' + $zoom + ';zoom-distance:5;hint-text:;selectors-class:current;buttons:hide;caption-source:span;" ' +
				'href="' + newSrc + '"><img src="' + newSrc + '"/></a>').promise().done(function () {
					target.removeClass('image-preview--loading');
					target.find('img').fadeIn('fast');
				});
		};
	}

	return {
		init: function () {
			shopCatalog();
		}
	};
}();

$(document).ready(function ($) {
	Home.init();
});