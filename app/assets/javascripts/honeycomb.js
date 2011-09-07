/////////////////////////////////////////////////////////////////////////
// Global Constants
///////////////////////////////////////////////////////////////////////////
var WIDTH = 1000, HEIGHT = 400;
var VISUAL_WIDTH = 1000, VISUAL_HEIGHT = 300;

var DURATION = 2400, WAITING = 600;

var DEFAULT_TUBE_NUMBER = 7;

var BOTTOM_OFFSET = 10;
var BOTTOM_TUBE_SIZE = 48;
var BOTTOM_BLACKLIST = ['00','10','20','30','40','50','130','140','150','160','170','180','190','200','210','220','230','240','250','260',
  '01','11','21','41','181', '171','191','201','211','241','251','261',
  '02', '262','202','212', '192', '222','232','242','252','262',
  '203',
  '04', '194','204',
  '05','15','25','35','45','45','55','145','155','165','175', '185', '195','205','215','225','235','245','255','265',
  '06','16','26','36','46','56','56','66','76','86','96', '106', '116','126','136','146','156','166','176','186','196','206','216','226','236','246','256','266'];

var MIDDLE_OFFSET = 20;
var MIDDLE_TUBE_SIZE = 60 + 12;
var MIDDLE_BLACKLIST = ['00','10','20','30','110','120','130','140','150','160','170',
  '01','11','121','131',
  '02','12',
  '03','13','133','173',
  '04', '14','24','34','44','54','94','104','114','124', '134'];

var TOP_OFFSET = 50;
var TOP_TUBE_SIZE = 80;
var TOP_BLACKLIST = ['00','10','20','70','80','90','100','110','120',
  '01','11','81','91','101','111', '121',
  '02','12','22','72','82','92','102','112','122'];

var SELFINTRO_LENGTH = 140;
var GRAFTSMAN_TOKEN_NUMBER = 32.0;
///////////////////////////////////////////////////////////////////////////////
// Global Variables
///////////////////////////////////////////////////////////////////////////////
var popover = 0;
var timer, outstanding, hasCraftman = false;
var paper = Raphael('honeycomb', WIDTH, HEIGHT);

///////////////////////////////////////////////////////////////////////////
// Global Functions
///////////////////////////////////////////////////////////////////////////
Math.randInt = function(factor) {
  return Math.floor(Math.random(0, 1) * factor);
};

function getOrder(level) {
  var order = [], occupaied = [], factory = [], 
      x, y, i, j, k, m, n, p, q, 
      factor, factorX, factorY,
      topX = Math.floor(WIDTH / BOTTOM_TUBE_SIZE),
      topY = Math.floor(VISUAL_HEIGHT / TOP_TUBE_SIZE);              

  if (level === 'bottom') {
    x = Math.floor(WIDTH / BOTTOM_TUBE_SIZE);
    y = Math.floor(VISUAL_HEIGHT / BOTTOM_TUBE_SIZE);
  } else if (level === 'middle') {
    x = Math.floor(WIDTH / MIDDLE_TUBE_SIZE);
    y = Math.floor(VISUAL_HEIGHT / MIDDLE_TUBE_SIZE);
  } else {
  }

  if (x % 2) {
    factorX = Math.floor(x / 2) + 1;
  } else {
    factorX = Math.floor(x / 2);
  }
  if (y % 2) {
    factorY = Math.floor(y / 2) + 1;
  } else {
    factorY = Math.floor(y / 2);
  }

  order.push([factorX, factorY]);
  factor = factorX >= factorY ? factorX : factorY;

  for (i = 0; i <= factor; i++) {
    factory[i] = [];
    for (j = (-1 * i); j <= i; j++) {
      for (k = i; k >= (-1 * i); k--) {
        if (!(j === 0 && k === 0)) {
          if ($.inArray(j + '' + k, occupaied) < 0) {
            factory[i].push([j, k]);
            occupaied.push(j + '' + k);
            p = j + order[0][0];
            q = k + order[0][1];
            if ((p >= 0 && p <= x) && (q >= 0 && q <= y)) {
              if (level === 'bottom') {
                if  ($.inArray(p + '' + q, BOTTOM_BLACKLIST) < 0) {
                  order.push([p, q]);
                } else {
                }
              } else if (level === 'middle') {
                if ($.inArray(p + '' + q, MIDDLE_BLACKLIST) < 0) {
                  order.push([p, q]);
                } else {
                }
              }
            }                      
          }
        }
      }
    }
  }

  return order;
}

