onload = initDraggable;
var dndZona = document.getElementById('dndZona');
var element = document.getElementById('root');

var elementStyle = element.style;

var height = element.offsetHeight;
var width = element.offsetWidth;


function initDraggable(element) {
  this.element = element;
  this.element = 'root';
  document.getElementById(this.element).addEventListener('mousedown', holdElement, false);
   // document.body.addEventListener('mousemove', clearListener, false);
  document.body.addEventListener('touchstart', holdElement, false);
  document.body.addEventListener('touchend', clearListener, false);

}

function holdElement(event){
  this.addEventListener('mousemove',move, true);
  // document.body.addEventListener('mousedown',move,true);

  document.body.addEventListener('touchmove',onTouch,true);
}


function clearListener() {
  document.body.removeEventListener('touchmove', onTouch, true);
  document.body.removeEventListener('mouseup', onTouch, true);
   // this.style.position = "";
}
function move(event){

  this.epY = event.clientY;
  this.epX = event.clientX;
  this.prevLeft = parseInt(elementStyle.left) || 0;
  this.prevTop = parseInt(elementStyle.top) || 0;
  elementStyle.top = this.prevLeft + ( event.clientX  - this.epX) + 'px';
  elementStyle.left = thisprevTop + (event.clientY - this.epY) + 'px';
console.log(prevLeft)
  // elementStyle.top = epY + "px";
  // elementStyle.left = epX +  "px";
}

function onTouch(touch){
  this.epY = touch.touches[0].clientY;
  this.epX = touch.touches[0].clientX;

  elementStyle.top = this.epY + "px";
  elementStyle.left = this.epX +  "px";
}


var dndZona = document.getElementById('dndZona');
dndZona.addEventListener("click", function (e) {

  var target = e.target;

  var targetClass = target.attributes.getNamedItem('class').value;
  console.log(targetClass);

  if(target && targetClass == "dnd__zona"){
    console.log("create")
    var loremWrap = document.createElement('div');
    loremWrap.setAttribute('class', 'lorem-wrap');
    loremWrap.style.top = event.y - event.target.offsetTop  + 'px';
    loremWrap.style.left = event.x - event.target.offsetLeft  + 'px';
    target.appendChild(loremWrap);

    var lorem = document.createElement('div');
    lorem.setAttribute('class', 'lorem');
    lorem.innerText = 'lorem';
    loremWrap.appendChild(lorem)

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


