document.addEventListener('DOMContentLoaded', function () {

    const input = document.getElementById('typingInput');
    const monogram = document.getElementById('monogram');
    const languageFlag = document.getElementById('languageFlag');
    const flagContainer = languageFlag.parentNode;
    const languageSelector = document.querySelector('.language-selector');
    const selectedOption = languageSelector.querySelector('.selected-option');
    const dropdownItems = languageSelector.querySelectorAll('.dropdown-item');
    const dropdownMenu = languageSelector.querySelector('.dropdown-menu');
    const elementsToTranslate = document.querySelectorAll('[data-en], [data-fa]');
    const inputFields = document.querySelectorAll('input[data-en-placeholder], input[data-fa-placeholder]');
    const defaultImage = 'assets/images/monogram2.png';
    const alternateImage = 'assets/images/monogram.png';

    function updateLanguage() {
        const currentLang = languageFlag.getAttribute('data-current');
        const isPersian = currentLang === 'iran';


        elementsToTranslate.forEach(element => {
            if (element.hasAttribute('data-en') && element.hasAttribute('data-fa')) {
                element.textContent = isPersian ? element.getAttribute('data-fa') : element.getAttribute('data-en');
            }
        });

        inputFields.forEach(input => {
            const enPlaceholder = input.getAttribute('data-en-placeholder');
            const faPlaceholder = input.getAttribute('data-fa-placeholder');

            if (enPlaceholder && faPlaceholder) {
                input.placeholder = isPersian ? faPlaceholder : enPlaceholder;
            }
        });
    }

    function smoothScrollToInput() {
        const elementRect = input.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);

        const currentPosition = window.pageYOffset;
        const distance = Math.abs(middle - currentPosition);

        if (distance > 5) {
            const duration = Math.min(700, distance * 0.5);
            const startTime = performance.now();
            const startPosition = window.pageYOffset;

            const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 0.5 * (1 - Math.cos(Math.PI * progress));

                window.scrollTo(0, startPosition + (middle - startPosition) * easeProgress);

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            };

            requestAnimationFrame(animateScroll);
        }
    }

    languageFlag.addEventListener('click', function () {
        const current = this.getAttribute('data-current');
        const newLang = current === 'iran' ? 'usa' : 'iran';

        this.style.backgroundImage = `url('assets/images/${newLang}.png')`;
        this.setAttribute('data-current', newLang);

        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        }, 100);

        flagText.textContent = newLang === 'usa' ? 'Change to Persian' : 'تغییر به انگلیسی';

        updateLanguage();
    });

    const flagText = document.createElement('div');
    flagText.className = 'flag-tooltip';
    flagContainer.appendChild(flagText);
    flagText.style.opacity = '0';

    languageFlag.addEventListener('mouseenter', function () {
        flagText.style.opacity = '1';
        this.style.transform = 'translateY(-5px)';
    });

    languageFlag.addEventListener('mouseleave', function () {
        flagText.style.opacity = '0';
        this.style.transform = '';
    });

    languageSelector.addEventListener('mouseenter', function () {
        this.classList.add('active');
    });

    languageSelector.addEventListener('mouseleave', function (e) {
        if (!e.relatedTarget || !e.relatedTarget.closest('.dropdown-menu')) {
            this.classList.remove('active');
        }
    });

    dropdownMenu.addEventListener('mouseleave', function (e) {
        if (!languageSelector.contains(e.relatedTarget)) {
            languageSelector.classList.remove('active');
        }
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.stopPropagation();
            selectedOption.textContent = this.textContent;
            languageSelector.classList.remove('active');
        });
    });

    monogram.style.backgroundImage = `url(${defaultImage})`;

    monogram.addEventListener('click', function () {
        if (this.style.backgroundImage.includes('monogram2.png')) {
            this.style.backgroundImage = `url(${alternateImage})`;
        } else {
            this.style.backgroundImage = `url(${defaultImage})`;
        }

        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');

        const isLightTheme = document.body.classList.contains('light-theme');
        localStorage.setItem('lightTheme', isLightTheme);
    });

    input.addEventListener('input', function () {
        this.classList.remove('pulse-effect');
        setTimeout(() => {
            this.classList.add('pulse-effect');
        }, 10);
    });

    input.addEventListener('animationend', function () {
        this.classList.remove('pulse-effect');
    });

    input.addEventListener('focus', function () {
        this.classList.add('pulse-effect');
        setTimeout(() => {
            this.classList.remove('pulse-effect');
        }, 200);
        smoothScrollToInput();
    });

    input.addEventListener('click', smoothScrollToInput);

    const originalFocus = input.focus;
    input.focus = function () {
        originalFocus.apply(this, arguments);
        setTimeout(smoothScrollToInput, 50);
    };

    window.addEventListener('resize', () => {
        if (document.activeElement === input) {
            smoothScrollToInput();
        }
    });

    if (localStorage.getItem('lightTheme') === 'true') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        monogram.style.backgroundImage = `url(${alternateImage})`;
    } else {
        document.body.classList.add('dark-theme');
    }

    updateLanguage();
});