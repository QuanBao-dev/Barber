const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let isDisplayAddress = true;
window.addEventListener("scroll", () => {
  pageNavActiveDefine("home");
  pageNavActiveDefine("about");
  pageNavActiveDefine("services");
  pageNavActiveDefine("barbers");
  pageNavActiveDefine("testimonials");
  pageNavActiveDefine("portfolio");
  pageNavActiveDefine("prices");
  pageNavActiveDefine("contacts");
  countUp(false);
  showHideNavBar();
});

let intervalTestimonials = setInterval(() => {
  sliderTestimonials();
}, 5000);

let indexShowSlider = 1;
const numberOfSlideTestimonials = 5;
let timeout;
// Slider portfolio
let indexShowSliderPortfolio = 1;
const numberOfSlidePortfolio = 12;
let timeoutPortFolio;
let isShowSliderPortfolio = false;

window.addEventListener("load", () => {
  mainSliderChangeSlideDragging();
  handleHeader();
  handleClickImage();
  handleUserChangeSlidePortfolio();
  countUp();
  testimonialsHandle();
});

window.addEventListener("resize", () => {
  $(".main-slider__slide-list").style.height = `${window.innerHeight}px`;
  if (window.innerWidth < 1250) {
    $(".header").style.display = "none";
    $(".header1").style.display = "flex";
  } else {
    $(".header").style.display = "block";
    $(".mobile-navigation").className = "mobile-navigation";
    $(".menu-toggle").className = "menu-toggle";
    $(".header1").style.display = "none";
  }
});

function handleHeader() {
  $(".main-slider__slide-list").style.height = `${window.screen.height}px`;
  if (window.innerWidth < 1250) {
    $(".header").style.display = "none";
    $(".header1").style.display = "flex";
    $(".overlay").addEventListener("click", () => {
      $(".menu-toggle").className = "menu-toggle";
      $(".mobile-navigation").className = "mobile-navigation";
      $(".overlay").style.display = "none";
    });
    $(".menu-toggle").addEventListener("click", (e) => {
      if ($(".menu-toggle").className === "menu-toggle") {
        $(".overlay").style.display = "block";
        $(".menu-toggle").className = "menu-toggle on";
        $(".mobile-navigation").className =
          "mobile-navigation mobile-navigation-active";
      } else {
        $(".overlay").style.display = "none";
        $(".menu-toggle").className = "menu-toggle";
        $(".mobile-navigation").className = "mobile-navigation";
      }
    });
  } else {
    $(".header").style.display = "block";
    $(".header1").style.display = "none";
  }
}

let modePortfolioDragging = null;
function handleUserChangeSlidePortfolio() {
  const sliderWrapper = $(".portfolio__slider-wrapper-container");
  const sliderContainer = $(".portfolio__slider-container");
  const chevronLeft = $("#left-chevron-portfolio");
  const chevronRight = $("#right-chevron-portfolio");

  chevronLeft.addEventListener("click", () => {
    if (indexShowSliderPortfolio - 1 >= 1) {
      indexShowSliderPortfolio--;
      moveSlider(
        sliderContainer,
        indexShowSliderPortfolio,
        sliderWrapper,
        true
      );
    } else {
      if (!timeoutPortFolio) {
        indexShowSliderPortfolio--;
        moveSlider(
          sliderContainer,
          indexShowSliderPortfolio,
          sliderWrapper,
          true
        );
        timeoutPortFolio = setTimeout(() => {
          indexShowSliderPortfolio = numberOfSlidePortfolio - 2;
          moveSlider(
            sliderContainer,
            indexShowSliderPortfolio,
            sliderWrapper,
            false
          );
          timeoutPortFolio = undefined;
        }, 500);
      }
    }
  });

  chevronRight.addEventListener("click", () => {
    if (indexShowSliderPortfolio + 1 <= numberOfSlidePortfolio - 2) {
      indexShowSliderPortfolio++;
      moveSlider(
        sliderContainer,
        indexShowSliderPortfolio,
        sliderWrapper,
        true
      );
    } else {
      if (!timeoutPortFolio) {
        indexShowSliderPortfolio++;
        moveSlider(
          sliderContainer,
          indexShowSliderPortfolio,
          sliderWrapper,
          true
        );
        timeoutPortFolio = setTimeout(() => {
          indexShowSliderPortfolio = 1;
          moveSlider(
            sliderContainer,
            indexShowSliderPortfolio,
            sliderWrapper,
            false
          );
          timeoutPortFolio = undefined;
        }, 500);
      }
    }
  });
}

