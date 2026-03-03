document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  document.querySelectorAll(".publication-thumbnail img").forEach(img => {
    img.addEventListener("click", function () {
      lightbox.style.display = "block";
      lightboxImg.src = this.src;
    });
  });

  closeBtn.onclick = function () {
    lightbox.style.display = "none";
  };

  lightbox.onclick = function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  };
});