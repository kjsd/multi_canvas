function draw() {
  dragable();

  var canvas = document.getElementById('base');
  var ctx = canvas.getContext('2d');

  var img = new Image();
  img.addEventListener('load', function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    capture();
  }, false);
  img.src = "cat_PNG50550.png";
}

function capture() {
  var canvas = document.getElementById('base');
  var ctx = canvas.getContext('2d');

  var pos = document.getElementById('capture').getBoundingClientRect();
  var img = ctx.getImageData(pos.x, pos.y, pos.width, pos.height);

  var red = 0;
  var green = 0;
  var blue = 0;
  var alpha = 0;

  for (var i = 0; i < img.data.length; i += 4) {
    red += img.data[i];
    green += img.data[i+1];
    blue += img.data[i+2];
    alpha += img.data[i+3];
  }

  var log = 'R: ' + red / (pos.width * pos.height) +
      ', G: ' + green / (pos.width * pos.height) +
      ', B: ' + blue / (pos.width * pos.height) +
      ', A: ' + alpha / (pos.width * pos.height);

  document.getElementById('log').innerHTML = log;
}

function dragable() {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var elm = document.getElementById('capture');

  elm.addEventListener('mousedown', dragStart, false);
  elm.addEventListener('touchstart', dragStart, false);

  function dragStart(e) {
    e.preventDefault();

    pos3 = e.clientX;
    pos4 = e.clientY;

    elm.addEventListener('mouseup', dragEnd, false);
    elm.addEventListener('mousemove', dragMove, false);
    elm.addEventListener('touchend', dragEnd, false);
    elm.addEventListener('touchmove', touchMove, false);
  };

  function dragMove(e) {
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elm.style.top = (elm.offsetTop - pos2) + "px";
    elm.style.left = (elm.offsetLeft - pos1) + "px";

    capture();
  }

  function touchMove(e) {
    e.preventDefault();

    var draggedElem = e.target;
    var touch = e.changedTouches[0];
    e.target.style.position = "fixed";
    e.target.style.top = (touch.pageY - window.pageYOffset - draggedElem.offsetHeight
                          / 2) + "px";
    e.target.style.left = (touch.pageX - window.pageXOffset - draggedElem.offsetWidth
                           / 2) + "px";

    capture();
  }

  function dragEnd(e) {
    e.preventDefault();

    elm.removeEventListener('mouseup', dragEnd);
    elm.removeEventListener('mousemove', dragMove);
    elm.removeEventListener('touchend', dragEnd);
    elm.removeEventListener('touchmove', touchMove);
  }
}
