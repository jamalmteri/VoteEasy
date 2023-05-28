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