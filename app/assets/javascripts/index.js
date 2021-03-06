var SELFINTRO_LENGTH = 140;

$('#applyButton').click(function() {
    $('.popover, #request').fadeIn(100);
});

// When user click on the close button
$('.popover img.requestClose').click(function() {
    $('.popover').fadeOut(100);
});                                                     

$('.popover img.feedbackClose').click(function() {
    $('.popover').fadeOut(100);
});

Placeholder.init();

$('.popover div#request div.detail form.request fieldset textarea.selfIntro').keyup(function() {
    $('.popover div#request div.detail form.request fieldset strong.selfIntroError').hide();

    var left, exceed, inputs = $(this).val().length;

    if (inputs == SELFINTRO_LENGTH) {
      $('span.selfIntroCounter').html('<em class="full">已经到了上限，<br />可以提交了!</em>').show();
    } else if (inputs > SELFINTRO_LENGTH) {
      exceed = inputs - SELFINTRO_LENGTH;
      $('span.selfIntroCounter').html('最多140个字，<br />已超出<em class="exceed">' + exceed + '</em>个字').show();
    } else if (inputs < SELFINTRO_LENGTH) {
      left = SELFINTRO_LENGTH - inputs;
      $('span.selfIntroCounter').html('最多140个字，<br />还剩<em class="left">' + left + '</em>个字').show();
    }
});
