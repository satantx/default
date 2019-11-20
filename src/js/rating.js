//	<div class="rating" data-mode="active" data-name="property" data-count="5" data-value="4"></div>
//
//	$('.rating').modrate();

$.fn.modrate = function(options) {
	var options = $.extend({
		className: 'rate-star',
		classActive: 'rate-active',
		classHover: 'rate-hover',
		classGrab: 'rate-grab',
		count: 5,
		text: '★'
		// svg
		// text: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M7.1.6c.3-.8 1.4-.8 1.8 0l1.6 3.7c.1.3.4.6.8.6l3.9.4c.8.1 1.2 1.2.6 1.8l-2.9 2.7c-.3.2-.4.6-.3 1l.8 4c.2.9-.7 1.5-1.4 1.1l-3.4-2c-.3-.2-.7-.2-1 0l-3.4 2c-.7.4-1.6-.2-1.4-1.1l.8-4c.1-.4 0-.7-.3-1l-3-2.7c-.6-.6-.3-1.7.6-1.8l3.9-.4c.3 0 .6-.3.8-.6l1.5-3.7z"/></svg>'
	},
	options);
	return this.each(function() {

		var el = $(this),
			data = el.data(),
			rate = parseInt(data.value, 10),
			mode = data.mode,
			name = data.name,
			count = parseInt(data.count, 10),

			nameStar = options.className,
			activeStar = options.classActive,
			hoverStar = options.classHover,
			grabStar = options.classGrab;

		el.removeAttr('data-count data-value');

		if(!count) count = options.count;
		if(!rate) rate = 0;
		else if(rate > count) rate = count;

		for(var i = 0; i < count; i++)
			$('<div class="' + nameStar + '">' + options.text + '</div>').appendTo(el);

		if(rate > 0) $('.' + nameStar,this).slice(0, rate).addClass(activeStar);
		
		if(mode === 'active') {
			var input = $('<input type="hidden" name="' + name + '"/>').appendTo(el);
			el.removeAttr('data-name data-mode').addClass(grabStar);
			var item = $('.' + nameStar, el);
			item.hover(
				function() {
					var index = $(this).index() + 1;
					item.slice(0, index).addClass(hoverStar);
				},
				function() {
					item.removeClass(hoverStar);
				}
			).click(function() {
				var index = $(this).index() + 1;
				item.removeClass(activeStar).slice(0, index).addClass(activeStar);
				input.val(index);
			});
		}
	});
};