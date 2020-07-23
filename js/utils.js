window.utils = {};

window.utils.parseColor = function (color, toNumber) {
  if (toNumber === true) {
    if (typeof color === 'number') {
      return (color | 0); //chop off decimal
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return window.parseInt(color, 16);
  } else {
    if (typeof color === 'number') {
      color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
    }
    return color;
  }
};



/*-----------------------ColorBucket-----------------------*/
  var cBucket = function() {
  ctx.save();
  ctx.lineWidth = 4;
  ctx.fillStyle = "rgba(" + bucket.red + ", " + bucket.green + ", " + bucket.blue + ", 1)";
  ctx.beginPath();
  ctx.rect(300, 100, 100, 100);
  ctx.closePath();
  ctx.fill();
  ctx.stroke(); 
  ctx.restore();
  };


/*-----------------------ProductColor-----------------------*/
  var pRed = 200, pGreen = 100, pBlue = 50;

  var product = function(pRed, pGreen, pBlue) {
  ctx.save();
  ctx.lineWidth = 4;
  ctx.fillStyle = "rgba(" + pRed + ", " + pGreen + ", " + pBlue + ", 1)";
  ctx.beginPath();
  ctx.rect(450, 100, 100, 100);
  ctx.closePath();
  ctx.fill();
  ctx.stroke(); 
  ctx.restore();
  };

/*-----------------------BucketColors-----------------------*/
  function colorBoxText(color, x, y) {
  ctx.font = "normal bold 17px Helvetica";
  ctx.fillText(color, x, y);
  ctx.textAlign = "center";
  };

/*-----------------------PointsGranted-----------------------*/
  function pointsText(points, x, y) {
  ctx.font = "normal bold 17px Helvetica";
  ctx.fillStyle = "#FF0000";
  ctx.fillText(points, x, y);
  ctx.textAlign = "center";
  ctx.save();
  ctx.fillStyle = "#000000";
  };

/*-----------------------infoText function-----------------------*/
// Text function that wraps the text within a maximum width, which helps the visual aspects of text to fit the text bubble.
// Text Wrap information source: http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
function infoText(message, x, y, maxWidth, align, lineHeight) {
    var words = message.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            ctx.font = "normal bold 12px Helvetica";
            ctx.fillText(line, x, y);
            ctx.textAlign = "center";
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        ctx.fillText(line, x, y);
};