/** 

  Vendor : Chart.js
  https://www.chartjs.org/

**/
let Vendor__Chartjs = {

  /* 
    Selector
  */
  selector: '[data-chartjs]',

  /* 
    Vendor Init
  */
  init: function() {


    if( typeof Chart === 'undefined' ) {
      console.log('Chart.js : Vendor Core Missing!');
      return;
    }


    // ++ ++ ++ ++ ++
    // ++ ++ ++ ++ ++


    /* 
      Init
      Save as image
    */
    this.saveAsImg();


    document.querySelectorAll( this.selector ).forEach(function(el) {

      // ignore multiple bind -- -- -- -- -- -- -- -- --
      if( el.classList.contains('js-chartjs') ) return;
          el.classList.add('js-chartjs');
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


      /* 
        Variables
      */
      let ID            = el.getAttribute('id');
      let conf          = el.getAttribute('data-chartjs');
          conf          = conf ? JSON.parse( conf ) : {};
      

      /* 
        ID
      */
      if( !ID ) {
        ID = 'r_' + Math.random().toString(36).substring(7);
        el.setAttribute('id', ID);
      }


      /* 
        Fix
        Responsive height
      */
      let height = el.getAttribute('height');
      if( height ) el.style.maxHeight = height+'px';



      /* 
        Fix
        Legend Spacing
      */
      Chart.Legend.prototype.afterFit = function() {
        this.height += 30;
      };



      /* 
        Render
      */
      let ctx = document.getElementById( ID ).getContext('2d');
      let chr = new Chart(ctx, merge_recursive( {

                                                  data: {
                                                    datasets: [],
                                                  },


                                                  // Default options
                                                  // used by Quick chartjs
                                                  options: {

                                                    responsive: true,
                                                    maintainAspectRatio: false,

                                                    hover: {
                                                      mode: 'index'
                                                    },

                                                    legend: {
                                                      display: true,
                                                      position: 'top',
                                                      rtl: window['direction'] == 'rtl' ? true : false
                                                    },

                                                    elements: {
                                                      point:{
                                                        radius: 3
                                                      }
                                                    },

                                                    scales: {

                                                      xAxes: [{
                                                        display: true,
                                                        scaleLabel: {
                                                          display: false,
                                                          labelString: '', // Month
                                                          fontSize: 14
                                                        },

                                                        gridLines: {
                                                          display: true,
                                                          color: '#f8f9fa'
                                                        },

                                                        ticks: {
                                                          display: true,
                                                          beginAtZero: true,
                                                          fontColor: '#999999',
                                                          fontSize: 13,
                                                          padding: 10
                                                        },
                                                      }],

                                                      yAxes: [{
                                                        display: true,
                                                        scaleLabel: {
                                                          display: false,
                                                          labelString: '', // Value
                                                          fontSize: 14,
                                                        },

                                                        gridLines: {
                                                          display: true,
                                                          color: '#dddddd',
                                                          borderDash: [2, 3],
                                                          zeroLineBorderDash:[2, 3],
                                                          zeroLineWidth: 1,
                                                        },

                                                        ticks: {
                                                          display:      true,
                                                          beginAtZero:  true,
                                                          fontColor:    '#999999',
                                                          fontSize:     13,
                                                          padding:      10
                                                        }
                                                      }]

                                                    },

                                                    title: {
                                                      display:  false,
                                                      text:     '',
                                                      fontSize: 16,
                                                    },

                                                    tooltips: {
                                                      enabled: true,
                                                      intersect: false,
                                                      mode: 'nearest',
                                                      bodySpacing: 5,
                                                      yPadding: 10,
                                                      xPadding: 15, 
                                                      caretPadding: 10,
                                                      displayColors: false,
                                                      backgroundColor: '#121212',
                                                      titleFontColor: '#ffffff', 
                                                      cornerRadius: 4,
                                                      footerSpacing: 0,
                                                      titleSpacing: 0,
                                                      rtl: window['direction'] == 'rtl' ? true : false
                                                    },

                                                    layout: {
                                                      padding: {
                                                        left:   0,
                                                        right:  0,
                                                        top:    0,
                                                        bottom: 0
                                                      }
                                                    }

                                                  },

                                                }, conf ) );

    });

  },


  /* 
    Save as Image
  */
  saveAsImg: function() {

    document.querySelectorAll('[data-chartjs-save]').forEach(function(el) {

      el.addEventListener('click', function(e) {
        e.preventDefault();

      let conf          = el.getAttribute('data-chartjs-save');
          conf          = conf ? JSON.parse( conf ) : {};

        // we use filesaver to be able to save a custom file name
        var canvas = document.getElementById( conf.chartId );
        if( !canvas || typeof saveAs === 'undefined' ) return;

        // Background Color
        // ++ ++ ++ ++ ++
          if( conf.bgcolor ) {
            // Get the 2D drawing context from the provided canvas.
            const context = canvas.getContext('2d');

            // We're going to modify the context state, so it's
            // good practice to save the current state first.
            context.save();

            // Normally when you draw on a canvas, the new drawing
            // covers up any previous drawing it overlaps. This is
            // because the default `globalCompositeOperation` is
            // 'source-over'. By changing this to 'destination-over',
            // our new drawing goes behind the existing drawing. This
            // is desirable so we can fill the background, while leaving
            // the chart and any other existing drawing intact.
            // Learn more about `globalCompositeOperation` here:
            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
            context.globalCompositeOperation = 'destination-over';

            // Fill in the background. We do this by drawing a rectangle
            // filling the entire canvas, using the provided color.
            context.fillStyle = conf.bgcolor || "white";
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Restore the original context state from `context.save()`
            context.restore();
          }
        // ++ ++ ++ ++ ++

        canvas.toBlob(function(blob) {
            saveAs(blob, conf.fileName + ".png");
        });

      });

    });

  }

};

