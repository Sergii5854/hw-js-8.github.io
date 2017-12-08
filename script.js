
window.onload = initDraggable;

var draggable = document.getElementById('root');
var draggable1 = document.getElementById('root1');

function initDraggable() {

  draggable.addEventListener('mousedown', onMouseDown);
  draggable1.addEventListener('mousedown', onMouseDown);

  draggable.removeEventListener('mousemove', onMouseMove);
  draggable1.addEventListener('mousedown', onMouseMove);

  draggable.addEventListener('touchmove', onTouch, false);
  draggable.addEventListener('mousedown', onTouch);
  // draggable1.addEventListener('touchstart', onTouch, false);
  draggable1.addEventListener('touchmove', onTouch, false);
  draggable1.addEventListener('mousedown', onTouch);
}
function onTouch(event) {

  var touch = event.changedTouches[0];
  console.log(event , touch);

  this.prevClientX  = event.changedTouches[0].clientX ;
  this.prevClientY = event.changedTouches[0].clientY ;

  this.prevLeft = parseInt(this.style.left) || 0;
  this.prevTop = parseInt(this.style.top) || 0;
  this.addEventListener('touchstart', onMouseMove);
  this.addEventListener('touchmove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  this.style.left = this.prevLeft + (event.clientX - this.prevClientX) + 'px';
  this.style.top = this.prevTop + (event.clientY - this.prevClientY) + 'px';
}

function onMouseDown(event) {
  console.log(event);
  this.prevClientX = event.clientX;
  this.prevClientY = event.clientY;
  this.prevLeft = parseInt(this.style.left) || 0;
  this.prevTop = parseInt(this.style.top) || 0;
  this.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function onMouseUp(event) {
  document.addEventListener('touchmove', onMouseUp);
  document.removeEventListener('mouseup', onMouseUp);
}

function onMouseMove(event) {
  this.style.left = this.prevLeft + (event.clientX - this.prevClientX) + 'px';
  this.style.top = this.prevTop + (event.clientY - this.prevClientY) + 'px';
}




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

