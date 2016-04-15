/**
 * jquery.bbAccordion.js
 * version 1.2.0
 * me@bokeer.net
 *
 * Copyright 2013-2016
 * Free to use under the MIT license.
 *
 * Date: Jan 15, 2014
 */
!(function($) {

    $.bbAccordion = {
        close: function(el, settings) {

            var that = el,
                $that = $(that),
                $content = $('>' + settings.divContent, $that);

            if ( $that.hasClass(settings.classActive) ) {
                $that.removeClass(settings.classActive);
                $content.slideUp(settings.animSpeed);
            };
        },
        open: function(el, settings) {

            var that = el,
                $that = $(that),
                $content = $('>' + settings.divContent, $that);

            if ( !$that.hasClass(settings.classActive) ) {
                $that.addClass(settings.classActive);
                $content.slideDown(settings.animSpeed);
            };
        }
    };

    $.fn.bbAccordion = function(options) {

    	var settings = $.extend({
            selectedIdx: false,
            classActive: 'active',
            selectorGroup: 'accordionGroup',
            divHead: '.accordion-head',
            divContent: '.accordion-content',
            animSpeed: 500
    	}, options);

        var root = $.bbAccordion;

        return this.each(function() {

            var that = this,
                $that = $(this),
                data = $that.data(),
                $head = $('>' + settings.divHead, $that),
                $content = $('>' + settings.divContent, $that),
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
                    $that.trigger('close.bbAccordion');
                    return;
                }

                if ( groupItems ) {
                    groupItems.filter("." + settings.classActive)
                              .trigger('close.bbAccordion')
                              .removeClass(settings.classActive);
                }

                $that.find('.bbAccordion').trigger('close.bbAccordion');

                setTimeout(function() {
                    root.open(that, settings);
                }, 0);
            });

            $that.on('close.bbAccordion', function(e) {

                e.stopPropagation();

                root.close(this, settings);

            }).on('open.bbAccordion', function(e) {

                e.stopPropagation();

                root.open(this, settings);
            });
        });
    };
})(jQuery);
