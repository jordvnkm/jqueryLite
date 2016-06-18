
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
