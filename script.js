const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

const galleryItems = [
    {
        image: 'images/image-47.jpg',
        title: 'BroodMother',
        description: 'They\'ve recently announced a starcraft wargame so I felt like drawing a zerg unit I like'
    },
    {
        image: 'images/image0-37.jpg',
        title: 'Rey Dau (attempt 4)',
        description: 'I still struggle drawing that guy, he has a very cool design that I\'d love to be able to nail down'
    },
    {
        image: 'images/image0.jpg',
        title: '12.1 architech',
        description: 'first drawing that I felt proud making, even if it very inspired from and existing art'
    },
    {
        image: 'images/image1.jpg',
        title: 'Eido',
        description: 'OC of a friend, felt like practicing clothe'
    },
    {
        image: 'images/image10.jpg',
        title: 'Hornet',
        description: 'Was made after a practice at cloth physics, I\'ve learned to be a bit more considerate of shadow with this one'
    },
    {
        image: 'images/image11.jpg',
        title: 'Quematrice',
        description: 'Wasn\'t happy with it, colours are quite muted'
    },
    {
        image: 'images/image12.jpg',
        title: 'Mizutsune',
        description: 'I like the design of that creature, one of the few instance of mizu not being turned into r34'
    },
    {
        image: 'images/image13.jpg',
        title: 'Saryn',
        description: 'From that point on I learned a very sketchy drawing style, sadly it\'s not an original art'
    },
    {
        image: 'images/image14.jpg',
        title: 'Oraxia',
        description: 'I like angular and exaggerated angles for those characters'
    },
    {
        image: 'images/image15.jpg',
        title: 'Team Snakemouth',
        description: 'I struggled more with the top panel'
    },
    {
        image: 'images/image16.jpg',
        title: 'Queen Elizant II',
        description: 'Turns out she does not betray you, I did betray her with terrible perspective'
    },
    {
        image: 'images/image17.jpg',
        title: 'Nore',
        description: 'Evil critter birthday, don\'t feed'
    },
    {
        image: 'images/image18.jpg',
        title: 'Wisp sitted',
        description: 'Not original, still like what I did with the colours'
    },
    {
        image: 'images/image19.jpg',
        title: 'Hornet, silk queen',
        description: 'Not original, learned a few things from it'
    },
    {
        image: 'images/image2.jpg',
        title: 'Zerg queen',
        description: 'More of a reproduction of something already done, don\'t remember much'
    },
    {
        image: 'images/image20.jpg',
        title: 'My hunter',
        description: 'Just beated prood of a hero in wilds, felt like celebrating'
    },
    {
        image: 'images/image21.jpg',
        title: 'Azzy, local deer',
        description: 'First real furry creation, very happy with the result, was for the birthday of a friend, the time invested was not worth the meager compliments on this one'
    },
    {
        image: 'images/image22.jpg',
        title: 'Mag',
        description: 'Bit more conflicted about this one, the clothing probably needed to be have a bit more details'
    },
    {
        image: 'images/image3.jpg',
        title: 'Zergling',
        description: 'Regular critter, not much to say about it'
    },
    {
        image: 'images/image4.jpg',
        title: 'Yaerli',
        description: 'The day I learned that humanoid have their waist far closer to their chest than I thought'
    },
    {
        image: 'images/image6.jpg',
        title: 'Canoptek',
        description: 'Very unhappy about this one, almost made me quit'
    },
    {
        image: 'images/image7.jpg',
        title: 'Delivery',
        description: 'Last minute creation, pretty terrible'
    },
    {
        image: 'images/image8.jpg',
        title: 'Chillet',
        description: 'V2 version, the first was very sad to look at'
    },
    {
        image: 'images/image9.jpg',
        title: 'Mizu Pal',
        description: 'Looks fancy, too smooth though'
    },
    {
        image: 'images/IMG_0589.png',
        title: 'Oraxia B&W',
        description: 'I like her, though I went too far on effects'
    },
    {
        image: 'images/IMG_0590.png',
        title: 'Tarantriss <3',
        description: 'Love the energy I gave to this one, was the first art I was really proud of sharing everywhere'
    },
    {
        image: 'images/IMG_0592.png',
        title: 'Mizutsune sleepy',
        description: 'Very purple, nothing much to say'
    },
    {
        image: 'images/IMG_0594.png',
        title: 'Yareli 2',
        description: 'Newer style, quite happy with this one, took a lot of time though'
    },
    {
        image: 'images/IMG_0600.png',
        title: 'Box',
        description: 'it\'s just a box with terrible perspective'
    },
    {
        image: 'images/IMG_0601.png',
        title: 'Garde',
        description: 'Done that just after a friend gave me some new pencils, I was sold'
    },
    {
        image: 'images/IMG_0603.png',
        title: 'Resting a web',
        description: 'Tried to be fancy with cloting'
    },
    {
        image: 'images/Untitled_Artwork.png',
        title: 'Beginning of the end',
        description: 'I belive I wanted to impress a friend with this one, it only made me spiral down, this piece represents a starting point of a cycle of self disappointment'
    },
    {
        image: 'images/Untitled_Artwork2.png',
        title: 'Doot',
        description: 'Doot Doot, oc of a friend'
    },
    {
        image: 'images/Untitled_Artwork5.png',
        title: 'Wisp portrait',
        description: 'Not great, worth a try though'
    },
]

let currentImageIndex = 0;

function openModal(index) {
    currentImageIndex = index;
    displayImage(index);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function displayImage(index) {
    const item = galleryItems[index];
    modalImage.src = item.image;
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    displayImage(currentImageIndex);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    displayImage(currentImageIndex);
}

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (modal.classList.contains('show')) {
        if (event.key === 'ArrowRight') nextImage();
        if (event.key === 'ArrowLeft') prevImage();
        if (event.key === 'Escape') closeModal();
    }
});

let lastScrollTime = 0;
window.addEventListener('wheel', (event) => {
    if (modal.classList.contains('show')) {
        const now = Date.now();

        if (now - lastScrollTime < 300) return;

        lastScrollTime = now;

        if (event.deltaY > 0) {

            nextImage();
        } else {

            prevImage();
        }

        event.preventDefault();
    }
}, { passive: false });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', (e) => {

        e.stopPropagation();
        openModal(index);
    });
});

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset;
    if (currentScroll > lastScrollTop) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });
}
