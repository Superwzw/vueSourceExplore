function MyVue(options) {
	var self = this;
	this.data = options.data;
	Object.keys(this.data).forEach( function(key) {
		self.proxyKeys(key);
	})
	observe(this.data);
}

MyVue.prototype = {
	proxyKeys: function(key) {
		var self = this;
		Object.defineProperty(this, key, {
			configurable: true,
			enumberable: true,
			get: function getter() {
				return self.data[key];
			},
			set: function setter(new_val) {
				self.data[key] = new_val;
			}
		})
	},
    $watch: function(expOrFn, cb) {
        new MyWatcher(this, expOrFn, cb);
    }
}