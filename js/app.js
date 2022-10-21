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
    checkScrollPos();
    $('.hero').addClass('show');
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
    if( scrollTop === 0 ) {
      $('header').removeClass('has-shadow');
    } else{
      $('header').addClass('has-shadow');
    }

    if( inView( $('.what-we-do') ) ){
      $carousel.flickity('pausePlayer');
      $carousel2.flickity('pausePlayer');
    } else{
      $carousel.flickity('unpausePlayer');
      $carousel2.flickity('unpausePlayer');
    }
    lastScrollTop = scrollTop;
    checkHiddenStuff();
  }

  function checkHiddenStuff(){
    $('.scroll-in').each(function(){
      if ( inView($(this).parent()) ) {
        $(this).addClass('show');
      } 
    });
    $('.has-images').each(function(){
      if ( inView($(this)) ) {
        $(this).addClass('reveal');
      } 
    });
  }
  
  function checkScrollPos(){
    setTimeout(function(){
      checkHiddenStuff();
    },500); 
  };
  checkScrollPos();

  function inView(elem){
    if (elem.length){
      var centerY = Math.max(0,(($window.height() - elem.outerHeight()/2) ) + $window.scrollTop());
      var elementTop = elem.offset().top;
      return elementTop <= centerY;
    } 
  }
  // —————————
  // Sliders
  // —————————
  var elem = document.querySelector('.hero-slider');
  if(typeof(elem) != 'undefined' && elem != null){
    var $carousel = $('.hero-slider').flickity({
      draggable: false,
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true,
      autoPlay: 5000,
      pauseAutoPlayOnHover: false 
    });
  }

  var mask = document.querySelector('.mask');
  if(typeof(mask) != 'undefined' && mask != null){
    var $carousel2 = $('.mask').flickity({
      draggable: false,
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true,
      autoPlay: 5000,
      pauseAutoPlayOnHover: false
    });
  }
    
});




