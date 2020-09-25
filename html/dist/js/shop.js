'use strict';

var mzOptions = {
	textHoverZoomHint: '',
	textClickZoomHint: '',
	textExpandHint: 'Увеличить',
	textBtnClose: 'Закрыть',
	textBtnPrev: 'Назад',
	textBtnNext: 'Вперед'
};

var Shop = function () {
	let isMobile = false;

	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

	var inputCounter = function () {
		$('body').on('click', '.btn-number', function (e) {
			e.preventDefault();

			var self = $(this),
				fieldName = self.attr('data-field'),
				type = self.attr('data-type'),
				input = $("input[name='" + fieldName + "']"),
				currentVal = parseInt(input.val().split(" ")[0]);

			if (!isNaN(currentVal)) {
				var unit = '';
				if (input.data('unit')) unit = input.data('unit');
				if (type === 'minus') {
					self.closest('.input-counter').find('.btn-plus').attr('disabled', false);
					if (currentVal > input.attr('data-min')) {
						input.val(currentVal - input.data('step') + "" + unit).change();
					}
				} else if (type === 'plus') {
					self.closest('.input-counter').find('.btn-minus').attr('disabled', false);
					if (currentVal < input.attr('data-max')) {
						input.val(currentVal + input.data('step') + "" + unit).change();
					}
				}
				CheckMaxQuantity(input);

			} else {
				input.val(0);
			}
		});
	};

	var shopCatalog = function () {
		$('.categories').on('click', 'a', function (e) {
			if($(this).parent('li').hasClass('has-child')){
				e.preventDefault();
				var that = $(this),
				target = that.closest('.has-child');

				target.toggleClass('active');
				target.siblings('.has-child').removeClass('active');
				console.log('child');
			}
		})
	};

	var productQuickBuy = function () {
		$('.quick-buy').on('click', function (e) {
			e.preventDefault();
			$('#modal_quickbuy').modal({ show: true });
		});
	}

	var productPreview = function () {
		$('body').on('click', '.product .link-preview', function (e) {
			e.preventDefault();
			$('.modal-preview').modal('show');
		});

		$('.modal-preview').on('shown.bs.modal', function (e) {
			var gallery = $(this).find('.image-list:not(.slick-slider)');
			if (gallery.length) {
				productGallery(gallery);
			}
			else {
				$(this).find('.image-list').slick('setPosition');
				$(this).find('.product-images').addClass('opened');
			}
		});
	};

	var productGallery = function (gallery) {
		var isVertical = false,
			showSlide = 3,
			imageItem = $('body').find('.image-list .item a');

		imageItem.on("click", function (e) {
			e.preventDefault();
			var that = $(this),
				zoom_size = that.parent('.item').data('zoom-size');

			if (!that.closest('.item').hasClass('current'))
				switchImage(that, zoom_size);
		});


		if (gallery === undefined) {
			gallery = $('#product-gallery').find('.image-list');
			showSlide = 3;
		}

		if (gallery.data('direction') === "row")
			isVertical = false;

		if (gallery.length > 0) {

			gallery.on('init', function (event, slick) {
				gallery.find('.slick-cloned .item > a').each(function () {
					$(this).removeAttr('data-zoom-id');
				})
			});

			gallery.on('afterChange', function (event, slick, currentSlide) {
				let slide = slick.$slides.get(currentSlide),
					item = $(slide).find('.item'),
					zoom_size = $(item).data('zoom-size');

				switchImage(item.find('a'), zoom_size);
			});

			gallery.slick({
				slidesToShow: showSlide,
				slidesToScroll: 1,
				autoplay: false,
				prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left"></i></a>',
				nextArrow: '<a class="slick-next"><i class="fa fa-angle-right"></i></a>',
				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 3
						}
					},
					{
						breakpoint: 478,
						settings: {
							slidesToShow: 3
						}
					}
				]
			});
		};
	};

	function CheckMaxQuantity(el) {
		if (+(el.val().trim()) > el.attr('data-max')) {
			el.val(el.attr('data-max'));
		}
		if (+(el.val().trim()) < el.attr('data-min')) {
			el.val(el.attr('data-min'));
		}

		if (parseInt(el.val()) >= el.attr('data-max')) {
			el.parent().find('.btn-plus').attr('disabled', true);
		} else {
			el.parent().find('.btn-plus').removeAttr('disabled');
		}

		if (parseInt(el.val()) <= el.attr('data-min')) {
			el.parent().find('.btn-minus').attr('disabled', true);
		} else {
			el.parent().find('.btn-minus').removeAttr('disabled');
		}
	};

	function switchImage(image, zoom_size) {
		var that = image,
			target = that.closest('.product-images').find('.image-preview'),
			newSrc = that.attr('href'),
			$zoom = 450;

		if (zoom_size !== undefined) {
			$zoom = zoom_size;
		}

		that.closest('.image-list').find('.item').removeClass("current");
		that.parent().addClass("current");

		target.removeClass('image-preview--init').addClass('image-preview--loading');
		target.html('');

		if (that.data('source') == 'image') {
			const zoomId = that.data('zoom-id');
			target.html('<a id="' + zoomId + '" class="MagicZoom" rel="preload-selectors-small:false;preload-selectors-big:false;initialize-on:mouseover;smoothing-speed:70;fps:40;selectors-effect:false;show-title:false;loading-msg:Загрузка...;background-opacity:10;zoom-width:' + $zoom + ';zoom-height:' + $zoom + ';zoom-distance:5;hint-text:;selectors-class:current;buttons:hide;caption-source:span;" ' +
				'href="' + newSrc + '"><img src="' + newSrc + '"/></a>').promise().done(function () {
					target.removeClass('image-preview--loading');
					target.find('img').fadeIn('fast');
				});

			MagicZoom.refresh(zoomId);
		};
	}

	var productFilters = function () {

		$('.filter-list__list').on('click', 'a', function (e) {
			e.preventDefault();
			$(this).closest('li').toggleClass('active');
		});

		var filterRange = document.querySelectorAll('.filter-slider');
		if (filterRange != undefined) {
			Array.prototype.forEach.call(filterRange, function (elements, index) {
				var slider = elements.querySelectorAll('.slider-range')[0];
				var inputNumberMin = elements.querySelectorAll('.input-number-min')[0];
				var inputNumberMax = elements.querySelectorAll('.input-number-max')[0];

				var minValue = parseInt(slider.getAttribute('data-min-value'));
				var maxValue = parseInt(slider.getAttribute('data-max-value'));

				noUiSlider.create(slider, {
					start: [inputNumberMin.value, inputNumberMax.value],
					connect: true,
					range: {
						'min': minValue,
						'max': maxValue
					}
				});

				slider.noUiSlider.on('update', function (values, handle) {
					var value = values[handle];
					if (handle) {
						inputNumberMax.value = Math.round(value);
					} else {
						inputNumberMin.value = Math.round(value);
					}
				});

				inputNumberMin.addEventListener('change', function () {
					slider.noUiSlider.set([this.value, null]);
				});

				inputNumberMax.addEventListener('change', function () {
					slider.noUiSlider.set([null, this.value]);
				});

				$('.filter-slider__clear').on('click', function (e) {
					e.preventDefault();

					slider.noUiSlider.set([minValue, maxValue]);
				});
			});
		}
	};

	var productSingle = function () {

		if (!isMobile) {
			$('.btn-share').popover({
				placement: 'bottom',
				trigger: 'hover',
				html: true,
				container: '.btn-share',
				content: function () {
					return $('.shares-popup').html();
				}
			});
		} else {
			$('.btn-share').on('click', function () {
				$('.shares-popup').toggleClass('active');
			});
		}
	}

	var cart = function () {
		$('.cart-item__options').on('click', '.prop-change', function (e) {
			e.preventDefault();
			var that = $(this);
			that.closest('.prop').toggleClass('prop--opened');
		});
		$(document).mouseup(function (e) {
			var container = $(".prop-popup");

			if (!container.is(e.target) && container.has(e.target).length === 0) {
				$(".prop").removeClass('prop--opened');
			}
		});
	}

	var wishList = function () {
		$('.wish').on('click', '.btn-wish', function (e) {
			e.preventDefault();
			var that = $(this);
			that.closest('.grid-batons__props').toggleClass('grid-batons__props--opened');
		});
		$(document).mouseup(function (e) {
			var container = $(".prop-popup");

			if (!container.is(e.target) && container.has(e.target).length === 0) {
				$(".grid-batons__props").removeClass('grid-batons__props--opened');
			}
		});
	}

	var compareList = function () {
		var $page = $('.compare'),
			$cursor = $('.compare-cursor'),
			$products = $('.compare-list .compare-item');

		if ($products.length > 0) {
			$page.addClass('lazy-load');
			$products.each(function () {
				var $item = $(this);
				$item.find(".compare-values .value").each(function () {
					var that = $(this),
						maxHeight = that.height(),
						h = that.css('height', 'auto').height(),
						i = that.index();

					maxHeight = maxHeight > h ? maxHeight : h;


					const sideCellHeight = $(".compare-side .value:eq(" + i + ")").height();
					if (sideCellHeight > maxHeight)
						maxHeight = sideCellHeight;

					$('.val-' + (i + 1)).height(maxHeight);
					$(".compare-side .value:eq(" + i + ")").height(maxHeight);
				});
			}).promise().done(function () {
				const ps = new PerfectScrollbar('.compare-list', {
					wheelSpeed: 2,
					wheelPropagation: true,
					minScrollbarLength: 20,
					suppressScrollY: true,
					useBothWheelAxes: true
				});
				ps.update();

				setTimeout(function () {
					$page.removeClass('lazy-load').addClass('loaded');
				}, 500);
			});

			$('.compare-values .value').mouseenter(function () {
				var that = $(this),
					indx = that.index(),
					$vals = $('.val-' + (indx + 1)),
					self = $vals[1],
					h = self.offsetHeight;

				$vals.addClass('active');
				$cursor.addClass('active').css({
					'height': h,
					'top': self.offsetTop + 1
				});

			}).mouseleave(function () {
				$('.compare-values .value.active').removeClass('active');
				$cursor.removeClass('active');
			});
		}
	}

	var productCarousel = function () {
		$('.viewed-list, .recommend-list').slick({
			slidesToShow: 5,
			slidesToScroll: 5,
			autoplay: false,
			prevArrow: '<a class="slick-prev"><i class="fa fa-long-arrow-left"></i></a>',
			nextArrow: '<a class="slick-next"><i class="fa fa-long-arrow-right"></i></a>',
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 478,
					settings: {
						slidesToShow: 2
					}
				}
			]
		});
	}

	var orderHistory = function () {
		$('.order-history').on('click', '.order-number', function (e) {
			e.preventDefault();
			var order = $(this).closest('.order-item');

			order.toggleClass('opened');
			order.next('.order-details').toggleClass('opened');
		})
	}

	return {
		init: function () {
			inputCounter();
			shopCatalog();
			productQuickBuy();
			productPreview();
			productGallery();
			productFilters();
			productSingle();
			cart();
			wishList();
			compareList();
			productCarousel();
			orderHistory();
		}
	};
}();

