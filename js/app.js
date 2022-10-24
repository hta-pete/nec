$(function(){

  const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    getDirection: true
  });

  scroller.on('scroll', (instance) => {
    document.documentElement.setAttribute('data-direction', instance.direction)
  });

	var $window = $(window);
	var raf           = requestAnimationFrame;
  var lastScrollTop = $('main').offset().top;

  $window.on('load', function(){
    window.dispatchEvent(new Event('resize'));
  });

  if (raf) {
    loop();
  }

  function loop() {

    var scrollTop = $('main').offset().top;
    var y         = (scrollTop > lastScrollTop) ? 'down' : ((scrollTop === lastScrollTop) ? 'none' : 'up');

    if (lastScrollTop === scrollTop) {
      raf(loop);
      return;
    } else {
      lastScrollTop = scrollTop;
      raf(loop);
    }

    lastScrollTop = scrollTop;
   
  }


  // History State
  /*
  var $wrap = $("#wrap");

  $wrap.on( "click", ".page-link", function(event) { 
    event.preventDefault();
    if (window.location === this.href) {
      return;
    } 
    var pageTitle = (this.title) ? this.title : this.textContent;   
    History.pushState( null, pageTitle, this.href );
  });

  History.Adapter.bind( window, "statechange", function() {  
    var state = History.getState();  
    $.get( state.url, function(res) {
      $.each( $( res ), function(index, elem) {
        if ( $wrap.selector !== "#" + elem.id ) {
          return;
        }
        $wrap.html($( elem ).html());
      });
    });
  });
  */

 

    
});




