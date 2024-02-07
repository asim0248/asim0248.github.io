// PRE LOADER START ====
window.addEventListener("load", function () {
    const loader = document.querySelector(".loader");
    loader.classList.add("loaded");
});
// ==== PRE LOADER END 


document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // BACKT TO TOP START ====
    document.querySelector(".nk-back-to-top").addEventListener("click", () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    })
    // ==== BACKT TO TOP END 


    // FIXED HEADER START ====
    const toBeFixed = document.querySelector(".to-be-fixed");
    document.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            toBeFixed.classList.add("fixed");
            document.body.style.paddingTop = toBeFixed.getBoundingClientRect().height + 'px';
        } else {
            toBeFixed.classList.remove("fixed");
            document.body.style.paddingTop = 0;
        }
    })
    // ==== FIXED HEADER END 


    //==== MOBILE MENU SIDEBAR START
    const hamburgerBtn = document.querySelector(".nk-mobile-menu.open");
    const menuCloseBtn = document.querySelector(".nk-mobile-menu.close");
    const mobileMenuSidebar = document.querySelector(".nk-header-offcanvas");

    hamburgerBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileMenuSidebar.classList.add("active");
    });

    document.addEventListener("click", (e) => {
        const isClickInsideMobileMenu = mobileMenuSidebar.contains(e.target);

        if (!isClickInsideMobileMenu) {
            mobileMenuSidebar.classList.remove("active");
        }
    });

    menuCloseBtn.addEventListener("click", () => {
        mobileMenuSidebar.classList.remove("active");
    })
    // MOBILE MENU SIDEBAR END ====


    // SKILLS PERCENTAGE UPDATE START ====
    const skills = document.querySelectorAll('.nk-skill__percent');
    skills.forEach(skill => {
        const targetValue = parseInt(skill.getAttribute('data-value'), 10);
        let currentValue = 0;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const updateSkill = () => {
                        if (currentValue < targetValue) {
                            currentValue++;
                            skill.textContent = `${currentValue}%`;
                            requestAnimationFrame(updateSkill);
                        }
                    };

                    updateSkill();
                    observer.unobserve(skill);
                }
            });
        });

        observer.observe(skill);
    });
    // ==== SKILLS PERCENTAGE UPDATE END


    // CURSOR ANIMATION START ====
    var cursor = document.querySelector(".cursor"),
        follower = document.querySelector(".cursor-follower");

    var posX = 0,
        posY = 0;

    var mouseX = 0,
        mouseY = 0;

    gsap.to({}, 0.005, {
        repeat: -1,
        onRepeat: function () {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;

            gsap.set(follower, {
                css: {
                    left: posX - 12,
                    top: posY - 12
                }
            });

            gsap.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            });
        }
    });

    document.addEventListener('mousemove', function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
    // add circle
    document.querySelectorAll("a, button").forEach(btn => {
        btn.addEventListener("mouseenter", function () {
            cursor.classList.add("active");
            follower.classList.add("active");
        });
        btn.addEventListener("mouseleave", function () {
            cursor.classList.remove("active");
            follower.classList.remove("active");
        });
    });
    // ==== CURSOR ANIMATION END


    // SERVICE LIST IMAGE REVEAL ON HOVER START ====
    const services = document.querySelectorAll('.nk-service');
    services.forEach(service => {
        service.addEventListener('mouseenter', (e) => {
            e.currentTarget.classList.add("active");
        });

        service.addEventListener('mouseleave', (e) => {
            e.currentTarget.classList.remove("active");
        });

        service.addEventListener('mousemove', function (e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const img = document.querySelectorAll(".nk-service__media img");
            const bounds = service.getBoundingClientRect();

            // Adjust the sensitivity factor to control the range of x-axis movement
            const sensitivity = 1.14;

            gsap.to(img, {
                x: (mouseX - bounds.left - bounds.width / 2) * sensitivity + 'px',
                y: (mouseY - bounds.top - bounds.height / 2) * sensitivity + 'px',
                ease: 'power1.out',
                duration: 0.3,
            });
        });
    });
    // ==== SERVICE LIST IMAGE REVEAL ON HOVER END


    // TESTIMONIAL SLIDER START ====
    new Swiper('.nk-testimonial-slider', {
        spaceBetween: 24,
        slidesPerView: 2,
        loop: true,
        autoplay: true,
        navigation: {
            prevEl: '.nk-testimonial-slider__nav .prev',
            nextEl: '.nk-testimonial-slider__nav .next',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1.4,
                centeredSlides: true,
            },
            768: {
                slidesPerView: 2,
            }
        }
    });
    // ==== TESTIMONIAL SLIDER END


    // BLOG SLIDER START ====
    new Swiper('.nk-blogs-slider', {
        spaceBetween: 24,
        slidesPerView: 3,
        loop: true,
        autoplay: true,
        watchSlidesProgress: true,
        navigation: {
            prevEl: '#nk-blogs-slider-nav .prev',
            nextEl: '#nk-blogs-slider-nav .next',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            480: {
                slidesPerView: 1.3,
                centeredSlides: true,
            },
            576: {
                slidesPerView: 1.5,
                centeredSlides: true,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });
    // ==== BLOG SLIDER END
});