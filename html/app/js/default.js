'use strict';
var Home = function () {
	var initNavi = function () {
		$(".toggle-dd").on('click', function (e) {
			e.preventDefault();
			var $item = $(this).closest('.dd-item');
			$item.toggleClass('active').siblings().removeClass('active');
		});
		$(document).click(function (event) {
			if (!$(event.target).closest('.dd-item').length) {
				$('.dd-item').removeClass('active');
			}
		});

		$('.link-katalog > a').on('click', function (e) {
			e.preventDefault();
			window.location.href = 'https://fabrikakart.ru/katalog';
		});
	}

	var scrolling = function () {
		$(window).on('scroll', function () {
			var scroll = $(window).scrollTop(),
				mainHeader = $('#header'),
				mainHeaderHeight = mainHeader.innerHeight();

			if (scroll > 500) {
				$('#scroll-top').addClass('shown')
			} else {
				$('#scroll-top').removeClass('shown')
			}
		});
		$('#scroll-top').on('click', function (e) {
			e.preventDefault();
			$("html, body").animate({ scrollTop: 0 }, 250);
		});

	};

	let shopCatalog = function () {
		let $itemsGallery = $('.product-gallery'),
			imageItems = $itemsGallery.find('.gallery-item');

		imageItems.hover(function () {
			let that = $(this);
			switchImage(that);
		});

		imageItems.on("click", function (e) {
			e.preventDefault();
			let that = $(this);

			switchImage(that);
		});

		if ($itemsGallery.length) {
			$.each($itemsGallery, function () {
				let gallery = $(this),
					items = gallery.find('.gallery-item');

				gallery.on('afterChange', function (event, slick, currentSlide) {
					let slide = slick.$slides.get(currentSlide),
						item = $(slide).find('.gallery-item');

					switchImage(item);
				});

				if (items.length > 4) {
					gallery.slick({
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

		that.closest('.product-gallery').find('.gallery-item').removeClass("current");
		that.addClass("current");

		if (that.data('source') == 'image') {
			const zoomId = that.data('zoom-id');
			target.html('<a id="' + zoomId + '" class="MagicZoom" rel="preload-selectors-small:false;preload-selectors-big:false;initialize-on:mouseover;smoothing-speed:70;fps:40;selectors-effect:false;show-title:false;loading-msg:Загрузка...;background-opacity:10;zoom-width:' + $zoom + ';zoom-height:' + $zoom + ';zoom-distance:5;hint-text:;selectors-class:current;buttons:hide;caption-source:span;" ' +
				'href="' + newSrc + '"><img src="' + newSrc + '"/></a>').promise().done(function () {
					target.removeClass('image-preview--loading');
					target.find('img').fadeIn('fast');
				});
		};
	}

	var specialList = function () {
		$('.special-list').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			arrows: false,
			dots: true,
			prevArrow: '<a class="slick-prev"><i class="fa fa-long-arrow-alt-left"></i></a>',
			nextArrow: '<a class="slick-next"><i class="fa fa-long-arrow-alt-right"></i></a>',
			adaptiveHeight: true
		});
	}

	var digits = function () {
		var $stat = $(".stat-count");
		if ($stat.length > 0) {
			function count($this) {
				var current = parseInt($this.html(), 10);
				current = current + 1;

				$this.html(++current);
				if (current > $this.data('count')) {
					$this.html($this.data('count'));
				} else {
					setTimeout(function () { count($this) }, 50);
				}
			}

			$stat.each(function () {
				$(this).data('count', parseInt($(this).html(), 10));
				$(this).html('0');
				count($(this));
			});
		}
	}

	return {
		init: function () {
			initNavi();
			scrolling();
			shopCatalog();
			specialList();
			digits();
		}
	};
}();

$(document).ready(function ($) {
	Home.init();
});

var swiper = new Swiper('.products', {
	slidesPerView: 4,
	loop: true,
	centeredSlides: true,
	centeredSlidesBounds: true,
	scrollbar: {
		el: '.swiper-scrollbar',
		hide: false,
		draggable: false,
		dragSize: 42
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	mousewheel: true
});