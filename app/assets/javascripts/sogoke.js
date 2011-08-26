/* Some object method used in project sogoke */

(function(global) {
    var sogoke = sogoke || {};

     // Create new cookie
    sogoke.createCookie = function(name,value,days) {
      var expires, date;
      if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days * 3600 * 24));
        expires = "; expires="+date.toGMTString();
      } else {
        expires = "";
      }

      document.cookie = name+"="+value+expires+"; path=/";
    };

    // Read cookie
    sogoke.readCookie = function(name) {
      var i, c, ca, nameEQ = name + "=";
      ca = document.cookie.split(';');
      for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
          c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
          }
        }
      }
      return null;
    };

    // delete cookie
    sogoke.eraseCookie = function(name) {
      utils.createCookie(name,"",-1);
    };                        

    // Browser information detector
    sogoke.BrowserDetect = {
      init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
      },
      searchString: function (data) {
        for (var i=0;i<data.length;i++)	{
          var dataString = data[i].string;
          var dataProp = data[i].prop;
          this.versionSearchString = data[i].versionSearch || data[i].identity;
          if (dataString) {
            if (dataString.indexOf(data[i].subString) != -1) {
              return data[i].identity;
            }
          }
          else if (dataProp) {
            return data[i].identity;
          }
        }
      },
      searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) { return; }
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
      },
      dataBrowser: [
        {
          string: navigator.userAgent,
          subString: "Chrome",
          identity: "Chrome"
        },
        {string: navigator.userAgent,
          subString: "OmniWeb",
          versionSearch: "OmniWeb/",
          identity: "OmniWeb"
      },
      {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
      },
      {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
      },
      {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
      },
      {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
      },
      {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      },
      {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
      },
      {// for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE"
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    },
    {// for older Netscapes (4-)
    string: navigator.userAgent,
    subString: "Mozilla",
    identity: "Netscape",
    versionSearch: "Mozilla"
  }
],
dataOS : [
  {
    string: navigator.platform,
    subString: "Win",
    identity: "Windows"
  },
  {
    string: navigator.platform,
    subString: "Mac",
    identity: "Mac"
  },
  {
    string: navigator.userAgent,
    subString: "iPhone",
    identity: "iPhone/iPod"
  },
  {
    string: navigator.platform,
    subString: "Linux",
    identity: "Linux"
  }
]
};

  sogoke.BrowserDetect.init();

   global.sogoke  = sogoke;

})(window);
