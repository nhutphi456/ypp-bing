export function handleCarousel() {
    console.log("run")
  const slides = document.getElementsByClassName("carousel-item") as HTMLCollectionOf<HTMLElement>;
  const nextButton = document.getElementById("carousel-button-next") as HTMLButtonElement | null;
  const prevButton = document.getElementById("carousel-button-prev") as HTMLButtonElement | null;
  const dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;
  let position = 0;
  const numberOfSlides = slides.length;

  function hideAllSlides() {
    // remove all slides not currently being viewed
    for (const slide of slides) {
      slide.classList.remove("carousel-item-visible");
      slide.classList.add("carousel-item-hidden");
    }
  }

  const handleMoveToNextSlide = function (e: Event) {
    hideAllSlides();

    // check if last slide has been reached
    if (position === numberOfSlides - 1) {
      position = 0; // go back to the first slide
    } else {
      // move to the next slide
      position++;
    }
    // make the current slide visible
    slides[position].classList.add("carousel-item-visible");

    // update dot to represent the current slide
    dots[position].classList.add("selected-dot");
    (dots[position] as HTMLInputElement).checked = true;
  };

  const handleMoveToPrevSlide = function (e: Event) {
    hideAllSlides();

    // check if we're on the first slide
    if (position === 0) {
      position = numberOfSlides - 1; // move to the last slide
    } else {
      // move back one
      position--;
    }
    // make the current slide visible
    slides[position].classList.add("carousel-item-visible");

    // update dot to represent the current slide
    dots[position].classList.add("selected-dot");
    (dots[position] as HTMLInputElement).checked = true;
  };
//   console.log({slides, nextButton, prevButton})
  if (nextButton) {
    nextButton.addEventListener("click", handleMoveToNextSlide);
  }

  if (prevButton) {
    prevButton.addEventListener("click", handleMoveToPrevSlide);
  }
}
