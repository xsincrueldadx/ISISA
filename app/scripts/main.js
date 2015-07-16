/* jshint smarttabs:true */
/* global $, aload, google */

// Dinamic Height
function calcutaleHeight(element) {
	'use strict';
	var windowHeight = $(window).height();
	var finalHeight = windowHeight - $('header').height();
	$(element).height(finalHeight);
}

// Loader
function loader() {
	'use strict';
	$('#preloader').delay(900).fadeOut('slow');
	$('body').delay(900).css({ overflow: 'visible' });
}

// Google maps api.
function initialize() {
	'use strict';
	// set options.
	var mapOptions = { zoom: 17, center: new google.maps.LatLng(-34.5539039, -58.5273) };
	// set map.
	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	// set marker.
	var marker = new google.maps.Marker({ position: map.getCenter(), map: map, title: 'ISISA Insumos y Servicios Industriales' });
	// set content data.
	var contentString = '<div id="contentInfoWindow"><h1><em>ISI</em>SA Insumos y Servicios Industriales S.A.</h1><div id="bodyContent"><p>La Nueva (Calle 70) 1348/54</p><p>Villa Zagala, San Martín.</p><p>Provincia de Buenos Aires, Argentina.</p><p>011 4753-5757</p></div></div>';
	// set infowindow
	var infowindow = new google.maps.InfoWindow({ content: contentString });
	// add event listener
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});
}

// Initialize google Maps
google.maps.event.addDomListener(window, 'load', initialize);

// Load event
$(window).load(function() {
	'use strict';
	loader();
	aload();
	calcutaleHeight('.full-height');
});

// Document ready
$(document).ready(function() {
	'use strict';
	// resize
	$(window).resize(function() { calcutaleHeight('.full-height'); });
	// videos
	$('#content_video').fitVids();
	// anchor navigation
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({ scrollTop: target.offset().top }, 1000);
				return false;
			}
		}
	});
	// menu
	$('#nav-icon').click(function(event) {
		event.preventDefault();
		$(this).toggleClass('open');
		$('.menu').toggleClass('open animated fadeIn');
	});
	// mas info.
	$('.btn_plus').click(function(event) {
		event.preventDefault();
		var target = $(this).attr('href');
		//console.log(target);
		$(target).toggleClass('visible animated slideInUp');
		if($(target).hasClass('visible')){
			$('html, body').stop().animate({'scrollTop': $(target).prev().offset().top + $(target).outerHeight()}, 400);
		}
	});
	// bxslider config
	$('.bxslider').bxSlider({ mode: 'horizontal', pager: true });
	// map overlay
	$('.map_overlay').click(function() {
		$(this).addClass('hide');
	});
});
