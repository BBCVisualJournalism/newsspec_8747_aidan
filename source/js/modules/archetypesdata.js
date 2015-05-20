define(
function() {

    var data, i;

    data = {
        'elite': {
            title: 'Elite',
            'economic-income': 0.891,
            'economic-property': 0.325,
            'economic-savings': 0.475,
            'social-mean': 0.666,
            'social-count': 0.887,
            'cultural-emerging': 0.776,
            'cultural-high': 0.80
        },
        'established-middle': {
            title: 'Established middle class',
            'economic-income': 0.472,
            'economic-property': 0.177,
            'economic-savings': 0.087,
            'social-mean': 0.603,
            'social-count': 0.93,
            'cultural-emerging': 0.882,
            'cultural-high': 0.795
        },
        'technical-middle': {
            title: 'Technical middle class',
            'economic-income': 0.374,
            'economic-property': 0.163,
            'economic-savings': 0.219,
            'social-mean': 0.696,
            'social-count': 0.427,
            'cultural-emerging': 0.698,
            'cultural-high': 0.580
        },
        'affluent-worker': {
            title: 'New affluent workers',
            'economic-income': 0.293,
            'economic-property': 0.129,
            'economic-savings': 0.016,
            'social-mean': 0.483,
            'social-count': 0.83,
            'cultural-emerging': 0.874,
            'cultural-high': 0.275
        },
        'traditional-worker': {
            title: 'Traditional working class',
            'economic-income': 0.133,
            'economic-property': 0.127,
            'economic-savings': 0.032,
            'social-mean': 0.585,
            'social-count': 0.62,
            'cultural-emerging': 0.344,
            'cultural-high': 0.763
        },
        'emergent-worker': {
            title: 'Emergent service workers',
            'economic-income': 0.210,
            'economic-property': 0.018,
            'economic-savings': 0.004,
            'social-mean': 0.569,
            'social-count': 0.889,
            'cultural-emerging': 0.92,
            'cultural-high': 0.663
        },
        'precariat': {
            title: 'Precariat',
            'economic-income': 0.083,
            'economic-property': 0.027,
            'economic-savings': 0.003,
            'social-mean': 0.433,
            'social-count': 0.424,
            'cultural-emerging': 0.598,
            'cultural-high': 0.24
        }
    };

    // Calculate economic assets score from split of property and savings
    // Savings and property scores are out of 50% not 100%
    for (i in data) {
        data[i]['economic-assets'] = (data[i]['economic-property'] * 2 * 0.25) + (data[i]['economic-savings'] * 2 * 0.75);
    }

    return data;
});
