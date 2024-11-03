document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.registerEffect({
    name: "appear",
    effect: (target, config) => {
      return gsap.fromTo(
        target,
        {
          y: config.y,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: config.stagger,
          scrollTrigger: config.scrollTrigger,
          duration: config.duration,
          delay: config.delay,
        }
      );
    },
    defaults: {
      y: "-50px",
      stagger: 0.2,
      duration: 0.3,
      delay: 0,
    },
    extendTimeline: true,
  });

  let mm = gsap.matchMedia();
  mm.add("(max-width: 767px)", () => {
    const headerTl = gsap.timeline();
    headerTl
      .from(".logo", {
        x: "-50px",
        opacity: 0,
        duration: 0.5,
        delay: 0.25,
        ease: "expo",
      })
      .from(".burger_icon", {
        x: "+50px",
        opacity: 0,
        duration: 1,
        ease: "expo",
      });
    // .from(".section_1--header", {
    //   y: "-50px",
    //   opacity: 0,
    //   duration: 1.5,
    //   ease: "expo",
    //   delay: 0.5,
    // })
    // .from(".section_1--prag", {

    // });
  });
  mm.add("(min-width: 768px)", () => {});
  mm.add("(min-width: 992px)", () => {
    const headerTl = gsap.timeline();
    headerTl
      .fromTo(
        ".logo",
        {
          x: "-50px",
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.25,
          ease: "expo",
        }
      )
      .from(".big__device--links", {
        opacity: 0,
        stagger: 0.1,
        delay: 0.5,
        ease: "expo",
      })
      .from(
        ".big__device--clone__btn",
        {
          opacity: 0,
          ease: "expo",
          duration: 0.1,
        },
        "-=.4"
      );

    // section five animation
    gsap.to(".section_5", {
      scrollTrigger: {
        trigger: ".section_5",
        pin: true,
        end: "100% 40%",
      },
    });
    // section six animation
    gsap.to(".section_6", {
      scrollTrigger: {
        trigger: ".section_6",
        pin: true,
        end: "100% 40%",
      },
    });
    // section eight animation
    gsap.to(".section_8", {
      scrollTrigger: {
        trigger: ".section_8",
        pin: true,
        end: "100% 40%",
      },
    });
  });

  // section one animation
  gsap.effects.appear(".section_1 > div > *", {
    scrollTrigger: ".section_1--header",
  });
  // section two animation
  gsap.effects.appear(".section_2--textContainer", {
    scrollTrigger: {
      trigger: ".section_2--textContainer",
      start: "50% 70%",
    },
  });
  gsap.effects.appear(".section_2--cardContainer > .card", {
    scrollTrigger: {
      trigger: ".section_2--cardContainer",
    },
  });
  // section three animation
  gsap.effects.appear(".section_3--prag", {
    y: 0,
    scrollTrigger: ".section_3--prag",
    duration: 1,
    delay: 0.5,
  });
  // section four animation
  gsap.to(".section_4--imageContainer > div", {
    x: "-34%",
    scrollTrigger: {
      trigger: ".section_4--imageContainer",
      start: "-20% 50%",
      end: "120% 20%",
      scrub: 1,
    },
  });
  // section seven animation
  gsap.effects.appear(".section_7--newsContainer > .news_1", {
    scrollTrigger: ".section_7--newsContainer > .news_1",
    duration: 0.8,
  });
  gsap.effects.appear(".section_7--newsContainer > .news_2", {
    scrollTrigger: ".section_7--newsContainer > .news_2",
    duration: 0.8,
  });
  gsap.effects.appear(".section_7--newsContainer > .news_3", {
    scrollTrigger: ".section_7--newsContainer > .news_3",
    duration: 0.8,
  });
});

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
          minHeight: "0",
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
          minHeight: "450px",
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
