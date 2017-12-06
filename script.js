var Drag = {

  obj: null,

  init: function (o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper) {
    o.onmousedown = Drag.start;

    o.hmode = bSwapHorzRef ? false : true;
    o.vmode = bSwapVertRef ? false : true;

    o.root = oRoot && oRoot != null ? oRoot : o;

    if (o.hmode && isNaN(parseInt(o.root.style.left))) o.root.style.left = "0px";
    if (o.vmode && isNaN(parseInt(o.root.style.top))) o.root.style.top = "0px";
    if (!o.hmode && isNaN(parseInt(o.root.style.right))) o.root.style.right = "0px";
    if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

    o.minX = typeof minX != 'undefined' ? minX : null;
    o.minY = typeof minY != 'undefined' ? minY : null;
    o.maxX = typeof maxX != 'undefined' ? maxX : null;
    o.maxY = typeof maxY != 'undefined' ? maxY : null;

    o.xMapper = fXMapper ? fXMapper : null;
    o.yMapper = fYMapper ? fYMapper : null;

    o.root.onDragStart = new Function();
    o.root.onDragEnd = new Function();
    o.root.onDrag = new Function();
  },

  start: function (e) {
    var o = Drag.obj = this;
    e = Drag.fixE(e);
    var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
    var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
    o.root.onDragStart(x, y);

    o.lastMouseX = e.clientX;
    o.lastMouseY = e.clientY;

    if (o.hmode) {
      if (o.minX != null) o.minMouseX = e.clientX - x + o.minX;
      if (o.maxX != null) o.maxMouseX = o.minMouseX + o.maxX - o.minX;
    } else {
      if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
      if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
    }

    if (o.vmode) {
      if (o.minY != null) o.minMouseY = e.clientY - y + o.minY;
      if (o.maxY != null) o.maxMouseY = o.minMouseY + o.maxY - o.minY;
    } else {
      if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
      if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
    }

    document.onmousemove = Drag.drag;
    document.onmouseup = Drag.end;
//console.log( "X : " + o.lastMouseX	+ ", Y : " + o.lastMouseY);

    return false;
  },

  drag: function (e) {
    e = Drag.fixE(e);
    var o = Drag.obj;

    var ey = e.clientY;
    var ex = e.clientX;
    var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
    var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
    var nx, ny;

    if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
    if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
    if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
    if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

    nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
    ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

    if (o.xMapper) nx = o.xMapper(y)
    else if (o.yMapper) ny = o.yMapper(x)
    console.log(nx);
    Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
    Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
    Drag.obj.lastMouseX = ex;
    Drag.obj.lastMouseY = ey;

    Drag.obj.root.onDrag(nx, ny);
    return false;
  },

  end: function () {
    document.onmousemove = null;
    document.onmouseup = null;
    Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]),
        parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
    Drag.obj = null;
  },

  fixE: function (e) {
    if (typeof e == 'undefined') e = window.event;
    if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
    if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
    return e;
  }
};

// get point 60 times per second
// var points = [];
//
// function myFunction(e) {
//
//   var x = e.clientX;
//   var y = e.clientY;
//   var coor = " " + x + " , " + y + " ";
//   var XY = [x, y];
//   points.push(XY);
//
//   if (points.length > 100) {
//     points.shift();
//   }
//
//   console.log(count++);  //points
//   console.log(XY);
// }
//
// console.log(points);
//
//
// var start = 0;
// var totalCalls = 0;
//
// function myOnmove(e) { // Функция показывает кол-во запусков в секунду
//   var now = Date.now();
//   if (!start) {
//     start = now;
//   }
//   // начнем считать время с момента
//   // первого срабатывания события mousemove
//
//   if (now - start < 1000) {
//     totalCalls += 1;
//   } else {
//
//     console.log(totalCalls + ' ' + Date(3600 * 24 * 1000));
//     totalCalls = 0;
//     start = 0;
//   }
//
//   var x = e.clientX;
//   var y = e.clientY;
//   var coor = " " + x + " , " + y + " ";
//   var XY = [x, y];
//
//
//   console.log(totalCalls + ' ' + XY);
//
// }
// function handleDragStart(e) {
//   this.style.opacity = '0.8';  // this / e.target is the source node.
//   this.style.backgroundColor = "#000";
//   console.log('444');
//   this.style.borderRadius = "120px";
//   myHtml.addEventListener("mousemove", function (event) {
//     myFunction(event);
//   });
// }
//
// var cols = document.querySelectorAll('#root .column');
// [].forEach.call(cols, function (col) {
//   col.addEventListener('dragstart', handleDragStart, false);
// });
//

//document.getElementById('res')
var dndZona = document.getElementById('dndZona');
dndZona.addEventListener("click", function (e) {

  var target = e.target;

  var targetClass = target.attributes.getNamedItem('class').value;
  console.log(targetClass)

  if(target && targetClass == "dnd__zona"){
    console.log("create")
    var parent = target.childNodes;


    var loremText = document.createTextNode("LoremTExt");

    var lorem = document.createElement("div");
    lorem.classList.add('lorem-wrap');
    lorem.appendChild(loremText);
    parent.insertBefore(lorem, target);

  }

  if (target && targetClass == "lorem") {

    var hasClass = target.classList.contains('active');

    if (!hasClass) {

      target.classList.add('active');

      var parent = target.parentNode;
      var close = document.createTextNode("X");
      var removebutton = document.createElement("button");
      removebutton.classList.add('remove__button');
      removebutton.appendChild(close);
      parent.insertBefore(removebutton, target);
    }
  }
  if (target && targetClass == "remove__button") {
    target.parentNode.remove(target)
  }


});

