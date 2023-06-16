const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const SLIDES = 3;
let slideNum = 1;

handleSlideBtns();

$$(".slide-btn").forEach((btn) => {
  btn.onclick = (e) => onSlideBtnClick(e);
});

function onSlideBtnClick(e) {
  let newSlide;
  let thisSlide = $(`#slide-${slideNum}`);

  handleSlideBtns(false);

  if (e.target.classList.contains("right-btn") && slideNum < SLIDES) {
    // move right
    newSlide = $(`#slide-${++slideNum}`);
    thisSlide.classList.remove("in-view");
    thisSlide.classList.add("move-this-left");
    newSlide.classList.add("move-new-left");
    setTimeout(() => {
      newSlide.classList.remove("on-right");
      thisSlide.classList.remove("move-this-left");
      newSlide.classList.remove("move-new-left");
      thisSlide.classList.add("on-left");
      newSlide.classList.add("in-view");
    }, 500);
  } else if (e.target.classList.contains("left-btn") && slideNum > 0) {
    newSlide = $(`#slide-${--slideNum}`);
    thisSlide.classList.remove("in-view");
    thisSlide.classList.add("move-this-right");
    newSlide.classList.add("move-new-right");
    setTimeout(() => {
      newSlide.classList.remove("move-new-right");
      newSlide.classList.remove("on-left");
      thisSlide.classList.remove("move-this-right");
      thisSlide.classList.add("on-right");
      newSlide.classList.add("in-view");
    }, 500);
  } else return;

  handleSlideBtns();
  handleSlideDots();
}

function handleSlideBtns(show = true) {
  if (!show) {
    $(".right-btn").style.display = "none";
    $(".left-btn").style.display = "none";
    return;
  }
  if (slideNum == SLIDES) {
    $(".right-btn").style.display = "none";
    $(".left-btn").style.display = "block";
  } else if (slideNum == 1) {
    $(".right-btn").style.display = "block";
    $(".left-btn").style.display = "none";
  } else {
    $(".right-btn").style.display = "block";
    $(".left-btn").style.display = "block";
  }
}

function handleSlideDots() {
  $$(".slide-dots span").forEach((dot) => {
    dot.classList.remove("active");
  });

  $(`#dot-${slideNum}`).classList.add("active");
}
