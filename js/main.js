const DomNodeCollection = require('./dom_node_collection');

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
