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