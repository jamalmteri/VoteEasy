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