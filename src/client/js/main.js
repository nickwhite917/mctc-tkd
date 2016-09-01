Stripe.setPublishableKey('pk_test_T4X66UgxnG2ceoZimvKFOsiu');


$(document).ready(function() {

  $('#charge-error').hide();

  $('#payment-form').submit(function(event) {
    $('#charge-error').hide();
    var $form = $(this);
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken($form, stripeResponseHandler);
    return false;
  });

  function stripeResponseHandler(status, response) {
    if (response.error) {
      $('#charge-error').show();
      $('.payment-errors').text(response.error.message);
      $('.submit-button').removeAttr('disabled');
    } else {
      var form$ = $('#payment-form');
      var token = response.id;
      form$.append('<input type="hidden" name="stripeToken" value="' + token + '"/>');
      form$.get(0).submit();
    }
  }
});