async function handleClickImage() {
  const imagesPortfolio = [...$$(".portfolio__gallery-container img")];
  const sliderWrapper = $(".portfolio__slider-wrapper-container");
  const sliderContainer = $(".portfolio__slider-container");
  sliderContainer.style.transition = `0s`;
  sliderContainer.style.transform = `translateX(-${
    sliderWrapper.offsetWidth * indexShowSlider
  }px)`;
  await Promise.all(
    imagesPortfolio.map((imageE, index) => {
      imageE.id = index + 1;
      imageE.addEventListener("click", (e) => {
        isShowSliderPortfolio = true;
        $(".portfolio__container-fixed").style.opacity = "1";
        $(".portfolio__container-fixed").style.zIndex = "10";
        indexShowSliderPortfolio = parseInt(e.target.id);
        const distance =
          $(".portfolio__slider-wrapper-container").offsetWidth *
          indexShowSliderPortfolio;
        sliderContainer.style.transition = `0s`;
        $(
          ".portfolio__slider-container"
        ).style.transform = `translateX(-${distance}px)`;
        // ///////////////////////
        $(".portfolio__container-control-menu").addEventListener(
          "click",
          (e) => {
            if (e.target.className === "portfolio__container-control-menu") {
              $(".portfolio__container-fixed").style.zIndex = "-2";
              $(".portfolio__container-fixed").style.opacity = "0";
            }
          }
        );
      });
    })
  );
}

function testimonialsHandle() {
  const sliderContainer = $(".testimonials__slider-container");
  sliderContainer.style.width = `${numberOfSlideTestimonials * 100}%`;
  const leftChevron = $("#left-chevron");
  const rightChevron = $("#right-chevron");
  const sliderWrapperView = $(".testimonials__wrapper-slider-container");

  let posX1 = 0;
  let posX2 = 0;
  let delta = 0;
  let posInitial = 0;
  let currentMode = null;

  indexShowSlider = 1;
  moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, false);

  addDraggingScroll(
    sliderWrapperView,
    delta,
    sliderContainer,
    posInitial,
    posX1,
    posX2,
    currentMode
  );

  updateCurrentPageSlide();

  leftChevron.addEventListener("click", () => {
    if (indexShowSlider - 1 >= 1) {
      indexShowSlider--;
      moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
      clearInterval(intervalTestimonials);
      updateCurrentPageSlide();
      intervalTestimonials = setInterval(() => {
        sliderTestimonials();
      }, 3000);
    } else {
      if (!timeout) {
        indexShowSlider--;
        moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
        clearInterval(intervalTestimonials);
        updateCurrentPageSlide();
        intervalTestimonials = setInterval(() => {
          sliderTestimonials();
        }, 3000);
        indexShowSlider = numberOfSlideTestimonials - 2;
        updateCurrentPageSlide();
        timeout = setTimeout(() => {
          moveSlider(
            sliderContainer,
            indexShowSlider,
            sliderWrapperView,
            false
          );
          clearInterval(intervalTestimonials);
          intervalTestimonials = setInterval(() => {
            sliderTestimonials();
          }, 3000);
          timeout = undefined;
        }, 500);
      }
    }
  });
  rightChevron.addEventListener("click", () => {
    if (indexShowSlider + 1 < numberOfSlideTestimonials - 1) {
      indexShowSlider++;
      moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
      updateCurrentPageSlide();
      clearInterval(intervalTestimonials);
      intervalTestimonials = setInterval(() => {
        sliderTestimonials();
      }, 3000);
    } else {
      if (!timeout) {
        indexShowSlider++;
        moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
        updateCurrentPageSlide();
        clearInterval(intervalTestimonials);
        intervalTestimonials = setInterval(() => {
          sliderTestimonials();
        }, 3000);
        indexShowSlider = 1;
        updateCurrentPageSlide();
        timeout = setTimeout(() => {
          moveSlider(
            sliderContainer,
            indexShowSlider,
            sliderWrapperView,
            false
          );
          clearInterval(intervalTestimonials);
          intervalTestimonials = setInterval(() => {
            sliderTestimonials();
          }, 3000);
          timeout = undefined;
        }, 500);
      }
    }
  });
}

