define(
['newspec_template/js/bootstrap', 'raphael'],
function(bootstrap) {

    var $ = bootstrap.$,
        SegmentsView,
        raphaelSegment;

    SegmentsView = function($el, width, scale, innerScale) {
        this.canvas = Raphael($el[0], width, width);
        this.canvas.customAttributes.segment = raphaelSegment;

        this.center = {
            x: width / 2,
            y: width / 2
        };

        this.radius = Math.round(width / 2) * scale;

        this.innerRadius = this.radius * innerScale;

        this.maxThickness = this.radius - this.innerRadius;
        this.minThickness = 5;
        this.rangeThickness = this.maxThickness - this.minThickness;

        this.startAngle = -216 + 9;
        this.angleExtent = 252 - 18;

        this.segmentAngleDeg = this.angleExtent / this.renderedProperties.length;
        this.segmentAngleRad = this.segmentAngleDeg * (Math.PI / 180);

        // Calculate the max are of a segment of the annulus
        // - http://en.wikipedia.org/wiki/Annulus_(mathematics)
        this.maxArea = (this.segmentAngleRad / 2) * (Math.pow(this.radius, 2) - Math.pow(this.innerRadius + this.minThickness, 2));

        this.segments = {};

        this.render();
    };

    SegmentsView.prototype.colours = {
        bg: '#eaeae4',
        economic: '#4d3361',
        social: '#fa315d',
        cultural: '#1bb4c7'
    };

    // FIXME: Should not need to reverse
    SegmentsView.prototype.renderedProperties = [
        'economic-income',
        'economic-assets',
        'social-mean',
        'social-count',
        'cultural-emerging',
        'cultural-high'
    ].reverse();

    SegmentsView.prototype.render = function() {
        var angle, i, path, bgPath;

        angle = this.startAngle;

        for (i = 0; i < this.renderedProperties.length; i ++) {
            bgPath = this.canvas.path();
            bgPath.attr({
                segment: [angle, angle + this.segmentAngleDeg, this.center.x, this.center.y, this.innerRadius, this.maxThickness],
                fill: '#ffffff',
                stroke: this.colours.bg
            });

            path = this.canvas.path();
            path.attr({
                segment: [angle, angle + this.segmentAngleDeg, this.center.x, this.center.y, this.innerRadius, 0],
                fill: this.colours[this.renderedProperties[i].split('-')[0]],
                stroke: this.colours.bg
            });

            this.segments[this.renderedProperties[i]] = {
                path: path,
                startAngle: angle,
                endAngle: angle + this.segmentAngleDeg
            };

            angle += this.segmentAngleDeg;
        }

        // Render dummy score to generate images for mobile version
        // var testValue = 1;
        // var testScore = {
        //     'economic-income': testValue,
        //     'economic-assets': testValue,
        //     'social-mean': testValue,
        //     'social-count': testValue,
        //     'cultural-emerging': testValue,
        //     'cultural-high': testValue
        // };
        // this.update(testScore);
    };

    SegmentsView.prototype.update = function(score) {
        var angle, i, segment, value, radius, thickness;

        for (i in this.segments) {
            segment = this.segments[i];

            value = score[i];

            if (isNaN(value)) {
                continue;
            }

            // thickness = this.minThickness + (value * this.rangeThickness);

            // Scale by area
            radius = Math.sqrt(((this.maxArea * value) / (this.segmentAngleRad / 2)) + Math.pow(this.innerRadius + this.minThickness, 2));
            thickness = (radius - this.innerRadius);

            // FIXME: Animation does not work in Safari
            // - Problem with version of Raphael?
            // - Works in 6.0.2
            segment.path.animate(
                { segment: [segment.startAngle, segment.endAngle, this.center.x, this.center.y, this.innerRadius, thickness] },
                500, 'easeInOut'
            );
        }
    };

    raphaelSegment = function(startAngle, endAngle, centerX, centerY, radius, thickness) {
        var arcFlag, a, b, path;

        startAngle = Raphael.rad((360 - startAngle) - 180);
        endAngle = Raphael.rad((360 - endAngle) - 180);

        arcFlag = startAngle - endAngle > Math.PI ? 1 : 0;

        a = radius + thickness;
        b = radius;

        path = [
            [
                'M',
                centerX + a * Math.cos(startAngle),
                centerY + a * Math.sin(startAngle)
            ],
            [
                'L',
                centerX + b * Math.cos(startAngle),
                centerY + b * Math.sin(startAngle)
            ],
            [
                'A',
                b, b, 0, arcFlag, 0,
                centerX + b * Math.cos(endAngle),
                centerY + b * Math.sin(endAngle)
            ],
            [
                'L',
                centerX + a * Math.cos(endAngle),
                centerY + a * Math.sin(endAngle)
            ],
            [
                'A',
                a, a, 0, arcFlag, 1,
                centerX + a * Math.cos(startAngle),
                centerY + a * Math.sin(startAngle)
            ]
        ];

        return { path: path };
    };

    return SegmentsView;

});
