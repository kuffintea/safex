document.addEventListener('DOMContentLoaded', () => {
	const initModal = (modalId, openBtnSelector, externalFormId = null) => {
		const modal = document.getElementById(modalId);
		const openBtn = document.querySelector(openBtnSelector);
		if (!modal || !openBtn) return;

		const form = externalFormId ? document.getElementById(externalFormId) : modal.querySelector('form');
		const closeBtn = modal.querySelector('.modal__close');
		const stepForm = modal.querySelector('.modal__step:not(.modal__step--success)');
		const stepSuccess = modal.querySelector('.modal__step--success');

		const closeModal = () => {
			if (!modal.classList.contains('is-open')) return;
			modal.classList.add('is-closing');
			setTimeout(() => {
				modal.classList.remove('is-open', 'is-closing');
				if (form && stepForm && stepSuccess) {
					stepForm.classList.add('is-active');
					stepSuccess.classList.remove('is-active');
					form.reset();
				}
				else if (!form && stepSuccess) {
					stepSuccess.classList.add('is-active');
				}
				if (form) form.reset();
			}, 300);
		};

		openBtn.addEventListener('click', (e) => {
			if (openBtn.tagName === 'A' && !openBtn.getAttribute('form')) {
				e.preventDefault();
				modal.classList.add('is-open');
			}
		});

		if (form) {
			form.addEventListener('submit', (e) => {
				e.preventDefault();
				e.stopImmediatePropagation();

				modal.classList.add('is-open');

				if (stepForm && stepSuccess) {
					stepForm.classList.remove('is-active');
					stepSuccess.classList.add('is-active');
				}
			});
		}

		closeBtn?.addEventListener('click', closeModal);
		modal.addEventListener('click', (e) => {
			if (e.target === modal) closeModal();
		});
	};

    initModal('modal-callback', '.home-hero__link');
	initModal('modal-partner', '.dealer-hero__btn');
	initModal('modal-order', '.order-summary__btn', 'order-form');
	initModal('modal-consultation', '.consultation__btn', 'consultation-form');


	const cookiePopup = document.getElementById('cookie-popup');
	const cookieAcceptBtn = document.getElementById('cookie-accept');

	const closeCookies = () => {
    	setTimeout(() => {
        	cookiePopup.classList.remove('is-active');
    	}, 200);
	};

	cookieAcceptBtn?.addEventListener('click', closeCookies);


	const menuBtn = document.querySelector('.header__menu');
	const nav = document.querySelector('.header__nav');

	menuBtn?.addEventListener('click', () => {
   	 	nav.classList.toggle('is-open');
	});

	const navLinks = document.querySelectorAll('.nav__link');
	navLinks.forEach(link => {
    	link.addEventListener('click', () => {
        	nav.classList.remove('is-open');
    	});
	});


	const locationBtns = document.querySelectorAll('.js-locations-btn');
    const locationCard = document.querySelector('.js-location-card');
    const locationClose = document.querySelector('.js-location-close');

	locationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            locationCard?.classList.add('is-open');
        });
    });

    locationClose?.addEventListener('click', () => {
        locationCard?.classList.remove('is-open');
    });


	const cartPopup = document.getElementById('cart-popup');
	let cartTimeout;

	const showCartPopup = () => {
        clearTimeout(cartTimeout);
        cartPopup?.classList.add('is-active');
        cartTimeout = setTimeout(() => {
            cartPopup?.classList.remove('is-active');
        }, 2000);
    };

	const addToCartBtns = document.querySelectorAll('.product-card__btn');
	addToCartBtns.forEach(btn => {
        btn.addEventListener('click', showCartPopup);
    });

	const productInfoBtn = document.querySelector('.product-info__btn');
    productInfoBtn?.addEventListener('click', showCartPopup);


	const deliveryRadios = document.querySelectorAll('input[name="delivery_method"]');
    const addressField = document.querySelector('.js-address-field');
    const addressTextarea = addressField?.querySelector('textarea');

    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'courier') {
                addressField.style.display = 'block';
                if (addressTextarea) addressTextarea.required = true;
            } else {
                addressField.style.display = 'none';
                if (addressTextarea) {
                    addressTextarea.required = false;
                    addressTextarea.value = '';
                }
            }
        });
    });


	const galleryItems = document.querySelectorAll('.gallery__pic img');
    const galleryModal = document.getElementById('modal-gallery');
    const galleryFullImg = document.querySelector('.js-gallery-full');

	const closeGallery = () => {
        if (!galleryModal.classList.contains('is-open')) return;

        galleryModal.classList.add('is-closing');
        setTimeout(() => {
            galleryModal.classList.remove('is-open', 'is-closing');
            galleryFullImg.src = '';
        }, 300);
    };

    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            if (!galleryModal || !galleryFullImg) return;
            galleryFullImg.src = img.src;
            galleryFullImg.alt = img.alt;
            galleryModal.classList.add('is-open');
        });
    });

    galleryModal?.addEventListener('click', (e) => {
        if (e.target === galleryModal || e.target.closest('.modal__close')) {
            closeGallery();
        }
    });


	const sliderList = document.querySelector('.home-page__gallery-list');
    const sliderBtns = document.querySelectorAll('.gallery__slider-btn');
    const slides = sliderList ? sliderList.querySelectorAll('.gallery__item') : [];

    if (sliderList && slides.length > 0) {
        let currentIndex = 0;
        let isMobile = window.innerWidth < 1200;

        const updateSlider = (index) => {
            if (!isMobile) return;

            if (index >= slides.length) index = slides.length - 1;
            if (index < 0) index = 0;

            const offset = index * -100;
            sliderList.style.transform = `translateX(${offset}%)`;

            sliderBtns.forEach((btn, i) => {
                btn.classList.toggle('is-active', i === index);
            });
            currentIndex = index;
        };

        const resetSlider = () => {
            sliderList.style.transform = '';
            currentIndex = 0;
            sliderBtns.forEach((btn, i) => {
                btn.classList.toggle('is-active', i === 0);
            });
        };

        sliderBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (isMobile) updateSlider(index);
            });
        });

        window.addEventListener('resize', () => {
            const wasMobile = isMobile;
            isMobile = window.innerWidth < 1200;
            if (wasMobile && !isMobile) resetSlider();
        });

        let touchStartX = 0;

        sliderList.addEventListener('touchstart', e => {
            if (isMobile) {
                touchStartX = e.touches[0].clientX;
            }
        }, {passive: true});

        sliderList.addEventListener('touchend', e => {
            if (!isMobile) return;

            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentIndex < slides.length - 1) {
                    updateSlider(currentIndex + 1);
                } else if (diff < 0 && currentIndex > 0) {
                    updateSlider(currentIndex - 1);
                }
            }
        }, {passive: true});
    }

	const heroSection = document.getElementById('hero-slider');
	if (heroSection) {
		const slides = heroSection.querySelectorAll('.home-hero__slide');
		const counter = heroSection.querySelector('.home-hero__counter');
		const nextBtn = heroSection.querySelector('.home-hero__btn--next');
		const prevBtn = heroSection.querySelector('.home-hero__btn--prev');

		let heroIndex = 0;

		const updateHero = (newIndex) => {
			slides[heroIndex].classList.remove('is-active');

			heroIndex = newIndex;

			slides[heroIndex].classList.add('is-active');

			if (counter) {
				counter.textContent = `${heroIndex + 1}/${slides.length}`;
			}
		};

		nextBtn?.addEventListener('click', () => {
			const index = (heroIndex + 1 >= slides.length) ? 0 : heroIndex + 1;
			updateHero(index);
		});

		prevBtn?.addEventListener('click', () => {
			const index = (heroIndex - 1 < 0) ? slides.length - 1 : heroIndex - 1;
			updateHero(index);
		});
	}
});
