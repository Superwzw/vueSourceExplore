function MyWatcher(vm, expOrFn, cb) {
	this.vm = vm;
	this.expOrFn = expOrFn;
	this.cb = cb;
	this.val = this.get();
}

MyWatcher.prototype = {
	update: function() {
		this.run();
	},
	run: function() {
		var val = this.get();
		if(val !== this.val) {
			this.val = val;
			this.cb.call(this.vm, val);
		}
	},
	get: function() {
		Dep.target = this;
		var val = this.vm.data[this.expOrFn];
		Dep.target = null;
		return val;
	}
}