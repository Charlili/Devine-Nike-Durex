fallback.load({
	jQuery: [
		'//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
		'js/vendor/jquery/dist/jquery.min.js'
	],
	'easeljs': [
		'//cdnjs.cloudflare.com/ajax/libs/EaselJS/0.8.0/easeljs.min.js',
		'js/vendor/easeljs/lib/easeljs-0.8.0.min.js'
	],
	'webfont': [
		'://ajax.googleapis.com/ajax/libs/webfont/1.5.6/webfont.js',
		'js/vendor/webfontloader/webfontloader.js'
	]
}, {
	shim: {
		'easeljs': ['jQuery']
	}
});

fallback.ready(function(){

	init();

});
var nav = [];
var pixels;
function init(){

	var Validator = require('./classes/Validator.js');
	new Validator($('.inschrijf_form'));
	
	$('nav li').each(function(index,link){

		var a = link.querySelector('a');
		nav.push(a.getAttribute('href'));
		$(link).removeClass('active');
		if('#' + window.location.href.split('#').pop() == $(a).attr('href')){
			$(link).addClass('active');
		};
	});

	$('nav a').click(linkClick);
	$('video').click(playVideo);

	var helper = document.createElement('p');
	helper.innerText = "Klik om de video volledige te bekijken.";
	helper.classList.add('helper');

	setTimeout(function(){
			$('video').parent().append(helper);
		}, 2000
	);

	share();	

}
function playVideo(e){
	console.log(e.currentTarget);
	var video = e.currentTarget;
	if(video.paused){
		video.currentTime = 3.5;
		video.play();
		//$('.helper').text("Klik om te pauzeren.");
		$('.helper').css('display','none');
	}else {
		video.pause();
		//$('.helper').text("Klik om af te spelen.");
	}
}
function linkClick(e){
	e.preventDefault();
	nav.forEach(function(link){
		//console.log(link);
		if(e.currentTarget.getAttribute('href') == link){
			clicked(e.currentTarget);
			history.pushState(null,null,link);
			pixels = 1230 * nav.indexOf(link) + 1;
		}
	});

	console.log('clicked');
	$('.pages').animate(
		{scrollLeft: pixels}
		,500);
}
function clicked(link){
	$('nav li').removeClass('active');
	$(link).parent().addClass('active');
}
function share(){
		var a = $(".delen");
		a.click(function(event){
			event.preventDefault();
			window.open('https://www.facebook.com/sharer/sharer.php?u=student.howest.be/charlotte.vanroelen/20142015/MAIII/COLLAB/#marathon', 'fbShareWindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 275) + ', left=' + ($(window).width() / 2 - 225) + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
        	return false;
		});
	}
