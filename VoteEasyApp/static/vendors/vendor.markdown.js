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