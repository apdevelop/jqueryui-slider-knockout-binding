# jQuery UI Slider for KnockoutJS custom binding
Sample JS code adding custom binding as `ko.bindingHandlers.slider` to jQuery UI slider widget.
Supported properties for binding are:
* `value`, `min`, `max`, `step`, `enabled` for simple slider
* `values` (or separate `valueMin`, `valueMax`) for range slider (if `sliderOptions.range` set to `true`).

Check the [demo page](https://htmlpreview.github.io/?https://github.com/apdevelop/jqueryui-slider-knockout-binding/blob/master/slider-binding.html) to see it in action.

### Sample usage

Add `data-bind: slider: {...}` attribute to `div` element which should become slider.
```html
<div data-bind="slider: { value: selectedValue, min: 0, max: maxRangeValue, step: stepValue, enabled: isSliderEnabled }, sliderOptions: { min: 0, step: 5 }"></div>
```

Declare corresponding observables in ViewModel
```javascript
function ViewModel() {
    this.selectedValue = ko.observable(0);
	this.maxRangeValue = ko.observable(150);
    this.stepValue = ko.observable(1); // It will override step value in sliderOptions
    this.isSliderEnabled = ko.observable(true);
	this.setZeroValue = function () {
        this.selectedValue(0);
    };
	...
}
```

**Note** Values, which used as bindings in slider: {...} has priority over sliderOptions.

### References
* [Knockout.js - Creating custom bindings](http://knockoutjs.com/documentation/custom-bindings.html)
* [jQuery UI Slider Widget API](https://api.jqueryui.com/slider/)