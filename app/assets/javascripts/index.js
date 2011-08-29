$('#applyButton').click(function() {
    $('.popover').fadeIn(100);
});

// When user click on the close button
$('.popover img.requestClose').click(function() {
    $('.popover').fadeOut(100);
});                                                     

$('.popover img.feedbackClose').click(function() {
    $('.popover').fadeOut(100);
});

Placeholder.init();

$('.popover div#request div.detail form.request fieldset textarea.selfIntro').keydown(function() {
    $('.popover div#request div.detail form.request fieldset strong.selfIntroError').hide();
    var left, exceed, inputs = $(this).val().length;

    if (inputs >= SELFINTRO_LENGTH) {
      exceed = inputs - SELFINTRO_LENGTH;
      $('strong.selfIntroCounter').html('最多140字，已超出' + exceed + '字').show();
    } else {
      left = SELFINTRO_LENGTH - inputs;
      $('strong.selfIntroCounter').html('最多140字，还剩' + left + '字').show();
    }
});