function Router() {
	this.routes = {};
	this.curUrl = '';
}

Router.prototype.route = function(path, callback) {
	this.routes[path] = callback || function(){};
	// console.log(path);
	// console.log(this.routes[path]);
}

Router.prototype.refresh = function() {
	this.curUrl = window.location.hash.slice(1) || '/index';
	this.routes[this.curUrl]();
}

Router.prototype.init = function() {
	window.addEventListener('load', this.refresh.bind(this), false);
	window.addEventListener('hashchange', this.refresh.bind(this), false);
}

function displayUrl(text) {
	document.getElementById("content").innerHTML= text;
	// console.log(content);
}


window.Router = new Router();
window.Router.init();

Router.route('/index', function(){
	displayUrl('I am index!');
})

Router.route('/xxh', function(){
	displayUrl('I am xxh!');
})

Router.route('/wzw', function(){
	displayUrl('I am wzw!');
})

Router.route('/tx', function(){
	displayUrl('I am tx!');
})