function updateCurrentPageSlide() {
  const pageSlides = [...$$(".testimonials__page-item")];
  pageSlides.forEach((pageE, index) => {
    if (index === indexShowSlider - 1) {
      if (!pageE.className.includes("active")) {
        pageE.className = "testimonials__page-item active";
      }
    } else {
      pageE.className = "testimonials__page-item";
    }
  });
}

function addDraggingScroll(
  sliderWrapperView,
  delta,
  sliderContainer,
  posX1,
  posX2,
  currentMode
) {
  sliderWrapperView.addEventListener("mousedown", (e) => {
    e.preventDefault();
    currentMode = "start";
    delta = 0;
  });
  sliderWrapperView.addEventListener("touchstart", (e) => {
    currentMode = "start";
    delta = 0;
  });

  document.addEventListener("touchend", () => {
    if (delta === 0) return;
    if (delta < -50) {
      if (indexShowSlider + 1 < numberOfSlideTestimonials - 1) {
        indexShowSlider++;
        moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
        updateCurrentPageSlide();
      } else {
        indexShowSlider++;
        moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
        indexShowSlider = 1;
        updateCurrentPageSlide();
        if (!timeout)
          timeout = setTimeout(() => {
            moveSlider(
              sliderContainer,
              indexShowSlider,
              sliderWrapperView,
              false
            );
            clearInterval(intervalTestimonials);
            intervalTestimonials = setInterval(() => {
              sliderTestimonials();
            }, 3000);
            timeout = undefined;
          }, 500);
      }
    } else if (delta > 50) {
      if (indexShowSlider - 1 >= 1) {
        indexShowSlider--;
        moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
        updateCurrentPageSlide();
      } else {
        indexShowSlider--;
        moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
        updateCurrentPageSlide();
        indexShowSlider = numberOfSlideTestimonials - 2;
        updateCurrentPageSlide();
        if (!timeout)
          timeout = setTimeout(() => {
            moveSlider(
              sliderContainer,
              indexShowSlider,
              sliderWrapperView,
              false
            );
            clearInterval(intervalTestimonials);
            intervalTestimonials = setInterval(() => {
              sliderTestimonials();
            }, 3000);
            timeout = undefined;
          }, 500);
      }
    } else {
      moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
    }
    currentMode = null;
    posX1 = 0;
    posX2 = 0;
    delta = 0;
    delta = 0;
    clearInterval(intervalTestimonials);
    intervalTestimonials = setInterval(() => {
      sliderTestimonials();
    }, 3000);
  });

  document.addEventListener("mouseup", () => {
    if (delta === 0) return;
    if (delta < -100) {
      if (indexShowSlider + 1 < numberOfSlideTestimonials - 1) {
        indexShowSlider++;
        moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
        updateCurrentPageSlide();
      } else {
        indexShowSlider++;
        moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
        indexShowSlider = 1;
        updateCurrentPageSlide();
        if (!timeout)
          timeout = setTimeout(() => {
            moveSlider(
              sliderContainer,
              indexShowSlider,
              sliderWrapperView,
              false
            );
            clearInterval(intervalTestimonials);
            intervalTestimonials = setInterval(() => {
              sliderTestimonials();
            }, 3000);
            timeout = undefined;
          }, 500);
      }
    } else if (delta > 100) {
      if (indexShowSlider - 1 >= 1) {
        indexShowSlider--;
        moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
        updateCurrentPageSlide();
      } else {
        indexShowSlider--;
        moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
        indexShowSlider = numberOfSlideTestimonials - 2;
        updateCurrentPageSlide();
        if (!timeout)
          timeout = setTimeout(() => {
            moveSlider(
              sliderContainer,
              indexShowSlider,
              sliderWrapperView,
              false
            );
            clearInterval(intervalTestimonials);
            intervalTestimonials = setInterval(() => {
              sliderTestimonials();
            }, 3000);
            timeout = undefined;
          }, 500);
      }
    } else {
      moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
    }
    currentMode = null;
    posX1 = 0;
    posX2 = 0;
    delta = 0;
    clearInterval(intervalTestimonials);
    intervalTestimonials = setInterval(() => {
      sliderTestimonials();
    }, 3000);
  });

  document.addEventListener("touchmove", (e) => {
    if (currentMode === "start") {
      clearInterval(intervalTestimonials);
      /// Dragging
      posX2 = posX1 - e.touches[0].clientX;
      if (posX1 !== 0) {
        delta -= posX2;
      }
      posX1 = e.touches[0].clientX;
      sliderContainer.style.transition = "0s";
      sliderContainer.style.transform = `translateX(-${
        sliderWrapperView.offsetWidth * indexShowSlider - delta
      }px)`;
      // console.log(sliderContainer.style.transform);
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (currentMode === "start") {
      clearInterval(intervalTestimonials);
      /// Dragging
      posX2 = posX1 - e.clientX;
      if (posX1 !== 0) {
        delta -= posX2;
      }
      posX1 = e.clientX;
      sliderContainer.style.transition = "0s";
      sliderContainer.style.transform = `translateX(-${
        sliderWrapperView.offsetWidth * indexShowSlider - delta
      }px)`;
      // console.log(sliderContainer.style.transform);
    }
  });
}

function moveSlider(
  sliderContainer,
  indexShowSlider,
  sliderWrapperView,
  isAnimation
) {
  if (isAnimation) sliderContainer.style.transition = "0.5s";
  else sliderContainer.style.transition = "0s";
  sliderContainer.style.transform = `translateX(-${
    sliderWrapperView.offsetWidth * indexShowSlider
  }px)`;
}

function sliderTestimonials() {
  //INTERVAL
  if (indexShowSlider + 1 < numberOfSlideTestimonials) {
    indexShowSlider++;
    const sliderWrapperView = $(".testimonials__wrapper-slider-container");
    const sliderContainer = $(".testimonials__slider-container");
    sliderContainer.style.width = `${numberOfSlideTestimonials * 100}%`;
    moveSlider(sliderContainer, indexShowSlider, sliderWrapperView, true);
    updateCurrentPageSlide();
  }
  if (indexShowSlider === numberOfSlideTestimonials - 1) {
    indexShowSlider = 1;
    updateCurrentPageSlide();
    if (!timeout)
      timeout = setTimeout(() => {
        moveSlider(
          $(".testimonials__slider-container"),
          indexShowSlider,
          $(".testimonials__wrapper-slider-container"),
          false
        );
        timeout = undefined;
      }, 500);
  }
}

function pageNavActiveDefine(id) {
  let linkId = "link-" + id;
  if (window.innerWidth < 1250) {
    linkId += "-mobile";
  }
  const elementSection = $("#" + id);
  if (
    elementSection.getBoundingClientRect().top > 1 ||
    elementSection.getBoundingClientRect().top +
      elementSection.getBoundingClientRect().height <=
      1
  ) {
    if (window.innerWidth < 1250) {
      $("#" + linkId).className = "mobile-navigation__link";
    } else {
      $("#" + linkId).className = "header__nav-bar-item";
    }
  } else {
    if (window.innerWidth < 1250) {
      $("#" + linkId).className =
        "mobile-navigation__link mobile-navigation__link-active";
    } else {
      $("#" + linkId).className =
        "header__nav-bar-item header__nav-item-active";
    }
  }
}

let intervalMainSlider = setInterval(() => {
  showHideSlide();
}, 10000);

const numberOfSlide = 2;
let indexActive = 1;
function mainSliderChangeSlideDragging() {
  let modeDrag = false;
  let delta = 0;
  let posX1 = 0;
  let posX2 = 0;
  const mainSliderSlideList = $(".main-slider__slide-list");

  document.addEventListener("touchend", () => {
    if (Math.abs(delta) > 100) {
      clearInterval(intervalMainSlider);
      showHideSlide();
      intervalMainSlider = setInterval(() => {
        showHideSlide();
      }, 10000);
    }
    modeDrag = false;
    delta = 0;
    posX1 = 0;
    posX2 = 0;
  });

  mainSliderSlideList.addEventListener("touchstart", (e) => {
    modeDrag = true;
    delta = 0;
  });
  mainSliderSlideList.addEventListener("touchmove", (e) => {
    if (modeDrag) {
      posX2 = posX1 - e.touches[0].clientX;
      if (posX1 !== 0) {
        delta -= posX2;
      }
      posX1 = e.touches[0].clientX;
    }
  });


  document.addEventListener("mouseup", () => {
    if (Math.abs(delta) > 100) {
      clearInterval(intervalMainSlider);
      showHideSlide();
      intervalMainSlider = setInterval(() => {
        showHideSlide();
      }, 10000);
    }
    modeDrag = false;
    delta = 0;
    posX1 = 0;
    posX2 = 0;
  });

  mainSliderSlideList.addEventListener("mousedown", (e) => {
    e.preventDefault();
    modeDrag = true;
    delta = 0;
  });
  mainSliderSlideList.addEventListener("mousemove", (e) => {
    if (modeDrag) {
      posX2 = posX1 - e.clientX;
      if (posX1 !== 0) {
        delta -= posX2;
      }
      posX1 = e.clientX;
    }
  });
}

function showHideSlide() {
  let slides = $$(".main-slider__slide-item");
  slides = [...slides];

  slides.forEach((slide, index) => {
    if (index !== indexActive) {
      if (slide.className.includes("active")) {
        slide.className = slide.className.replace(" active", "");
      }
    } else {
      if (!slide.className.includes("active")) {
        slide.className += " active";
      }
    }
  });
  indexActive++;
  if (indexActive > 1) {
    indexActive = 0;
  }
}

function showHideNavBar() {
  if (window.scrollY === 0) {
    $(".header__nav-bar-container").style.backgroundColor = "#343a404b";
    $(".header__wrapper-container-address").style.transform = "translateY(0)";
    $(".header__nav-bar-container").style.transform = "translateY(0)";
    $(".header__nav-bar-list").style.height = "90px";
    isDisplayAddress = true;
  } else {
    $(".header__nav-bar-container").style.backgroundColor =
      "rgba(0, 0, 0, 0.8)";
    $(".header__nav-bar-list").style.height = "60px";
    $(".header__wrapper-container-address").style.transform =
      "translateY(-100%)";
    $(".header__nav-bar-container").style.transform = `translateY(-${
      $(".header__wrapper-container-address").offsetHeight
    }px)`;
    isDisplayAddress = false;
  }
}

let count = 0;
let count1 = 0;
let count2 = 0;
let count3 = 0;
let countTemp = 0;
function countUp(reset = true) {
  if (
    $(".section-advantage").getBoundingClientRect().top -
      parseInt(window.innerHeight) <
    -170
  ) {
    if (countTemp <= 2) {
      countTemp++;
    }
    if (countTemp > 1) {
      return;
    }
    const titleNumbers = [...$$(".section-advantage__title-number")];
    const interval = setInterval(() => {
      if (count === 0) {
        count += 1697;
      } else if (
        count + 14 <
        parseInt(titleNumbers[0].dataset.countNumber) - 3
      ) {
        count += 14;
        titleNumbers[0].innerText = count.toString();
      } else {
        clearInterval(interval);
        if (count < parseInt(titleNumbers[0].dataset.countNumber)) {
          const intervalChild1 = setInterval(() => {
            count += 1;
            if (count <= parseInt(titleNumbers[0].dataset.countNumber)) {
              titleNumbers[0].innerText = count.toString();
            } else {
              clearInterval(intervalChild1);
            }
          }, 300);
        }
      }
    }, 50);

    const interval2 = setInterval(() => {
      if (count1 === 0) {
        count1 += 150;
      } else if (
        count1 + 3 <
        parseInt(titleNumbers[1].dataset.countNumber) - 4
      ) {
        count1 += 3;
        titleNumbers[1].innerText = count1.toString();
      } else {
        clearInterval(interval2);
        if (count1 < parseInt(titleNumbers[1].dataset.countNumber)) {
          const intervalChild = setInterval(() => {
            count1 += 1;
            if (count1 <= parseInt(titleNumbers[1].dataset.countNumber)) {
              titleNumbers[1].innerText = count1.toString();
            } else {
              clearInterval(intervalChild);
            }
          }, 300);
        }
      }
    }, 50);

    const interval3 = setInterval(() => {
      if (count2 === 0) {
        count2 += 30;
      } else if (count2 < parseInt(titleNumbers[2].dataset.countNumber)) {
        count2 += 3;
        titleNumbers[2].innerText = count2.toString();
      } else {
        titleNumbers[2].innerText = titleNumbers[2].dataset.countNumber;
        clearInterval(interval3);
      }
    }, 100);
    const interval4 = setInterval(() => {
      if (count3 === 0) {
        count3 += 10;
      } else if (count3 < parseInt(titleNumbers[3].dataset.countNumber)) {
        count3 += 1;
        titleNumbers[3].innerText = count3.toString();
      } else {
        titleNumbers[3].innerText = titleNumbers[3].dataset.countNumber;
        clearInterval(interval4);
      }
    }, 100);
  } else {
    if (reset) {
      const titleNumbers = [...$$(".section-advantage__title-number")];
      titleNumbers.forEach((title) => {
        title.innerText = "0";
      });
    }
  }
}
