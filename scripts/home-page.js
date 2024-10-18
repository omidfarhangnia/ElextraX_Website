/* <script>
 // use a script tag or an external JS file
 document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger)
  // gsap code here!
 });

</script> */

const burgerIcon = document.querySelector(".burger_icon");
const contentContainer = document.querySelector(".content--container");
let isMenuOpened = false;
let isMenuAnimePlaying = false;

burgerIcon.addEventListener("click", setAnimForMenu);

function setAnimForMenu() {
  // for stoping multiplay animation for clicking very fast
  if (isMenuAnimePlaying) return;
  const tl = gsap.timeline();
  if (isMenuOpened) {
    tl.to(".close--svg", {
      opacity: 0,
      duration: 0.2,
      ease: "linear",
      onStart: function () {
        isMenuAnimePlaying = true;
      },
    })
      .set(".close--svg", {
        display: "none",
      })
      .set(".burger--svg", {
        display: "block",
        opacity: 0,
      })
      .to(
        ".menu",
        {
          duration: 0.3,
          ease: "expo.out",
          height: "0",
        },
        "startLabel"
      )
      .to(
        ".burger--svg",
        {
          opacity: 1,
          duration: 0.7,
          onStart: function () {
            contentContainer.classList.remove("displayNone");
          },
          onComplete: function () {
            isMenuOpened = false;
            isMenuAnimePlaying = false;
          },
        },
        "startLabel"
      );
  } else {
    tl.to(".burger--svg", {
      opacity: 0,
      duration: 0.2,
      ease: "linear",
      onStart: function () {
        isMenuAnimePlaying = true;
      },
    })
      .set(".burger--svg", {
        display: "none",
      })
      .set(".close--svg", {
        display: "block",
        opacity: 0,
      })
      .to(
        ".menu",
        {
          duration: 0.3,
          ease: "expo.in",
          height: "calc(100svh - 60px)",
        },
        "startLabel"
      )
      .to(
        ".close--svg",
        {
          opacity: 1,
          duration: 0.7,
          onComplete: function () {
            isMenuOpened = true;
            isMenuAnimePlaying = false;
            contentContainer.classList.add("displayNone");
          },
        },
        "startLabel"
      );
  }
}

window.addEventListener("resize", function (e) {
  if (isMenuOpened && this.window.innerWidth >= 991) {
    setAnimForMenu();
  }
});
