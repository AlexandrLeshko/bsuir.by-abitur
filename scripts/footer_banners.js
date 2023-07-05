const footerBanners = document.querySelector('.footer__banners');
const footerBannersContent = document.querySelector('.footer__banners_content');
footerBannersContent.innerHTML += footerBannersContent.innerHTML + footerBannersContent.innerHTML + footerBannersContent.innerHTML + footerBannersContent.innerHTML;
const scrollStep = 0.3;
let startScrollPos = 0;
let scrollPos = footerBannersContent.offsetWidth / 5;
let startMouseX = 0;
let deltaX = 0;
let isDragging = false;
let isMouseOver = false;
function scrollLoop() {
    if (!isMouseOver && !isDragging) {
        scrollPos += scrollStep;
        if (scrollPos < 2 * footerBannersContent.offsetWidth / 5) {
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
footerBanners.addEventListener('mouseleave', () => {
    isMouseOver = false;
    isDragging = false;
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
footerBanners.addEventListener('mouseup', (e) => {
    isDragging = false;
    if (scrollPos < 2 * footerBannersContent.offsetWidth / 5) {
        scrollPos += footerBannersContent.offsetWidth / 5;
    }
    if (scrollPos > 3 * footerBannersContent.offsetWidth / 5) {
        scrollPos -= footerBannersContent.offsetWidth / 5;
    }
    footerBanners.scrollLeft = scrollPos;
});
const footerBannerCollection = document.querySelectorAll('.footer__banner');
for (let banner of footerBannerCollection) {
    banner.addEventListener('click', (e) => {
        if (deltaX !== 0) {
            e.preventDefault();
        }
    })
}