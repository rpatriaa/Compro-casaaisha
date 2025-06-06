// Fungsi untuk mengatur link aktif
function setActiveLink(clickedLink) {
  // Hapus kelas active dari semua link
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.classList.remove("active");
    link.classList.remove("fw-medium");
  });

  // Tambahkan kelas active ke link yang diklik
  clickedLink.classList.add("active");
  clickedLink.classList.add("fw-medium");
}

// Script untuk memindahkan tombol "Hubungi Kami" saat scroll
document.addEventListener("DOMContentLoaded", function () {
  const floatingContactBtn = document.querySelector("#floatingContactBtn");

  // Set link beranda sebagai active saat halaman dimuat
  const currentPath = window.location.hash || "#beranda";
  const activeLink = document.querySelector(
    `.navbar-nav .nav-link[href="${currentPath}"]`
  );
  if (activeLink) {
    setActiveLink(activeLink);
  }

  // Fungsi untuk mengecek posisi scroll
  function checkScroll() {
    if (window.scrollY > 300) {
      // Mulai tampilkan setelah scroll 300px
      floatingContactBtn.classList.add("show");
    } else {
      floatingContactBtn.classList.remove("show");
    }
  }

  // Tambahkan event listener untuk scroll
  window.addEventListener("scroll", checkScroll);

  // Panggil satu kali saat halaman dimuat
  checkScroll();

  // Tambahkan animasi shake setiap 10 detik untuk menarik perhatian
  setInterval(function () {
    if (floatingContactBtn.classList.contains("show")) {
      floatingContactBtn.classList.add("attention");

      // Hapus class attention setelah animasi selesai
      setTimeout(function () {
        floatingContactBtn.classList.remove("attention");
      }, 500);
    }
  }, 10000); // Setiap 10 detik

  // Tambahkan efek saat tombol pertama kali muncul
  let hasShownOnce = false;
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        if (floatingContactBtn.classList.contains("show") && !hasShownOnce) {
          hasShownOnce = true;
          // Berikan delay sebelum shake pertama
          setTimeout(function () {
            floatingContactBtn.classList.add("attention");
            setTimeout(function () {
              floatingContactBtn.classList.remove("attention");
            }, 500);
          }, 2000); // 2 detik setelah muncul
        }
      }
    });
  });

  observer.observe(floatingContactBtn, { attributes: true });
});
