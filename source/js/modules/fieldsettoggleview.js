define(
['newspec_template/js/bootstrap'],
function(bootstrap) {

    var $ = bootstrap.$,
        FieldsetToggleView;

    FieldsetToggleView = function(el) {
        this.$el = $(el);

        this.$el.find('input:checked').parent().addClass('is-checked');

        // TODO: Set focus when clicking an input?
        // TODO: Clear focus class when focus leaves the fieldset
        // FIXME: Focusing is the same as changing checked element
        this.$el.on('change', 'input', $.proxy(this, 'onChange'));
        this.$el.on('focus', 'input', $.proxy(this, 'onFocus'));
    };

    FieldsetToggleView.prototype.onChange = function(e) {
        this.$el.find('.is-checked').removeClass('is-checked');
        $(e.currentTarget).parent().toggleClass('is-checked', e.target.checked);
    };

    FieldsetToggleView.prototype.onFocus = function(e) {
        this.$el.find('.is-focused').removeClass('is-focused');

        $(e.currentTarget).parent()
            .addClass('is-focused', e.target.checked);
    };

    return FieldsetToggleView;

});
