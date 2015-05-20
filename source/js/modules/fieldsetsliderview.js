define(
['newspec_template/js/bootstrap'],
function(bootstrap) {

    var $ = bootstrap.$,
        FieldsetSliderView;

    FieldsetSliderView = function(el) {
        this.$el = $(el);

        this.disabled = false;

        this.dragging = false;
        this.dragStartX = null;
        this.dragCurrentX = null;

        this.onDragStart = $.proxy(this, 'onDragStart');
        this.onDragMove = $.proxy(this, 'onDragMove');
        this.onDragEnd = $.proxy(this, 'onDragEnd');

        this.$el.on('disable enable', $.proxy(this, 'onToggle'));
        this.$el.on('change', 'input', $.proxy(this, 'onChange'));
        this.$el.on('focusin focusout', $.proxy(this, 'onFocus'));

        this.render();
    };

    FieldsetSliderView.prototype.template = [
        '<div class="ui-slider clearfix" aria-hidden="true">',
            '<div class="ui-slider-control">',
                '<div class="ui-slider-handle">',
                    '<i class="sprite sprite-slider"></i>',
                '</div>',
                '<div class="ui-slider-track"></div>',
            '</div>',
            '<div class="ui-slider-label"></div>',
        '</div>'
    ].join('');

    FieldsetSliderView.prototype.render = function() {
        var inputs, i, $input, value, label, pc;

        this.$slider = $(this.template);
        this.$sliderHandle = this.$slider.find('.ui-slider-handle');
        this.$sliderLabel = this.$slider.find('.ui-slider-label');
        this.$sliderTrack = this.$slider.find('.ui-slider-track');

        inputs = this.$el.find('input');

        this.ticks = [];

        for (i = 0; i < inputs.length; i++) {
            $input = $(inputs[i]);

            value = parseFloat($input.val());
            label = $.trim($input.parent().text());

            // Evenly distribute the ticks
            pc = (1 / (inputs.length - 1)) * i;

            $('<div>', {
                'class': 'ui-slider-track-tick',
                css: { left: pc * 100 + '%' },
                html: '<i></i><span>' + label + '</span>'
            }).appendTo(this.$sliderTrack);

            this.ticks.push({
                $input: $input,
                pc: pc,
                value: value
            });
        }

        this.$slider.appendTo(this.$el);

        this.$sliderHandle.on('mousedown touchstart', this.onDragStart);
    };

    FieldsetSliderView.prototype.onToggle = function(e) {
        this.disabled = (e.type === 'disable');
        this.$slider.toggleClass('is-disabled', e.type === 'disable');
    };

    FieldsetSliderView.prototype.onFocus = function(e) {
        this.$slider.toggleClass('is-focused', e.type === 'focusin');
    };

    FieldsetSliderView.prototype.onChange = function(e) {
        var tick;
        tick = this.getNearestTick('value', e.target.value);
        this.setSliderPosition(tick.pc);
    };

    FieldsetSliderView.prototype.getNearestTick = function(property, value) {
        var i, d, minD, tick, targetTick;

        for (i = 0; i < this.ticks.length; i ++) {
            d = Math.abs(this.ticks[i][property] - value);

            if (d < minD || typeof minD === 'undefined') {
                tick = this.ticks[i];
                minD = d;
            }
        }

        return tick;
    };

    FieldsetSliderView.prototype.setSliderPosition = function(pc) {
        pc = Math.min(1, Math.max(0, pc));
        this.$sliderHandle.css('left', 100 * pc + '%');
    };

    FieldsetSliderView.prototype.onDragStart = function(e) {
        if (this.disabled) {
            return;
        }

        switch (e.type) {
        case 'mousedown':
            // Only allow dragging with left mouse button
            if (e.which && e.which !== 1) {
                return;
            }

            e.preventDefault();

            this.dragStartX = e.pageX - this.$sliderHandle.position().left;

            $(document)
                .on('mousemove', this.onDragMove)
                .on('mouseup mouseleave', this.onDragEnd);

            break;
        case 'touchstart':
            // Only allow dragging with a single finger
            if (e.originalEvent && e.originalEvent.touches.length > 1) {
                return;
            }

            this.dragStartX = e.originalEvent.touches[0].pageX - this.$sliderHandle.position().left;

            e.preventDefault();

            this.$sliderHandle
                .on('touchmove', this.onDragMove)
                .on('touchend', this.onDragEnd);

            break;
        }

        this.dragExtent = this.$sliderTrack.width();
    };

    FieldsetSliderView.prototype.onDragMove = function(e) {
        var pc;

        e.preventDefault();

        switch (e.type) {
        case 'mousemove':
            this.dragCurrentX = e.pageX;
            break;
        case 'touchmove':
            this.dragCurrentX = e.originalEvent.touches[0].pageX;
            break;
        }

        pc = (this.dragCurrentX - this.dragStartX) / this.dragExtent;
        this.setSliderPosition(pc);
    };

    FieldsetSliderView.prototype.onDragEnd = function(e) {
        var pc, tick;

        e.preventDefault();

        switch (e.type) {
        case 'mouseup':
        case 'mouseleave':
            this.dragCurrentX = e.pageX;

            $(document)
                .off('mousemove', this.onDragMove)
                .off('mouseup mouseleave', this.onDragEnd);

            break;
        case 'touchend':
            this.$sliderHandle
                .off('touchmove', this.onDragMove)
                .off('touchend', this.onDragEnd);

            break;
        }

        // Snap to nearest tick position
        pc = (this.dragCurrentX - this.dragStartX) / this.dragExtent;
        tick = this.getNearestTick('pc', pc);

        tick.$input
            .prop('checked', true)
            .trigger('change');
    };

    return FieldsetSliderView;

});
