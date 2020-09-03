(function( $ ) {
	'use strict';

	jQuery(document).ready(function($){
		var $ul_menu = $('#post-body-content ul.menu.ui-sortable');
		var class_names, depth, next_depth;
		$ul_menu.find('>li:not(.menu-item-depth-0)').addClass('menu-item-hidden');

		$ul_menu.find('>li').each(function () {
			var $this = $(this);
			class_names = $this.attr('class');
			depth = class_names.match(/\d+/);
			next_depth = parseInt(depth) + 1;

			$this.attr('data-mydepth', depth);
			$this.attr('data-nextdepth', next_depth);

			if ( $this.next('li.menu-item-depth-' + next_depth).length )
				$this.find('.menu-item-bar .item-title').prepend('<a href="#" class="show-children" title="Toggle child menu(s)" data-toggledepth="'+next_depth+'">+&nbsp;</a>');
		});

		$ul_menu.on('click', 'a.show-children', function(e) {
			e.preventDefault();
			var $this = $(this);
			var toggle_depth = $this.attr('data-toggledepth');
			var $closest_li = $this.closest('li');
			var until_depth = $closest_li.attr('data-mydepth');
			var $toggle_me_items;

			if ( $this.hasClass('active') ) { // hide
				if (toggle_depth == 3) { // hardcoded. weird shit happens for depth 3. didn't have time to debug more.
					$toggle_me_items = $closest_li.nextUntil('li.menu-item-depth-' + until_depth, 'li.menu-item-depth-3');
				}
				else {
					$toggle_me_items = $closest_li.nextUntil('li.menu-item-depth-' + until_depth, 'li.menu-item');
				}

				$toggle_me_items.addClass('menu-item-hidden').find('a.show-children').removeClass('active').text('+');
			}
			else { // show
				$closest_li.nextUntil('li.menu-item-depth-' + until_depth, 'li.menu-item-depth-' + toggle_depth).removeClass('menu-item-hidden');
			}

			$this.text(function(i, text){
				return text === "-" ? "+" : "-";
			});

			$this.toggleClass('active');

		});
	});

})( jQuery );