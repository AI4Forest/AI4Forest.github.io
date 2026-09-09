document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".tag-btn");
  const publications = document.querySelectorAll(".publication-item");
  let activeTags = new Set();
  let activeConference = "all";
  const venueButtons = document.querySelectorAll(".venue-filter");

  function updateVisibility() {
    publications.forEach(pub => {
      const pubTags = pub.dataset.tags
        ? pub.dataset.tags.split(",").map(t => t.trim())
        : [];

      // Logic: Show if 'all' is active OR if no tags are selected OR if the pub has EVERY active tag
      const matchesTopic = activeTags.size === 0 ||
                        activeTags.has("all") ||
                        Array.from(activeTags).every(tag => pubTags.includes(tag));

      const matchesVenue = activeConference === "all" || pub.dataset.conference === activeConference;
      pub.classList.toggle("hidden-publication", !(matchesTopic && matchesVenue));
    });

    const result = document.querySelector('.publication-results');
    if (result) {
      const count = Array.from(publications).filter(pub => !pub.classList.contains('hidden-publication')).length;
      result.textContent = count ? `${count} of ${publications.length} publications` : 'No publications match these filters. Select All and All venues to reset.';
    }
    venueButtons.forEach(button => {
      const selected = button.dataset.conference === activeConference;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    // Update Button Styles
    buttons.forEach(btn => {
      const isActive = activeTags.has(btn.dataset.tag) || (btn.dataset.tag === "all" && activeTags.size === 0);
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  function handleTagClick(tag) {
    activeTags.clear();
    activeTags.add(tag);
    updateVisibility();
  }

  venueButtons.forEach(button => button.addEventListener('click', () => {
    activeConference = button.dataset.conference;
    updateVisibility();
  }));
  // Bind click events to buttons
  buttons.forEach(button => {
    button.addEventListener("click", () => handleTagClick(button.dataset.tag));
  });

  // --- FIX: Logic to read the # from the URL ---
  function syncFromHash() {
    const hash = window.location.hash.replace("#", "");
    activeTags.clear();
    if (hash) {
      // Supports single (#biomass) or multiple (#biomass,canopy)
      hash.split(",").forEach(t => {
        const cleanTag = t.trim();
        if (cleanTag) activeTags.add(cleanTag);
      });
    }
    updateVisibility();
  }

  // Run on load
  syncFromHash();
  updateVisibility();

  // Run if the hash changes while the user is already on the page
  window.addEventListener("hashchange", syncFromHash);
});
