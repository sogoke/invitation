/* compatibility adjustment based on browser version */

$(document).ready(function() {
    var BD = sogoke.BrowserDetect;

    //BD.init();
    //alert(BD.version);

    // IE 6
    if (BD.browser === 'Explorer' && BD.version == 6) {
      $('label#forAvatar').css({'top':'8px'});
      $('fieldset.fileinput').css({'left':'0px', 'top':'-20px'});
      //$('#popup').css({'filter': 'alpha(opacity: 0.5)'});
    }
    else if (BD.browser === 'Explorer' && BD.version == 7) {
    }
    else if (BD.browser === 'Explorer' && BD.version == 8) {
    }
    // Firefox 4
    else if (BD.browser === 'Firefox' && BD.version == 4) {
    }
    // Firefox 5
    else if (BD.browser === 'Firefox' && BD.version == 5) {
      $('label#forAvatar').css({'top':'8px'});
      $('fieldset.fileinput').css({'left':'0px', 'top':'-20px'});
    }
    // Chrome 15
    else if (BD.browser === 'Chrome' && BD.version == 15) {
      //
    }
    // Opera
    else if (BD.browser === 'Opera') {
      $('label#forAvatar').css({'top':'8px'});
      $('fieldset.fileinput').css({'left':'0px', 'top':'-20px'});     
    } else {
      //
    }
});
