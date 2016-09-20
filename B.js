function Core ( opt, fn ) {
	return function () {
		if ( opt.pre ) {
			opt.pre( function () {
				if ( opt.validate && opt.validate() ) {
					opt.error();
				} else {
					fn();
				}
				opt.after();
			} );
		} else if ( opt.validate && opt.validate() ) {
			opt.error();
		} else {
			fn();
		}
	}
}



var pre = function ( next ) {}
var after = function ( next ) {}
var validate = function ( next ) {}

var config = {
	pre : pre,
	after : after,
	validate : validate
}

var cfg = config.extend( config, { validate : validate } );


var b1 = Core( cfg, function () { /*do something*/ } );
var b2 = Core( {}, function () { /*do something*/ } );
var b3 = Core( {}, function () { /*do something*/ } );
var b4 = Core( {}, function () { /*do something*/ } );
