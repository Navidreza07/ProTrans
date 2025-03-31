const input = document.getElementById('typingInput');

input.addEventListener('input', function () {

    this.classList.remove('pulse-effect');

    setTimeout(() => {
        this.classList.add('pulse-effect');
    }, 10);
});


input.addEventListener('animationend', function () {
    this.classList.remove('pulse-effect');
}); document.addEventListener('DOMContentLoaded', function () {
    const selector = document.querySelector('.language-selector');
    const selectedOption = selector.querySelector('.selected-option');
    const dropdownItems = selector.querySelectorAll('.dropdown-item');
    const arrow = selector.querySelector('.nav-arrow-down');
    const dropdownMenu = selector.querySelector('.dropdown-menu');

    selector.addEventListener('mouseenter', openDropdown);

    selector.addEventListener('mouseleave', function (e) {

        if (!e.relatedTarget || !e.relatedTarget.closest('.dropdown-menu')) {
            closeDropdown();
        }
    });

    dropdownMenu.addEventListener('mouseleave', function (e) {
        if (!selector.contains(e.relatedTarget)) {
            closeDropdown();
        }
    });

    selector.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleDropdown();
    });
    document.addEventListener('click', closeDropdown);
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.stopPropagation();
            selectedOption.textContent = this.textContent;
            closeDropdown();
        });
    });
    function toggleDropdown() {
        selector.classList.toggle('active');
    }
    function openDropdown() {
        selector.classList.add('active');
    }
    function closeDropdown() {
        selector.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const monogram = document.getElementById('monogram');
    const defaultImage = 'assets/images/monogram2.png';
    const alternateImage = 'assets/images/monogram.png';
    monogram.style.backgroundImage = `url(${defaultImage})`;
    monogram.addEventListener('click', function () {
        if (this.style.backgroundImage.includes('monogram2.png')) {
            this.style.backgroundImage = `url(${alternateImage})`;
        } else {
            this.style.backgroundImage = `url(${defaultImage})`;
        }
    });
});
const inputField = document.querySelector('.enter-word-phrase');

const smoothScrollToInput = () => {
    const elementRect = inputField.getBoundingClientRect();
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
};

inputField.addEventListener('focus', smoothScrollToInput);
inputField.addEventListener('click', smoothScrollToInput);


const originalFocus = inputField.focus;
inputField.focus = function () {
    originalFocus.apply(this, arguments);
    setTimeout(smoothScrollToInput, 50);
};

window.addEventListener('resize', () => {
    if (document.activeElement === inputField) {
        smoothScrollToInput();
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const languageFlag = document.getElementById('languageFlag');

    languageFlag.addEventListener('click', function () {
        const current = this.getAttribute('data-current');
        const newLang = current === 'iran' ? 'usa' : 'iran';

      
        this.style.backgroundImage = `url('assets/images/${newLang}.png')`;
        this.setAttribute('data-current', newLang);

       
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1.1)';
        }, 100);
    });
});