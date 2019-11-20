// формат даты: 2018-04-28 10:00:00

$('[data-time]').each(function () {
   var
      timer = $(this),
      time = timer.data('time'),

      days_text = $('.js-days', timer),
      hours_text = $('.js-hours', timer),
      minutes_text = $('.js-minutes', timer),
      seconds_text = $('.js-seconds', timer),

      countDownDate = new Date(time.replace(' ', 'T')).getTime();
   if (isNaN(countDownDate)) {
      countDownDate = new Date(time).getTime();
   }

   var x = setInterval(function () {
      var
         now = new Date().getTime(),
         distance = countDownDate - now,
         days = Math.floor(distance / (1000 * 60 * 60 * 24)),
         hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
         minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
         seconds = Math.floor((distance % (1000 * 60)) / 1000);

      days = ("0" + days).substr(-2).toString().split('.');
      hours = ("0" + hours).substr(-2).toString().split('.');
      minutes = ("0" + minutes).substr(-2).toString().split('.');
      seconds = ("0" + seconds).substr(-2).toString().split('.');

      days_text.text(days);
      hours_text.text(hours);
      minutes_text.text(minutes);
      seconds_text.text(seconds);

      if (distance < 0) {
         clearInterval(x);
         $('.js-timer', timer).remove();
         $('.js-finish', timer).text('Акция завершена!');
      }
   }, 1000);
});