function getCraftsman(tube, rawMessage, name) {
  var craftsman = {}, 
      token, i, j = GRAFTSMAN_TOKEN_NUMBER,
      x = tube.attr('x'),
      y = tube.attr('y'),
      cx = VISUAL_WIDTH / 2,
      cy = VISUAL_HEIGHT / 2,
      message = rawMessage.replace('\\n', '').replace('<br \/>', ''),
      messageHTML = '<p>';

  for (i = 0; i <= rawMessage.length; i++) {
    if (i === rawMessage.length) {
      messageHTML += '</p>';
    } else if (j <= 1.0) {
      j = GRAFTSMAN_TOKEN_NUMBER;
      messageHTML += '</p><p>';
    } else {
      messageHTML += rawMessage[i];
      if ((/[a-zA-Z0-9\_\\\/\:\.]/).test(rawMessage[i])) {
      token = 1.0;
    } else {  // Chinese characters
      token = 2.0;
    }
    j -= token;
  }
}

if (x < cx && y < cy) {
  craftsman.cls = 'topLeft';
  craftsman.css = {'top': y + 120, 'left': x + 15};
  craftsman.html = '<strong class="topLeftName">' + name + '</strong><div class="topLeftMessage">' + messageHTML + '</div>';
} else if (x >= cx && y < cy) {
  craftsman.cls = 'topRight';
  craftsman.css = {'top': y + 120, 'left': x - 310};
  craftsman.html = '<strong class="topRightName">' + name + '</strong><div class="topRightMessage">' + messageHTML + '</div>'; 
} else if (x >= cx && y >= cy) {
  craftsman.cls = 'bottomRight';
  craftsman.css = {'top': y - 60, 'left': x - 310};
  craftsman.html = '<strong class="bottomRightName">' + name + '</strong><div class="bottomRightMessage">' + messageHTML + '</div>'; 
} else if (x < cx && y >= cy) {
  craftsman.cls = 'bottomLeft';
  craftsman.css = {'top': y - 60, 'left': x + 15};
  craftsman.html = '<strong class="bottomLeftName">' + name + '</strong><div class="bottomLeftMessage">' + messageHTML + '</div>'; 
}

return craftsman;
}

function setTube(level, x, y, name, avatar, message) {
  var tube;
  var craftsman;
  var width, height, left, top;

  if (level === 0) {
    width = height = 48;
    left = (48 * x) + Math.randInt(BOTTOM_OFFSET);
    top = (48 * y) + Math.randInt(BOTTOM_OFFSET) + 35;
    tube = paper.image(avatar, left, top, width, height);
  } else if (level == 1) {
    width = height = 60;
    left = (60 * x) + Math.randInt(MIDDLE_OFFSET);
    top = (60 * y) + Math.randInt(MIDDLE_OFFSET) + 35;
    tube = paper.image(avatar, left, top, width, height);
  } else if (level == 2) {
    width = height = 80;
    left = (80 * x) + Math.randInt(TOP_OFFSET);
    top = (80 * y) + Math.randInt(TOP_OFFSET) + 35;
    tube = paper.image(avatar, left, top, width, height);
  } else {
  }

  tube.toTop = function() {
    var paper = this.paper;
    if (this.removed || paper.top === this) {
      return this;
    }

    this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild); 
    this.node.parentNode.appendChild(this.node);

    this == paper.top && (paper.top = this.prev);
    this == paper.bottom && (paper.bottom = this.next);
    this.next && (this.next.prev = this.prev);
    this.prev && (this.prev.next = this.next);

    this.next = null;
    this.prev = paper.top;
    paper.top.next = this;
    paper.top = this;

    return this;
  };

  tube.toBottom = function() {
    var   paper = this.paper;
    if (this.removed || paper.bottom === this) {
      return this;
    }


    if (this.node.parentNode.firstChild != this.node) {
      this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);

      this == paper.top && (paper.top = this.prev);
      this == paper.bottom && (paper.bottom = this.next);
      this.next && (this.next.prev = this.prev);
      this.prev && (this.prev.next = this.next);

      this.prv = null;
      this.next = paper.bottom;
      paper.bottom.prev = this;
      paper.bottom = this;
    }

    return this;                  
  };

  if (level === 0) {
    tube.mouseover(function(event) {
        if ($.browser.mozilla)  {
          //event.stopImmediatePropagation();
          event.stopPropagation();
        } else if ($.browser.msie) {
          event.stopPropagation();       
        }

        if (outstanding !== undefined) {outstanding.animate({'scale': 1}, DURATION, 'elastic').toBottom();}
        outstanding = tube;

        if ($.browser.msie) {
          tube.toFront();
        } else {
          tube.toTop();
        }

        if (paper.top === tube) {
          tube.attr({'cursor':'pointer'}).animate({scale: [2.5, 2.5]}, DURATION, 'elastic');
          craftsman = getCraftsman(tube, message, name);
          timer = setTimeout(function(event) {
              $('#craftsman').attr('class', craftsman.cls).html(craftsman.html).css(craftsman.css).fadeIn(500);
              hasCraftman = true;
            }, WAITING);
        }

    });

    tube.mouseout(function(event) {
        if ($.browser.mozilla)  {
          //event.stopImmediatePropagation();
          event.stopPropagation();
        } else if ($.browser.msie) {
          event.stopPropagation();       
        }

        if (timer) {clearTimeout(timer);}    
        if (hasCraftman) {$('#craftsman').hide(); hasCraftman = false;}
        if (outstanding !== undefined) {outstanding.animate({'scale': 1}, DURATION, 'elastic').toBottom();}

        if (paper.top === tube) {
          tube.animate({'scale': 1}, DURATION, 'elastic').toBottom();
        }
    });

  } else if (level === 1) {
    tube.mouseover(function(event) {
        if ($.browser.mozilla)  {
          //event.stopImmediatePropagation();
          event.stopPropagation();
        } else if ($.browser.msie) {
          event.stopPropagation();
        }
        if (outstanding !== undefined) {outstanding.animate({'scale': 1}, DURATION, 'elastic').toBottom();}
        outstanding = tube;

        if ($.browser.msie) {
          tube.toFront();
        } else {
          tube.toTop();
        }

        if (paper.top === tube) {
          tube.attr({'cursor': 'pointer'}).animate({'scale': 2}, DURATION, 'elastic');
          craftsman = getCraftsman(tube, message, name);
          timer = setTimeout(function() {
              $('#craftsman').attr('class', craftsman.cls).html(craftsman.html).css(craftsman.css).fadeIn(500);
              hasCraftman = true;
            }, WAITING);
        }

    });

    tube.mouseout(function(event) {
        if ($.browser.mozilla)  {
          //event.stopImmediatePropagation();
          event.stopPropagation();
        }

        if (timer) {clearTimeout(timer);
          if (hasCraftman) {$('#craftsman').hide(); hasCraftman = false;}
          if (outstanding !== undefined) {outstanding.animate({'scale': 1}, DURATION, 'elastic').toBottom();}

          if (paper.top === tube) {
            tube.animate({'scale': 1}, DURATION, 'elastic').toBottom();
          }
        }
    });

  } else if (level === 2) {
    tube.mouseover(function(event) {
        craftsman = getCraftsman(this, message, name);
        tube.attr({'cursor':'pointer'}).animate({'scale': 1.5}, DURATION, 'elastic').toTop();
        if (!this.timer) {
          this.timer = setTimeout(function() {
              $('#craftsman').attr('class', craftsman.cls).html(craftsman.html).css(craftsman.css).fadeIn(500);
            }, WAITING);
        }
    });

    tube.mouseout(function(event) {
        if (this.timer) {clearTimeout(this.timer);}
        $('#craftsman').hide(); 
        tube.animate({'scale': 1}, DURATION, 'elastic');
    });
  } else {
  }

  return tube;
}

