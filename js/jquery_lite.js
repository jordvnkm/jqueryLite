/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DomNodeCollection = __webpack_require__(1);
	
	// document.addEventListener("DOMContentLoaded", function(){
	//   main();
	// });
	
	// function main(arg){
	//   // let uls = document.querySelectorAll("ul");
	//   // let test = new DomNodeCollection(uls);
	//   let test = $l("ul",);
	//   let li = document.createElement("li");
	//
	//   let jtest = $("ul");
	//   // jtest.on("click", () => {
	//   //   alert("clicked");
	//   // });
	//
	//   let handler2 = function(){
	//     alert("clicked 2");
	//   };
	//   // jtest.on("click", handler2);
	//   //
	//   // jtest.off("click", handler2);
	//
	//
	//   test.on("click", handler2);
	//   test.on("click", ()=> {
	//     alert("click 1");
	//   });
	//   test.off("click");
	//
	//   // test.removeClass("test");
	// }
	
	$l(()=>{
	  // alert("hello");
	  // console.log($l("ul").addClass("lmao"));
	  // $l("ul").removeClass("lmao");
	  // const objA = {a: 'a', b: 'a', c: 'a'};
	  // const objB = {b: 'b', c: 'b'};
	  // const objC = {c: 'c'};
	  // console.log($l.extend(objA, objB, objC));
	  // console.log(objA);
	  // console.log(objB);
	  // console.log(objC);
	  console.log($l.ajax({
	    "url": "http://www.google.com"
	  }));
	});
	
	function $l(...args){
	  // let callbacks = [];
	  // callbacks.push(funct);
	
	  if (args.length === 1){
	    if (typeof(args[0]) === "string"){
	      let selected = document.querySelectorAll(args[0]);
	      // selected = Array.prototype.slice.call(selected);
	      let collection = new DomNodeCollection(selected);
	      console.log(collection);
	      return collection;
	    }
	    else if (args[0] instanceof HTMLElement){
	      return new DomNodeCollection([args[0]]);
	    }
	    else if (typeof(args[0]) === "function"){
	      document.addEventListener("DOMContentLoaded", args[0]);
	    }
	  }
	
	
	  // if (args.length === 2){
	  //   if (typeof(args[0]) === "string"){
	  //     let selected = document.querySelectorAll(args[0]);
	  //     selected = Array.prototype.slice.call(selected);
	  //     let collection = new DomNodeCollection(selected);
	  //     return args[1].apply(collection, )
	  //   }
	  // }
	
	  // if (selector instanceof HTMLElement){
	  //   return new DomNodeCollection([selector]);
	  // }
	}
	
	
	$l.extend = function(...objs){
	  let final = {};
	  for (let i = 0 ; i < objs.length; i ++){
	    for (let prop in objs[i]) {
	      if (objs[i].hasOwnProperty(prop)){
	        final[prop] = objs[i][prop];
	      }
	    }
	  }
	  for (let j = 0 ; j < objs.length; j++){
	    for (let prop in objs[j]) {
	      if (objs[j].hasOwnProperty(prop)){
	        objs[j][prop] = final[prop];
	      }
	    }
	  }
	  return final;
	};
	
	$l.ajax = function(options){
	  let defaults = { "type": "get", "url": "/", "data": "", "dataType": "json",
	                  success(message) {console.log(message);},
	                  error: function(message) {console.log(message);}};
	
	
	  options = $l.extend(defaults, options);
	  console.log(defaults);
	
	  const xhr = new XMLHttpRequest();
	  xhr.open(options["type"], options["url"]);
	
	  xhr.onload = function () {
	    if (xhr.status === 200){
	      options.success(options.success, xhr.response);
	    }
	    else{
	      options.error(options.error, xhr.response);
	    }
	  };
	
	  xhr.send(options["data"]);
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	
	function DomNodeCollection(array){
	  this.array = array;
	}
	
	DomNodeCollection.prototype.html = function (...string) {
	  if (string.length > 0){
	    for(let i = 0 ; i < this.array.length ; i++){
	      this.array[i].innerHTML = string[0];
	    }
	  }
	  else {
	    return this.array[0].innerHTML;
	  }
	};
	
	DomNodeCollection.prototype.empty = function () {
	  this.html("");
	};
	
	DomNodeCollection.prototype.append = function (elements) {
	  for (let i = 0; i < this.array.length; i ++){
	    for (let j = 0; j < elements.length; j++){
	      this.array[i].innerHTML += elements[j].outerHTML;
	    }
	  }
	
	};
	
	DomNodeCollection.prototype.attr = function (...args) {
	  if (args.length === 1){
	    for (let i = 0; i < this.array.length; i++){
	      if (this.array[i].getAttribute(args[0]) !== null){
	        return this.array[i].getAttribute(args[0]);
	      }
	    }
	  }
	  else if (args.length === 2){
	    for (let i = 0; i < this.array.length; i++){
	      if (this.array[i].getAttribute(args[0]) !== null){
	        this.array[i].setAttribute(args[0], args[1]);
	      }
	    }
	  }
	};
	
	DomNodeCollection.prototype.addClass = function (className) {
	  for (let i = 0 ; i < this.array.length; i ++){
	    let newclass = this.array[i].getAttribute("class");
	    if (newclass === null){
	      newclass = className;
	    }else {
	      newclass += " " + className;
	    }
	    this.array[i].setAttribute("class", newclass);
	    // if (this.array[i])
	  }
	};
	
	DomNodeCollection.prototype.removeClass = function (remove) {
	  for (let i = 0 ; i < this.array.length; i++){
	    let className = this.array[i].getAttribute("class");
	    if (className !== null){
	      className = className.split(" ");
	      if (className.indexOf(remove) >= 0){
	        className.splice(className.indexOf(remove), 1);
	      }
	    }
	    this.array[i].setAttribute("class", className);
	  }
	};
	
	
	DomNodeCollection.prototype.children = function () {
	  let arr = [];
	  for (let i = 0; i < this.array.length; i ++){
	    let childrens = this.array[i].children;
	    for (let j = 0 ; j< childrens.length; j++){
	      arr.push(childrens[j]);
	    }
	  }
	  return new DomNodeCollection(arr);
	};
	
	DomNodeCollection.prototype.parent = function(){
	  let parents = [];
	  for (let i = 0; i < this.array.length; i ++){
	    if (parents.indexOf(this.array[i].parentNode) < 0){
	      parents.push(this.array[i].parentNode);
	    }
	  }
	  return new DomNodeCollection(parents);
	};
	
	DomNodeCollection.prototype.find = function(selector){
	  let elements = [];
	  for (let i = 0; i < this.array.length ; i ++){
	    let els = Array.prototype.slice.call(this.array[i].
	                                         querySelectorAll(selector));
	
	    elements = elements.concat(els);
	
	  }
	  return new DomNodeCollection(elements);
	};
	
	DomNodeCollection.prototype.remove = function(){
	  // for (let i = 0 ; i < this.array.length; i)
	  this.parent().empty();
	  this.array = [];
	};
	
	DomNodeCollection.prototype.on = function (event, callback) {
	  for (let i = 0; i < this.array.length; i ++){
	    this.array[i].addEventListener(event, callback);
	  }
	};
	
	DomNodeCollection.prototype.off = function (event, callback) {
	  console.log(callback);
	  for (let i = 0; i < this.array.length; i ++){
	    this.array[i].removeEventListener(event, callback);
	  }
	};
	
	module.exports = DomNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=jquery_lite.js.map