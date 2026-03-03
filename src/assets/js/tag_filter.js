document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".tag-btn");
  const publications = document.querySelectorAll(".publication-item");
  let activeTags = new Set();

  function updateVisibility() {
    publications.forEach(pub => {
      const pubTags = pub.dataset.tags
        ? pub.dataset.tags.split(",").map(t => t.trim())
        : [];

      // Logic: Show if 'all' is active OR if no tags are selected OR if the pub has EVERY active tag
      const isVisible = activeTags.size === 0 || 
                        activeTags.has("all") || 
                        Array.from(activeTags).every(tag => pubTags.includes(tag));

      pub.classList.toggle("hidden-publication", !isVisible);
    });

    // Update Button Styles
    buttons.forEach(btn => {
      const isActive = activeTags.has(btn.dataset.tag);
      btn.style.backgroundColor = isActive ? "#47a88a" : "#fff";
      btn.style.color = isActive ? "#fff" : "#47a88a";
    });
  }

  function handleTagClick(tag) {
    if (tag === "all") {
      activeTags.clear();
      activeTags.add("all");
    } else {
      activeTags.delete("all");
      if (activeTags.has(tag)) {
        activeTags.delete(tag);
      } else {
        activeTags.add(tag);
      }
    }
    updateVisibility();
  }

  // Bind click events to buttons
  buttons.forEach(button => {
    button.addEventListener("click", () => handleTagClick(button.dataset.tag));
  });

  // --- FIX: Logic to read the # from the URL ---
  function syncFromHash() {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      activeTags.clear();
      // Supports single (#biomass) or multiple (#biomass,canopy)
      hash.split(",").forEach(t => {
        const cleanTag = t.trim();
        if (cleanTag) activeTags.add(cleanTag);
      });
      updateVisibility();
    }
  }

  // Run on load
  syncFromHash();

  // Run if the hash changes while the user is already on the page
  window.addEventListener("hashchange", syncFromHash);
});
// document.addEventListener("DOMContentLoaded", function () {
//   const buttons = document.querySelectorAll(".tag-btn");
//   const publications = document.querySelectorAll(".publication-item");

//   buttons.forEach(button => {
//     button.addEventListener("click", function () {
//       const selectedTag = this.dataset.tag;

//       publications.forEach(pub => {
//         const pubTags = pub.dataset.tags
//           ? pub.dataset.tags.split(",").map(t => t.trim())
//           : [];

//         if (selectedTag === "all" || pubTags.includes(selectedTag)) {
//            pub.classList.remove("hidden-publication");
//         } else {
//             pub.classList.add("hidden-publication");
//         }
//       });

//       // Highlight selected button
//       buttons.forEach(b => {
//         b.style.backgroundColor = "#fff";
//         b.style.color = "#47a88a";
//       });

//       this.style.backgroundColor = "#47a88a";
//       this.style.color = "#fff";
//     });
//   });
//   function filterByHash() {
//     const hash = window.location.hash.replace("#", ""); // e.g., "biomass"
//     if (hash) {
//       const targetButton = document.querySelector(`.tag-btn[data-tag="${hash}"]`);
//       if (targetButton) {
//         targetButton.click(); // This re-uses your existing click logic
//       }
//     }
//   }

//   // Run on page load
//   filterByHash();

//   // Run if the user clicks a link to the same page with a different hash
//   window.addEventListener("hashchange", filterByHash);
// });