Vendor__Chartjs.init();
/** 

  Vendor : Embla Carousel [Agnostic]
  https://davidcetinkaya.github.io/embla-carousel/

**/
let Vendor__Embla = {

  /* 
    Selector
  */
  selector: '[data-embla]',

  /* 
    Vendor Init
  */
  init: function() {


    if( typeof EmblaCarousel === 'undefined' ) {
      console.log('Embla Carousel : Vendor Core Missing!');
      return;
    }


    // ++ ++ ++ ++ ++
    // ++ ++ ++ ++ ++


    var config = this.config;
    document.querySelectorAll( this.selector ).forEach(function( el ) {

      // ignore multiple bind -- -- -- -- -- -- -- -- --
      if( el.classList.contains('js-embla') ) return;
          el.classList.add('js-embla');
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


      /* 
        Variables
      */
      let ID        = el.getAttribute('id');
      let conf      = el.getAttribute('data-embla');
          conf      = conf ? JSON.parse( conf ) : {};


      /* 
        ID
      */
      if( !ID ) {
        ID = 'r_' + Math.random().toString(36).substring(7);
        el.setAttribute('id', ID);
      }


      /* 
        Init Carousel
      */
      const viewPort  = el.querySelector(".embla__viewport");
      const prevBtn   = el.querySelector(".embla__button--prev");
      const nextBtn   = el.querySelector(".embla__button--next");
      const embla     = EmblaCarousel(viewPort, Object.assign({ 
                                              // https://davidcetinkaya.github.io/embla-carousel/api#options
                                              loop:             false, 
                                              slidesToScroll:   1,
                                              dragFree:         false,
                                              containScroll:    "trimSnaps",
                                              axis:             "x",
                                              direction:        (window['direction'] == 'rtl') ? 'rtl' : 'ltr'
                                            }, conf) );


      /* 
        Autoplay 
          & Next/Prev
      */
      Vendor__Embla.autoPlay(embla, conf, prevBtn, nextBtn);


      /* 
        Dot Buttons
      */
      Vendor__Embla.dotButtons(el, embla);


      /* 
        Progress Bar
      */
      Vendor__Embla.progressBar(el, embla);


      /* 
        Thumbs carousel
        Linked to main carousel
      */
      Vendor__Embla.thumbsCarousel(embla, conf);


      /* 
        Thumbs carousel
        Linked to main carousel
      */
      Vendor__Embla.lazyLoad(embla);

    });

  },


  /* 
    Autoplay
  */
  autoPlay: function(embla, conf, prevBtn, nextBtn) {

    const emblaAutoPlay = (embla, interval) => {
      let timer = 0;
      const play = () => {
        stop();
        requestAnimationFrame(() => (timer = window.setTimeout(next, interval)));
      };
      const stop = () => {
        window.clearTimeout(timer);
        timer = 0;
      };
      const next = () => {
        if (embla.canScrollNext()) {
          embla.scrollNext();
        } else {
          embla.scrollTo(0);
        }
        play();
      };
      return { play, stop };
    };
    const listenForPrevBtnClick = (btn, embla, autoplayer) => {
      const scrollPrev = () => {
        autoplayer.stop();
        embla.scrollPrev();
      };
     
      if( prevBtn ) btn.addEventListener("click", scrollPrev, false);
    };

    const listenForNextBtnClick = (btn, embla, autoplayer) => {
      const scrollNext = () => {
        autoplayer.stop();
        embla.scrollNext();
      };
      
      if( nextBtn ) btn.addEventListener("click", scrollNext, false);
    };

    const disablePrevNextBtns = (prevBtn, nextBtn, embla) => {
      return () => {
        if (embla.canScrollPrev()) prevBtn.removeAttribute('disabled');
        else prevBtn.setAttribute('disabled', 'disabled');

        if (embla.canScrollNext()) nextBtn.removeAttribute('disabled');
        else nextBtn.setAttribute('disabled', 'disabled');
      };
    };

    if( !conf.autoPlay || parseInt(conf.autoPlay) < 1 ) conf.autoPlay = 86400000; //  a day :)
    const autoplayer = emblaAutoPlay( embla, parseInt(conf.autoPlay) );

    embla.on("pointerDown", autoplayer.stop);
    embla.on("init", autoplayer.play);

    if( prevBtn && nextBtn ) {
      listenForPrevBtnClick(prevBtn, embla, autoplayer);
      listenForNextBtnClick(nextBtn, embla, autoplayer);

      const disablePrevAndNextBtns = disablePrevNextBtns(prevBtn, nextBtn, embla);
      embla.on("select", disablePrevAndNextBtns);
      embla.on("init", disablePrevAndNextBtns);
    }
    // --

  },


  /* 
    Dot Buttons
  */
  dotButtons: function(el, embla) {

    if( !el.querySelector('.embla__dots') || !el.querySelector('.embla__dots_template') )
      return;

    const setupDotBtns = (dotsArray, embla) => {
      dotsArray.forEach((dotNode, i) => {
        dotNode.addEventListener("click", () => embla.scrollTo(i), false);
      });
    };

    const generateDotBtns = (dots, embla) => {
      const template = el.querySelector('.embla__dots_template').innerHTML;
      dots.innerHTML = embla.scrollSnapList().reduce(acc => acc + template, "");
      return [].slice.call(dots.querySelectorAll(".embla__dot"));
    };

    const selectDotBtn = (dotsArray, embla) => () => {
      const previous = embla.previousScrollSnap();
      const selected = embla.selectedScrollSnap();
      dotsArray[previous].classList.remove("is-selected");
      dotsArray[selected].classList.add("is-selected");
    };

    const dots = el.querySelector('.embla__dots');
    const dotsArray = generateDotBtns(dots, embla);
    const setSelectedDotBtn = selectDotBtn(dotsArray, embla);
    setupDotBtns(dotsArray, embla);
    embla.on("select", setSelectedDotBtn);
    embla.on("init", setSelectedDotBtn);
    // --

  },


  /* 
    Progress Bar
  */
  progressBar: function(el, embla) {

    if( !el.querySelector('.embla__progress__bar') )
      return;

    const updateProgressBar = (progressBar, embla) => () => {
      const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
      progressBar.style.transform = `translateX(${progress * 100}%)`;
    };
    const progressBar = el.querySelector('.embla__progress__bar');
    const updateProgress = updateProgressBar(progressBar, embla);
    embla.on("scroll", updateProgress);

  },


  /* 
    Thumbs carousel
  */
  thumbsCarousel: function(embla, conf) {

    if( !conf.thumbCarouselId || !document.getElementById( conf.thumbCarouselId ) )
      return;

    const onThumbClick = (embla, thumbCarousel, index) => () => {
      if (!thumbCarousel.clickAllowed()) return;
      embla.scrollTo(index);
    };

    const followembla = (embla, thumbCarousel) => () => {
      thumbCarousel.scrollTo(embla.selectedScrollSnap());
      selectThumbBtn(embla, thumbCarousel);
    };

    const selectThumbBtn = (embla, thumbCarousel) => {
      const previous = embla.previousScrollSnap();
      const selected = embla.selectedScrollSnap();
      thumbCarousel.slideNodes()[previous].classList.remove("is-selected");
      thumbCarousel.slideNodes()[selected].classList.add("is-selected");
    };


    const thumbCarouselWrap = document.getElementById( conf.thumbCarouselId );
    const thumbCarouselView = thumbCarouselWrap.querySelector(".embla__viewport");
    const thumbCarousel = EmblaCarousel(thumbCarouselView, {
      selectedClass: "",
      containScroll: "keepSnaps"
    });

    thumbCarousel.slideNodes().forEach((thumbNode, index) => {
      const onClick = onThumbClick(embla, thumbCarousel, index);
      thumbNode.addEventListener("click", onClick, false);
    });

    const syncThumbCarousel = followembla(embla, thumbCarousel);
    embla.on("select", syncThumbCarousel);
    thumbCarousel.on("init", syncThumbCarousel);
    // --

  },


  /* 
    Lazy Lod
  */
  lazyLoad: function(embla) {

    const lazyLoad = embla => {
      const slides = embla.slideNodes();
      const images = slides.map(slide => slide.querySelector("img[data-src]"));
      const imagesInView = [];

      const addImageLoadEvent = (image, callback) => {
        if( image ) {
          image.addEventListener("load", callback);
          return () => image.removeEventListener("load", callback);
        }
      };

      const loadImagesInView = () => {
        embla
          .slidesInView(true)
          .filter(index => imagesInView.indexOf(index) === -1)
          .forEach(loadImageInView);
      };

      const loadImageInView = index => {
        const image = images[index];
        const slide = slides[index];
        imagesInView.push(index);

        if( image )
          image.src = image.getAttribute("data-src");

        const removeImageLoadEvent = addImageLoadEvent(image, () => {
          slide.classList.add("has-loaded");
          removeImageLoadEvent();
        });
      };

      return () => {
        loadImagesInView();
        return imagesInView.length === images.length;
      };
    };


    const loadImagesInView = lazyLoad(embla);
    const loadImagesInViewAndDestroyIfDone = eventName => {
      const loadedAll = loadImagesInView();
      if (loadedAll) embla.off(eventName, loadImagesInViewAndDestroyIfDone);
    };

    embla.on("init", loadImagesInViewAndDestroyIfDone);
    embla.on("select", loadImagesInViewAndDestroyIfDone);
    embla.on("resize", loadImagesInViewAndDestroyIfDone);

  }

};

