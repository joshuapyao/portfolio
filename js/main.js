var is_mobile = false;
var currentPage = "loading";


jQuery(document).ready(function($){

	setSizing();

	// resize elements on window resize
	$(window).resize(function() {
		if ($('.article')[0]) {
			setSizing();
		} else {
			resizeHoverText();
		}
	});

	// handles scroll to next page on bottom of page
	window.addEventListener('wheel', function(event) {
		if ($('.scroll-more').css('opacity') == '1') {
			if (currentPage != 'loading') {
				// detect if it is a scroll down
				if (event.deltaY > 0) {
					console.log(currentPage);
					if (currentPage == 'Overview') {
						document.getElementById("process-btn").click();
						currentPage = 'loading';
					} else if (currentPage == 'Process') {
						document.getElementById("final-btn").click();
					}
				}
			}
		}
	});

	// parallaxing effect and shadow on nav and container (also all scroll listeners)
	$(window).scroll(function(){
		var fromTop = $(document).scrollTop();
		var docHeight = $(document).height() - $(window).height();
		var imageMax = 1400;
		var pieceNav = $('.piece-nav').offset().top;
		if (fromTop < imageMax) {
			$('.header-image').css({
				'top': fromTop/8 + "px",
				'opacity': (imageMax - (fromTop*1.7)) * (1 / imageMax)
			});
		} else {
			$('.header-image').css({'opacity': "0"});
		}

		if (fromTop >= $('.container').offset().top - 50) {
			$('body').css({'background-color':'#fefefe'});
		} else {
			var bg = $(".article").data("background");
			$('body').css({'background-color': bg});
		}

		if (fromTop >= (pieceNav-25)) {
			$('.piece-nav').css({'box-shadow':'0px 4px 6px -6px #888'});
			$('.tablink').css({'font-size':'0.8em'});
			$('#tab-selector').css({'height':'6px'});
			$('#tab-progress').css({'height':'6px'});
			$('.close-btn').css({'top': '10px'});
		} else {
			$('.piece-nav').css({'box-shadow':'none'});
			$('.tablink').css({'font-size':'0.9em'});
			$('#tab-selector').css({'height':'10px'});
			$('#tab-progress').css({'height':'10px'});
			$('.close-btn').css({'top':'5%'});
		}

		if (fromTop >= (pieceNav/2-pieceNav/3)) {
			$('.container').css({'box-shadow':'0px 2px 60px rgba(0,0,0,0.35'});
		} else {
			$('.container').css({'box-shadow':'0px 2px 6px rgba(0,0,0,0.25'});
		}
		//handles tab progress
		var scrolled = (fromTop / docHeight) * 100;
		$('#tab-progress').css({'width': scrolled + "%"});

		// triggers autoplay video (works for only 1 for now)
		if ($('.autoplay').is(":visible")) {
			var vidFromTop = $('.autoplay').offset().top;
			var vidHeight = $('.autoplay').height();
			if(fromTop >= vidFromTop - 300 && fromTop < vidFromTop + vidHeight + 50) {
				if($('.autoplay').get(0).currentTime < 8) {
					$('.autoplay').get(0).play();
				}
			} else {
				$('.autoplay').get(0).pause();
				$('.autoplay').get(0).currentTime = 0;
			}
		}

		// handles zoom
		if (!is_mobile && $('.zoom').is(":visible")) {
			var zoomBox = $(".zoom:visible")[0];
			var zoomBoxSpacer = $(zoomBox).parent()[0];
			var zoomBoxText = $(zoomBox).find('.zoom-subtitle')[0];
			var startOffset = $(zoomBoxSpacer).offset().top - 100;
			var track = $(zoomBoxSpacer).innerHeight();
			if (fromTop >= startOffset && fromTop < startOffset + track - $(zoomBox).height()) {

				//scroll animations here
				var scrollDist = (fromTop-startOffset) / (track - $(zoomBox).height()) * 100;
				if ($('#aws-final').is(":visible")) {
					if (scrollDist <= 33) {
						$(zoomBox).css({
							'background-size': 120 - (20 * scrollDist/33) + "%",
							'background-position': 50 - (50*scrollDist/33) +"% " + 80 - (80*scrollDist/33) + "%"
						});
						$(zoomBoxText).css({'opacity':'0'});
					} else if (scrollDist > 33 && scrollDist < 50) {
						$(zoomBoxText).text('Visually manage clouds.');
						$(zoomBoxText).css({
							'right': '2%',
							'left':'auto',
							'top': '20%',
							'opacity': (scrollDist - 33) / 7
						});
					} else if (scrollDist >= 50 && scrollDist <= 80) {
						$(zoomBox).css({
							'background-size': 100 + (10 * (scrollDist-50)/30) + "%",
							'background-position': (-400 * (scrollDist-50)/30) + "% " + (60 * (scrollDist-50)/30) + "%" 
						});
						$(zoomBoxText).text('Visually manage clouds.');
						$(zoomBoxText).css({
							'right': '2%',
							'left':'auto',
							'top': '20%',
							'opacity': 1 - ((scrollDist-50)/10)
						});
					} else if (scrollDist > 80) {
						$(zoomBoxText).text('Explore, design, and build your architecture all in one place.');
						$(zoomBoxText).css({
							'right': 'auto',
							'left': '4%',
							'opacity': (scrollDist-80)/8
						});
					}
				}
				if ($('#swype-final').is(":visible")) {
					if (scrollDist <= 30) {
						$(zoomBoxText).text('A card that surpasses the wallet.');
						$(zoomBoxText).css({
							'opacity': 1
						});
					} else if (scrollDist > 30 && scrollDist <= 80) {
						$(zoomBox).css({
							'background-size': 150 - (50 * (scrollDist-30)/50) + "%"
						});
						$(zoomBoxText).css({
							'opacity': 1 - (scrollDist - 30) / 20
						});
					} else if (scrollDist > 80) {
						$(zoomBoxText).text('...and integrates in daily flows.');
						$(zoomBoxText).css({
							'opacity': (scrollDist - 80) / 20
						});
					}
				}
			} 
		}

		//handles hiding of toc on large images
		if($('#toc').css('display') == 'block' && $('#Process:visible')) {
			var tocOffset = $('#toc').offset().top + $('#toc').height();
			$('#Process .final-hero').each(function(i, obj) {
				if (tocOffset >= $(obj).offset().top && tocOffset <= $(obj).offset().top + $(obj).height()) {
					$('#toc').css({'opacity': '0.1'});
					return false;
				} else {
					$('#toc').css({'opacity':'1'});
				}
			});
		}
		
	});

	// slide up onload
	setColors();
	AOS.init();

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


});

