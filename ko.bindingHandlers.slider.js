ko.bindingHandlers.slider = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var sliderOptions = allBindingsAccessor().sliderOptions || {};

        // Merge sliderOptions with bound value of the element - value has priority
        var options = ko.unwrap(valueAccessor());

        if (typeof (ko.unwrap(options.min)) != 'undefined') {
            sliderOptions.min = ko.unwrap(options.min);
        }

        if (typeof (ko.unwrap(options.max)) != 'undefined') {
            sliderOptions.max = ko.unwrap(options.max);
        }

        if (typeof (ko.unwrap(options.step)) != 'undefined') {
            sliderOptions.step = ko.unwrap(options.step);
        }

        if (typeof (ko.unwrap(options.enabled)) != 'undefined') {
            sliderOptions.disabled = (!ko.unwrap(options.enabled));
        }

        $(element).slider(sliderOptions);

        var slideHandler = function (event, ui, isCompleted) {
            var options = ko.unwrap(valueAccessor()); // TODO: rename options

            var lazy = false;
            if (typeof (ko.unwrap(options.lazy)) != 'undefined') {
                lazy = (ko.unwrap(options.lazy) === true);
            }

            // TODO: possible issues with keyboard control
            if ((lazy) && (!isCompleted)) {
                // TODO: range values
                if (typeof (ko.unwrap(options.previewValue)) != 'undefined') {
                    options.previewValue(ui.value);
                }

                return;
            }

            // TODO: can change when disabled; prevent it

            if (typeof (ko.unwrap(options.value)) != 'undefined') {
                options.value(ui.value);
            }

            if (typeof (ko.unwrap(options.values)) != 'undefined') {
                options.values(ui.values);
            }

            if (typeof (ko.unwrap(options.valueMin)) != 'undefined') {
                options.valueMin(ui.values[0]);
            }

            if (typeof (ko.unwrap(options.valueMax)) != 'undefined') {
                options.valueMax(ui.values[1]);
            }
        };

        // change
        // Triggered after the user slides a handle, if the value has changed; or if the value is changed programmatically via the value method.
        ko.utils.registerEventHandler(element, 'slidechange', function (event, ui) {
            slideHandler(event, ui, false);
        });

        // slide
        // Triggered on every mouse move during slide. 
        // The value provided in the event as ui.value represents the value that the handle will have as a result of the current movement.
        // Canceling the event will prevent the handle from moving and the handle will continue to have its previous value.
        ko.utils.registerEventHandler(element, 'slide', function (event, ui) {
            slideHandler(event, ui, false);
        });

        // stop
        // Triggered after the user slides a handle.
        ko.utils.registerEventHandler(element, 'slidestop', function (event, ui) {
            slideHandler(event, ui, true);
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).slider('destroy');
        });
    },
    update: function (element, valueAccessor) {
        var options = ko.unwrap(valueAccessor());

        if (typeof (ko.unwrap(options.min)) != 'undefined') {
            $(element).slider('option', 'min', ko.unwrap(options.min));
        }

        if (typeof (ko.unwrap(options.max)) != 'undefined') {
            $(element).slider('option', 'max', ko.unwrap(options.max));
        }

        if (typeof (ko.unwrap(options.step)) != 'undefined') {
            $(element).slider('option', 'step', ko.unwrap(options.step));
        }

        if (typeof (ko.unwrap(options.enabled)) != 'undefined') {
            $(element).slider('option', 'disabled', (!ko.unwrap(options.enabled)));
        }

        if (typeof (ko.unwrap(options.values)) != 'undefined') {
            $(element).slider('option', 'values', ko.unwrap(options.values));
        }

        if ((typeof (ko.unwrap(options.valueMin)) != 'undefined') &&
            (typeof (ko.unwrap(options.valueMax)) != 'undefined')) {
            var values = [ko.unwrap(options.valueMin), ko.unwrap(options.valueMax)];
            values[0] = Math.max(values[0], $(element).slider('option', 'min'));
            values[1] = Math.min(values[1], $(element).slider('option', 'max'));
            if (values[1] < values[0]) {
                values[1] = values[0];
            }

            $(element).slider('option', 'values', values);
        }

        if (typeof (ko.unwrap(options.value)) != 'undefined') {
            var newValue = ko.unwrap(options.value);
            if (isNaN(newValue)) {
                newValue = $(element).slider('option', 'min');
            }

            $(element).slider('value', newValue);
        }
    }
};