$(function() {
    FastClick.attach(document.body);
});

// L2oad in sound clips
var click1 = new Audio("/sounds/click.wav");
var wobble1 = new Audio("/sounds/wobble.wav");
var complete1 = new Audio("/sounds/complete.wav");

// After 2 seconds remove these classes so that the slider no longer wobbles
setTimeout(function(){
	$( ".swiper-container" ).removeClass("animated bounce"); 
},2000)

// Set up the Slider and then animate yolks color based on index of the slider
var mySwiper = new Swiper('.swiper-container',{
	centeredSlides: true,
	slidesPerView: 'auto',
	createPagination: true,
	initialSlide: 2,
	onSlideChangeStart: function(){
		click1.play();	
	},
	onTouchEnd: function(){
		var activeSlide = mySwiper.activeIndex
				
		$( "#amount" ).html( activeSlide);
		
		var yolkColor = $("#eggWrapper .yolkColor"),
			startButton = $(".startButton");
		
		if (activeSlide == 0) {
			yolkColor.animate({backgroundColor: "#ff6600"}, 600);
			$(".gloss").fadeTo( 600 , 0.9)
			//startButton.animate({backgroundColor: "#ff6600"}, 600);
		} 
		else if (activeSlide == 1) {
			yolkColor.animate({backgroundColor: "#ff9900"}, 600);
			$(".gloss").fadeTo( 600 , 0.7)
			//startButton.animate({backgroundColor: "#ff9900"}, 600);
		} 
		else if (activeSlide == 2) {
			yolkColor.animate({backgroundColor: "#ffcc33"}, 600);
			$(".gloss").fadeTo( 600 , 0.5)
			//startButton.animate({backgroundColor: "#ffcc33"}, 600);
		}
		else if (activeSlide == 3) {
			yolkColor.animate({backgroundColor: "#ffe092"}, 600);
			$(".gloss").fadeTo( 600 , 0)
			//startButton.animate({backgroundColor: "#ffe092"}, 600);
		}
		else {
			yolkColor.animate({backgroundColor: "#bfb29f"}, 600);
			$(".gloss").fadeTo( 600 , 0)
			//startButton.animate({backgroundColor: "#bfb29f"}, 600);
		};
	}
})

// Based on the sliders value, what must happen when the "Get Cracking" button is clicked	
function getCracking() {	
	click1.play();

	$("#eggWrapper").fadeOut(1000);
	
	var value = $( "#amount" ).html();
		
	$(".flip-container").addClass("hover"); 
	$( "#sliderWrapper" ).fadeOut("slow");
	$(".hardnessWrapper").fadeIn("slow");
	$("#eggWrapperActive .gloss").fadeTo(100, 1);
		
	if ( value == 0 ){
		$(".hardnessWrapper").attr("id", "soft");
		$("#eggWrapperActive .yolkColor").addClass("softFade");	
		$(".time").attr("id", "countdown1");
		countdown("countdown1", 0, 3);
		$("#eggWrapperActive .gloss").fadeOut(3000)
	}
	else if ( value == 1 ){
		$(".hardnessWrapper").attr("id", "softMedium");
		$("#eggWrapperActive .yolkColor").addClass("softMediumFade")
		$(".time").attr("id", "countdown2");
		countdown("countdown2", 6, 30);
		$("#eggWrapperActive .gloss").fadeOut(300000)
	}
	else if ( value == 2 ){
		$(".hardnessWrapper").attr("id", "medium");
		$("#eggWrapperActive .yolkColor").addClass("mediumFade")
		$(".time").attr("id", "countdown3");
		countdown("countdown3", 7, 30);
		$("#eggWrapperActive .gloss").fadeOut(300000)
	}
	else if ( value == 3 ){
		$(".hardnessWrapper").attr("id", "mediumHard");
		$("#eggWrapperActive .yolkColor").addClass("mediumHardFade")
		$(".time").attr("id", "countdown4");
		countdown("countdown4", 8, 30);
		$("#eggWrapperActive .gloss").fadeOut(300000)
	}
	else {
		$(".hardnessWrapper").attr("id", "hard");
		$("#eggWrapperActive .yolkColor").addClass("hardFade")
		$(".time").attr("id", "countdown5");
		countdown("countdown5", 0, 10);
		$("#eggWrapperActive .gloss").fadeOut(8000)
	};
	
};
		
// Start countdown timer
function countdown( elementName, minutes, seconds )
{
	var element, endTime, hours, mins, msLeft, time;

	function twoDigits(n)
	{
		return (n <= 9 ? "0" + n : n);
	}

	function updateTimer()
	{
		msLeft = endTime - (+new Date);
		
		//when timer has run down to 0:00		
		if ( msLeft < 1000 ) {
						
			element.innerHTML = "0:00";
			
			wobble1.play();
			setTimeout(function(){
				$("#eggWrapperActive").addClass("shake");
			}, 500);
			
			setTimeout(function(){
				complete1.play();
				navigator.vibrate(300);
				$("#popup").addClass("bounceIn");
				
			},1500)
			
		}
		else {
			time = new Date( msLeft );
			hours = time.getUTCHours();
			mins = time.getUTCMinutes();
			element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
			clock = setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
		}
	}

	element = document.getElementById( elementName );
	endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
	updateTimer();
	
	// Cancel the active countdown
	$(".cancelButton").click(function(){
		click1.play();
		
		$("#eggWrapper").fadeIn(1000);
		
		// Stop the timer in its tracks
		$(".flip-container").removeClass("hover") 
		
		clearTimeout(clock);
		
		$( ".hardnessWrapper" ).fadeOut("slow");
		$( "#sliderWrapper" ).fadeIn("slow");
				
		setTimeout(function(){
			$( "#popup" ).fadeOut("slow").removeClass("bounceIn");
			$( ".yolkColor" ).removeClass("softFade softMediumFade mediumFade mediumHardFade hardFade");
		},1100)
	});
	
	// Time's Up --- Now do this when clicking "Done"
	$(".closeAll").click(function(){
		click1.play(); 
		$(".flip-container").removeClass("hover") ;
		
		clearTimeout(clock);
		
		$("#eggWrapper").fadeIn(1000);
		$( ".hardnessWrapper" ).fadeOut("slow");
		$( "#eggWrapperActive" ).removeClass( "shake" );
		$( "#sliderWrapper" ).fadeIn("slow");
		
		setTimeout(function(){
			$( "#popup" ).fadeOut("slow").removeClass("bounceIn");
			$( ".yolkColor" ).removeClass( "softFade softMediumFade mediumFade mediumHardFade hardFade" );
		},1100)
		
		
	});
	
};


