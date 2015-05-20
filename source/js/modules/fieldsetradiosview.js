define(
['newspec_template/js/bootstrap'],
function(bootstrap) {

    var $ = bootstrap.$,
        FieldsetRadiosView;

    FieldsetRadiosView = function(el) {
        this.$el = $(el);

        this.$el.find('label:first').addClass('first-child');

        // this.$el.find('input:checked').parent().addClass('is-checked');
        this.onReset();

        this.$el.on('disable enable', $.proxy(this, 'onToggle'));
        // TODO: Set focus when clicking an input?
        // TODO: Clear focus class when focus leaves the fieldset
        this.$el.on('change', 'input', $.proxy(this, 'onChange'));
        this.$el.on('focus', 'input', $.proxy(this, 'onFocus'));

        // Don't need to do this on mobile, as we use standard form elements
        this.$el.parents('form').on('afterReset', $.proxy(this, 'onReset'));

        this.$el.on('focusout', $.proxy(this, 'onFocusOut'));
    };

    FieldsetRadiosView.prototype.onReset = function(e) {
        this.$el.find('.is-checked').removeClass('is-checked');
        this.$el.find('input:checked').parent().addClass('is-checked');
        this.$el.removeClass('is-disabled');
    };

    FieldsetRadiosView.prototype.onToggle = function(e) {
        this.disabled = (e.type === 'disable');
        this.$el.toggleClass('is-disabled', e.type === 'disable');
    };

    FieldsetRadiosView.prototype.onChange = function(e) {
        this.$el.find('.is-checked').removeClass('is-checked');
        $(e.currentTarget).parent().toggleClass('is-checked', e.target.checked);
    };

    FieldsetRadiosView.prototype.onFocus = function(e) {
        this.$el.find('.is-focused').removeClass('is-focused');
        $(e.currentTarget).parent().addClass('is-focused');
    };

    FieldsetRadiosView.prototype.onFocusOut = function(e) {
        this.$el.find('.is-focused').removeClass('is-focused');
    };

    return FieldsetRadiosView;

});
