const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.getElementById("year").textContent = new Date().getFullYear();

if (!reducedMotion) {
  window.addEventListener(
    "pointermove",
    (event) => {
      root.style.setProperty("--mouse-x", event.clientX + "px");
      root.style.setProperty("--mouse-y", event.clientY + "px");
    },
    { passive: true },
  );
}

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const tiltCard = document.querySelector("[data-tilt]");

if (tiltCard && !reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  tiltCard.addEventListener("pointermove", (event) => {
    const bounds = tiltCard.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltCard.style.transform =
      "rotateX(" + y * -3.5 + "deg) rotateY(" + x * 4.5 + "deg)";
  });

  tiltCard.addEventListener("pointerleave", () => {
    tiltCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}
