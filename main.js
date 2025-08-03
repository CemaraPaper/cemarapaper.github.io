// js/main.js - VERSI FINAL

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }
});

// --- Kode untuk Animasi Fade-in on Scroll ---

// 1. Pilih semua elemen yang ingin kita animasikan
const faders = document.querySelectorAll('.fade-in-element');

// 2. Atur opsi untuk si "mata-mata"
const appearOptions = {
  threshold: 0.1, // Elemen dianggap terlihat jika 10% areanya masuk layar
  rootMargin: "0px 0px -50px 0px" // Trigger sedikit lebih awal (-50px dari bawah)
};

// 3. Buat si "mata-mata" (Intersection Observer)
const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    // Jika elemennya tidak terlihat, jangan lakukan apa-apa
    if (!entry.isIntersecting) {
      return;
    } else {
      // Jika terlihat, tambahkan kelas 'visible'
      entry.target.classList.add('visible');
      // Berhenti mengamati elemen ini agar animasi tidak berulang
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

// 4. Suruh si "mata-mata" untuk mengamati setiap elemen yang kita pilih
faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// --- Kode untuk Fitur Lightbox di Halaman Galeri ---

// Cek dulu apakah kita berada di halaman yang punya galeri
if (document.querySelector('.gallery-page-grid')) {
  
  // 1. Ambil semua elemen yang kita butuhkan
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryImages = document.querySelectorAll('.gallery-page-grid img');
  const closeBtn = document.querySelector('.close-btn');

  // 2. Fungsi untuk membuka lightbox
  function openLightbox(e) {
    lightbox.style.display = 'flex'; // Tampilkan lightbox
    lightboxImg.src = e.target.src; // Ambil sumber gambar yang diklik
    document.body.style.overflow = 'hidden'; // Hentikan scroll di background
  }

  // 3. Fungsi untuk menutup lightbox
  function closeLightbox() {
    lightbox.style.display = 'none'; // Sembunyikan lightbox
    document.body.style.overflow = 'auto'; // Aktifkan lagi scroll
  }

  // 4. Pasang "pendengar" di setiap gambar galeri
  galleryImages.forEach(image => {
    image.addEventListener('click', openLightbox);
  });

  // 5. Pasang "pendengar" di tombol close dan latar belakang
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e) {
    // Hanya tutup jika yang diklik adalah latar belakangnya, bukan gambarnya
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

// --- Kode untuk Tombol Scroll to Top ---

// 1. Ambil elemen tombolnya
const scrollTopBtn = document.getElementById('scrollTopBtn');

// 2. Tentukan kapan tombol muncul saat window di-scroll
window.onscroll = function() {
  scrollFunction();
};
scrollFunction();
function scrollFunction() {
  // Jika scroll lebih dari 200px dari atas, tampilkan tombol
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    scrollTopBtn.style.display = 'flex';
  } else {
    // Jika tidak, sembunyikan lagi
    scrollTopBtn.style.display = 'none';
  }
}

// 3. Tentukan aksi saat tombol diklik
scrollTopBtn.addEventListener('click', function(e) {
  e.preventDefault(); // Mencegah link '#' melakukan refresh
  // Scroll ke paling atas halaman dengan mulus
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// --- Kode untuk Efek Shadow di Header saat Scroll ---
const header = document.querySelector('.header');
window.addEventListener('scroll', function() {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// --- Kode untuk Preloader ---
const preloader = document.getElementById('preloader');
window.addEventListener('load', function() {
  preloader.classList.add('hidden');
});

// --- Kode untuk Tombol Dark Mode ---
const themeCheckbox = document.getElementById('theme-checkbox');
const themeStatusText = document.getElementById('theme-status-text');
const bodyElement = document.body;

function setTheme(theme) {
    bodyElement.removeAttribute('data-theme');
    
    if (theme === 'dark') {
        bodyElement.setAttribute('data-theme', 'dark');
        // Saat mode gelap, teks menawarkan untuk pindah ke mode terang
        themeStatusText.textContent = 'Mode Terang'; 
        themeCheckbox.checked = true;
    } else {
        bodyElement.setAttribute('data-theme', 'light');
        // Saat mode terang, teks menawarkan untuk pindah ke mode gelap
        themeStatusText.textContent = 'Mode Gelap';
        themeCheckbox.checked = false;
    }
    localStorage.setItem('theme', theme);
}

// Cek tema tersimpan saat halaman dimuat
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);


themeCheckbox.addEventListener('change', function() {
    if (this.checked) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// --- Kode untuk Tombol "Load More" di Galeri (VERSI TAHAN ERROR) ---

document.addEventListener('DOMContentLoaded', function() {
    // Tentukan berapa item yang ditampilkan per klik
    const itemsPerLoad = 6;
    
    // Cari semua galeri yang ada di halaman
    const galleries = document.querySelectorAll('.gallery-category');

    galleries.forEach(gallery => {
        const grid = gallery.querySelector('.gallery-page-grid');
        const loadMoreBtn = gallery.querySelector('.load-more-btn');
        // PASTIKAN GRID ADA
        if (!grid) return; 

        const items = Array.from(grid.querySelectorAll('.gallery-frame'));

        // Jika tidak ada tombol atau jumlah item sedikit, sembunyikan tombol (JIKA ADA) dan hentikan
        if (!loadMoreBtn || items.length <= itemsPerLoad) {
            if (loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        // Sembunyikan item yang berlebih saat halaman dimuat
        items.slice(itemsPerLoad).forEach(item => {
            item.classList.add('gallery-item-hidden');
        });

        // Tambahkan event listener untuk tombol
        loadMoreBtn.addEventListener('click', function() {
            const hiddenItems = Array.from(grid.querySelectorAll('.gallery-item-hidden'));
            let itemsToShow = hiddenItems.slice(0, itemsPerLoad);

            itemsToShow.forEach(item => {
                item.classList.remove('gallery-item-hidden');
            });

            // Sembunyikan tombol jika sudah tidak ada lagi item tersembunyi
            if (grid.querySelectorAll('.gallery-item-hidden').length === 0) {
                loadMoreBtn.style.display = 'none';
            }
        });
    });
});

// --- Kode untuk Load More Acara di Galeri (Versi Simpel & Cepat) ---
document.addEventListener('DOMContentLoaded', function() {
    const eventsContainer = document.getElementById('workshop-events-grid');
    const loadMoreBtn = document.getElementById('load-more-events');
    
    if (eventsContainer && loadMoreBtn) {
        const events = Array.from(eventsContainer.querySelectorAll('.gallery-event'));
        const itemsToShowInitially = 3;
        let currentlyShown = itemsToShowInitially;

        // Sembunyikan acara yang berlebih di awal
        events.slice(itemsToShowInitially).forEach(event => {
            event.style.display = 'none';
        });

        if (events.length <= itemsToShowInitially) {
            loadMoreBtn.style.display = 'none';
            return;
        }

        // Fungsi saat tombol diklik
        loadMoreBtn.addEventListener('click', function() {
            const nextItems = events.slice(currentlyShown, currentlyShown + itemsToShowInitially);
            
            nextItems.forEach(event => {
                event.style.display = 'block';
            });

            currentlyShown += itemsToShowInitially;

            // Sembunyikan tombol jika sudah tidak ada lagi item tersembunyi
            if (currentlyShown >= events.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
});

// --- Kode untuk Ganti Bahasa ---

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Muat file JSON
    const response = await fetch('languages.json');
    const languageData = await response.json();

    const languageSwitcher = document.querySelector('.language-switcher');
    const langButtons = document.querySelectorAll('.lang-btn');
    const themeStatusText = document.getElementById('theme-status-text');

    // 2. Fungsi untuk mengubah bahasa
    const changeLanguage = (lang) => {
        // Simpan pilihan bahasa
        localStorage.setItem('language', lang);

        // Ubah semua teks yang punya data-lang-key
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.dataset.langKey;
            element.textContent = languageData[lang][key];
        });

        // Update teks dark/light mode
        if (themeStatusText) {
          const currentTheme = localStorage.getItem('theme') || 'light';
          themeStatusText.textContent = languageData[lang][currentTheme === 'dark' ? 'dark_mode_text' : 'light_mode_text'];
        }

        // Update tombol aktif
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
    };

    // 3. Tambahkan event listener ke tombol
    langButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            changeLanguage(event.target.dataset.lang);
        });
    });

    // 4. Cek bahasa tersimpan saat halaman dimuat
    const savedLang = localStorage.getItem('language') || 'id'; // Default ke Bahasa Indonesia
    changeLanguage(savedLang);
});