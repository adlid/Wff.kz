AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 150, // values from 0 to 3000, with step 50ms
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
let TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};


function TimeuotForIcons(selector, activeClass) {
    let animItems = document.querySelectorAll(selector);
    if (animItems.length > 0) {
        window.addEventListener('scroll', animOmScroll());

        function animOmScroll() {
            for (let i = 0; i < animItems.length; i++) {
                const animItem = animItems[i];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 1;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add(activeClass)
                } else {
                    animItem.classList.remove(activeClass)
                }
            }
        }

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
        setTimeout(() => {
            animOmScroll();
        }, 3600);

    }
}

//TimeuotForIcons('.services__icon-images-1', 'active')
//TimeuotForIcons('.services__icon-images-2', 'active')
TxtRotate.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    let elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-rotate');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);
    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none';
            item.style.opacity = '1';
        });
        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        content[i].style.display = display;
        tab[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();
    header.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains(tabSelector.replace(/\./, "")) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, ""))) {
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    })


}
tabs('.portfolio__tab', '.portfolio__tab-item', '.portfolio__block-content', 'portfolio__tab--active');
const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera ||
            isMobile.Windows()
        );
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');
    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener('click', (e) => {
                menuArrow.parentElement.classList.toggle('_active');
            })
        }
    }
} else {
    document.body.classList.add('_pc');
}
let menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick)
    })

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock')
                iconMenu.classList.remove('_active')
                menuBody.classList.remove('_active')
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: 'smooth'
            });
            e.preventDefault();
        }
    }
}
const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener('click', (e) => {
        console.log("OK")
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active')
        menuBody.classList.toggle('_active')
    })
}

function bindModals(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector),
        close = document.querySelector(closeSelector),
        windows = document.querySelectorAll('[data-modal]');
    trigger.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }
            windows.forEach(item => {
                item.style.display = 'none';
            });
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    close.addEventListener('click', () => {
        windows.forEach(item => {
            item.style.display = 'none';
        });
        modal.style.display = 'none';
        document.body.style.overflow = "";
    });
    modal.addEventListener('click', (e) => {

        if (e.target === modal && closeClickOverlay) {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = "";
        }
    });
}

function showModalByTime(selector, time) {
    setTimeout(function() {
        document.querySelector(selector).style.display = 'block';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }, time)
}
bindModals('.leave-request__btn', '.popup', '.popup_close');
bindModals('.btn', '.popup', '.popup_close');
const checkNumInputs = (selector) => {
    const numInput = document.querySelectorAll(selector);
    numInput.forEach(item => {
        item.addEventListener('click', () => {
            item.value = item.value.replace(/\D/, '');
        });
    })
}

const forms = (state) => {

    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]');
    checkNumInputs('input[name="user_phone"]');
    const message = {
        loading: 'Loading',
        success: 'Thank you, we will phone you later',
        failtire: 'Oh sorry...'
    };

    const postDate = async(url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.json();
    };
    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
    }
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');

            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            let formDate = new FormData(item);
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formDate.append(key, state[key]);
                }
            }
            /*
            const obj ={};
            formDate.forEach((item,i)=>{
                obj[i]=item;
            });
            const json = JSON.stringify(obj);*/
            postDate('assets/server.php', formDate).then(data => data.text())
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failtire;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                })

        });
    })

};
forms();
var timeout = 1,
    counters = $('.percent__block__counter-number'),
    percent = $('.percent__block__counter');
counters.each(function() {
    var that = $(this),
        num = that.html();
    that.html(0);
    that.attr('data-num', num);
});
$(window).on('scroll', function() {
    var scrolltop = $(this).scrollTop(),
        wh = $(this).height();
    counters.each(function() {
        var that = $(this);
        if (!that.data('start') && scrolltop >= that.offset().top - wh) {
            percent.addClass('percent__block__counter-active');
            that.attr('data-start', true);
            var i = 1,
                num = that.data('num'),
                step = Math.round(2000 * timeout / num),
                int = setInterval(function() {
                    if (i <= num) {
                        that.html(i);
                    } else {
                        clearInterval(int);
                    }
                    i++;
                }, step);
            console.log(num)
            if (num == 0) {
                percent.removeClass('percent__block__counter-active');
            }
        }
    });
});
let timeout = 1,
    greenClass = $('.services__icon-images-1'),
    greenLineClass = $('.services__icon-title'),
    greenQualityClass = $('.quality__icon-images'),
    lineActive = $('.together_after-before');

$(window).on('scroll', function() {
    let scrolltop = $(this).scrollTop(),
        wh = $(this).height();
    greenClass.each(function() {
        let that = $(this);
        if (!that.data('start') && scrolltop >= that.offset().top - wh) {
            setTimeout(() => {
                greenClass.addClass('active');
            }, 5000);
        }
    });
    greenLineClass.each(function() {
        let that = $(this);
        if (!that.data('start') && scrolltop >= that.offset().top - wh) {
            setTimeout(() => {
                greenLineClass.addClass('bottom-line-strong-2');
            }, 5000);
        }
    });
});
$(window).on('scroll', function() {
    let scrolltop = $(this).scrollTop(),
        wh = $(this).height();
    greenQualityClass.each(function() {
        let that = $(this);
        if (!that.data('start') && scrolltop >= that.offset().top - wh) {
            setTimeout(() => {
                greenQualityClass.addClass('active');
            }, 5000);
        }
    });
});
$(window).on('scroll', function() {
    let scrolltop = $(this).scrollTop(),
        wh = $(this).height();
    greenQualityClass.each(function() {
        let that = $(this);
        if (!that.data('start') && scrolltop >= that.offset().top - wh) {
            setTimeout(() => {
                greenQualityClass.addClass('active');
            }, 5000);
        }
    });
});
$(window).on('scroll', function() {
    let scrolltop = $(this).scrollTop(),
        wh = $(this).height();
    lineActive.each(function() {
        let that = $(this);
        if (!that.data('start') && scrolltop >= that.offset().top - wh) {
            setTimeout(() => {
                lineActive.addClass('together_after-before-active');
            }, 1000);
        }
    });
});