///////////////////////////////////////////////////////////////////////////
// Events Handlers
///////////////////////////////////////////////////////////////////////////
// Initialize
$(document).ready(function() {
    var i, j, x, y,
        bottomOrder = getOrder('bottom'),
        middleOrder = getOrder('middle');

    //console.log('bottom is' + bottomOrder.length);
    //console.log('middle is' + middleOrder.length);

    //////////////////////////////////////////////////////////////////
    // Adjust speed of honeycomb animation
    //////////////////////////////////////////////////////////////////
    if ($.browser.msie && $.browser.version === '6.0') {
    } else if ($.browser.msie && $.browser.version == '7.0') {
    } else if ($.browser.msie && $.browser.version == '8.0') {
    } else if ($.browser.msie && $.browser.version == '9.0') {
    }else if ($.browser.mozilla) {
      DURATION = 1000;
      WAITING = 600;
    } else if ($.browser.opera) {
      DURATION = 1200;
      WAITING = 800;
    }

    /////////////////////////////////////////////////////////////////////
    // Adjust CSS
    /////////////////////////////////////////////////////////////////////
    if ($.browser.mozilla && $.browser.version === '6.0') {
      $('.popover div#request div.detail form.request fieldset input.button').css({'left': '3.26em'});
    } else {
    }

    /////////////////////////////////////////////////////////////////////
    // Draw the honeycomb
    /////////////////////////////////////////////////////////////////////
    $.ajax({
        url: "/artists/visible",
        dataType: 'json',
        success: function( artists ){

          // botom level
          for (j = 0; j < bottomOrder.length; j++) {
            x = bottomOrder[j][0];
            y = bottomOrder[j][1];
            artist = artists[middleOrder.length+j];
            if( artist ) {
              setTube(0, x, y, artist["name"], artist["avatar"], artist["description"]);
            }else {
              setTube(0, x, y, "手工客", "assets/tube/default/" + Math.randInt(DEFAULT_TUBE_NUMBER) + ".png", "申请邀请码之后，你也会出现在这里");
            }
          }

          // middle level
          for (i = 0; i < middleOrder.length; i++) {
            x = middleOrder[i][0];
            y = middleOrder[i][1];
            artist = artists[i];
            if( artist ) {
              setTube(1, x, y, artist["name"], artist["avatar"], artist["description"]);
            } else {
              setTube(1, x, y, "手工客", "assets/tube/default/" + Math.randInt(DEFAULT_TUBE_NUMBER) + ".png", "申请邀请码之后，你也会出现在这里");
            }
          }

        }
    });

});