function autocomplete(inp, arr) {
	var currentFocus;
	if (!inp)
		return false;

	inp.addEventListener("input", function (e) {
		var a, b, i, val = this.value, counter = 0;
		closeAllLists();
		if (!val) { return false; }
		currentFocus = -1;
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		this.parentNode.appendChild(a);
		for (i = 0; i < arr.length; i++) {
			if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				b = document.createElement("DIV");
				b.innerHTML = `<i class="appicon appicon-search"></i><strong>${arr[i].substr(0, val.length)}</strong>`;
				b.innerHTML += arr[i].substr(val.length);
				b.innerHTML += `<input type="hidden" value="${arr[i]}">`;
				b.addEventListener("click", function (e) {
					inp.value = this.getElementsByTagName("input")[0].value;
					closeAllLists();
				});
				a.appendChild(b);
				counter++;
			}
		}
		if (counter == 0) {
			b = document.createElement("DIV");
			b.setAttribute("class", "autocomplete-items__nothing-found");
			b.innerHTML = `Ничего не найдено`;
			a.appendChild(b);
		}
	});
	inp.addEventListener("keydown", function (e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
			currentFocus++;
			addActive(x);
		} else if (e.keyCode == 38) {
			currentFocus--;
			addActive(x);
		} else if (e.keyCode == 13) {
			e.preventDefault();
			if (currentFocus > -1) {
				if (x) x[currentFocus].click();
			}
		}
	});
	function addActive(x) {
		if (!x) return false;
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}
	function closeAllLists(elmnt) {
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	}
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}

$(document).ready(function ($) {
	Shop.init();
});