

//观察者
function MyObserver(data) {
	//保存传入的vue.$options中的data
	this.data = data;
	//遍历data的每个属性
	this.traversal(data);
}

MyObserver.prototype = {
	//遍历data的每个属性
	traversal: function(data) {
		Object.keys(data).forEach( key => {
			//劫持每个属性对象的getter和setter
			this.defineRelative(data, key, data[key]);
		});
	},
	defineRelative: function(data, key, val) {
		const dep = new Dep();
		let childObj = observe(val);
		Object.defineProperty(data, key, {
			configurable: true,
			enumberable:  true,
			get: function getter() {
				if(Dep.target) {
					dep.addSub(Dep.target);
				}
				return val;
			},
			set: function setter(new_val) {
				if(val === new_val) return;
				val = new_val;
				dep.notify();
			}
		});
	} 
};

function observe(val, vm) {
	//值为空或者不为引用类型的值时，不再监听变化
	if(!val || typeof val !== 'object') {
		return;
	}
	//递归劫持getter和setter
	return new MyObserver(val);
}

function Dep() {
	//存放订阅者列表
	this.subs = [];
}

Dep.prototype = {
	//添加订阅者
	addSub: function(sub) {
		this.subs.push(sub);
	},
	//通知订阅者进行视图更新
	notify: function() {
		this.subs.forEach( sub => {
			sub.update();
		});
	}
};

//静态属性，外部可访问
Dep.target = null;

