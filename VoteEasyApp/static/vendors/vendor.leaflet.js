/** 

  Vendor : Leaflet (maps)
  https://github.com/Leaflet/Leaflet

**/
let Vendor__Leaflet = {

  /* 
    Selector
  */
  selector: '[data-leaflet]',


  /* 
    Vendor Default Config
  */
  config: {},


  /* 
    Vendor Init
  */
  init: function() {


    if( typeof L === 'undefined' ) {
      console.log('Leaflet : Vendor Core Missing!');
      return;
    }


    // ++ ++ ++ ++ ++
    // ++ ++ ++ ++ ++


    document.querySelectorAll( this.selector ).forEach(function(el) {

      // ignore multiple bind -- -- -- -- -- -- -- -- --
      if( el.classList.contains('js-leaflet') ) return;
          el.classList.add('js-leaflet');
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

      let conf = el.getAttribute('data-leaflet');
          conf = conf ? JSON.parse( conf ) : {};

      /* icon */
      let customIcon = L.icon({
          iconUrl:    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAMAAAD3TXL8AAAB5lBMVEVHcEwtbZk5hLcubZgubZkyeak4fq8zbaEwcqEtcqQubZsvbpoyaZYua5cubJcubJcubJgtbZk+h7ovbp01eqwtbJovbpo3gbc0d6gydKZHjsEubJk2gLIwb58tbJk2frQua5dIkcREjL43g7RGkMIvb5wubJctbJktbJkzd6o0eKc/hrU4grgzd6gxdKMzdqcxdKQ1dqY2frA2frA4gbQ4gbU2frA3gbQ3grc2fbA2fbA1e6s9grQ1fKw+hbw5g7g5g7c2g7YwdJ88grX///8uhctHmNEhesk/ks8rgssshMtElc8ogMoxh8wpgcpFl9A2jM0whswlfsoeeMkmf8o2ic4jfMpClM9Bk88ziM05jc5Dk9E0isxJltJZotU6js5AkNBEjMBKmNIzhM1Un9U8kc47f687i89XoNROm9Madcj8/f5JmdE2gb5SntM/isVQmcxLlc8rgMwwerdLlMpDjMQ5eKU3dqNCib0+jtAwcZ5cpNROlspQndNHldJfptdHkctHi7tChbNFlNGPtc5ek7igwNZDh7i2zt7e6fE8h8Q6hcJWntEvg8wyfbtTnM8xhM44i81Lm9E4grZKkcVJgqo1e6zB1eJunb2FrcnR3+qrxdeBrMqXudFQirRYoNAwgMg+hbuAcFJ8AAAARHRSTlMA7/hT+BP2AfYIzEsNh2Zyeen09/YY/i729v/0+PbkHlv6+Cf5g0Ld1jxx9oyvwOfx9EfwzNJRgni0vlv6Zf7o5EKA+QUIjyQAAAJISURBVBgZdcCFQuIAGADgnxxht2d313XnHHjKOeWmbpONGp1hBnZnXFe86W1MDjA+SFGUvipVwBUNnS/PpQXS8xedpZAOeShtDDHLy8sLx3XSBwgkITV3Cw4Y+9KZ72zJzvwuuNcAF25XNi4EsKTAQl3lfUhQ3AkxvuEUHxNS1oDgUb1rUIQNilz1j4H3ROnCxnk+O+Ni7L5xHuZSPgNQFy26J3jug1XHJ8fq8dIEz71YpIY2pV3Ps4YcP3a9uxuORaueZ1e2QXuHm+O4icDaFirYcQTGOY5zd7RDlwXjOG74wy8vmrB5C+M4DrN0QU+MZlnWNPsVFf3ctrIsS8d6oDempyjKtL2BirbWrBRF6WO90G2hcRynLZuo6MvsOo7jtKUbmp7GcRxnw9OfUcG3mTCH43j8zWvQ9lknebRl5rsX9e5Mz65P8qx9WiguCZ+SJEnEp6bnP87PTJkIkiRPwyXFAJq/ZoNgzrQytWIyGwTm5xoAkKnihpEEwkkYRgSGuEoGAGpJkOrPRAXzEeBlF9FvM/TTZbkgKJYHiYF0RFCugITsMvO7NAPm8mwQKeR75FAKsVeRBReayueG3icNzanyICmrYt82mkTuS7LgvzyVc3RMNOpU5UKKWuI/0Ylsfoka0uSqnGM6wZhTlQPp1Pn+Q6Pg0J+vhgw5VYTOaDTqiKocyIRUH0U8Hk/kqBqBS2oLbUaP0VZYC5chLdGIJxJtQeAKWaFNZ5PL4CqkNXoSbYXraOV/5Fq4lmZeA9drLmmGG+RBmn9TM85gFMKHmQAAAABJRU5ErkJggg==',
          shadowUrl:  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC',

          iconSize:     [25, 41], /* size of the icon */
          shadowSize:   [41, 41], /* size of the shadow */
          iconAnchor:   [10, 40], /* iconSize - 15 , iconSize - 1 */
          shadowAnchor: [10, 39], /* shadowSize - 32 , shadowSize - 2 */
          popupAnchor:  [3, -26]  /* well, calibrate until you get the correct position */
      });


      /* tiles */
      /* http://leaflet-extras.github.io/leaflet-providers/preview/index.html */
      switch(conf.map_tile || '') {

        case 'gray':    var _tile = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
                        break;

        case 'carto':   var _tile = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
                        break;

        case 'voyager': var _tile = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
                        break;

        case 'hot':     var _tile = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
                        break;

        case 'wstreet': var _tile = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
                        break;

        default:        var _tile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                        break;

      };

      /* create the tile layer with correct attribution */
      let osmAttrib   = '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
      let leafletUrl  = '<a href="https://leafletjs.com/">Leaflet</a>';
      let osm         = new L.TileLayer(_tile, {minZoom: 3, maxZoom: 18, attribution: osmAttrib});    
      let mapArr      = [];
      let _rand       = Math.random().toString(36).substring(7);

      /* set up the map */
      let map = new L.Map(el);
          map.addLayer(osm);
          map.attributionControl.setPrefix( leafletUrl );   /* Leaflet copyright with target="_blank" */

      /* push markers */
      for(let i=0; i < conf.map_marker.length; ++i) {

        let map_lat   = Number(conf.map_marker[i]['map_lat'])    || 0;
        let map_lang  = Number(conf.map_marker[i]['map_long'])   || 0;
        let map_popup = conf.map_marker[i]['map_popup'].replace(/`/g, '"');

        /* add marker */
        mapArr[_rand] = L.marker([map_lat, map_lang], {icon: customIcon}).addTo(map);

        if(i == 0) /* center map to first marker */
          map.setView(new L.LatLng(map_lat, map_lang), Number(conf.map_zoom || 9));

        /* add popup */
        if( map_popup )
          mapArr[_rand].bindPopup(L.popup({maxWidth:300, autoClose:false, autoPan:false}).setContent(map_popup)).openPopup();

      }

    });

  },

};

Vendor__Leaflet.init();