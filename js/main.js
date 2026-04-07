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
				if (form) {
					stepForm?.classList.add('is-active');
					stepSuccess?.classList.remove('is-active');
					form.reset();
				}
			}, 300);
		};

		openBtn.addEventListener('click', (e) => {
			if (openBtn.tagName === 'a' || openBtn.type === 'submit') {
				if (form) {
					if (!form.checkValidity()) {
						form.reportValidity();
						return;
					}
				}
				e.preventDefault();
			}
			modal.classList.add('is-open');
		});

		closeBtn?.addEventListener('click', closeModal);
		modal.addEventListener('click', (e) => {
			if (e.target === modal) closeModal();
		});

		if (form && !externalFormId) {
			form.addEventListener('submit', (e) => {
				e.preventDefault();
				stepForm?.classList.remove('is-active');
				stepSuccess?.classList.add('is-active');
			});
		}
	};

    initModal('modal-callback', '.home-hero__link');
	initModal('modal-partner', '.dealer-hero__btn');
	initModal('modal-order', '.order-summary__btn', 'order-form');


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
});
