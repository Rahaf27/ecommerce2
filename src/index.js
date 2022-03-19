import './scss/style.scss';
// import '@laylazi/bootstrap-rtl-scss/dist/scss/bootstrap-rtl';
import './css/style.css';


import 'popper.js/dist/popper.min.js';
import 'jquery/dist/jquery.min.js';

import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/js/all.min';

import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js'

$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $('.add-to-cart-btn').click(function () {
        alert('اضيف المنتج الى عربة الشراء')
    });

    $('#copyright').text("جميع الحقوق محفوظة للمتجر سنة" + new Date().getFullYear());

    // عندما تتغير كمية المنتج
    $('[data-product-quantity]').on("change", function () {

        // اجل الكمية الجديدة
        var newQuantity = $(this).val();

        // ابحث عن هذا السطر الذي يحتوي معلومات المنتج     
        var parent = $(this).parents('[data-product-info]');

        // اجلب سعر القطعة الواحده من معلومات المنتج
        var pricePerUnit = parent.attr('data-product-price');

        // السعر الاجمالي للمنتج هو سعر القطعة مضروبا بعددها
        var totalPriceForProduct = newQuantity * pricePerUnit;

        // عين السعر الجديد ضمن خلية السعر الاجمالي للمنتج في هذا السطر 
        parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

        // حدث السعر الاجمالي لكل المنتجات
        calculateTotalPrice();



    });

    $('[data-remove-from-cart]').click(function () {
        $(this).parents('[data-product-info]').remove();
        // اعد حساب السعر الاجمالي بعد حذف احد المنتجات
        calculateTotalPrice();
    });

    function calculateTotalPrice() {
        // انشئ متغيرا جديدا لحفظ السعر الاجمالي
        var totalPriceForAllProducts = 0;

        if (!$("[data-product-info]").length) {
            return $("#total-price-for-all-products").text("0 $");
        }

        // لكل سطر يمثل معلومات المنتج بالصفحة 
        $('[data-product-info]').each(function () {

            // اجل سعر القطعة الواحدة من الخاصية الموافقة 
            var pricePerUnit = $(this).attr('data-product-price');

            // اجلب كمية المنتج من حق ادخال الكمية 
            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct = pricePerUnit * quantity;

            // اضف السعر الاجمالي لهذا المنتج الى السعر الاجمالي لكل المنتجات، واحفظ القيمة في المتغير نفسه
            totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct);

            // حدث السعر الاجمالي لكل المنتجات في الصفحة 
            $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
        });
    };

    var citiesByCountry = {
        sa: ['جده', 'الرياض'],
        eg: ['القاهرة', 'الاسكندرية'],
        jo: ['عمان', 'الزرقاء'],
        sy: ['دمشق', 'حلب', 'حماه']
    };

    // عندما يتغير البلد 
    $('#form-checkout select[name="country"]').change(function () {

        // اجلب رمز البلد 
        var country = $(this).val();

        // اجل مدن هذا البلد من المصفوفة
        var cities = citiesByCountry[country];

        // فرغ قائمة المدن 
        $('#form-checkout select[name="city"]').empty();

        // اضافة خيار اختيار المدينة 
        $('#form-checkout select[name="city"]').append(
            ' <option disabled selected value="">اختر المدينة</option>'
        );

        // اضف المدينة الى قائمة المدن
        cities.forEach(function (city) {
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });
    });

    // عندما تتغير طريقة الدفع 
    $('#form-checkout input[name="payment_method"]').change(function () {

        // اجلب القيمة المختارة حاليا
        var paymentMethod = $(this).val();

        if (paymentMethod === 'on_delivary') {

            // اذا كانت عند الاستلام، فعطل خقول بطاقة الائتمان
            $('#credit-card-info input').prop('disabled', true);
        } else {

            // والا ففعلها 
            $('#credit-card-info input').prop('disabled', false);

        }

        // بدل معلومات بطاقة الائتمان بين الظهور والإخفاء 
        $('#credit-card-info').toggle();
    });

    // مكون البحث حسب السعر
    $(function () {
        $("#price-range").slider({
            range: true,
            min: 50,
            max: 1000,
            step: 50,
            values: [250, 800],
            slide: function (event, ui) {
                $("#price-min").text(ui.values[0]);
                $("#price-max").text(ui.values[1]);
            }
        });
    });
});
