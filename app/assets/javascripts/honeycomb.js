///////////////////////////////////////////////////////////////////////////
// Global Constants
///////////////////////////////////////////////////////////////////////////
var WIDTH = 1000, HEIGHT = 400;
var VISUAL_WIDTH = 1000, VISUAL_HEIGHT = 300;

var DURATION = 2400, WAITING = 600;

var DEFAULT_TUBE_NUMBER = 7;
var BOTTOM_TUBE_SIZE = 48;
var BOTTOM_BLACKLIST = ['00','10','20','30','40','50','60','120','130','140','150','160','170','180','190','200','210','220','230','240','250','260',
  '01','131','141','191','201','211','241','251','261',
  '262','202','212','222','232','242','252','262',
  '203',
  '04','44','204',
  '05','15','25','35','45','45','55','115','125','135','145','155','165','195','205','215','225','235','245','255','265',
  '06','16','26','36','46','56','56','66','76','86','116','126','136','146','156','166','176','186','196','206','216','226','236','246','256','266'];

var MIDDLE_TUBE_SIZE = 60 + 12;
var MIDDLE_BLACKLIST = ['00','10','20','30','40','80','90','100','110','120','130','140','150','160','170',
  '01','121','131',
  '03','13','123','132','133','173'];

var TOP_TUBE_SIZE = 80;
var TOP_BLACKLIST = ['00','10','20','70','80','90','100','110','120',
  '01','11','81','91','101','111', '121',
  '02','12','22','72','82','92','102','112','122'];

var SELFINTRO_LENGTH = 140;
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
      x, y, i, j, k, m, n, p, q, factor,
      topX = Math.floor(WIDTH / BOTTOM_TUBE_SIZE),
      topY = Math.floor(VISUAL_HEIGHT / TOP_TUBE_SIZE);              

  if (level === 'bottom') {
    x = Math.floor(WIDTH / BOTTOM_TUBE_SIZE);
    y = Math.floor(VISUAL_HEIGHT / BOTTOM_TUBE_SIZE);
    factor = Math.floor(x / 2);
  } else if (level === 'middle') {
    x = Math.floor(WIDTH / MIDDLE_TUBE_SIZE);
    y = Math.floor(VISUAL_HEIGHT / MIDDLE_TUBE_SIZE);
    factor = Math.floor(x / 2);
  } else {
  }

  order.push([Math.floor(x / 2), Math.floor(y / 2)]);

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

function getCraftsman(tube, message, name) {
  var craftsman = {},
      x = tube.attr('x'),
      y = tube.attr('y'),
      cx = VISUAL_WIDTH / 2,
      cy = VISUAL_HEIGHT / 2;

  if (x < cx && y < cy) {
    craftsman.cls = 'topLeft';
    craftsman.css = {'top': y + 180, 'left': x + 15};
    craftsman.html = '<strong class="topLeftName">' + name + '</strong><p class="topLeftMessage">' + message + '</p>';
  } else if (x >= cx && y < cy) {
    craftsman.cls = 'topRight';
    craftsman.css = {'top': y + 180, 'left': x - 309};
    craftsman.html = '<strong class="topRightName">' + name + '</strong><p class="topRightMessage">' + message + '</p>'; 
  } else if (x >= cx && y >= cy) {
    craftsman.cls = 'bottomRight';
    craftsman.css = {'top': y - 0, 'left': x - 300};
    craftsman.html = '<strong class="bottomRightName">' + name + '</strong><p class="bottomRightMessage">' + message + '</p>'; 
  } else if (x < cx && y >= cy) {
    craftsman.cls = 'bottomLeft';
    craftsman.css = {'top': y - 0, 'left': x + 25};
    craftsman.html = '<strong class="bottomLeftName">' + name + '</strong><p class="bottomLeftMessage">' + message + '</p>'; 
  }

  return craftsman;
}

