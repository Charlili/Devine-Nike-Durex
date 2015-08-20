module.exports = (function(){
	
	function Hero(image) {
		this.initialize(image);
	}
	Hero.prototype = new createjs.Bitmap();

	// save the original initialize-method so it won't be gone after
	// overwriting it
	Hero.prototype.Bitmap_initialize = Hero.prototype.initialize;

	// initialize the object
	Hero.prototype.initialize = function (image) {
		
		this.velocity = {x:0,y:12};
		this.Bitmap_initialize(image);
		this.name = 'Hero';
		this.snapToPixel = true;
	};

	// we will call this function every frame to 
	Hero.prototype.tick = function () {
		this.velocity.y += 1;
		this.y += this.velocity.y;
	};

	// this will reset the position of the hero
	// we can call this e.g. whenever a key is pressed
	Hero.prototype.reset = function() {
		this.x = getWidth() / 2;
		this.y = getHeight() / 1.25;
		this.velocity.y = -15;
	};

	function getWidth() {
		if( typeof( window.innerWidth ) == 'number' ) {
		return window.innerWidth;
		} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		return document.documentElement.clientWidth;
		} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		return document.body.clientWidth;
		}
	}

	function getHeight() {
		if( typeof( window.innerWidth ) == 'number' ) {
		return window.innerHeight;
		} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		return document.documentElement.clientHeight;
		} else if( document.body && ( document.body.clientHeight || document.body.clientHeight ) ) {
		return document.body.clientHeight;
		}
	}	
	return Hero;
})();