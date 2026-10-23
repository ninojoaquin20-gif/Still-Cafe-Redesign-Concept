// Highlights the sidebar link for the menu section you are currently reading.

const sections = document.querySelectorAll(".menu-section");
const links = document.querySelectorAll(".sidebar-list a");

// Marks one link as active and clears all the others
function setActive(id) {
  links.forEach(function (link) {
    if (link.getAttribute("href") === "#" + id) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "location");
      // On phones the category strip scrolls sideways, so keep the active one in view
      link.scrollIntoView({ inline: "nearest", block: "nearest" });
    } else {
      link.classList.remove("is-active");
      link.removeAttribute("aria-current");
    }
  });
}

// Watches the sections and tells us when one crosses a thin band near the top of the screen
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  { rootMargin: "-30% 0px -65% 0px" }
);

sections.forEach(function (section) {
  observer.observe(section);
});

// Start with the first category highlighted
setActive(sections[0].id);

// The last section is short, so it may never reach the band. At the very bottom, force it.
window.addEventListener("scroll", function () {
  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atBottom) {
    setActive(sections[sections.length - 1].id);
  }
});
