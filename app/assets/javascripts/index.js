///////////////////////////////////////////////////////////////////////////
// Global Constants
///////////////////////////////////////////////////////////////////////////
var WIDTH = 1000, HEIGHT = 380;
var VISUAL_WIDTH = 1000, VISUAL_HEIGHT = 300;

var BOTTOM_TUBE_SIZE = 48;
var BOTTOM_BLACKLIST = ['00','10','20','30','40','50','60','120','130','140','150','160','170','180','190','200','210','220','230','240','250','260',
  '01','131','141','191','201','211','241','251','261',
  '262','202','212','222','232','242','252','262',
  '203',
  '04','44','204',
  '05','15','25','35','45','45','55','115','125','135','145','155','165','195','205','215','225','235','245','255','265',
  '06','16','26','36','46','56','56','66','76','86','116','126','136','146','156','166','176','186','196','206','216','226','236','246','256','266'];

var MIDDLE_TUBE_SIZE = 72;
var MIDDLE_BLACKLIST = ['00','10','20','30','40','80','90','100','110','120','130','140','150','160','170',
  '01','121','131',
  '03','13','123','132','133','173'];

var TOP_TUBE_SIZE = 80;
var TOP_BLACKLIST = ['00','10','20','70','80','90','100','110','120',
  '01','11','81','91','101','111', '121',
  '02','12','22','72','82','92','102','112','122'];

// ONLY FOR TESTING
var NAME = 'shy';
var MESSAGE = '三点多参加完活动出来，发现中午开始的小雨已经下大了，冒雨在几个地点之间来回犹豫步行40多分钟，还忘了带上外套的帽子。决定坐上公交再说了。三元桥下来，走到霄云路上，终于看见一辆挂着红色“空车”二字小灯的出租，却原来拉我也算是顺路，开车的大姐急着去接上高三的女儿回家。办了一些事情之';

var SELFINTRO_LENGTH = 140;
///////////////////////////////////////////////////////////////////////////////
// Global Variables
///////////////////////////////////////////////////////////////////////////////
var popover = 0;
var paper = Raphael('honeycomb', WIDTH, HEIGHT);

///////////////////////////////////////////////////////////////////////////
// Global Functions
///////////////////////////////////////////////////////////////////////////
Math.randInt = function(factor) {
  return Math.floor(Math.random(0, 1) * factor);
};

function getCraftsman(tube, message, name) {
  var craftsman = {},
      x = tube.attr('x'),
      y = tube.attr('y'),
      cx = VISUAL_WIDTH / 2,
      cy = VISUAL_HEIGHT / 2,
      topLeftBG, topRightBG, bottomLeftBG, bottomRightBG;

  // Rplace png with gif in the case of IE6
  if ($.browser.msie && $.browser.version === 6.0) {
    topLeftBG = 'url("assets/css/BG-craftsman-top-left.gif")';
    topRightBG = 'url("assets/css/BG-craftsman-top-right.gif")';
    bottomLeftBG = 'url("assets/css/BG-craftsman-bottom-left.gif")';
    bottomRightBG = 'url("assets/css/BG-craftsman-bottom-right.gif")';      
  } else {
    topLeftBG = 'url("assets/css/BG-craftsman-top-left.png")';
    topRightBG = 'url("assets/css/BG-craftsman-top-right.png")';
    bottomLeftBG = 'url("assets/css/BG-craftsman-bottom-left.png")';
    bottomRightBG = 'url("assets/css/BG-craftsman-bottom-right.png")';      
  }

  if (x < cx && y < cy) {
    craftsman.css = {'background-image': topLeftBG, 'top': y + 180, 'left': x + 15};
    craftsman.html = '<strong class="topLeftName">' + name + '</strong><p class="topLeftMessage">' + message + '</p>';
  } else if (x >= cx && y < cy) {
    craftsman.css = {'background-image': topRightBG, 'top': y + 180, 'left': x - 309};
    craftsman.html = '<strong class="topRightName">' + name + '</strong><p class="topRightMessage">' + message + '</p>'; 
  } else if (x >= cx && y >= cy) {
    craftsman.css = {'background-image': bottomRightBG, 'top': y - 0, 'left': x - 300};
    craftsman.html = '<strong class="bottomRightName">' + name + '</strong><p class="bottomRightMessage">' + message + '</p>'; 
  } else if (x < cx && y >= cy) {
    craftsman.css = {'background-image': bottomLeftBG, 'top': y - 0, 'left': x + 25};
    craftsman.html = '<strong class="bottomLeftName">' + name + '</strong><p class="bottomLeftMessage">' + message + '</p>'; 
  }

  return craftsman;
}

