var dndZona = document.getElementById('dndZona');
var body = document.body;

var img = './card.jpg';

dndZona.style.background = 'url(' + img + ') no-repeat';
var hiddenImg = document.getElementById('hiddenImg');

hiddenImg.setAttribute('src', img);

window.onload = function () {
  document.addEventListener('mouseup', removeEvent, false);
  var heightDND = hiddenImg.offsetHeight;
  var widthDND = hiddenImg.offsetWidth;
  dndZona.style.height = heightDND + 'px';
  dndZona.style.width = widthDND + 'px';
  hiddenImg.style.display = 'none';

  dndZona.addEventListener('mousedown', mainListener, false);

  function mainListener(e) {

    var target = e.target;
    var targetClass = target.attributes.getNamedItem('class').value;
    if (target && targetClass === 'dnd__zona') {

      if (document.querySelectorAll('.lorem-wrap').length < 4) {

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
      var element = target.parentNode;

      element.setAttribute('id', 'active');
      element.addEventListener('mousedown', onMouseDown, false);
      element.addEventListener('touchstart', holdElement, false);
    }

    if (target && targetClass == 'lorem') {

      var hasClass = target.classList.contains('active');

      if (!hasClass) {
        target.classList.add('active');
        var parent = target.parentNode;
        var close = document.createTextNode('X');
        var removebutton = document.createElement('button');
        removebutton.classList.add('remove__button');
        removebutton.appendChild(close);
        parent.insertBefore(removebutton, target);
      }
    }

    if (target && targetClass == 'remove__button') {
      target.parentNode.remove(target)
    }

  }

  function onMouseDown(event) {
    this.prevClientX = event.clientX;
    this.prevClientY = event.clientY;
    this.prevLeft = parseInt(this.style.left);
    this.prevTop = parseInt(this.style.top);
    event.target.parentNode.addEventListener('mousemove', onMouseMove, false);
  }

  function onMouseMove(event) {

    if (event.target.parentNode.getAttribute('id') === 'active') {
      if (this.style.left > '0px' && this.style.left <= ( widthDND - 79 + 'px')) {
        this.style.left = this.prevLeft + (event.clientX - this.prevClientX) + 'px';
      }
      if (this.style.top > '0px' && this.style.top < (heightDND - 38 + 'px')) {
        this.style.top = this.prevTop + (event.clientY - this.prevClientY) + 'px';
      }
    }
  }

  function removeEvent(event) {

    event.target.parentNode.removeEventListener('mousedown', onMouseDown);
    event.target.parentNode.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('mouseup', removeEvent, true);

    document.querySelectorAll('.lorem-wrap').forEach(function (data) {
      data.removeAttribute('id');
    });
  }

  function holdElement(event) {

    this.prevClientX = event.touches[0].clientX;
    this.prevClientY = event.touches[0].clientY;
    this.prevLeft = parseInt(this.style.left) || 0;
    this.prevTop = parseInt(this.style.top) || 0;
    this.addEventListener('touchmove', onTouch, false);
  }

  function onTouch(event) {
    if (this.style.left > '0px' && this.style.left < ( widthDND - 79 + 'px')) {
      this.style.left = this.prevLeft + (event.touches[0].clientX - this.prevClientX) + 'px';
    }
    if (this.style.top > '0px' && this.style.top < heightDND - 38 + 'px') {
      this.style.top = this.prevTop + (event.touches[0].clientY - this.prevClientY) + 'px';
    }
  }

};