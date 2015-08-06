/**
 * jquery.bbAccordion.js
 * version 1.1.1
 * me@bokeer.net
 *
 * Copyright 2013-2015
 * Free to use under the MIT license.
 *
 * Date: Jan 15, 2014
 */
!(function($) {
    $.fn.bbAccordion = function(options) {

    	var settings = $.extend({},{
            selectedIdx: false,
            classActive: 'active',
            selectorGroup: 'accordionGroup',
            divHead: '.accordion-head',
            divContent: '.accordion-content',
            animSpeed: 500
    	}, options);

        return this.each(function() {

            var that = this,
                $that = $(this),
                data = $that.data(),
                $head = $(settings.divHead, $that),
                $content = $(settings.divContent, $that),
                group = data.accordionGroup || null,
                groupItems = group ? $('[data-accordion-group="' + group + '"]') : null;

            if ( groupItems && settings.selectedIdx !== false ) {
            	if ( settings.selectedIdx != groupItems.index($that) ) {
                    $content.hide();
            	} else {
            		$that.addClass(settings.classActive);
            	}
            } else if ( !$that.hasClass(settings.classActive) ) {
                $content.hide();
            }

            $head.on('click', function(e) {

                e.preventDefault();

                if ( $that.hasClass(settings.classActive) ) {
                    $that.removeClass(settings.classActive);
                    $content.slideUp(settings.animSpeed);
                    return;
                }

                if ( groupItems ) {
                    groupItems.filter("." + settings.classActive).each(function() {
                        $(settings.divContent, $(this)).slideUp(settings.animSpeed);
                    }).removeClass(settings.classActive);
                }

                $that.addClass(settings.classActive);
                $content.slideDown(settings.animSpeed);
            });
        });
    };
})(jQuery);
