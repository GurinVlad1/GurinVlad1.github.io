$(document).ready(function () {
  $(".slider").slick({
      arrows: true,
      dots: true,
      infinite: true,
      responsive: [
          {
              breakpoint: 770,
              settings: {
                  slidesToScroll: 1,
                  slidesToShow: 1
              }
          }
      ],
      slidesToScroll: 3,
      slidesToShow: 3
  });
});

