define(
['newspec_template/js/bootstrap'],
function(bootstrap) {

    var $ = bootstrap.$,
        FieldsetCheckboxesView;

    FieldsetCheckboxesView = function(el) {
        this.$el = $(el);

        // this.$el.find('input:checked').parent().addClass('is-checked');
        this.onReset();

        // TODO: Set focus when clicking an input?
        // TODO: Clear focus class when focus leaves the fieldset
        this.$el.on('change', 'input', $.proxy(this, 'onChange'));
        this.$el.on('focus', 'input', $.proxy(this, 'onFocus'));

        // Don't need to do this on mobile, as we use standard form elements
        this.$el.parents('form').on('afterReset', $.proxy(this, 'onReset'));

        this.$el.on('focusout', $.proxy(this, 'onFocusOut'));
    };

    FieldsetCheckboxesView.prototype.onReset = function(e) {
        this.$el.find('.is-checked').removeClass('is-checked');
        this.$el.find('input:checked').parent().addClass('is-checked');
    };

    FieldsetCheckboxesView.prototype.onChange = function(e) {
        $(e.currentTarget).parent().toggleClass('is-checked', e.target.checked);
    };

    FieldsetCheckboxesView.prototype.onFocus = function(e) {
        this.$el.find('.is-focused').removeClass('is-focused');
        $(e.currentTarget).parent().addClass('is-focused');
    };

    FieldsetCheckboxesView.prototype.onFocusOut = function(e) {
        this.$el.find('.is-focused').removeClass('is-focused');
    };

    return FieldsetCheckboxesView;

});
