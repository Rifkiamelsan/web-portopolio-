// Fungsi untuk toggle (menampilkan atau menyembunyikan) menu di perangkat kecil
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

// Fungsi untuk menampilkan halaman yang dipilih
function showPage(page) {
    // Mendapatkan semua halaman (section)
    const pages = document.querySelectorAll('.page');
    
    // Menyembunyikan semua halaman
    pages.forEach(pageElement => {
        pageElement.style.display = 'none';
    });

    // Menampilkan halaman yang dipilih
    const selectedPage = document.getElementById(page);
    selectedPage.style.display = 'block';

    // Meng-scroll ke halaman yang dipilih
    selectedPage.scrollIntoView({ behavior: 'smooth' });

    // Menutup menu setelah memilih halaman
    const menu = document.getElementById('menu');
    menu.classList.remove('active');
}
// Fungsi untuk poster
let currentImageIndex = 0;
const images = ['poster1.jpg', 'poster2.jpg', 'poster3.jpg']; // Pastikan urutan ini sesuai dengan gambar di HTML

// Fungsi untuk membuka lightbox dengan gambar tertentu
function openLightbox(index) {
    // Tetapkan indeks gambar yang diklik
    currentImageIndex = index;

    // Tampilkan lightbox dan gambar yang sesuai
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    lightboxImg.src = images[currentImageIndex]; // Set gambar berdasarkan indeks
    lightbox.style.display = 'flex';
}

// Fungsi untuk menutup lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Fungsi untuk navigasi gambar di lightbox
function navigateLightbox(direction) {
    currentImageIndex += direction;

    // Loop kembali ke awal atau akhir jika melewati batas
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    // Perbarui gambar di lightbox
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = images[currentImageIndex];
}

// Event Listener untuk swipe (Hammer.js atau manual)
const lightbox = document.getElementById('lightbox');
lightbox.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

lightbox.addEventListener('touchend', (event) => {
    endX = event.changedTouches[0].clientX;

    if (startX - endX > 50) {
        navigateLightbox(1); // Geser ke kiri (next)
    } else if (endX - startX > 50) {
        navigateLightbox(-1); // Geser ke kanan (prev)
    }
});

// Keyboard navigasi
document.addEventListener('keydown', (event) => {
    if (lightbox.style.display === 'flex') {
        if (event.key === 'ArrowLeft') {
            navigateLightbox(-1); // Prev
        } else if (event.key === 'ArrowRight') {
            navigateLightbox(1); // Next
        } else if (event.key === 'Escape') {
            closeLightbox(); // Tutup
        }
    }
});