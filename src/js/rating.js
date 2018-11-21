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
	},
	options);
	return this.each(function() {

		var doc = $(this),
			data = doc.data(),
			rate = parseInt(data.value, 10),
			mode = data.mode,
			name = data.name,
			count = parseInt(data.count, 10),

			nameStar = options.className,
			activeStar = options.classActive,
			hoverStar = options.classHover,
			grabStar = options.classGrab;

		doc.removeAttr('data-count data-value');

		if(!count) count = options.count;
		if(!rate) rate = 0;
		else if(rate > count) rate = count;

		for(var i = 0; i < count; i++)
			$('<div class="' + nameStar + '">' + options.text + '</div>').appendTo(doc);

		if(rate > 0) $('.' + nameStar,this).slice(0, rate).addClass(activeStar);
		
		if(mode == 'active') {
			var input = $('<input type="hidden" name="' + name + '"/>').appendTo(doc);
			doc.removeAttr('data-name data-mode').addClass(grabStar);
			var item = $('.' + nameStar, doc);
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