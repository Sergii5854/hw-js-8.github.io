var dndZona = document.getElementById('dndZona');

var img = './card.jpg';

dndZona.style.background = 'url(' + img + ') no-repeat';
var hiddenImg = document.getElementById('hiddenImg');

hiddenImg.setAttribute('src', img);


window.onload = function () {

  var heightDND = hiddenImg.offsetHeight;
  var widthDND = hiddenImg.offsetWidth;
  dndZona.style.height = heightDND + "px";
  dndZona.style.width = widthDND + "px";
  hiddenImg.style.display = "none"
};


var element = document.getElementById('active');

var elementStyle = element.style;
var height = element.offsetHeight;
var width = element.offsetWidth;

dndZona.addEventListener("click", function (e) {

  var target = e.target;
  var targetClass = target.attributes.getNamedItem('class').value;
  if (target && targetClass === "dnd__zona") {

    if (document.querySelectorAll(".lorem-wrap").length < 4) {

      var loremWrap = document.createElement('div');
      loremWrap.setAttribute('class', 'lorem-wrap');
      loremWrap.style.top = e.y - target.offsetTop - 10 + 'px';
      loremWrap.style.left = e.x - target.offsetLeft - 30 + 'px';
      target.appendChild(loremWrap);

      var lorem = document.createElement('div');
      lorem.setAttribute('class', 'lorem');
      lorem.innerText = 'lorem';
      loremWrap.appendChild(lorem)
    }
  } else {
    if (element.id === 'active') {
      element.removeAttribute('id');
      element = target.parentNode;
      // clearListener(element)

    }
    target.parentNode.setAttribute('id', 'active');

    element = target.parentNode;
    console.log(element);
    element.addEventListener('mousedown', onMouseDown)



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

function onMouseDown(event) {
  console.log('onMouseDown');
  this.prevClientX = event.clientX;
  this.prevClientY = event.clientY;
  this.prevLeft = parseInt(this.style.left) || 0;
  this.prevTop = parseInt(this.style.top) || 0;
  this.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function onMouseUp(event) {
  var draggable = document.getElementById('draggable');
  draggable.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}

function onMouseMove(event) {
  this.style.left = this.prevLeft + (event.clientX - this.prevClientX) + 'px';
  this.style.top = this.prevTop + (event.clientY - this.prevClientY) + 'px';
}

// function initDraggable(element) {
//   console.log(element.id, " this", this, document.getElementById(element.id));
//   document.getElementById(element.id).addEventListener('mousedown', holdElement, false);
//   console.log(document.getElementById(element.id));
//   document.body.addEventListener('mouseup', clearListener, false);
//   document.body.addEventListener('touchstart', holdElement, false);
//   document.body.addEventListener('touchend', clearListener, false);
// }
//
// function holdElement(event) {
//   this.addEventListener('mousemove', move, true);
//   // document.body.addEventListener('mousedown', move, true);
//
//   document.body.addEventListener('touchmove', onTouch, true);
// }
//
//
// function clearListener() {
//   document.body.removeEventListener('touchmove', onTouch, true);
//   document.body.removeEventListener('mouseup', onTouch, true);
//
// }
//
// function move(event) {
//
//   this.epY = event.clientY;
//   this.epX = event.clientX;
//   this.prevLeft = parseInt(elementStyle.left) || 0;
//   this.prevTop = parseInt(elementStyle.top) || 0;
//   elementStyle.top = this.prevLeft + ( event.clientX - this.epX) + 'px';
//   elementStyle.left = this.prevTop + (event.clientY - this.epY) + 'px';
//
// }
//
// function onTouch(touch) {
//   this.epY = touch.touches[0].clientY;
//   this.epX = touch.touches[0].clientX;
//
//   elementStyle.top = this.epY + "px";
//   elementStyle.left = this.epX + "px";
// }

