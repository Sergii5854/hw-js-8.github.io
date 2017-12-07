
window.onload = initDraggable;

var draggable = document.getElementById('root');

function initDraggable() {

  draggable.addEventListener('mousedown', onMouseDown);
}

function onMouseDown(event) {
  this.prevClientX = event.clientX;
  this.prevClientY = event.clientY;
  this.prevLeft = parseInt(this.style.left) || 0;
  this.prevTop = parseInt(this.style.top) || 0;
  this.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function onMouseUp(event) {

  draggable.removeEventListener('mousemove', onMouseMove);
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

