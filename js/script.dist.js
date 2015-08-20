(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./classes/Validator.js":2}],2:[function(require,module,exports){
module.exports = (function(){


	function Validator($formEl) {
		this.$form = $formEl;
        //console.log(this.$form);
		

        this.$form.find('.form_naam').on("blur keyup", this.checkNaam.bind($('.form_naam')));
        this.$form.find('.form_email').on("blur keyup", this.checkEmail.bind($('.form_email')));
        this.$form.find('.form_adres').on("blur keyup", this.checkAdres.bind($('.form_adres')));
        this.$form.find('.form_postcode').on("blur keyup", this.checkPostcode.bind($('.form_postcode')));
        this.$form.submit(this.finalCheck.bind(this));

	}
	 
	Validator.prototype.finalCheck = function(event){
        event.preventDefault();
        var flag = true;
        this.checkFilledIn();
        //console.log(this.$form.find("span"));
        this.$form.find("span").each(function(index,el){
            //console.log($(el));
            //Wanneer er geen show wordt gevonden in de classattribuut, geeft indexof -1 terug.
            //console.log(el);
            if(el.getAttribute("class").indexOf("show") != -1) {
                    flag = false;
            }
        });
        //console.log(flag);
        if(!flag){
            return false;
        }else{
            $.post('#praktisch',this.$form.serialize()).success(successHandler).fail(failHandler);

        }
        
	};
	function successHandler(data){
        
        if($(data).find('.error.box').text() !== "" ){
            var error = $(data).find('.form_email').next().text();
            $('.form_email').next().text(error);
            $('.form_email').next().addClass('show');

        }else{
            $('.spelen_email').val($('.form_email').val());
            $('.info.box').text('Registratie voltooid!');
            window.location.href = '#spelen';
        }

    }
    function failHandler(data){
        console.log('fail');
        $('.error.box').text('Registratie mislukt!');

    } 
	Validator.prototype.checkFilledIn = function(e){
        //console.log(this);
        var $el = this.$form.find('input');
        if($el.val().length < 2){
                showInvalid($el, $el.next(), "Vul het invulveld in.");
        }else{
                showValid($el, $el.next());
        }
	};
	 
	Validator.prototype.checkTwoWords = function(e){
        var $el = $(this);
        if($el.val().split(" ").length < 2){
                showInvalid($el, $el.next(), "Gebruik tenminste 2 woorden.");
        }else{
                showValid($el, $el.next());
        }
	};

    Validator.prototype.checkNaam = function(e){
        var $el = $(this);
        if($el.val().split(" ").length < 2){
                showInvalid($el, $el.next(), "Vul een voornaam en achternaam in.");
        }else{
                showValid($el, $el.next());
        }
    };
	
    Validator.prototype.checkAdres = function(e){
        var $el = $(this);
        var regex = new RegExp('^[A-Za-z0-9.+-]+ +[0-9]{1,7}$');
 
        if(regex.test($el.val())){
                showValid($el, $el.next());
        }else{
                showInvalid($el, $el.next(), "Vul een straatnaam en nummer in.");
        }
    };

	Validator.prototype.checkEmail = function(e){
        
        var $el = $(this);
        var regex = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$');
 
        if(regex.test($el.val())){
                showValid($el, $el.next());
        }else{
                showInvalid($el, $el.next(), "Gebruik een echt email-adres.");
        }
	};

    Validator.prototype.checkPostcode = function(e){
        var $el = $(this);
        if($el.val().length != 4){
                showInvalid($el, $el.next(), "Gebruik een postcode van 4 cijfers");
        }else{
                showValid($el, $el.next());
        }
    };
	 
	function showValid($el, $error){
        $error.removeClass("show");
	}
	 
	function showInvalid($el, $error, message){
        $error.addClass("show");
        $error.text(message);
	}

	
	return Validator;
})();
},{}]},{},[1])


//# sourceMappingURL=script.dist.js.map