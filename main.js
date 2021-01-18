const window_width = 700;
const s = 4;
const part = window_width / s;
let current_rotation = 0;
let current_flip = 1;


let items = document.querySelectorAll('.inst__slider_list_item');
let imgs = document.querySelectorAll('.inst__slider_list_item_img');
let titles = document.querySelectorAll('.inst__slider_list_item_name');
let main = document.querySelector('.inst__content_img');

let main_wrap = document.querySelector('.inst__content');
main_wrap.style.filter = 'contrast(100%)'


for (let i = 0; i < items.length; i++) {

    items[i].addEventListener('click', function () {
        Filter(i);
    }, false);
}


let btn_rotate = document.querySelector('.rotate')
btn_rotate.addEventListener('click', function () {
    current_rotation -= 90;
    if (current_rotation <= -355) {
        current_rotation = 0;
    } else{
        current_rotation;
    }
    main.style.transform = `rotateZ(${current_rotation}deg)`;

        }, false);


let btn_flip = document.querySelector('.flip')
btn_flip.addEventListener('click', function () {
    current_flip = current_flip * (-1);
    main.style.transform = `scale(${current_flip},1)`
}, false);


let btn_scale = document.querySelector('.scale')
btn_scale.addEventListener('click', function () {
    let n = parseFloat(window.getComputedStyle(main_wrap).filter.split('(')[1])

    if (n === 1 ) {
        main_wrap.style.filter = 'contrast(140%)'
    }
    else if (n > 1) {
        main_wrap.style.filter = 'contrast(60%)'
    }
    else if (n < 1) {
        main_wrap.style.filter = 'contrast(100%)'
    }

}, false);

function Slider(p) {

    let l = items.length;

    for (i = 0; i < items.length; i++) {
        let n = parseInt(window.getComputedStyle(items[i]).left);
        items[i].style.transition = '500ms';

        let btn_r = document.querySelector('.btn-right');
        let btn_l = document.querySelector('.btn-left');
        btn_r.classList.remove('disabled');
        btn_l.classList.remove('disabled');
        if (p === 'right') {
            if (n >= -part * (l - s) + 10) {
                items[i].style.left = n - part + 'px';

            } else {
                items[i].style.left = -part * (l - s) + 'px';
                btn_r.classList.add('disabled');

            }
        } else if (p === 'left') {
            if (n < -part - 10) {
                items[i].style.left = n + part + 'px';
                btn_l.classList.remove('disabled');
            } else {
                items[i].style.left = 0 + 'px'
                btn_l.classList.add('disabled');
            }
        }
    }
};

function Filter(n) {

    for (i = 0; i < items.length; i++) {
        titles[i].classList.remove('active')
    }

    let p = imgs[n].classList.toString().indexOf('filter');
    let name = imgs[n].classList.toString().substr(p);
    main.className = 'inst__content_img'

    if (n === 0) {
        true;
    } else {
        main.classList.add(name)
    }
    ;
    titles[n].classList.add('active')
};

