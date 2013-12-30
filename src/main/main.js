/**
 * Copyright (c)
 * 
 * jsObjective
 *
 * Author: Leo Selig
 * License: MIT
 */
(function() {
	/**
	 * @class Object
	 * @constructor
	 */
	var Object = function() {
		this.init.apply(this, arguments);
	};

	/**
	 * @method callSuper
	 * @param method {string}
	 * @returns {*}
	 * @protected
	 * @static
	 */
	Object.callSuper = function(method) {
		return this.constructor.__super__.constructor[method]
			.apply(this, Array.prototype.slice.call(arguments, 1));
	}

	/**
	 * @method callSuper
	 * @param method {string}
	 * @returns {*}
	 * @protected
	 */
	Object.prototype.callSuper = function(method) {
		return this.constructor.__super__[method]
			.apply(this, Array.prototype.slice.call(arguments, 1));
	}

	/**
	 * @method extend
	 * @param protoProps {Object}
	 * @param staticProps {Object}
	 * @returns {Function}
	 * @protected
	 * @static
	 */
	Object.extend = function(protoProps, staticProps) {
		var Parent = this;
		var Child;

		if(protoProps && protoProps.hasOwnProperty('constructor')) {
			Child = protoProps.constructor;
		} else {
			Child = function() {
				return Parent.apply(this, arguments);
			};
		}

		utils.extend(Child, Parent, staticProps);

		var Surrogate = function() {
			this.constructor = Child;
		};
		Surrogate.prototype = Parent.prototype;
		Child.prototype = new Surrogate;

		if(protoProps) {
			utils.extend(Child.prototype, protoProps);
		}

		Child.__super__ = Parent.prototype;

		return Child;
	};

	/**
	 * @class utils
	 * @static
	 */
	var utils = {

		/**
		 * @method extend
		 * @param base {Object}
		 * @returns {Object}
		 * @public
		 */
		extend: function(base) {
			for(var i = 1; i < arguments.length; i++) {
				for(var j in arguments[i]) {
					if(!arguments[i][j].hasOwnProperty(j)) {
						base[j] = arguments[i][j];
					}
				}
			}
			return base;
		}
	}

	if(typeof module !== 'undefined') {
		module.exports = Object;
	}
	else if(typeof window !== 'undefined') {
		window.jsObjective = Object;
	}

})();