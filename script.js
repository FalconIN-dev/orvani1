/* === ORVANI EYEWEAR - FINAL & CONSOLIDATED SCRIPT === */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. INTERACTIVE HEADER LOGIC ---
    const header = document.querySelector('.site-header');
    const logoLink = document.querySelector('.logo a');

    if (logoLink) {
        const logoText = logoLink.textContent;
        // Check if the logo hasn't already been processed to avoid re-running
        if (logoLink.childElementCount === 0) {
            logoLink.innerHTML = '';
            for (let i = 0; i < logoText.length; i++) {
                const charSpan = document.createElement('span');
                charSpan.textContent = logoText[i];
                logoLink.appendChild(charSpan);
            }
        }
    }

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 2. ADVANCED CURSOR LOGIC ---
    if (!document.getElementById('custom-cursor')) { // Prevent creating duplicate cursors
        const cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        const cursorText = document.createElement('div');
        cursorText.className = 'cursor-text';
        cursor.appendChild(cursorDot);
        cursor.appendChild(cursorText);
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, .product-card-link');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover-link');
                cursorText.innerText = 'View';
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover-link');
                cursorText.innerText = '';
            });
        });

        const magneticElements = document.querySelectorAll('button, .banner-cta, .page-number, .page-arrow, .campaign-nav button');
        const magneticStrength = 0.4;
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * magneticStrength}px, ${y * magneticStrength}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0,0)';
            });
        });
    }

    // --- 3. HOMEPAGE PRELOADER LOGIC ---
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    if (preloader && mainContent) {
        const initialPrompt = preloader.querySelector('#initial-prompt');
        const typewriterContainer = preloader.querySelector('#typewriter-container');

        if (initialPrompt && typewriterContainer) {
            const startAnimation = () => {
                initialPrompt.style.opacity = '0';
                setTimeout(() => {
                    initialPrompt.classList.add('hidden');
                    typewriterContainer.classList.remove('hidden');
                }, 300);
                setTimeout(revealSite, 2500);
            };

            const revealSite = () => {
                preloader.style.opacity = '0';
                mainContent.classList.remove('hidden');
                mainContent.classList.add('visible');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 1200);
            };
            preloader.addEventListener('click', startAnimation, { once: true });
        }
    }

    // --- 4. CAMPAIGN GALLERY LOGIC ---
    const campaignSection = document.getElementById('campaign');
    if (campaignSection) {
        const cards = campaignSection.querySelectorAll('.campaign-card');
        const campaignHeadline = campaignSection.querySelector('.campaign-headline');
        const campaignNextBtn = campaignSection.querySelector('#next-btn');
        const campaignPrevBtn = campaignSection.querySelector('#prev-btn');

        if (cards.length > 0 && campaignHeadline && campaignNextBtn && campaignPrevBtn) {
            let currentIndex = 0;
            const showCard = (index) => {
                if (index >= cards.length) currentIndex = 0;
                else if (index < 0) currentIndex = cards.length - 1;
                else currentIndex = index;

                const activeCard = cards[currentIndex];
                cards.forEach(card => card.classList.remove('active', 'prev', 'next'));
                activeCard.classList.add('active');
                cards[(currentIndex + 1) % cards.length].classList.add('next');
                cards[(currentIndex - 1 + cards.length) % cards.length].classList.add('prev');

                campaignHeadline.style.opacity = 0;
                setTimeout(() => {
                    campaignHeadline.textContent = activeCard.dataset.headline || '';
                    campaignHeadline.style.opacity = 1;
                }, 300);
                campaignSection.style.backgroundColor = activeCard.dataset.color || '#000000';
            };

            campaignNextBtn.addEventListener('click', () => showCard(currentIndex + 1));
            campaignPrevBtn.addEventListener('click', () => showCard(currentIndex - 1));
            showCard(currentIndex);
        }
    }

    // --- 5. ALL MODAL & RATING LOGIC ---
    const modal = document.getElementById('quick-look-modal');
    if (modal) {
        const closeModalBtn = modal.querySelector('.close-btn');
        const modalBody = modal.querySelector('.modal-body');
        const closeModal = () => modal.style.display = 'none';

        const sampleReviews = [
            { author: 'Alex R.', date: 'May 20, 2025', text: 'Absolutely phenomenal. The quality is insane for the price. They feel heavy and premium.' },
            { author: 'Jess C.', date: 'May 15, 2025', text: 'These are my new favorite sunglasses, hands down. I get compliments everywhere I go.' },
            { author: 'Sam B.', date: 'April 28, 2025', text: 'Great style and they feel really durable. The packaging was also top-notch. Impressed.' },
        ];
        
        const populateRatings = () => {
            const productLinks = document.querySelectorAll('.product-card-link');
            productLinks.forEach(link => {
                const ratingValue = link.dataset.rating;
                const ratingContainer = link.querySelector('.product-rating');
                if (ratingValue && ratingContainer) {
                    ratingContainer.innerHTML = `<i class="fa-solid fa-star"></i> ${ratingValue}`;
                }
            });
        };
        populateRatings();

        document.querySelectorAll('.quick-look-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.product-card');
                const title = card.querySelector('h3').textContent;
                const price = card.querySelector('.price').textContent;
                const imageSrc = card.querySelector('.static-image').src;
                modalBody.innerHTML = `
                    <img src="${imageSrc}" alt="${title}" class="modal-img">
                    <div class="modal-details">
                        <h2>${title}</h2> <p class="price">${price}</p>
                        <p>Sleek, lightweight frames with advanced UV400 protection. Crafted for the bold.</p>
                        <button class="banner-cta">Add to Cart</button>
                    </div>`;
                modal.style.display = 'block';
            });
        });

        document.querySelectorAll('.full-page-grid .product-card-link').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const card = link.querySelector('.product-card');
                const title = card.querySelector('h3').textContent;
                const price = card.querySelector('.price').textContent;
                const imageSrc = card.querySelector('.static-image').src;
                const description = link.dataset.description;
                const rating = link.dataset.rating;
                const reviewsCount = link.dataset.reviews;

                let reviewsHTML = `<div class="reviews-section"><h3>REVIEWS (<i class="fa-solid fa-star"></i> ${rating} based on ${reviewsCount} ratings)</h3>`;
                sampleReviews.slice(0, 3).forEach(review => {
                    reviewsHTML += `<div class="review-item"><div class="review-header"><span class="review-author">${review.author}</span><span class="review-date">${review.date}</span></div><p class="review-text">${review.text}</p></div>`;
                });
                reviewsHTML += `</div>`;
                
                modalBody.innerHTML = `
                    <img src="${imageSrc}" alt="${title}" class="modal-img">
                    <div class="modal-details">
                        <h2>${title}</h2><p class="price">${price}</p>
                        <p class="product-description">${description}</p>
                        <button class="banner-cta">Purchase</button>
                        ${reviewsHTML}
                    </div>`;
                modal.style.display = 'block';
            });
        });
        
        closeModalBtn.addEventListener('click', closeModal);
        window.addEventListener('click', (e) => {
            if (e.target == modal) closeModal();
        });
    }

    // --- 6. SCROLL-TRIGGERED BANNER ANIMATION ---
    const bannerAnimationContainers = document.querySelectorAll('.reveal-animation-container');
    if (bannerAnimationContainers.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-lines');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        bannerAnimationContainers.forEach(container => observer.observe(container));
    }
    
    // --- 7. CINEMATIC LOOKBOOK PAGE LOGIC ---
    const lookbookContainer = document.querySelector('.lookbook-container');
    if (lookbookContainer) {
        const intro = document.getElementById('lookbook-intro');
        const slides = document.querySelectorAll('.lookbook-slide');
        let isTyping = false;

        const typeWriter = (element, text, speed, callback) => {
            let i = 0;
            element.innerHTML = '';
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else if (callback) {
                    callback();
                }
            }
            type();
        };

        const animateSlide = (slide) => {
            if (slide.classList.contains('is-animating')) return;
            slide.classList.add('is-animating', 'is-active');
            const titleEl = slide.querySelector('.lookbook-title');
            const descEl = slide.querySelector('.lookbook-description');
            const titleText = slide.dataset.title;
            const descText = slide.dataset.description;
            titleEl.textContent = '';
            descEl.textContent = '';

            setTimeout(() => {
                titleEl.textContent = titleText;
                titleEl.classList.add('title-in');
            }, 500);

            setTimeout(() => {
                titleEl.classList.add('is-typing');
                descEl.classList.add('is-typing');
                typeWriter(descEl, descText, 20, () => {
                    slide.classList.remove('is-animating');
                });
            }, 1800);
        };

        const resetSlide = (slide) => {
            slide.classList.remove('is-active', 'is-animating');
            const titleEl = slide.querySelector('.lookbook-title');
            const descEl = slide.querySelector('.lookbook-description');
            titleEl.classList.remove('title-in', 'is-typing');
            descEl.classList.remove('is-typing');
            descEl.textContent = '';
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSlide(entry.target);
                } else {
                    resetSlide(entry.target);
                }
            });
        }, { threshold: 0.7 });

        window.onload = () => {
            slides.forEach(slide => {
                observer.observe(slide);
            });
            if (intro) {
                intro.addEventListener('click', () => {
                    intro.style.opacity = '0';
                    setTimeout(() => {
                        intro.style.display = 'none';
                    }, 1000);
                }, { once: true });
            }
        };
    }

});