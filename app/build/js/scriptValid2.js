




$(document).ready(function (newChild, refChild) {



    $('input[data-input="text"], input[data-input="number"], input[data-input="phone"]').each(function () {

        $(this).on('focus', function () {
            $(this).removeClass('error-border');
            $(this).prev('legend').removeClass('error-border');

        });

        $(this).on('blur', function () {
            let val = $(this).val();
            let attr = $(this).attr('data-input');

            switch (attr) {
                case ('text'):
                    var regName = /^([a-zA-Zа-яА-Я\s*]{2,99}){1,6}$/;
                    if (regName.test(val)) {
                        $(this).removeClass('error');
                        $(this).addClass('valid');
                    } else {
                        $(this).removeClass('valid');
                        $(this).addClass('error');
                    }
                    break;
                case ('number'):
                    var regNumber = /^([0-9]{1,2})$/;
                    if (regNumber.test(val)) {
                        $(this).removeClass('error');
                        $(this).addClass('valid');
                    } else {
                        $(this).removeClass('valid');
                        $(this).addClass('error');
                    }
                    break;
                case 'phone':
                    var regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
                    if (regPhone.test(val)) {
                        $(this).removeClass('error');
                        $(this).addClass('valid');
                    } else {
                        $(this).removeClass('valid');
                        $(this).addClass('error');
                    }
                    break;

            }
        });
    });


    $('input[data-input="checkbox"]').on('change', function () {

        if ($(this).prop('checked')) {
            $(this).removeClass('error');
            $(this).addClass('valid');
            $(this).removeClass('error-border');
            $(this).prev('legend').removeClass('error-border');
        } else {
            $(this).removeClass('valid');
            $(this).addClass('error');
        }

    });


    $('form').submit(function (e) {

        e.preventDefault();

        let required = ($(this).find('.required')).length;
        if (($(this).find('.valid')).length === required) {

            $(this)[0].submit();
        } else {

            $($(this).find('.error')).each(function () {

                $(this).addClass('error-border');
                $(this).prev('legend').addClass('error-border');

            });
        }
    });


    $('.tabs-menu-item').on('click', function () {
        $('.tabs-menu-item').removeClass('active');
        $(this).addClass('active');
    });



});