function setTube(level, x, y, name, avatar, message) {
  var tube;
  var duration = 1600;
  var offset_level0 = 15;
  var offset_level1 = 24;
  var offset_level2 = 50;
  var topImgs = ['assets/tube/top/tube0.png','assets/tube/top/tube1.png', 'assets/tube/top/tube2.png', 'assets/tube/top/tube3.png', 
    'assets/tube/top/tube4.png','assets/tube/top/tube5.png', 'assets/tube/top/tube6.png', 'assets/tube/top/tube7.png'],
  middleImgs = ['assets/tube/middle/tube0.png','assets/tube/middle/tube1.png', 'assets/tube/middle/tube2.png', 'assets/tube/middle/tube3.png', 
    'assets/tube/middle/tube4.png','assets/tube/middle/tube5.png', 'assets/tube/middle/tube6.png', 'assets/tube/middle/tube7.png'],
  bottomImgs = ['assets/tube/bottom/tube0.png','assets/tube/bottom/tube1.png', 'assets/tube/bottom/tube2.png', 'assets/tube/bottom/tube3.png', 
    'assets/tube/bottom/tube4.png','assets/tube/bottom/tube5.png', 'assets/tube/bottom/tube6.png', 'assets/tube/bottom/tube7.png'],            

  width, height, left, top;

  if (level === 0) {
    width = height = 48;
    left = (48 * x) + Math.randInt(offset_level0);
    top = (48 * y) + Math.randInt(offset_level0) + 35;
    tube = paper.image(bottomImgs[Math.randInt(bottomImgs.length)], left, top, width, height);
  } else if (level == 1) {
    width = height = 60;
    left = (60 * x) + Math.randInt(offset_level1);
    top = (60 * y) + Math.randInt(offset_level1) + 35;
    tube = paper.image(middleImgs[Math.randInt(middleImgs.length)], left, top, width, height);
  } else if (level == 2) {
    width = height = 80;
    left = (80 * x) + Math.randInt(offset_level2);
    top = (80 * y) + Math.randInt(offset_level2) + 35;
    tube = paper.image(topImgs[Math.randInt(topImgs.length)], left, top, width, height);
  } else {
    // nothing to do
  }

  tube.toTop = function() {
    var   paper = this.paper;
    if (this.removed || paper.top === this) {
      return this;
    }


    this.node.parentNode.appendChild(this.node);

    this == paper.top && (paper.top = this.prev);
    //this == paper.bottom && (paper.bottom = this.next);
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

      //this == paper.top && (paper.top = this.prev);
      this == paper.bottom && (paper.bottom = this.next);
      this.next && (this.next.prev = this.prev);
      this.prev && (this.prev.next = this.next);

      this.next = paper.bottom;
      this.prev = null;
      paper.bottom.prev = this;
      paper.bottom = this;
    }

    return this;                  

  };

  if (level === 0) {
    tube.mouseover(function() {
        var craftsman = getCraftsman(this, MESSAGE, NAME);

        $('#craftsman').hide();
        this.attr({'cursor': 'pointer'}).animate({scale: [2.5, 2.5]}, duration, 'elastic').toTop();
        this.timer = setTimeout(function() {
            $('#craftsman').html(craftsman.html); 
            $('#craftsman').css(craftsman.css).fadeIn(500);
          }, 500);
    });

    tube.mouseout(function() {
        clearTimeout(this.timer);
        $('#craftsman').hide();
        this.animate({'scale': 1}, duration, 'elastic').toBottom();
    });
  } else if (level === 1) {
    tube.mouseover(function() {
        var craftsman = getCraftsman(this, MESSAGE, NAME);
        $('#craftsman').hide();
        this.timer = setTimeout(function() {
            $('#craftsman').html(craftsman.html); 
            $('#craftsman').css(craftsman.css).fadeIn(500);
          }, 500);                           
        tube.attr({'cursor': 'pointer'}).animate({'scale': 2}, duration, 'elastic').toTop(); 
    });

    tube.mouseout(function() {
        clearTimeout(this.timer);
        $('#craftsman').hide();
        tube.animate({'scale': 1}, duration, 'elastic').toBottom(); 
    });     
  } else if (level === 2) {
    tube.mouseover(function() {
        $('#craftsman').hide();
        var craftsman = getCraftsman(this, MESSAGE, NAME);

        this.timer = setTimeout(function() {
            $('#craftsman').html(craftsman.html); 
            $('#craftsman').css(craftsman.css).fadeIn(500);
          }, 500);                                                      
        tube.attr({'cursor':'pointer'}).animate({'scale': 1.5}, duration, 'elastic').toTop(); 
    });
    tube.mouseout(function() { 
        $('#craftsman').hide(); 
        clearTimeout(this.timer);
        tube.animate({'scale': 1}, duration, 'elastic');
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
    var i, j,
        bottomX = Math.floor(WIDTH / BOTTOM_TUBE_SIZE),
        bottomY = Math.floor(VISUAL_HEIGHT / BOTTOM_TUBE_SIZE),
        middleX = Math.floor(WIDTH / MIDDLE_TUBE_SIZE),
    middleY = Math.floor(VISUAL_HEIGHT / MIDDLE_TUBE_SIZE),  // reduce the horizontal line
      topX = Math.floor(WIDTH / BOTTOM_TUBE_SIZE),
      topY = Math.floor(VISUAL_HEIGHT / TOP_TUBE_SIZE);

      /////////////////////////////////////////////////////////////////////
      // Draw the honeycomb
      ////////////////////////////////////////////////////////////////////
      // 1st level
      for (i = 0; i < bottomX; i++) {
        for (j = 0; j < bottomY; j++) {
          if($.inArray(i + '' + j, BOTTOM_BLACKLIST) < 0) {
            setTube(0, i, j);
          }
        }
      }

      // 2nd level
      for (i = 0; i < middleX; i++) {
        for (j = 0; j < middleY; j++) {
          if ($.inArray(i + '' + j, MIDDLE_BLACKLIST) < 0) {
            setTube(1, i, j);
          }
        }
      }            

      /*
      // 3rd level
      for (i = 0; i < topX; i++) {
        for (j = 0; j < topY; j++) {
          if ($.inArray(i + '' + j, TOP_BLACKLIST) < 0) {
            setTube(2, i, j);
          }
        }
      }*/

      //////////////////////////////////////////////////////////////////
      // Adjuct compatibility issues
      //////////////////////////////////////////////////////////////////
      // IE 6
      if ($.browser.msie && $.browser.version == 6.0) {
        $('label#forAvatar').css({'top':'8px'});
        $('fieldset.fileinput').css({'left':'0px', 'top':'-20px'});
        //$('#popup').css({'filter': 'alpha(opacity: 0.5)'});
      }

      // Opera
      if ($.browser.opera === 'Opera') {
        $('label#forAvatar').css({'top':'8px'});
        $('fieldset.fileinput').css({'left':'0px', 'top':'-20px'});     
      }

  });


  $('#applyButton').click(function() {
      $('.popover').fadeIn(100);
  });

  // When user click on the close button
  $('.popover img.requestClose').click(function() {
      $('.popover').fadeOut(100);
  });                                                     

  $('.popover img.feedbackClose').click(function() {
      $('.popover').fadeOut(100);
  });

	Placeholder.init();

  $('.popover div#request div.detail form.request fieldset textarea.selfIntro').keydown(function() {
      $('.popover div#request div.detail form.request fieldset strong.selfIntroError').hide();
      var left, exceed, inputs = $(this).val().length;

      if (inputs >= SELFINTRO_LENGTH) {
        exceed = inputs - SELFINTRO_LENGTH;
        $('strong.selfIntroCounter').html('最多140字，已超出' + exceed + '字').show();
      } else {
        left = SELFINTRO_LENGTH - inputs;
        $('strong.selfIntroCounter').html('最多140字，还剩' + left + '字').show();
      }
  });