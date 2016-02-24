/**
	*@Athor Henry
	*@Date 2013-12-15 19:41
	*@Version 1.0
	*@Date 2013/12/16 15:33
	*@Version 1.1
*/

(function(win, undefined){
	
	var 
		//ID标志
		tagID = /^#/i,

		core_toString = Object.prototype.toString,

		core_slice = Array.prototype.slice,

		jQuery = function(selector){		
			//元素选择构造方法
			return new jQuery.fn.init(selector);
		};

	jQuery.fn = jQuery.prototype = {
		//元素操作方法
		init: function(selector){
			if (tagID.test(selector)){
				this.selector = document.getElementById(selector.split('#').pop());
			}
		},
		constructor : jQuery,
	    version : 1.1,
		val : function(){
			return this.selector.value;
		}
	};

	//原型回挂
	jQuery.fn.init.prototype = jQuery.fn;

	//继承方法的实现，包括jQuery本身静态方法扩展与工具类对象合成方法，jQuery对象方法。
	jQuery.extend = jQuery.fn.extend = function(){
		//克隆方法实现
		var arg = arguments;
		var arg_len = arg.length;
		
		if(arg_len == 1 && typeof(arg[0]) == 'object'){
			//对象本身静态方法扩展
			var target = arg[0];
			for (var key in target)
				if (this[key])
					throw 'exist fn key';
				else
					this[key] = target[key];				
		}else{
			//防止参数错误类型
			for (var i = --arg_len; i > -1; i--)
				if ('object' != typeof arg[i]){
					throw 'extend error...';
					return;
				}
			//多个对象合成方法实现
			var tmp = --arg_len;

			for (i = tmp; i > 0 ; i-- )
				for (var key in arg[tmp])
					arg[0][key] = arg[tmp][key];			
			
			return arg[0];
		} 
	};

	jQuery.extend({
		//jQuery静态方法实现与添加

		//类型检查
		type: function(o){
			if (o === null) {
				return 'null';
			}
			var s = core_toString.call(o);
			var type = s.match(/\[object (.*?)\]/)[1].toLowerCase();
		 
			return type;
		},
		//遍历数组回调函数
		each: function(arr, callback){
			for (var i = arr.length - 1; i > -1; i--){
				//console.log(arr[i]);
				callback.call(arr[i],i,arr[i]);
			}
			return arr;
		},
		//数组转换
		toArray: function(p){
			return core_slice.call(p);
		},
		//预加载函数
		ready: function(load){
			win.onload = load;
		}
	});

	//判断类型实现
	var type = ['Boolean','Number','Object','Function','String'];
	var method = {};

	jQuery.each(type, function(i,self){
		method['is' + self] = function(o){
			return jQuery.type(o) == self.toLowerCase();
		}
	});
	jQuery.extend(method);
	

	//授权全局变量
	win.jQuery = win.$ = jQuery;

})(window);



