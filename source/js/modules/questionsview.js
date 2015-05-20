define(
['newspec_template/js/bootstrap', 'js/controller', 'js/fieldsetsliderview', 'js/fieldsettoggleview', 'js/fieldsetcheckboxesview', 'js/fieldsetradiosview', 'js/formhelper'],
function(bootstrap, controller, FieldsetSliderView, FieldsetToggleView, FieldsetCheckboxesView, FieldsetRadiosView, formHelper) {

    var $ = bootstrap.$,
        bind = bootstrap.bind,
        QuestionsView;

    QuestionsView = function(el) {
        this.$el = $(el);

        this.activeFormIndex = 0;
        this.totalForms = this.$el.find('form').length;

        this.$el.find('fieldset[data-ui]').each(function() {
            var $this, ui;

            $this = $(this);

            switch ($this.data('ui')) {
            case 'checkboxes':
                new FieldsetCheckboxesView(this);
                break;
            case 'radios':
                new FieldsetRadiosView(this);
                break;
            case 'slider':
                new FieldsetSliderView(this);
                break;
            case 'toggle':
                new FieldsetToggleView(this);
                break;
            }
        });

        this.$el.on('click', 'button.prev', $.proxy(this, 'onClickPrev'));

        this.$el.find('fieldset.economic-propertytype').on('change', $.proxy(this, 'onChangePropertyType'));

        // jQuery will simulate change event bubbling in IE6-8
        this.$el.on('change', $.proxy(this, 'onChange'));
        this.$el.on('submit', $.proxy(this, 'onSubmit'));
    };

    QuestionsView.prototype.onChangePropertyType = function(e) {
        var type, disable;

        type = this.$el.find('fieldset.economic-propertytype input:checked').val();
        disable = (type === 'rent');

        // jQuery will remove the attribute if false
        this.$el.find('fieldset.economic-property')
            .trigger(disable ? 'disable' : 'enable')
            .find('input[type="radio"]')
                .attr('disabled', disable);
    };

    QuestionsView.prototype.onChange = function(e) {
        controller.inputChanged();
        this.getFormData($(e.target).parents('form'));
    };

    QuestionsView.prototype.getFormData = function($form) {
        var data, i, property;

        data = formHelper.serialize($form[0]);

        for (i in data) {
            // FIXME: Should be silent unless last property
            controller.setUserProperty(i, data[i], false);
        }

        controller.updateUserScore();
    };

    QuestionsView.prototype.show = function() {
        this.$el.removeClass('is-hidden');
    };

    QuestionsView.prototype.showQuestions = function(n) {
        var $targetForm;

        this.$el.find('form').eq(this.activeFormIndex).addClass('is-hidden');

        $targetForm = this.$el.find('form').eq(n);

        $targetForm
            .removeClass('is-hidden')
            .focus();

        // TODO: Need to gather initial state from inputs?
        this.getFormData($targetForm);

        this.activeFormIndex = n;
    };

    QuestionsView.prototype.onSubmit = function(e) {
        var i;

        e.preventDefault();

        i = this.activeFormIndex + 1;

        if (i < this.totalForms) {
            controller.showQuestions(i);
        } else {
            // FIXME: Hide this views elements?
            this.$el.find('form').eq(this.activeFormIndex).addClass('is-hidden');
            controller.showResults();
        }
    };

    QuestionsView.prototype.onClickPrev = function(e) {
        var i;

        e.preventDefault();

        i = this.activeFormIndex - 1;
        i = Math.max(0, i);

        controller.showQuestions(i);
    };

    QuestionsView.prototype.reset = function() {
        var self = this;
        this.$el.find('form').each(function() {
            this.reset();
            // IE8 doesn't reenable disabled inputs
            $(this).find('input[disabled]').removeAttr('disabled');
            // Form reset event is triggered before input properties have changed
            // - So, trigger our own event instead
            $(this).trigger('afterReset');
            self.getFormData($(this));
        });
    };

    QuestionsView.prototype.show = function() {
        this.$el.removeClass('is-hidden');
    };

    QuestionsView.prototype.hide = function() {
        this.$el.addClass('is-hidden');
    };

    return QuestionsView;

});
