/*
 *
 * Made By John1234brown aka Johnathan Edward Brown
*/
$(document).ready(function() {
  // Get the number of items in the carousel
  var totalItems = $('.carousel-item').length;

  // Set the initial active slide
  var currentSlide = 1;

  // Function to update the carousel to the specified slide
  function updateCarousel(slide) {
    $('.carousel-item').removeClass('active');
    $('.carousel-item:nth-child(' + slide + ')').addClass('active');
  }

  // Function to handle wrapping around the carousel
  function wrapAroundCarousel(direction) {
    if (direction === 'next') {
      currentSlide = currentSlide === totalItems ? 1 : currentSlide + 1;
    } else {
      currentSlide = currentSlide === 1 ? totalItems : currentSlide - 1;
    }
    updateCarousel(currentSlide);
  }

  // Handle next button click
  $('.carousel-control-next').click(function() {
    wrapAroundCarousel('next');
  });

  // Handle previous button click
  $('.carousel-control-prev').click(function() {
    wrapAroundCarousel('prev');
  });
});
