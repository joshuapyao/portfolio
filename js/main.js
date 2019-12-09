$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload() 
    }
});

jQuery(document).ready(function($){

	// handles outside clicking for dropdown menu
	$(document).click(function(event) {
		$target = $(event.target);
		if(!$target.closest('.dd-menu').length && $('.dd-menu').height() > 399) {
			$('.dd-menu').css({'height':''});
			$('.dd-menu div').fadeOut(100);
		}  
	});

	// resize elements on window resize
	$(window).resize(function() {
		if ($('.article')[0]) {
			var width = $('.container').width();
			if (width > 1400) {
				width = 1400;
			}
			$('.header-image').css({'width': width + 'px'});
			$('.header-image').css({'margin-left': -width/2 + 'px'});
			var height = width/2;
			$('.article').css({'padding-bottom' : height + 100 + 'px'});
			$('.container').clearQueue();
			$('.container').animate({'top': height + 30 + 'px'}, 600);
			if($(window).width() < 768) {
				$('.feature-block div').css({'height': '300px'});
			} else {
				$('.feature-block div').css({'height': '500px'});
			}
		} else {
			resizeHoverText();
		}
	});

	// parallaxing effect
	$(window).scroll(function(){
		if ($('.article')[0]) {
			var fromTop = $(window).scrollTop();
			var imageMax = 1400;
			if (fromTop < imageMax) {
				$('.header-image').css({'top': fromTop/8 + "px"});
				$('.header-image').css({'opacity': (imageMax - (fromTop*1.7)) * (1 / imageMax) });
			} else {
				$('.header-image').css({'opacity': "0"});
			}
    	}
	});

	// a scroll events at the index-level: splash screen scroll, fade in for visuals
	var lastScrollTop = 0;
	$(window).scroll(function(event){

		// only scroll down on high-level indexing
		if ($('body').has('.logo-menu')){

			// scrolling on the hero image
			var st = $(this).scrollTop();
				if ($(document).scrollTop() < 10) {

					if ($('#visuals-slide').has('.active')) {
						$(".fade1").hide();
						$(".fade2").hide();
						$(".fade3").hide();
					}

					if (st > lastScrollTop){
						scrollDown();

						// show items underneath hero in visuals page
						if ($('#visuals-slide').has('.active')) {
							$(".fade1").fadeIn(1000);
							$(".fade2").fadeIn(2000);
							$(".fade3").fadeIn(3000);
						}
					}
				}
			lastScrollTop = st;

		}

	});
	
	$("#moonlight").animate({'opacity': 0}, 300, function() {
		$(this).html(titles[counter] + ".").animate({'opacity': 1}, 300);
	});

	// slide up onload
	if (!$(".article")[0]) {
		slideUp();
		resizeHoverText();
	} else {
		setColors();
		setSizing();
		AOS.init();
	}

	// smooth scroll for mobile
	$('a[href*="#"]:not([href="#"])').click(function() {
	if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
			$('html, body').animate({
  				scrollTop: target.offset().top
			}, 1000);
			return false;
			}
	}
	});
	
	// handles underlines in navigation and also scrolls up, but only on index page, also resets down cta
	$(".row p span").click(function(event) {
		$('.dd-menu').css({'height':''});
		$('.dd-menu div').fadeOut(100);
		if ($(this).is('#portfo')) {
			$('html, body').animate({ scrollTop: $("#landing-page").outerHeight(true) });
		} else {
			$('html, body').animate({ scrollTop: "0" });
		}
		$(".row p span").removeClass("underline");
		$(".row p span .subtext").removeClass("underline");
		$(event.target).addClass('underline');
		$(event.target.querySelector('.subtext')).addClass('underline');
	});

	// handles the beginning words
	var titles = ["a video editor", "a photographer", "TIME's Person of the Year 2006", "former Youngest Person in the World", "a bubble-tea addict", "a dog owner", "a gamer", "a Pan-Asia traveler", "a logo designer", "a programmer", "an extreme foodie"];
	titles = shuffle(titles);
	var counter = 0;
	var inst = setInterval(change, 1700);
	function change() {
		$("#moonlight").animate({'opacity': 0}, 300, function() {
			$(this).html(titles[counter] + ".").animate({'opacity': 1}, 300);
		});
		counter++;
		if (counter >= titles.length) {
			counter = 0;
			titles = shuffle(titles);
		}
	}

	// handles table of contents scrolling in an art piece
	$(document).on('click', '.nav', function() {
		var link = $(this).attr('href');
		var idLocation = $('#' + link).offset().top;
		$('.carousel-inner').animate({ scrollTop: idLocation});
	});

	// handles highlight in pieces
	$(window).on("scroll", function(){
	  highlight();
	});

	$(".down").on('click', function() {
		$('html,body').animate({
        scrollTop: $("#overview").offset().top},
        'slow');
	});

	$(".up").on('click', function() {
		$('html,body').animate({
        scrollTop: 0},
        'slow');
	});

	function highlight(){
	  var scroll = $(window).scrollTop();
	  var height = $(window).height();
	  $(".highlight").each(function(){
	    var pos = $(this).offset().top;
	    if (scroll+height >= pos) {
	      $(this).addClass("active");
	    } else {
	    	$(this).removeClass('active');
	    }
	  });
	}  


	var played = false;
	// reset video about page click, if video has been played already, increase playback speed
	$("#about").click(function(){
		$(".large-caption").hide();
		$('.about-hero .down-cta').css({'bottom': '-200px'});
		video = document.getElementById("aboutVideo");
		video.pause();
		if (played) {
			video.currentTime = 1.6;
		} else {
			video.currentTime = 0;
			played = true;
		}
		video.play();
	});

	// show aboutMe near when video finishes playing
	$('#aboutVideo').on('ended',function(){
	  	$(".large-caption").fadeIn(500);
	  	$('.about-hero .down-cta').animate({bottom: 0}, 600);
    });

	// fade in various elements on visuals
	$("#visuals").click(function() {
		$('.visual-hero .down-cta').css({'bottom': '-200px'});
		$(".large-caption").hide();
		$('.visual-hero .down-cta').animate({bottom: 0}, 600);
		$(".large-caption").fadeIn(500);
	});

	// slide in portfolio elements
	$("#portfo").click(function() {
		$('#landing-page .down-cta').css({'bottom': '-200px'});
		slideUp();
	});

	function slideUp() {
		$("#splash-text").hide();
		$("#splash-text").fadeIn(1400);
		$('#landing-page .down-cta').animate({bottom: 0}, 600);
	}

	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}
});

