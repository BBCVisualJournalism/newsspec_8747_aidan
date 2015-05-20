define(
function() {

    return {
        makeArray: function(a) {
            if (typeof a === 'undefined') {
                return undefined;
            }
            if (a instanceof Array) {
                return a;
            }
            return [a];
        },

        withoutZeros: function(a) {
            var b, i;
            b = a.slice(0);
            for (i = 0; i < b.length; i ++) {
                if (parseInt(b[i], 10) === 0) {
                    b.splice(i, 1);
                }
            }
            return b;
        },

        count: function(a) {
            a = this.makeArray(a);
            if (typeof a === 'undefined') {
                return NaN;
            }
            a = this.withoutZeros(a);
            return a.length;
        },

        sum: function(a) {
            var sum, i;
            a = this.makeArray(a);
            if (typeof a === 'undefined') {
                return NaN;
            }
            sum = 0;
            for (i = 0; i < a.length; i++) {
                sum += a[i];
            }
            return sum;
        },

        // FIXME: Count argument not used
        mean: function(a, count) {
            a = this.makeArray(a);
            if (typeof a === 'undefined') {
                return NaN;
            }
            a = this.withoutZeros(a);
            if (!a.length) {
                return 0;
            }
            if (typeof count === 'undefined') {
                count = a.length;
            }
            return this.sum(a) / count;
        }
    };

});