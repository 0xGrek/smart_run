$(document).ready(function(){
  $('.carusel__inner').slick({
      speed: 1200,
      variableWidth: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="img/solid_left.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="img/solid_right.png"></button>',
      responsive: [
          {
          breakpoint: 576,
          settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
              arrows: false,
              centerMode: true,
              centerPadding: '20px',
              }
          }
      ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });
  // Вариант для понимания- интеснив в каталоге
//   $('.catalog-item__link').each(function(i) {
//     $(this).on('click', function(e) {
//         e.preventDefault();
//         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
//         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
//     })
//   });
//   $('.catalog-item__back').each(function(i) {
//     $(this).on('click', function(e) {
//         e.preventDefault();
//         $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
//         $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
//     })
//   });

  function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
        });
  };
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //MODAL
  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    $('#name-error, #phone-error, #email-error').fadeOut();
  });
  // Смена текста 
  $('.button_mini').each(function(i) { 
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__title').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });

  // Валидація 
  function valideForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите {0} символа!")
        },
        phone: "Введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  };

  valideForms('#consultation-form');
  valideForms('#consultation form');
  valideForms('#order form');

  //Маска ввода номера на сайте.
  $('input[name=phone]').mask("+38 (999) 999-99-99");

  // скрпит на отпраку сообщений
  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset');
    });
    return false;
  });

// Прокрутка 
  $(window).scroll(function() {
    if($(this).scrollTop() > 1600 ) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });
  
// универсальний скрипт по скролу 
  $("a[href='#up']").click(function() {
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();
});

