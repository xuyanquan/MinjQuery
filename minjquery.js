var $ = function(selector, context) {
	return new jQuery(selector, context);
}, jQuery = function(selector, context) {

	if (selector instanceof jQuery)
		return selector;

	this._this = jQuery.isString(selector) ? jQuery.select[jQuery
			.check(selector)](selector, context) : selector;

	if (jQuery.isLikeArray(this._this))
		return new jQuery.Array(this._this);

}
jQuery.prototype = {
	click : function(fn) {
		if(jQuery.isNull(fn))
			this._this.onclick();
		else
			this._this.onclick = fn;
		return this;
	},
	change : function(fn) {
		if(jQuery.isNull(fn)){
			this._this.onpropertychange();
			this._this.oninput();
		}else
			this._this.onpropertychange = this._this.oninput = fn;
		return this;
	},
	blur : function(fn){
		this._this.onblur = fn;
		return this;
	},
	focus : function(fn){
		this._this.onfocus = fn;
		return this;
	},
	css : function(key, val) {
		if (this._this === document || this._this === document.body
				|| this._this === document.documentElement) {
			if (!jQuery.isNull(val))
				this._this[key] = val.replace('px', '');

			return this;
		}

		if (jQuery.isObject(key)) {
			var obj = {};
			for ( var n in key)
				obj[jQuery.styleName(n)] = key[n];
			jQuery.extend(this._this.style, obj);
			return this;
		}

		if (jQuery.isNull(val)) {
			return window.getComputedStyle ? window.getComputedStyle(
					this._this, null)[key] : this._this.currentStyle[key];
		}

		this._this.style[jQuery.styleName(key)] = val;

		return this;
	},
	parent : function() {
		return $(this._this.parentNode);
	},
	data : function(key, val) {
		// 数据缓存
		this._this.var_cache = this._this.var_cache || {};

		if (jQuery.isNull(val))
			return this._this.var_cache[key];
		this._this.var_cache[key] = val;
		return this;
	},
	hover : function(over, out) {
		this._this.onmouseover = over;
		this._this.onmouseout = out || new Function();
		return this;
	},
	mouseover : function(over) {
		this._this.onmouseover = over;
		return this;
	},
	hide : function(time, callback) {
		if (!jQuery.isNull(this.data('timer'))) {
			clearInterval(this.data('timer'));
			this.data('timer', undefined);
		}
		if (jQuery.isNull(time))
			return this.css('display', 'none');
		var t = time, now = t, _this = this;
		t = Math.pow(t, 5);
		var timer = setInterval(function() {
			if (now < 10) {
				_this.css({
					'opacity' : 0,
					'filter' : 'alpha(opacity=0)',
					'-moz-opacity' : 0,
					'display' : 'none'
				});
				if (callback)
					callback.call(_this);
				return clearInterval(timer);
			}
			var step = Math.pow(now, 5) / t;
			_this.css({
				'opacity' : step,
				'filter' : 'alpha(opacity=' + Math.floor(step * 100) + ')',
				'-moz-opacity' : step
			});
			now -= 10;
		}, 10);
		_this.data('timer', timer);
		return this;
	},
	show : function(time, callback) {
		if (!jQuery.isNull(this.data('timer'))) {
			clearInterval(this.data('timer'));
			this.data('timer', undefined);
		}
		if (jQuery.isNull(time))
			return this.css({
				'opacity' : 1,
				'filter' : 'alpha(opacity=100)',
				'-moz-opacity' : 1,
				'display' : 'block'
			});
		var t = time, now = t, _this = this;
		t = Math.pow(t, 5);
		_this.css({
			'opacity' : 0,
			'filter' : 'alpha(opacity=0)',
			'-moz-opacity' : 0,
			'display' : 'block'
		});
		var timer = setInterval(function() {
			if (now < 10) {
				_this.css({
					'opacity' : 1,
					'filter' : 'alpha(opacity=100)',
					'-moz-opacity' : 1
				});
				if (callback)
					callback.call(_this);
				return clearInterval(timer);
			}
			var step = 1 - Math.pow(now, 5) / t;
			_this.css({
				'opacity' : step,
				'filter' : 'alpha(opacity=' + Math.floor(step * 100) + ')',
				'-moz-opacity' : step
			});
			now -= 10;
		}, 10);
		_this.data('timer', timer);
		return this;
	},
	stop : function() {
		if (!jQuery.isNull(this.data('animate'))
				&& this.data('animate').length != 0) {
			for ( var i = 0; i < this.data('animate').length; i++) {
				clearInterval(this.data('animate')[i]);
			}
		}
		this.data('animate', []);
	},
	animate : function(param, time, callback) {
		this.stop();
		time = time == 'slow' ? 800 : (time == 'normal' ? '600'
				: (time == 'fast' ? 400 : time || 600));
		var _this = this;
		for (p in param)
			(function(p, param) {
				var pre = parseInt((_this._this === document.body ? document.body[p]
						+ 'px'
						: (_this._this === document.documentElement ? document.documentElement[p]
								+ 'px'
								: (_this.css(p)))
								|| '0px').split('px').shift());
				var end = param;
				var temp = end - pre;
				var now = time;
				var i = _this.data('animate').length;
				time = Math.pow(time, 5);
				_this.data('animate')[i] = setInterval(function() {
					if (now < 10) {
						_this.css(p, end + 'px');
						return clearInterval(_this.data('animate')[i]);
					}
					var step = temp * (Math.pow(now, 5) / time);
					_this.css(p, end - step + 'px');
					now -= 10;
				}, 10);
			})(p, param[p]);
		if (!jQuery.isNull(callback))
			setTimeout(callback, time);
		return this;
	},
	children : function(selector) {
		return $(selector, this._this);		
	},
	addClass : function(name) {
		if (this.hasClass(name))
			return this;
		name = jQuery.trim(this.attr('class') + ' ' + name);

		return this.attr('class', name), this;
	},
	removeClass : function(name) {
		var class_names = this.attr('class').split(' ');
		var new_names = [];
		for ( var i = 0; i < class_names.length; i++)
			if (class_names[i] !== name)
				new_names.push(class_names[i]);

		name = jQuery.trim(new_names.join(' '));
		this.attr('class', name);

		return this;
	},
	hasClass : function(name) {
		var class_names = this.attr('class').split(' ');
		for ( var i = 0; i < class_names.length; i++)
			if (class_names[i] === name)
				return true;
		return false;
	},
	attr : function(key, value) {
		if (jQuery.isNull(value))
			return this._this.getAttribute(key) || '';
		return this._this.setAttribute(key, value), this;
	},
	removeAttr : function(attr) {
		if (!jQuery.isNull(attr))
			this._this.removeAttribute(attr);
		return this;
	},
	html : function(val) {
		if (!jQuery.isNull(val)) {
			this._this.innerHTML = val;
			return this;
		}
		return this._this.innerHTML;
	},
	val : function(value){
		if (!jQuery.isNull(value)){
			this._this.value = value;
			return this;
		}
		return this._this.value;
	}
}
jQuery.isString = function(str) {
	return typeof str === 'string';
}
jQuery.isID = function(str) {
	return str.indexOf('#') == 0;
}
jQuery.isClass = function(str) {
	return str.indexOf('.') == 0;
}
jQuery.isNull = function(e) {
	return typeof e === 'undefined';
}
jQuery.isObject = function(obj) {
	return typeof obj === 'object';
}
jQuery.trim = function(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}// 去除两边字符串空格
// 判断是否类数组
jQuery.isLikeArray = function(obj) {
	return !!obj.length;
}
jQuery.each = function(arr, fn) {
	for ( var i = 0; i < arr.length; i++)
		if (arr[i])
			fn.call(arr[i]);
}
jQuery.extend = function(target, source) {
	if (jQuery.isObject(target) && jQuery.isObject(source)) {
		for ( var key in source)
			target[key] = source[key];
	} else {
		throw 'extend function require param error';
	}
}
jQuery.styleName = function(key) {// css属性字符串转换
	if (key.indexOf('-') == 0)
		return key;// html5属性前缀直接返回 -webkit
	if (key.indexOf('-') > -1) {
		key = key.split('-');
		for ( var i = 1; i < key.length; i++) {
			key[i] = key[i].substring(0, 1).toUpperCase() + key[i].substring(1);
		}
		key = key.join('');
	}
	return key;
}
jQuery.check = function(select) {
	if(select.split(' ').length > 1)
		return 'find';//寻找选择 #test .test div
	if(jQuery.isClass(select))
		return 'class';//class寻找
	if (select.indexOf(',') > -1)
		return 'arr'; // 多个选择
	return jQuery.isID(select) ? 'id' : 'tag'; // id 标签分别
}
jQuery.select = {
	'id' : function(id) {
		return document.getElementById(id.replace('#', ''));
	},
	'tag' : function(tag, context) {
		context = context || document;
		return context.getElementsByTagName(tag);
	},
	'arr' : function(select) {
		select = select.replace(' ', '');
		var tmp = [], selectors = select.split(',');
		for ( var i = 0; i < selectors.length; i++)
			tmp.push($(selectors[i]));

		return tmp;
	},
	'class' : function(select, context) {
		select = select.replace('.', '');
		context = context || document;
		var tmp = context.getElementsByTagName('*');
		var re = [];
		for (var i = 0; i < tmp.length ; i++ )
		{
			if($(tmp[i]).hasClass(select)) {
				re.push(tmp[i]);
			}
		}
		return re;
	},
	'find' : function(select){
		var split = select.split(' ');
		var re = $(split[0]);
		for(var i = 1; i < split.length; i++){
			re = re.children(split[i]);
		}
		return re;
	}
}
jQuery.Array = function(selector) {
	if (selector instanceof jQuery.Array)
		return selector;

	this._this = selector;
	for ( var i = 0; i < this._this.length; i++) {
		this[i] = this._this[i];
	}
	this.length = this._this.length;
}
jQuery.each([ 'click', 'css', 'hover', 'mouseover', 'addClass', 'removeClass',
		'animate' ], function() {
	var fn_name = this + '';
	jQuery.Array.prototype[fn_name] = function() {
		for ( var i = 0; i < this._this.length; i++)
			jQuery.prototype[fn_name].apply($(this._this[i]), arguments);
		return this;
	}
});
jQuery.extend(jQuery.Array.prototype, {
	size : function() {
		return this._this.length;
	},
	eq : function(i) {
		return $(this._this[i]);
	},
	filter : function(className) {
		var tmp = [];
		for ( var i = 0; i < this._this.length; i++)
			if ($(this._this[i]).hasClass(className))
				tmp.push(this._this[i]);
		return $(tmp);
	},
	not : function(className) {
		var tmp = [];
		for ( var i = 0; i < this._this.length; i++)
			if (!$(this._this[i]).hasClass(className))
				tmp.push(this._this[i]);
		return $(tmp);
	},
	each : function(fn) {
		for ( var i = 0; i < this._this.length; i++)
			fn.call(this._this[i], i);
		return this;
	},
	first : function() {
		return $(this._this[0]);
	},
	children : function(selector) {
		var re = [];
		for( var i = 0; i < this._this.length; i++){
			re.concat($(this._this[i]).children(selector)._this);
		}
		return $(re);
	}
});
jQuery.ajax = function(url, callback){
	var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	xmlhttp.onreadystatechange=function()
	  {
	  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			var data = eval('(' + xmlhttp.responseText + ')');
			callback(data);
		}
	  }
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}