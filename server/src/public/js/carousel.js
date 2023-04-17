let slideWidth = $(".slide").width() + 2;

$(document).ready(() => {
  let positionX = 0;
  $(".btn--next").click(() => {
    currentSlide = $(".active");
    nextSlide = currentSlide.next();
    if (nextSlide.length) {
      positionX -= slideWidth;
      $(".slides").css("transform", `translateX(${positionX}px)`);
      nextSlide.addClass("active");
      currentSlide.removeClass("active");
      $(".btn--next").prop("disabled", true);
      setTimeout(() => {
        $(".btn--next").prop("disabled", false);
      }, 1000);
    }
  });

  $(".btn--prev").click(() => {
    currentSlide = $(".active");
    prevSlide = currentSlide.prev();
    if (prevSlide.length) {
      positionX += slideWidth;
      $(".slides").css("transform", `translateX(${positionX}px)`);
      prevSlide.addClass("active");
      currentSlide.removeClass("active");
    }
    $(".btn--prev").prop("disabled", true);
    setTimeout(() => {
      $(".btn--prev").prop("disabled", false);
    }, 1000);
  });
});
