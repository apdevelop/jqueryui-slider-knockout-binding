function ViewModel() {
    this.selectedValue = ko.observable(0);
    this.selectedValue.subscribe(function (value) {
        console.log("in observable subscribe callback: " + this.selectedValue());
    }, this);

    this.maxRangeValue = ko.observable(150);
    this.stepValue = ko.observable(1);

    this.isSliderEnabled = ko.observable(true);

    this.setZeroValue = function () {
        this.selectedValue(0);
    };

    this.setValue50 = function () {
        this.selectedValue(50);
    };

    this.setMaxValue = function () {
        this.maxRangeValue(100);
    };

    this.setStepValue = function () {
        this.stepValue(10);
    };

    this.slider2valueMin = ko.observable(10);

    this.slider2valueMax = ko.observable(40);
}