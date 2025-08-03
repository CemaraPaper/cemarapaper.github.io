/* =========================================================================
   SCRIPT UTAMA WEBSITE CEMARA PAPER (VERSI FINAL LENGKAP)
   ========================================================================= */

// --- BAGIAN 1: PRELOADER (HARUS BERJALAN DULUAN & DI LUAR) ---
const preloader = document.getElementById('preloader');
if (preloader) {
    window.addEventListener('load', function() {
        preloader.classList.add('hidden');
    });
}

// --- BAGIAN 2: SEMUA FUNGSI LAINNYA SETELAH HALAMAN SIAP ---
document.addEventListener('DOMContentLoaded', async function () {

<<<<<<< HEAD
    // --- KODE MENU MOBILE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    if (menuToggle && navMenu) {
        // Logika untuk tombol garis tiga
        menuToggle.addEventListener('click', function (event) {
            event.stopPropagation();
            navMenu.classList.toggle('active');
        });

        // Logika untuk menutup menu saat link diklik
        const navLinksInMenu = navMenu.querySelectorAll('a');
        navLinksInMenu.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
=======

themeCheckbox.addEventListener('change', function() {
    if (this.checked) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// --- Kode untuk Tombol "Load More" di Galeri ---

document.addEventListener('DOMContentLoaded', function() {
    // Tentukan berapa item yang ditampilkan per klik
    const itemsPerLoad = 6;
    
    // Cari semua galeri yang ada di halaman
    const galleries = document.querySelectorAll('.gallery-category');

    galleries.forEach(gallery => {
        const grid = gallery.querySelector('.gallery-page-grid');
        const loadMoreBtn = gallery.querySelector('.load-more-btn');
        const items = grid.querySelectorAll('.gallery-frame');

        // Jika tidak ada tombol atau jumlah item sedikit, abaikan
        if (!loadMoreBtn || items.length <= itemsPerLoad) {
            if(loadMoreBtn) loadMoreBtn.style.display = 'none';
            return;
        }

        // Sembunyikan item yang berlebih saat halaman dimuat
        for (let i = itemsPerLoad; i < items.length; i++) {
            items[i].classList.add('gallery-item-hidden');
        }

        // Tambahkan event listener untuk tombol
        loadMoreBtn.addEventListener('click', function() {
            const hiddenItems = grid.querySelectorAll('.gallery-item-hidden');
            let itemsToShow = Array.from(hiddenItems).slice(0, itemsPerLoad);

            itemsToShow.forEach(item => {
                item.classList.remove('gallery-item-hidden');
>>>>>>> parent of c63a41c (Penambahan fitur ganti bahasa ke bahasa inggris)
            });
        });

        // Logika untuk menutup menu saat klik di luar
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            if (navMenu.classList.contains('active') && !isClickInsideMenu && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }


    // --- KODE GANTI BAHASA ---
    let languageData;
    try {
        const response = await fetch('languages.json');
        if (response.ok) {
            languageData = await response.json();
            
            const changeLanguage = (lang) => {
                localStorage.setItem('language', lang);
                document.querySelectorAll('[data-lang-key]').forEach(element => {
                    const key = element.dataset.langKey;
                    if (languageData[lang] && languageData[lang][key]) {
                        if (element.tagName === 'META' && element.name === 'description') {
                            element.setAttribute('content', languageData[lang][key]);
                        } else {
                            element.textContent = languageData[lang][key];
                        }
                    }
                });

                // Update teks dark mode & tombol bahasa
                updateDynamicLabels(lang);
            };
            
            const updateDynamicLabels = (lang) => {
                const themeStatusText = document.getElementById('theme-status-text');
                if (themeStatusText) {
                    const currentTheme = localStorage.getItem('theme') || 'light';
                    const modeKey = currentTheme === 'dark' ? 'dark_mode_text' : 'light_mode_text';
                    if (languageData[lang][modeKey]) {
                        themeStatusText.textContent = languageData[lang][modeKey];
                    }
                }
                document.querySelectorAll('.lang-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.lang === lang) btn.classList.add('active');
                });
            };

            document.querySelectorAll('.lang-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    changeLanguage(event.target.dataset.lang);
                });
            });

            const savedLang = localStorage.getItem('language') || 'id';
            changeLanguage(savedLang);
        } else {
            console.error('File languages.json tidak ditemukan');
        }
    } catch (error) {
        console.error('Gagal memuat fungsionalitas bahasa:', error);
    }
    

    // --- KODE FITUR-FITUR LAINNYA ---

    // Animasi Fade-in on Scroll
    const faders = document.querySelectorAll('.fade-in-element');
    if (faders.length > 0) {
        const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, appearOptions);
        faders.forEach(fader => appearOnScroll.observe(fader));
    }

    // Lightbox Galeri
    if (document.querySelector('.gallery-page-grid')) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const closeBtn = document.querySelector('.close-btn');
        const openLightbox = (e) => {
            if (lightbox) lightbox.style.display = 'flex';
            if (lightboxImg) lightboxImg.src = e.target.src;
            document.body.style.overflow = 'hidden';
        };
        const closeLightbox = () => {
            if (lightbox) lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
        document.querySelectorAll('.gallery-frame img').forEach(image => image.addEventListener('click', openLightbox));
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    }

    // Tombol Scroll to Top
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        const scrollFunction = () => {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        };
        window.addEventListener('scroll', scrollFunction);
        scrollFunction();
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
<<<<<<< HEAD

    // Shadow Header saat Scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
        });
    }

    // Tombol Dark Mode
    const themeCheckbox = document.getElementById('theme-checkbox');
    if (themeCheckbox) {
        const setTheme = (theme) => {
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeCheckbox.checked = theme === 'dark';
            const lang = localStorage.getItem('language') || 'id';
            updateDynamicLabels(lang); // Panggil fungsi update label
        };
        
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        
        themeCheckbox.addEventListener('change', function() {
            setTheme(this.checked ? 'dark' : 'light');
        });
    }

    // Tombol Load More untuk Acara
    const eventsContainer = document.getElementById('workshop-events-grid');
    const loadMoreEventsBtn = document.getElementById('load-more-events');
    if (eventsContainer && loadMoreEventsBtn) {
        const events = Array.from(eventsContainer.querySelectorAll('.gallery-event'));
        const itemsToShow = 3;
        events.slice(itemsToShow).forEach(event => event.style.display = 'none');
        if (events.length <= itemsToShow) {
            loadMoreEventsBtn.parentElement.style.display = 'none';
        }
        loadMoreEventsBtn.addEventListener('click', function() {
            events.forEach(event => event.style.display = 'block');
            this.parentElement.style.display = 'none';
        });
    }
=======
>>>>>>> parent of c63a41c (Penambahan fitur ganti bahasa ke bahasa inggris)
});