function setTube(level, x, y, name, avatar, message) {
  var tube;
  var craftsman;
  var offset_level0 = 15;
  var offset_level1 = 24;
  var offset_level2 = 50;
  var width, height, left, top;

  if (level === 0) {
    width = height = 48;
    left = (48 * x) + Math.randInt(offset_level0);
    top = (48 * y) + Math.randInt(offset_level0) + 35;
    tube = paper.image(avatar, left, top, width, height);
  } else if (level == 1) {
    width = height = 60;
    left = (60 * x) + Math.randInt(offset_level1);
    top = (60 * y) + Math.randInt(offset_level1) + 35;
    tube = paper.image(avatar, left, top, width, height);
  } else if (level == 2) {
    width = height = 80;
    left = (80 * x) + Math.randInt(offset_level2);
    top = (80 * y) + Math.randInt(offset_level2) + 35;
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
        if ($.browser.mozlla)  {
          event.stopImmediatePropagation();
          event.stopPropagation();
        }
        outstanding = tube;
        craftsman = getCraftsman(tube, message, name);
        if (outstanding !== undefined) {outstanding.animate({'scale': 1}, DURATION, 'elastic').toBottom();}
        tube.toTop();
        if (paper.top === tube) {
          tube.attr({'cursor':'pointer'}).animate({scale: [2.5, 2.5]}, DURATION, 'elastic');
        }
        timer = setTimeout(function(event) {
            $('#craftsman').attr('class', craftsman.cls).html(craftsman.html).css(craftsman.css).fadeIn(500);
            hasCraftman = true;
          }, WAITING);
    });

    tube.mouseout(function(event) {
        if ($.browser.mozlla)  {
          event.stopImmediatePropagation();
          event.stopPropagation();
        }
        if (hasCraftman) {$('#craftsman').hide(); hasCraftman = false;}
        if (timer) {clearTimeout(timer);}
        if (outstanding !== undefined) {outstanding.animate({'scale': 1}, DURATION, 'elastic').toBottom();} 
        tube.animate({'scale': 1}, DURATION, 'elastic').toBottom();
    });

  } else if (level === 1) {
    tube.mouseover(function(event) {
        if ($.browser.mozlla)  {
          event.stopImmediatePropagation();
          event.stopPropagation();
        }
        outstanding = tube;
        craftsman = getCraftsman(tube, message, name);
        if (outstanding !== undefined) {outstanding.animate({'scale': 1}, DURATION, 'elastic').toBottom();}
        tube.toTop();
        if (paper.top === tube) {
          tube.attr({'cursor': 'pointer'}).animate({'scale': 2}, DURATION, 'elastic');
        }
        timer = setTimeout(function() {
            $('#craftsman').attr('class', craftsman.cls).html(craftsman.html).css(craftsman.css).fadeIn(500);
            hasCraftman = true;
          }, WAITING);
    });

    tube.mouseout(function(event) {
        if ($.browser.mozlla)  {
          event.stopImmediatePropagation();
          event.stopPropagation();
        }                     
        if (hasCraftman) {$('#craftsman').hide(); hasCraftman = false;}
        if (outstanding !== undefined) {outstanding.animate({'scale': 1}, DURATION, 'elastic').toBottom();}
        if (timer) {clearTimeout(timer);
          tube.animate({'scale': 1}, DURATION, 'elastic').toBottom();
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
        middleOrder = getOrder('middle'),
        bottomTubeSet = paper.set(),
        middleTubeSet = paper.set();

      //////////////////////////////////////////////////////////////////
      // Adjust speed of honeycomb animation
      //////////////////////////////////////////////////////////////////
      if ($.browser.msie && $.browser.version === 6.0) {
      } else if ($.browser.msie && $.browser.version === 7.0) {
      } else if ($.browser.msie && $.browser.version === 8.0) {
      } else if ($.browser.mozilla) {
        DURATION = 600;
      } else if ($.browser.opera) {
        DURATION = 3000;
        WAITING = 2000;
      }

      /////////////////////////////////////////////////////////////////////
      // Draw the honeycomb
      /////////////////////////////////////////////////////////////////////
      $.ajax({
          url: "/artists/visible",
          dataType: 'json',
          success: function( artists ){

            // bottom level
            for (i = 0; i < bottomOrder.length; i++) {
              x = bottomOrder[i][0];
              y = bottomOrder[i][1];
              artist = artists.pop();
              if( artist ) {
                bottomTubeSet.push(setTube(0, x, y, artist["name"], artist["avatar"], artist["description"]));
              } else {
                bottomTubeSet.push(setTube(0, x, y, "手工客", "assets/tube/default/" + Math.randInt(DEFAULT_TUBE_NUMBER) + ".png", "等你来"));
              }
            }

            // middle level
            for (j = 0; j < middleOrder.length; j++) {
              x = middleOrder[j][0];
              y = middleOrder[j][1];
              artist = artists.pop();
              if( artist ) {
                middleTubeSet.push(setTube(1, x, y, artist["name"], artist["avatar"], artist["description"]));
              }else {
                middleTubeSet.push(setTube(1, x, y, "手工客", "assets/tube/default/" + Math.randInt(DEFAULT_TUBE_NUMBER) + ".png", "等你来"));
              }
            }
          }
      });

      // order tubes in the right way
      bottomTubeSet.toFront();
      middleTubeSet.toBack();
  });
