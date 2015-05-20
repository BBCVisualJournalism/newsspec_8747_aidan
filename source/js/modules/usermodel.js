define(
['js/arrayhelper'],
function(arrayHelper) {

    var UserModel;

    UserModel = function() {
        this.properties = {};
        this.score = {};
    };

    UserModel.prototype.get = function(property, fallback) {
        var value;

        value = this.properties[property];

        return (typeof value !== 'undefined') ? value : fallback;
    };

    UserModel.prototype.set = function(property, data, silent) {
        var value, previousValue, i;

        previousValue = this.get(property);

        if (data instanceof Array) {
            value = [];
            for (i = 0; i < data.length; i++) {
                value.push(parseFloat(data[i]));
            }
        } else {
            value = parseFloat(data);
        }

        this.properties[property] = value;

        if (silent) {
            return;
        }

        this.calculateScore();
    };

    UserModel.prototype.calculateScore = function() {
        var social, culturalEmerging, culturalHigh;

        this.score['economic-income'] = this.get('economic-income');
        // Sum economic property value as we have a hidden field for zero
        this.score['economic-assets'] = (arrayHelper.sum(this.get('economic-property')) * 0.25) + (this.get('economic-savings') * 0.75);

        social = this.get('social');
        this.score['social-mean'] = arrayHelper.mean(social) / 85.3;
        // 10 social contacts should give 100%
        this.score['social-count'] = Math.min(10, arrayHelper.count(social)) / 10;

        culturalEmerging = arrayHelper.sum(this.get('cultural-emerging'));
        culturalHigh = arrayHelper.sum(this.get('cultural-high'));

        // 5 cultural activities should give 100%
        this.score['cultural-emerging'] = Math.min(5, culturalEmerging) / 5;
        this.score['cultural-high'] = Math.min(5, culturalHigh) / 5;
    };

    UserModel.prototype.getNearestArchetype = function() {
        var economicIncome, economicProperty, economicSavings, social, culturalEmerging, culturalHigh;

        economicIncome = this.get('economic-income');
        economicProperty = arrayHelper.sum(this.get('economic-property'));
        economicSavings = this.get('economic-savings');

        social = this.get('social');

        culturalEmerging = arrayHelper.sum(this.get('cultural-emerging'));
        culturalHigh = arrayHelper.sum(this.get('cultural-high'));

        // FIXME: Is this condition needed?
        // if (isNaN(economicIncome)) {
        //     return null;
        // }

        if (economicIncome === 1) {
            return 'elite';
        }

        if (economicIncome === 0.6) {
            if (arrayHelper.count(social) < 6) {
                return 'technical-middle';
            }

            return (arrayHelper.mean(social) < 58) ? 'established-middle' : 'elite';
        }

        if (economicIncome === 0.375) {
            if (economicProperty === 0) {
                return 'emergent-worker';
            }

            if (economicSavings === 1) {
                return 'elite';
            }

            if (economicSavings <= 0.05) {
                return (culturalHigh < 3) ? 'affluent-worker' : 'established-middle';
            } else {
                return (arrayHelper.count(social) < 6) ? 'technical-middle' : 'established-middle';
            }
        }

        if (economicIncome === 0.175) {
            if (economicProperty === 0) {
                return (culturalEmerging < 4) ? 'precariat' : 'emergent-worker';
            } else {
                return (culturalEmerging < 3) ? 'traditional-worker' : 'affluent-worker';
            }
        }

        if (economicIncome === 0.08) {
            if (economicProperty > 0) {
                return 'traditional-worker';
            }

            if (culturalEmerging < 4) {
                return 'precariat';
            }

            if (culturalEmerging > 4) {
                return 'emergent-worker';
            }

            return (arrayHelper.count(social) < 6) ? 'precariat' : 'emergent-worker';
        }

        return null;
    };

    return UserModel;

});