function openPage(pageName, elmnt) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  $('.tabcontent').fadeOut(100);

  // Remove the background color of all tablinks/buttons
  var color = $(".article").data("color");
  $('.tablink').css({'font-weight': '400'});
  $('.tablink').css({'color':'inherit'});

  // Show the specific tab content
  setTimeout(
	  function() {
		  $("#" + pageName).fadeIn(300);
	}, 100);

  // Add the specific color to the button used to open the tab content and pause all videos on the leaving page
	elmnt.style.fontWeight = '700';
	elmnt.style.color = color;
	if (pageName == 'Final') {
		$('#tab-selector').animate({left: '20%'}, 200);
		
		// pause all on Process and play all on Final
		$("#Final video").each(function() {
			if ($(this).get(0).autoplay == true) {
				$(this).get(0).play();
			}
		});
		$("#Process video").each(function() {
			$(this).get(0).pause();
		});
	} else {
		$('#tab-selector').animate({left: '50%'}, 200);
				
		// pause all on Final and play all on Process
		$("#Process video").each(function() {
			if ($(this).get(0).autoplay == true) {
				$(this).get(0).play();
			}
		});
		$("#Final video").each(function() {
			$(this).get(0).pause();
		});
		
	}

	// scroll to near top if not already there
	if ($(window).scrollTop() > $('.header-image').outerHeight()) {
		$('html,body').animate({
			scrollTop: $('.container').offset().top - 40},
			'slow');
	}
}

