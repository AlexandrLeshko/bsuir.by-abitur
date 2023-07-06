const footerBanners = document.querySelector('.footer__banners');
const footerBannersContent = document.querySelector('.footer__banners_content');
const scrollStep = 0.3;
footerBannersContent.innerHTML += footerBannersContent.innerHTML + footerBannersContent.innerHTML + footerBannersContent.innerHTML + footerBannersContent.innerHTML;
footerBanners.scrollLeft = 3 * footerBannersContent.offsetWidth / 5;
let scrollPos = 2 * footerBannersContent.offsetWidth / 5;
let startScrollPos = 0;
let startMouseX = 0;
let deltaX = 0;
let isMouseOver = false;
let isDragging = false;

if ('ontouchstart' in window) {

    function scrollLoop() {
        if (!isDragging) {
            scrollPos += scrollStep;
            if (scrollPos < 1 * footerBannersContent.offsetWidth / 5) {
                scrollPos += footerBannersContent.offsetWidth / 5;
            }
            if (scrollPos > 3 * footerBannersContent.offsetWidth / 5) {
                scrollPos -= footerBannersContent.offsetWidth / 5;
            }
            footerBanners.scrollLeft = scrollPos;
        }
        requestAnimationFrame(scrollLoop);
    }
    scrollLoop();
    footerBanners.addEventListener('touchstart', (e) => {
        isDragging = true;
        startMouseX = e.touches[0].clientX;
        startScrollPos = scrollPos;
        deltaX = 0;
    })
    footerBanners.addEventListener('touchmove', (e) => {
        isDragging = true;
        deltaX = e.touches[0].clientX - startMouseX;
        scrollPos = startScrollPos - deltaX;
        footerBanners.scrollLeft = scrollPos;
    })
    footerBanners.addEventListener('touchend', () => {
        isDragging = false;
    })

} else {

    function scrollLoop() {
        if (!isMouseOver && !isDragging) {
            scrollPos += scrollStep;
            if (scrollPos < 1 * footerBannersContent.offsetWidth / 5) {
                scrollPos += footerBannersContent.offsetWidth / 5;
            }
            if (scrollPos > 3 * footerBannersContent.offsetWidth / 5) {
                scrollPos -= footerBannersContent.offsetWidth / 5;
            }
            footerBanners.scrollLeft = scrollPos;
        }
        requestAnimationFrame(scrollLoop);
    }
    scrollLoop();
    footerBanners.addEventListener('mouseenter', () => {
        isMouseOver = true;
    });
    footerBanners.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
        startMouseX = e.clientX;
        startScrollPos = scrollPos;
        deltaX = 0;
    });
    footerBanners.addEventListener('mousemove', (e) => {
        if (isDragging) {
            deltaX = e.clientX - startMouseX;
            scrollPos = startScrollPos - deltaX;
            footerBanners.scrollLeft = scrollPos;
        }
    });
    footerBanners.addEventListener('mouseup', () => {
        isDragging = false;
        if (scrollPos < 2 * footerBannersContent.offsetWidth / 5) {
            scrollPos += footerBannersContent.offsetWidth / 5;
        }
        if (scrollPos > 3 * footerBannersContent.offsetWidth / 5) {
            scrollPos -= footerBannersContent.offsetWidth / 5;
        }
        footerBanners.scrollLeft = scrollPos;
    });
    footerBanners.addEventListener('mouseleave', () => {
        isMouseOver = false;
        isDragging = false;
    });

    const footerBannerCollection = document.querySelectorAll('.footer__banner');
    for (let banner of footerBannerCollection) {
        banner.addEventListener('click', (e) => {
            if (deltaX !== 0) {
                e.preventDefault();
            }
        })
    }

}