function openPage(pageName, elmnt) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  $('.tabcontent').fadeOut(100);
  currentPage = 'loading';

  // Remove the background color of all tablinks/buttons
  var color = $(".article").data("color");
  $('.tablink').css({'font-weight': '400'});
  $('.tablink').css({'color':'inherit'});

  // Show the specific tab content
  setTimeout(
	  function() {
		  $("#" + pageName).fadeIn(300);
		  setTimeout(function(){ AOS.refresh(); },300);
	}, 100);

  // Add the specific color to the button used to open the tab content and pause all videos on the leaving page
	elmnt.style.fontWeight = '600';
	//elmnt.style.color = color;
	if (pageName == 'Final') {
		$('#tab-selector').animate({left: '65.2%'}, 200);
		$('.scroll-more').css({'display':'none'});

		// pause all on overview and process and play all on Final
		$("#Final video").each(function() {
			if ($(this).get(0).autoplay == true) {
				$(this).get(0).play();
			}
		});
		$("#Process video").each(function() {
			$(this).get(0).pause();
		});
		$("#Overview video").each(function() {
			$(this).get(0).pause();
		});
	} else if (pageName == 'Process') {
		$('#tab-selector').animate({left: '32.6%'}, 200);
		$('.scroll-more').css({'display':'inherit'});

		// pause all on Final and play all on Process
		$("#Process video").each(function() {
			if ($(this).get(0).autoplay == true) {
				$(this).get(0).play();
			}
		});
		$("#Final video").each(function() {
			$(this).get(0).pause();
		});
		$("#Overview video").each(function() {
			$(this).get(0).pause();
		});
	} else {
		$('#tab-selector').animate({left: '0%'}, 200);
		$('.scroll-more').css({'display':'inherit'});

		$("#Overview video").each(function() {
			if ($(this).get(0).autoplay == true) {
				$(this).get(0).play();
			}
		});
		// pause all
		$("#Final video").each(function() {
			$(this).get(0).pause();
		});
		$("#Process video").each(function() {
			$(this).get(0).pause();
		});
	}
	setTimeout(function(){
		currentPage = pageName;
	},2000);
	// scroll to near top if not already there
	if ($(document).scrollTop() > $('.header-image').outerHeight()) {
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

function openFinal() {
	document.getElementById("final-btn").click();
}

function closeAnimate() {
	var width = $('.container').width();
	if (width > 1400) { width = 1400;}
	var height = width / 2;
	$('.header-image').animate({top: -height+'px', opacity: 0}, 300);
	$('body').css({'background-color': '#fefefe'});
	$('.container').animate({top: $('.container').height(), opacity: 0}, 300);
	$('.close-btn').animate({top: height, opacity: 0}, 300);
	$('.next-tab').animate({
		top: height, 
		opacity: 0
	}, {duration:400, complete:function(){
		setTimeout(function() {
			window.location.href = 'index.html#portfolio';
		}, 300);
	}});
}

function setColors() {
	var color = $(".article").data("color");
	var background = $(".article").data("background");
	$('.highlight').css({"background-image":"linear-gradient(to right,#fff 50%,"+color+"44 50%)"});
	//$('.article strong').css({'color':color});
	//$('.strong-underline').css({'background-color':color});
	$('.left-line').css({'border-color':color});
	//$('.detailed h2').css({'color':color});
	//$('.detailed h1').css({'color':color});
	$('.bg-match').css({'background-color': background});
	$('.headliner').css({'color':color});
	$('.prototype').css({'background-color': background});
	//$('#tab-selector').css({'border-color': color});
	//$('#tab-progress').css({'background-color': color});
}

function setSizing() {
	var width = $('.container').width();
	if (width > 1400) {
		width = 1400;
	}
	$('.header-image').css({'width': width + 'px'});
	$('.header-image').css({'margin-left': -width/2 + 'px'});
	var ratio = width * $('.zoom').data("height") / $('.zoom').data("width");
	$('.zoom').css({'height': ratio});
	var height = width/2;
	$('.header-image').css({"top": -height+"px"});
	$('.header-image').animate({top: '0px' }, 600);
	$('.close-btn').css({"margin-right":$('.container').css("marginRight")});
	$('.article').css({'padding-bottom' : height + 100 + 'px'});
	$('.container').animate({'top': height + 30 + 'px'}, 600);
	$('.container').css({'margin-bottom' : $(window).height()/4});

	if( $('.detailed').css('width')=='90%') {
        is_mobile = true;       
    }
}