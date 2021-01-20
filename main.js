const window_width = 700;
const s = 4;
const part = window_width / s;
let current_rotation = 0;
let current_flip = 1;


let items = document.querySelectorAll('.inst__slider_list_item');
let imgs = document.querySelectorAll('.inst__slider_list_item_img');
let titles = document.querySelectorAll('.inst__slider_list_item_name');
let main = document.querySelector('.inst__content_img');

let slider_list = document.querySelector('.inst__slider_list_wrapper');
let slider_range = document.querySelector('.inst__slider_range');

let btn_r = document.querySelector('.btn-right');
let btn_l = document.querySelector('.btn-left');

let main_wrap = document.querySelector('.inst__content');
main_wrap.style.filter = 'contrast(100%)'

let array = document.querySelectorAll('.inst__slider_range_input');
let values = document.querySelectorAll('.inst__slider_range_input_value');


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
    } else {
        current_rotation;
    }
    main.style.transform = `rotateZ(${current_rotation}deg)`;

}, false);

let btn_flip = document.querySelector('.flip')
btn_flip.addEventListener('click', function () {
    current_flip = current_flip * (-1);
    main_wrap.style.transform = `scale(${current_flip},1)`
}, false);

let btn_scale = document.querySelector('.scale')
btn_scale.addEventListener('click', function () {
    let n = parseFloat(window.getComputedStyle(main_wrap).filter.split('(')[1])
    btn_scale.className = 'inst__nav_social scale';

    if (n === 1) {
        main_wrap.style.filter = 'contrast(140%)';
        btn_scale.classList.add('scale-contrast')
    } else if (n > 1) {
        main_wrap.style.filter = 'contrast(60%)'
        btn_scale.classList.add('scale-low-contrast')
    } else if (n < 1) {
        main_wrap.style.filter = 'contrast(100%)'
    }

}, false);

let btn_logo = document.querySelector('.logo')
btn_logo.addEventListener('click', function () {
    current_rotation = 0;
    current_flip = 1;
    main_wrap.style.filter = 'contrast(100%)';
    main.style.transform = `rotateZ(${current_rotation}deg)`;
    main_wrap.style.transform = `scale(${current_flip},1)`;
    main.className = 'inst__content_img'
    for (let i = 0; i < array.length; i++) {
        let n
        if (i === 0) {
            n = 100;
            main.style.width = n + '%';
        } else if (i === 1) {
            n = 100;
            main.style.height = n + '%';
        } else if (i === 2) {
            n = 0;
            main.style.right = n + 'px';
        } else if (i === 3) {
            n = 0;
            main.style.bottom = n + 'px';
        }
        ;
        array[i].value = n;
        let value_n = values[i];
        value_n.innerHTML = n;
    }

}, false);

let btn_crop = document.querySelector('.fill')
btn_crop.addEventListener('click', function () {
    Crop();
}, false);



function Slider(p) {

    let l = items.length;

    for (i = 0; i < items.length; i++) {
        let n = parseInt(window.getComputedStyle(items[i]).left);
        items[i].style.transition = '500ms';

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

function Crop() {
    slider_list.classList.toggle('hidden');
    slider_list.classList.toggle('visible');
    slider_range.classList.toggle('hidden_none');
    slider_range.classList.toggle('visible');
    btn_l.classList.toggle('hidden_none');
    btn_l.classList.toggle('visible');
    btn_r.classList.toggle('hidden_none');
    btn_r.classList.toggle('visible');
}

function Values() {
    for (let i = 0; i < array.length; i++) {
        array[i].addEventListener('mousemove', function () {
            let n = parseInt(array[i].value)
            let value_n = values[i]
            value_n.innerHTML = n
            if (i === 0) {
                main.style.width = n + '%'
            } else if (i === 1) {
                main.style.height = n + '%'
            } else if (i === 2) {
                main.style.right = n + 'px'
            } else if (i === 3) {
                main.style.bottom = n + 'px'
            }
            ;
        })
    }
    ;
}



Values();

