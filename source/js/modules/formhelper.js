define(
function() {

    return {
        serialize: function(form) {
            var i, el, data;

            data = {};

            for (i = 0; i < form.elements.length; i ++) {
                el = form.elements[i];

                if (el.nodeName.toLowerCase() !== 'input') {
                    continue;
                }

                if (el.disabled) {
                    continue;
                }

                if ((el.type === 'radio' || el.type === 'checkbox') && !el.checked) {
                    continue;
                }

                if (typeof data[el.name] === 'undefined') {
                    data[el.name] = el.value;
                } else {
                    if (!(data[el.name] instanceof Array)) {
                        data[el.name] = [data[el.name]];
                    }
                    data[el.name].push(el.value);
                }
            }

            return data;
        }
    };

});