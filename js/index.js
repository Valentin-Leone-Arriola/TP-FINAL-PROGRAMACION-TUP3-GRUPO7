const nextIcon = '<img src="./resources/img/next-arrow.png" alt:"right">';
const prevIcon = '<img src="./resources/img/prev-arrow.png" alt:"prev">';

$('.owl-carousel').owlCarousel({
  loop:true,
  nav:true,
  navText: [
    prevIcon,
    nextIcon
  ],
  responsive:{
      0:{
          items:1
      },
      300:{
          items:2
      },
      1000:{
          items:5
      }
  }
})