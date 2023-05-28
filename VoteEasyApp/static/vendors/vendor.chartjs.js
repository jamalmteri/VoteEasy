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