// Get the element with id="defaultOpen" and click on it
if ($('.article')[0]) {
	document.getElementById("defaultOpen").click();
}

function openProcess() {
	document.getElementById("process-btn").click();
}

function scrollDown() {
	$('html, body').animate({
		scrollTop: $('#landing-page').height()
  }, 400);
}

function setColors() {
	var color = $(".article").data("color");
	var background = $(".article").data("background");
	$('.highlight').css({"background-image":"linear-gradient(to right,#fff 50%,"+color+"66 50%)"});
	$('.article').css({'background':'linear-gradient('+background+' 100vh,'+background+","+color+')'});
	$('.article strong').css({'color':color});
	$('.strong-underline').css({'background-color':color});
	$('.detailed h2').css({'color':color});
	$('.detailed h1').css({'color':color});
	$('.headliner').css({'color':color});
	$('.prototype').css({'background-color': background});
	$('#tab-selector').css({'background-color': color});
}

function setSizing() {
	var width = $('.container').width();
	if (width > 1400) {
		width = 1400;
	}
	$('.header-image').css({'width': width + 'px'});
	$('.header-image').css({'margin-left': -width/2 + 'px'});
	var height = width/2;
	$('.header-image').css({"top": -height+"px"});
	$('.header-image').animate({top: '0px' }, 600);
	$('.goback').animate({top: '5%'}, 600);
	$('.article').css({'padding-bottom' : height + 100 + 'px'});
	$('.container').animate({'top': height + 30 + 'px'}, 600);

	if($(window).width() < 768) {
		$('.feature-block div').css({'height': '300px'});
	} else {
		$('.feature-block div').css({'height': '500px'});
	}

}

function openPiece(link, piece) {

	// lock everything in place
	$('#works').css({'height': $('#portfolio').outerHeight() - $('#portfolio .statement').outerHeight(true) - $('#works').outerHeight()});
	console.log($('#works').height());
	$($('#works').children('.entry').get().reverse()).each(function () {
    	$(this).css({
			'-webkit-transition': 'none',
			'-moz-transition' : 'none',
			'transition': 'none',
			'width': $(this).width(),
    		'position' : 'absolute',
    		'left': $(this).position().left,
			'top': $(this).position().top
    	})
	});

	// make selected block invisible
	$(piece).children('img').css({
		'pointer-events':'none'
	});
	$(piece).css({
		'z-index':'9999',
		'max-width': 'none',
		'margin': '0'
	});
	$("#logo-menu").animate({
		'top':'-5em'
	}, {duration:400});
	$(piece).children('span').fadeTo(100, 0);
	$(piece).animate({
		left: $(window).width()/2 - $(piece).outerWidth()/2,
		top: $(window).height()/2 - $(piece).outerHeight()/2 + $(document).scrollTop()
	}, {duration:200, complete: function(){
		$(piece).children('img').fadeTo(400, 0);
		$(piece).animate({
			'height': $('.carousel-inner')[0].scrollHeight,
			'width':'100vw',
			'left':'0',
			'top': '0'
		}, {duration:400, complete:function(){
			setTimeout(function() {
				window.location.href = link;
			  }, 400);
		}});
	}, queue: false});
	// hide the footer
	$('.footer').height(0);
}
function resizeHoverText() {
	var targetW = $('.entry').width();
	$('.hover-text').css({'font-size': targetW*0.1});
	$('.hover-text .hover-subtitle').css({'font-size': targetW*0.03});
}
function openMenu() {
	$('.dd-menu').height('28em');
	$('.dd-menu div').fadeIn(300);
}