Vendor__Embla.init();
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
/** 

  Vendor : Photoswipe
  https://github.com/dimsemenov/PhotoSwipe

**/
let Vendor__Photoswipe = {

  /* 
    Selector
  */
  selector: '.photoswipe',


  /* 
    Vendor Default Config
  */
  config: {

    galleryOpen:          function (gallery) {},
    showHideOpacity:      false,
    history:              false,
    captionEl:            false,
    shareEl:              false,
    tapToClose:           false,
    tapToToggleControls:  false,
    escKey:               true,
    barsSize:             { top:0, bottom:0 },

  },


  /* 
    Vendor Init
  */
  init: function() {


    if( typeof PhotoSwipe === 'undefined' ) {
      console.log('PhotoSwipe : Vendor Core Missing!');
      return;
    }


    // ++ ++ ++ ++ ++
    // ++ ++ ++ ++ ++


    // Template
    this.TPL();

    // Variables
    var TPL             = document.querySelector(".pswp");
    var phswCollection  = {};
    var instance        = [];

    let config          = this.config;
    let nodeList        = document.querySelectorAll( this.selector );


    // ++ ++ ++ ++ ++
    // ++ ++ ++ ++ ++


    // Create group arrays
    nodeList.forEach(function( el ) {

      // ignore multiple bind -- -- -- -- -- -- -- -- --
      if( el.classList.contains('js-init-pswp') ) return;
          el.classList.add('js-init-pswp');
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

      let href        = el.getAttribute('href'); if(!href) return;
      let phswGroup   = el.getAttribute('data-group') || Math.random().toString(36).substring(7);
          phswGroup     = phswGroup.replace(/[!@#$%^&*(){}\[\]+-,.'"|\/\\]/ig, '').replace(/ /gi, '_').toLowerCase();
          el.setAttribute('data-group-id', phswGroup);


      if(typeof phswCollection[phswGroup] === 'undefined')
        phswCollection[phswGroup] = [];

      phswCollection[phswGroup].push({
        src:    href,
        title:  el.getAttribute('title'),
        w:      0,
        h:      0
      });

    });


    // ++ ++ ++ ++ ++
    // ++ ++ ++ ++ ++


    // Item click
    nodeList.forEach(function( el ) {

      // ignore multiple bind -- -- -- -- -- -- -- -- --
      if( el.classList.contains('js-init-pswp-click') ) return;
          el.classList.add('js-init-pswp-click');
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

      el.addEventListener('click', function(e) {
        e.preventDefault();

        // Show Preloader (margin issues)
        // document.querySelector('.pswp__preloader').classList.add('pswp__preloader--active');

        // config.index = e.target.getAttribute('data-index') || 0;

        let groupId = e.target.getAttribute('data-group-id') || 0;
        instance[groupId] = new PhotoSwipe(TPL, PhotoSwipeUI_Default, phswCollection[groupId], config);
        instance[groupId].init();


        // ++ ++ ++ ++ ++


        instance[groupId].listen('initialZoomInEnd', function() {
          config.galleryOpen( instance[groupId] );
        });

        instance[groupId].listen('imageLoadComplete', function(index, item) {
          loadImg( index, item );
        });

        instance[groupId].listen('gettingData', function(index, item) {
          loadImg( index, item );
        });

        instance[groupId].listen('resize', function(index, item) {
          resizeItem( item );
        });


        // ++ ++ ++ ++ ++


        function loadImg(index, item) {

          if (item.w == 0 && item.h == 0) {

            let imgpreload        = new Image(); 
                imgpreload.src    = item.src;
                imgpreload.onload = function() {

                  item.w            = this.width;
                  item.h            = this.height;
                  item.needsUpdate  = true;
                  instance[groupId].updateSize(true);

                };

          }

        }

        function resizeItem(item) {

          /* ununsed */

        }

      });

    });

  },


  /* 
    Template
  */
  TPL: function() {

    // avoid duplicates
    if( document.querySelector('pswp') )
      return;

    // button icons
    let btn_close = '<svg height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>';
    let btn_left  = '<svg height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path></svg>';
    let btn_right = '<svg height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg>';

    /**
      
      https://photoswipe.com/documentation/getting-started.html

      Order of pswp__bg, pswp__scroll-wrap, pswp__container 
      and pswp__item elements should not be changed.

    **/
    document.body.insertAdjacentHTML( 'beforeend', 

      // Root element of PhotoSwipe. Must have class 'pswp'
      '<div class="pswp text-gray-600" tabindex="-1" role="dialog" aria-hidden="true">'

         // + ' <!-- Background of PhotoSwipe. It`s a separate element as animating opacity is faster than rgba(). -->'
          + '<div class="pswp__bg bg-transparent overlay overlay-opacity-50"></div>'

          // + '<!-- Slides wrapper with overflow:hidden. -->'
          + '<div class="pswp__scroll-wrap">'

              // + '<!-- Container that holds slides. PhotoSwipe keeps only 3 of them in the DOM to save memory. Don`t modify these 3 pswp__item elements, data is added later on. -->'
              + '<div class="pswp__container">'
                + ' <div class="pswp__item"></div>'
                + '<div class="pswp__item"></div>'
                + '<div class="pswp__item"></div>'
              + '</div>'

              // + ' <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->'
              + ' <div class="pswp__ui pswp__ui--hidden">'

                  + '<div class="pswp__top-bar">'

                      + '<div class="pswp__counter start-0"></div>'
                      // + ' <button class="pswp__button pswp__button--close btn m-3 float-end d-inline-block" onclick="alert(\'muie\')" aria-label="Close (Esc)">' + btn_close + '</button>'
                      // + ' <button class="pswp__button pswp__button--share btn mt-3 float-end d-inline-block" aria-label="Share"></button>'

                    // + ' <button class="pswp__button pswp__button--fs btn m-3 float-end d-inline-block" aria-label="Toggle fullscreen"></button>'
                    // + ' <button class="pswp__button pswp__button--zoom btn m-3 float-end d-inline-block" aria-label="Zoom in/out"></button>'

                    // + '<!-- element will get class pswp__preloader--active when preloader is running -->'
                     + ' <div class="pswp__preloader pswp__preloader--active">'
                          + '<div class="pswp__preloader__icn">'
                            + '<div class="pswp__preloader__cut">'
                              + '<div class="pswp__preloader__donut">'

                    // loader
                    + '<div class="position-fixed fixed-bottom w-100 mb-3 text-center shadow-none" style="z-index:9999;">'
                      + '<span class="bg-white d-inline-block line-height-1 lh-1 p-3 rounded-circle shadow-lg">'
                        + '<i class="spinner-grow spinner-grow-sm text-muted" style="font-size:30px"></i>'
                      + '</span>'
                    + '</div>'
                    // loader

                              + '</div>'
                            + '</div>'
                          + '</div>'
                      + '</div>'
                  + '</div>'



                  + '<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">'
                      + '<div class="pswp__share-tooltip"></div> '
                  + '</div>'

                  // + '<button class="pswp__button--custom pswp__button pswp__button--arrow--left btn bg-transparent text-white rounded-circle p-0 m-3 shadow-none position-absolute start-0 text-gray-500" aria-label="Previous (arrow left)">' + btn_left + '</button>'
                  // + '<button class="pswp__button--custom pswp__button pswp__button--arrow--right btn bg-transparent text-white rounded-circle p-0 m-3 shadow-none position-absolute end-0 text-gray-500" aria-label="Next (arrow right)">' + btn_right + '</button>'

                  + '<div class="pswp__caption">'
                      + '<div class="pswp__caption__center"></div>'
                  + '</div>'

              + '</div>'

         + ' </div>'

      + '</div>'

    );

  
    // Additional Custom CSS
    document.head.insertAdjacentHTML( 'beforeend', 

        '<style>'

          // -- -- -- -- -- -- -- -- --
          // addEventListener()
          // -- --
          // javascript subelements click issue
          // wrong bind if a button has an icon/svg only
          // -- -- -- -- -- -- -- -- --
          + 'a.photoswipe:not(.d-block) { display:inline-block; }'
          + '.photoswipe > * { pointer-events: none; display:inline-block; }'
          // -- -- -- -- -- -- -- -- --

          + '.pswp__element--disabled { display: none !important; }'
          + '.pswp__ui--over-close .pswp__button--close { opacity: 1; }'
          + '.pswp__button, .pswp__button--custom { width:50px !important; height: 50px !important; }'
          + '.pswp__button {cursor: pointer;overflow: visible;-webkit-appearance: none;display: block;border: 0;padding: 0;margin: 0;opacity: .75;box-shadow: none; }'
          + '.pswp__button--arrow--left, .pswp__button--arrow--right { background: none; top: 50%; margin-top: -50px; width: 70px; height: 100px; }'
          + '.pswp__ui--one-slide .pswp__button--arrow--left, .pswp__ui--one-slide .pswp__button--arrow--right, .pswp__ui--one-slide .pswp__counter { display: none; }'

          /* top bar */
          + '.pswp__top-bar { position: absolute; left: 0; top: 0; height: 44px; width: 100%; }'
          + '.pswp__counter {position: absolute;top: 0;height: 44px;line-height: 44px;font-size: 13px;color: #212529;opacity: .75;padding: 0 10px;}'

          /* elements visible on hover */
          + '.pswp__ui--idle .pswp__button--arrow--left, .pswp__ui--idle .pswp__button--arrow--right, .pswp__ui--idle .pswp__top-bar { opacity: 0; }'
          + '.pswp--has_mouse .pswp__button--arrow--left, .pswp--has_mouse .pswp__button--arrow--right, .pswp__caption, .pswp__top-bar { -webkit-backface-visibility: hidden; will-change: opacity; transition: opacity 333ms cubic-bezier(.4,0,.22,1); }'

          /* preloader */
          + '.pswp__preloader {display: none}'
          + '.pswp__preloader--active { display: inherit; }'

          /* image shadow */
          + '.pswp__img { border-radius: .5rem; box-shadow:0 0 35px rgba(80,102,144,.15)!important; }'

      + '</style>'

    );

  }

};

Vendor__Photoswipe.init();
/** 

  Vendor : Swiper
  https://github.com/nolimits4web/swiper

**/
let Vendor__Swiper = {

  /* 
    Selector
  */
  selector: '[data-swiper]',


  /* 
    Vendor Default Config
  */
  config: {

    init              : true,
    direction         : 'horizontal', // horizontal, vertical
    spaceBetween      : 15,
    slidesPerView     : 1, // number, 'auto'
    slidesPerGroup    : 1,
    slidesPerColumn   : 1,
    centeredSlides    : false,
    effect            : 'slide', // slide, fade, flip, cubeEffect, coverflowEffect
    grabCursor        : false,
    freeMode          : false, // scroll free, don't stop to next one
    loop              : false,
    autoHeight        : false,
    mousewheel        : false,
    speed             : 600,
    parallax          : true,
    lazy              : false, // enable lazy loading
    zoom              : false,

    keyboard          : {
            enabled: true,
    },

    autoplay        : {
            delay                 : 4500,
            disableOnInteraction  : false,
    },

    coverflowEffect: {
      rotate          : 50,
      stretch         : 0,
      depth           : 100,
      modifier        : 1,
      slideShadows    : true,
    },

    cubeEffect: {
      shadow          : true,
      slideShadows    : true,
      shadowOffset    : 20,
      shadowScale     : 0.94,
    },

    pagination: {
      el              : '.swiper-pagination',
      type            : 'bullets', // bullets, progressbar, fraction, custom
      dynamicBullets  : true,
      clickable       : true
    },

    scrollbar: {
      el              : '.swiper-scrollbar',
      hide            : true,
    },

    navigation: {
      nextEl          : '.swiper-button-next',
      prevEl          : '.swiper-button-prev',
    },

    thumbs: {}

  },


  /* 
    Vendor Init
  */
  init: function() {


    if( typeof Swiper === 'undefined' ) {
      console.log('Swiper : Vendor Core Missing!');
      return;
    }


    // ++ ++ ++ ++ ++
    // ++ ++ ++ ++ ++


    var config    = this.config;
    let nodeList  = document.querySelectorAll( this.selector );
    if( !window.swiperInst )      window.swiperInst = [];
    var swiperInstWait = [];

    nodeList.forEach(function( el ) {

      // ignore multiple bind -- -- -- -- -- -- -- -- --
      if( el.classList.contains('js-swiper') ) return;
          el.classList.add('js-swiper');
      // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


      /* 
        Variables
      */
      let ID        = el.getAttribute('id');
      let conf      = el.getAttribute('data-swiper');
          conf      = conf ? JSON.parse( conf ) : {};

      var defaults  = Object.assign({}, config);
      let options   = merge_recursive(defaults, conf);


      /* 
        ID
      */
      if( !ID ) {
        ID = 'r_' + Math.random().toString(36).substring(7);
        el.setAttribute('id', ID);
      }


      /* 
        Set RTL Attribute
      */
      if( window['direction'] == 'rtl' )
        el.setAttribute('dir', 'rtl');


      /* 
        Rename elements, 
        support multiple swipes in the same page!
      */
      let node__BtnNext   = el.querySelector('.swiper-button-next');
      let node__BtnPrev   = el.querySelector('.swiper-button-prev');
      let node__Pag       = el.querySelector('.swiper-pagination');

      if( node__BtnNext )   node__BtnNext.classList.add('swiper-button-next-'+ID);
      if( node__BtnPrev )   node__BtnPrev.classList.add('swiper-button-prev-'+ID);
      if( node__Pag )       node__Pag.classList.add('swiper-pagination-'+ID);

      options.navigation.nextEl  = '.swiper-button-next-'+ID;
      options.navigation.prevEl  = '.swiper-button-prev-'+ID;
      options.pagination.el      = '.swiper-pagination-'+ID;
      // -- -- --


      /* 
        Fix on multiple sliders 
        prevent using last effect set!
      */
      if( options.slidesPerView > '1' )
        options.effect = "slide";



      /*
        By default, swiper is reconfigured if -only- one image detected:
          - remove arrows
          - remove progress/bullets
          - disable loop
      */
      if( el.querySelector('.swiper-slide').length < 2 ) {

        options.pagination   = {};
        options.navigation   = {};
        options.loop         = false;

        if( node__BtnNext )   node__BtnNext.parentNode.removeChild( node__BtnNext );
        if( node__BtnPrev )   node__BtnPrev.parentNode.removeChild( node__BtnPrev );
        if( node__Pag )       node__Pag.parentNode.removeChild( node__Pag );

      }


      /* 
        Init
      */
      // https://swiperjs.com/get-started/
      window.swiperInst[ID] = new Swiper( '#'+ID, options );

    });


  }

};

Vendor__Swiper.init();
/** 

  Vendor : Markdown
  https://codepen.io/gilsjhonny/pen/mmXRLq

**/
let Vendor__Markdown = {

  /* 
    Selector
  */
  selector: '[data-markdown]',


  /* 
    Vendor Default Config
  */
  config: {},


  /* 
    Vendor Init
  */
  init: function() {

    let el = document.querySelector( this.selector );
    if( !el ) return;

    let conf = el.getAttribute('data-markdown');
        conf = conf ? JSON.parse( conf ) : {};
        conf = Object.assign({ 'toolbarbg': 'bg-gray-200' }, conf);
        conf.name = el.getAttribute('name') || 'markdown';
        conf.rows = el.getAttribute('rows') || 15;

    let tmp  = document.createElement("div");
        tmp.setAttribute('id', 'markdown-editor');
        tmp.innerHTML = this.TPL( conf );

    // replace textarea
    el.parentNode.replaceChild( tmp, el );

    // init markdown
    this.markdown();

  },


  /* 
    Template
  */
  TPL: function( conf ) {


    // avoid duplicates
    if( document.getElementById('markdown-editor') )
      return;


      // Additional Custom CSS
      document.head.insertAdjacentHTML( 'beforeend', 

        '<style>'
            + '#markdown-editor .toolbar { position: relative; z-index:1; background: #fbfbfb; border-radius: 10px 10px 0 0; margin: 0; overflow: hidden; padding: .5rem 10px; }'
            + '#markdown-editor .toolbar button { background: transparent;border: none;color: #a5a5a5; font-size: .8rem; cursor: pointer; padding: .7rem; }'
            + '#markdown-editor .toolbar button:hover, #markdown-editor .toolbar button.active { background: rgba(0,0,0,0.07); border-radius: 5px; outline: 0px; }'
            + '#markdown-editor .toolbar button:focus { outline: none; }'
            + '#markdown-editor .toolbar .group { border-right: 1px solid rgba(0,0,0,0.07); margin-right: 4px; display: inline; }'
            + '#markdown-editor #input-output { position: relative; }'
            + '#markdown-editor #input-output #input-area { height: 100%; width: 100%; margin: 0;padding: 10px; border: 0; border-radius: 0 0 10px 10px; box-shadow: 0 10px 10px #e0e0e0;resize: none; }'
            + '#markdown-editor #input-output #input-area:focus, #markdown-editor #input-output #input-area:active { outline: 0px; }'
            + '#markdown-editor #input-output #output-area { background: #FFFFFF; border-radius: 0 0 10px 10px; display: none; font-family: sans-serif; padding: 10px; height: 100%; width: 100%; position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow-y: scroll; }'
            + '#markdown-editor #input-output .show { display: block !important; }'
          + '</style>'

      );



      // HTML Markup
      return '<div class="toolbar ' + conf.toolbarbg + '">'
                
                + '<div class="group">'
                  + '<button id="heading1">'
                    + '<svg height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z"></path></svg>'
                  + '</button>'
                  + '<button id="heading2">'
                    + '<svg height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z"></path></svg>'
                  + '</button>'
                  + '<button id="heading3">'
                    + '<svg height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z"></path></svg>'
                  + '</button>'
                + '</div>'

                + '<div class="group">'
                  + '<button id="bold">'
                    + '<svg height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"></path></svg>'
                 + '</button>'
                  + '<button id="italic">'
                    + '<svg height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M7.991 11.674L9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"></path></svg>'
                  + '</button>'
                + '</div>'

                + '<div class="group">'
                  + '<button id="link">'
                    + '<svg height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"></path><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z"></path></svg>'
                  + '</button>'
                  + '<button id="img">'
                    + '<svg height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9c0 .013 0 .027.002.04V12l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094L15 9.499V3.5a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm4.502 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path></svg>'
                  + '</button>'
                  + '<button id="list-ul">'
                    + '<svg height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path></svg>'
                  + '</button>'
                  + '<button id="list-ol">'
                    + '<svg height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"></path><path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"></path></svg>'
                  + '</button>'
                  + '<!-- <button id="token">{{Token}}</button> -->'
                + '</div>'

                + '<button id="preview">Preview</button>'
            
              + '</div>'
             
              + '<div id="input-output">'
                + '<textarea name="' + conf.name + '" class="w-100 shadow-md" id="input-area" rows="' + conf.rows + '"></textarea>'
                + '<div id="output-area"></div>'
              + '</div>';

  },
  

  /* 
    Markdown
  */
  markdown: function() {

    // -------------------------------------------
    // DEFAULT INPUT AND OUTPUT AREA
    let textarea = document.querySelector( '#input-area' );
    let outputArea = document.querySelector( '#output-area' );

    // -------------------------------------------
    // TOOLBAR
    // -------------------------------------------
    const preview = document.querySelector( '#preview' );
    const boldButton = document.querySelector( '#bold' );
    const italicButton = document.querySelector( '#italic' );
    const heading1Button = document.querySelector( '#heading1' );
    const heading2Button = document.querySelector( '#heading2' );
    const heading3Button = document.querySelector( '#heading3' );
    const linkButton = document.querySelector( '#link' );
    const imgButton = document.querySelector( '#img' );     //![](https://)
    const tokenButton = document.querySelector( '#token' );
    const ulButton = document.querySelector( '#list-ul' );
    const olButton = document.querySelector( '#list-ol' );


    if( preview )
      preview.addEventListener( 'click', function() {
        output( parse( textarea.value ) );

        outputArea.classList.toggle( 'show' );
        preview.classList.toggle( 'active' );
      });

    if( boldButton )
      boldButton.addEventListener( 'click', function() {
        insertText( textarea, '****', 'demo', 2, 6 )
      });

    if( italicButton )
      italicButton.addEventListener( 'click', function() {
        insertText( textarea, '**', 'demo',  1, 5 )
      });

    if( heading1Button )
      heading1Button.addEventListener( 'click', function() {
        insertText( textarea, '#', 'heading1', 1, 9 )
      });

    if( heading2Button )
      heading2Button.addEventListener( 'click', function() {
        insertText( textarea, '##', 'heading2', 2, 10 )
      });

    if( heading3Button )
      heading3Button.addEventListener( 'click', function() {
        insertText( textarea, '###', 'heading3', 3, 11 )
      });

    if( linkButton )
      linkButton.addEventListener( 'click', function() {
        insertText( textarea, '[](https://...)', 'url text', 1, 9 )
      });

    if( imgButton )
      imgButton.addEventListener( 'click', function() {
        insertText( textarea, '![](https://...)', 'alt text', 2, 10 )
      });

    if( tokenButton )
      tokenButton.addEventListener( 'click', function() {
        insertText( textarea, '{{}}', 'tokenValue', 2, 12 )
      });

    if( ulButton )
      ulButton.addEventListener( 'click', function() {
        insertText( textarea, '* ', 'item', 2, 6 );
      });

    if( olButton )
      olButton.addEventListener( 'click', function() {
        insertText( textarea, '1. ', 'item', 3, 7 )
      });

    // -------------------------------------------

    function setInputArea( inputElement ) {
      textarea = inputElement;
    }

    function setOutputArea( outputElement ) {
      outputArea = outputElement;
    }

    function insertText( textarea, syntax, placeholder = 'demo', selectionStart = 0, selectionEnd = 0 ) {
      // Current Selection
      const currentSelectionStart = textarea.selectionStart;
      const currentSelectionEnd = textarea.selectionEnd;
      const currentText = textarea.value;

      if( currentSelectionStart === currentSelectionEnd ) {
        const textWithSyntax = textarea.value = currentText.substring( 0, currentSelectionStart ) + syntax + currentText.substring( currentSelectionEnd );
        textarea.value = textWithSyntax.substring( 0, currentSelectionStart + selectionStart ) + placeholder + textWithSyntax.substring( currentSelectionStart + selectionStart )

        textarea.focus();
        textarea.selectionStart = currentSelectionStart + selectionStart;
        textarea.selectionEnd = currentSelectionEnd + selectionEnd;
      } else {
        const selectedText = currentText.substring( currentSelectionStart, currentSelectionEnd );
        const withoutSelection = currentText.substring( 0, currentSelectionStart ) + currentText.substring( currentSelectionEnd );
        const textWithSyntax = withoutSelection.substring( 0, currentSelectionStart ) + syntax + withoutSelection.substring( currentSelectionStart );

        // Surround selected text
        textarea.value = textWithSyntax.substring( 0, currentSelectionStart + selectionStart ) + selectedText + textWithSyntax.substring( currentSelectionStart + selectionStart );

        textarea.focus();
        textarea.selectionEnd = currentSelectionEnd + selectionStart + selectedText.length;
      }
    }

    function output( lines ) {
      outputArea.innerHTML = lines;
    }

    // -------------------------------------------
    // PARSER
    // -------------------------------------------

    function parse( content ) {

      // Regular Expressions
      const h1 = /^#{1}[^#].*$/gm;
      const h2 = /^#{2}[^#].*$/gm;
      const h3 = /^#{3}[^#].*$/gm;
      const bold = /\*\*[^\*\n]+\*\*/gm;
      const italics = /[^\*]\*[^\*\n]+\*/gm;
      const link = /\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm;
      const img = /\!\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm;
      const lists = /^((\s*((\*|\-)|\d(\.|\))) [^\n]+))+$/gm;
      const unorderedList = /^[\*|\+|\-]\s.*$/;
      const unorderedSubList = /^\s\s\s*[\*|\+|\-]\s.*$/;
      const orderedList = /^\d\.\s.*$/;
      const orderedSubList = /^\s\s+\d\.\s.*$/;

      // Example: # Heading 1
      if( h1.test( content ) ) {
        const matches = content.match( h1 );

        matches.forEach( function(element) {
          const extractedText = element.slice( 1 );
          content = content.replace( element, '<h1>' + extractedText + '</h1>' );
        });
      }

      // Example: # Heading 2
      if( h2.test( content ) ) {
        const matches = content.match( h2 );

        matches.forEach( function(element) {
          const extractedText = element.slice( 2 );
          content = content.replace( element, '<h2>' + extractedText + '</h2>' );
        });
      }

      // Example: # Heading 3
      if( h3.test( content ) ) {
        const matches = content.match( h3 );

        matches.forEach( function(element) {
          const extractedText = element.slice( 3 );
          content = content.replace( element, '<h3>' + extractedText + '</h3>' );
        });
      }

      // Example: **Bold**
      if( bold.test( content ) ) {
        const matches = content.match( bold );

        matches.forEach( function(element) {
          const extractedText = element.slice( 2, -2 );
          content = content.replace( element, '<strong>' + extractedText + '</strong>' );
        });
      }

      // Example: *Italic*
      if( italics.test( content ) ) {
        const matches = content.match( italics );

        matches.forEach( function(element) {
          const extractedText = element.slice( 2, -1 );
          content = content.replace( element, ' <em>' + extractedText + '</em>' );
        });
      }

      // Example: ![Alt](https://www.domain.com/image.jpg)
      if( img.test( content ) ) {
        const imgs = content.match( img );

        imgs.forEach( function(element) {

          elem = element.substring(1); // remove '!'
          const text = elem.match( /^\[.*\]/ )[ 0 ].slice( 1, -1 );
          const url = elem.match( /\]\(.*\)/ )[ 0 ].slice( 2, -1 );

          content = content.replace( element, '<img src="' + url + '" alt="' + text + '">' );
        });
      }

      // Example: [I'm an inline-style link](https://www.google.com)
      if( link.test( content ) ) {
        const links = content.match( link );

        links.forEach( function(element) {
          const text = element.match( /^\[.*\]/ )[ 0 ].slice( 1, -1 );
          const url = element.match( /\]\(.*\)/ )[ 0 ].slice( 2, -1 );

          content = content.replace( element, '<a href="' + url + '">' + text + '</a>' );
        });
      }


      if( lists.test( content ) ) {
        const matches = content.match( lists );

        matches.forEach( function(list) {
          const listArray = list.split( '\n' );

          const formattedList = listArray.map( ( currentValue, index, array ) => {
            if( unorderedList.test( currentValue ) ) {
              currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

              if( !  unorderedList.test( array[ index - 1 ] ) && ! unorderedSubList.test( array[ index - 1 ] ) ) {
                currentValue = '<ul>' + currentValue;
              }

              if( !  unorderedList.test( array[ index + 1 ] )  &&  ! unorderedSubList.test( array[ index + 1 ] ) ) {
                currentValue = currentValue + '</ul>';
              }

              if( unorderedSubList.test( array[ index + 1 ] ) || orderedSubList.test( array[ index + 1 ] ) ) {
                currentValue = currentValue.replace( '</li>', '' );
              }
            }

            if( unorderedSubList.test( currentValue ) ) {
              currentValue = currentValue.trim();
              currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

              if( ! unorderedSubList.test( array[ index - 1 ] ) ) {
                currentValue = '<ul>' + currentValue;
              }

              if( ! unorderedSubList.test( array[ index + 1 ] ) && unorderedList.test( array[ index + 1 ] ) ) {
                currentValue = currentValue + '</ul></li>';
              }

              if( ! unorderedSubList.test( array[ index + 1 ] ) && ! unorderedList.test( array[ index + 1 ] ) ) {
                currentValue = currentValue + '</ul></li></ul>';
              }
            }

            if( orderedList.test( currentValue ) ) {
              currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

              if( ! orderedList.test( array[ index - 1 ] ) && ! orderedSubList.test( array[ index - 1 ] ) ) {
                currentValue = '<ol>' + currentValue;
              }

              if( ! orderedList.test( array[ index + 1 ] ) && ! orderedSubList.test( array[ index + 1 ] ) && ! orderedList.test( array[ index + 1 ] ) ) {
                currentValue = currentValue + '</ol>';
              }

              if( unorderedSubList.test( array[ index + 1 ] ) || orderedSubList.test( array[ index + 1 ] ) ) {
                currentValue = currentValue.replace( '</li>', '' );
              }
            }

            if( orderedSubList.test( currentValue ) ) {
              currentValue = currentValue.trim();
              currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

              if( ! orderedSubList.test( array[ index - 1 ] ) ) {
                currentValue = '<ol>' + currentValue;
              }

              if( orderedList.test( array[ index + 1 ] ) && ! orderedSubList.test( array[ index + 1 ] ) ) {
                currentValue = currentValue + '</ol>';
              }

              if( ! orderedList.test( array[ index + 1 ] ) && ! orderedSubList.test( array[ index + 1 ] ) ) {
                currentValue = currentValue + '</ol></li></ol>';
              }
            }

            return currentValue;
          } ).join( '' );

          // console.log( formattedList );
          content = content.replace( list, formattedList );
        });
      }

      return content.split( '\n' ).map( function(line) {
        if( ! h1.test( line ) && ! h2.test( line ) && ! h3.test( line ) && ! unorderedList.test( line ) && ! unorderedSubList.test( line ) && ! orderedList.test( line ) && ! orderedSubList.test( line ) ) {
          return line.replace( line, '<p>' + line + '</p>' );
        }
      } ).join( '' );
    }

  }

};

Vendor__Markdown.init();