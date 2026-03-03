document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".tag-btn");
  const publications = document.querySelectorAll(".publication-item");

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const selectedTag = this.dataset.tag;

      publications.forEach(pub => {
        const pubTags = pub.dataset.tags
          ? pub.dataset.tags.split(",").map(t => t.trim())
          : [];

        if (selectedTag === "all" || pubTags.includes(selectedTag)) {
           pub.classList.remove("hidden-publication");
        } else {
            pub.classList.add("hidden-publication");
        }
      });

      // Highlight selected button
      buttons.forEach(b => {
        b.style.backgroundColor = "#fff";
        b.style.color = "#47a88a";
      });

      this.style.backgroundColor = "#47a88a";
      this.style.color = "#fff";
    });
  });
});