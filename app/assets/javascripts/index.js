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
      $('span.selfIntroCounter').html('最多140个字，已超出<em class="exceed">' + exceed + '</em>个字').show();
    } else {
      left = SELFINTRO_LENGTH - inputs;
      $('span.selfIntroCounter').html('最多140个字，还剩<em class="left">' + left + '</em>个字').show();
    }
});
