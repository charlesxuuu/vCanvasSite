/**
*   The function refreshes page when the browser is resized
**/
function registerResize(f) {
    $(window).resize(function() {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(function() {
            var oldOverflow = document.body.style.overflow;
            document.body.style.overflow = "scroll";
            var currHeight = $(window).height(),
                currWidth = $(window).width();
            document.body.style.overflow = oldOverflow;

            var prevUndefined = (typeof this.prevHeight === 'undefined' || typeof this.prevWidth === 'undefined');
            if (prevUndefined || this.prevHeight !== currHeight || this.prevWidth !== currWidth) {
                //console.log('Window size ' + (prevUndefined ? '' : this.prevHeight + "," + this.prevWidth) + " -> " + currHeight + "," + currWidth);
                this.prevHeight = currHeight;
                this.prevWidth = currWidth;

                f(currHeight, currWidth);
            }
        }, 50);
    });
    $(window).resize(); // initialize
}

registerResize(function(height, width) {
    // this will be called only once per resize regardless of scrollbars changes
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    $(window).resize(function() {
    if(windowWidth != $(window).width() || windowHeight != $(window).height()){
        location.reload();
    return;
    }
    });
});

/**
* The callback for the toggle button, which controls the slide-in and slide-out of map frame
**/
$(function() {
    // run the currently selected effect
    function runEffect() {
      // get effect type from
      var selectedEffect = "slide";
 
      // most effect types need no options passed by default
      var options = {};
      // some effects have required parameters
      if ( selectedEffect === "scale" ) {
        options = { percent: 0 };
      } else if ( selectedEffect === "size" ) {
        options = { to: { width: 200, height: 60 } };
      }
 
      // run the effect
      $( "#map" ).toggle( selectedEffect, options, 500 );
    };
 
    // set effect from select menu value
    $( "#toggle" ).click(function() {
      runEffect();
    });
  });
/**
*  The function change the image of the toggle button above the map
**/
function changearrow() {
    if (document.getElementById("toggle").src.indexOf("assets/rightarrow.png") != -1) 
    {
        document.getElementById("toggle").src = "assets/leftarrow.png";
    }
    else 
    {
        document.getElementById("toggle").src = "assets/rightarrow.png";
    }
}
