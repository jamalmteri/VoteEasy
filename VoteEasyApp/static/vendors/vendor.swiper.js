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