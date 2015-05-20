define(
['newspec_template/js/bootstrap', 'js/controller', 'js/formhelper'],
function(bootstrap, controller, formHelper) {

    var $ = bootstrap.$,
        bean = bootstrap.bean,
        bind = bootstrap.bind,
        QuestionsView;

    QuestionsView = function(el) {
        this.$el = $(el);

        this.activeFormIndex = 0;
        this.totalForms = $('form', this.$el).length;

        bean.on(this.$el[0], 'click', 'button.prev', bind(this, 'onClickPrev'));

        bean.on($('fieldset.economic-propertytype', this.$el)[0], 'change', bind(this, 'onChangePropertyType'));

        // FIXME: Don't really need to listen for change events
        // - as on mobile the character view is not alongside questions
        bean.on(this.$el[0], 'change', bind(this, 'onChange'));
        bean.on(this.$el[0], 'submit', bind(this, 'onSubmit'));
    };

    QuestionsView.prototype.onChangePropertyType = function(e) {
        var type, disable;

        type = $('fieldset.economic-propertytype input:checked', this.$el).val();

        disable = (type === 'rent');

        $('fieldset.economic-property input[type="radio"]', this.$el).each(function() {
            if (disable) {
                $(this).attr('disabled', 'disabled');
            } else {
                $(this).removeAttr('disabled');
            }
        });
    };

    QuestionsView.prototype.onChange = function(e) {
        controller.inputChanged();
        this.getFormData($(e.target.form));
    };

    QuestionsView.prototype.getFormData = function($form) {
        var data, i;

        data = formHelper.serialize($form[0]);

        for (i in data) {
            // FIXME: Should be silent unless last property
            controller.setUserProperty(i, data[i], false);
        }

        // controller.updateUserScore();
    };

    QuestionsView.prototype.showQuestions = function(n) {
        var $targetForm;

        $($('form', this.$el)[this.activeFormIndex]).addClass('is-hidden');

        $targetForm = $($('form', this.$el)[n]);

        $targetForm.removeClass('is-hidden');
        bean.fire($targetForm, 'focus');

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
            $($('form', this.$el)[this.activeFormIndex]).addClass('is-hidden');
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

    // QuestionsView.prototype.reset = function() {
    //     // FIXME
    //     var self = this;
    //     this.$el.find('form').each(function() {
    //         this.reset();
    //         self.getFormData($(this));
    //     });
    // };

    QuestionsView.prototype.show = function() {
        this.$el.removeClass('is-hidden');
    };

    QuestionsView.prototype.hide = function() {
        this.$el.addClass('is-hidden');
    };

    return QuestionsView;

});
