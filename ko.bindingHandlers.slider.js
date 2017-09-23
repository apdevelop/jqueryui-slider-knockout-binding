ko.bindingHandlers.slider = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var sliderOptions = allBindingsAccessor().sliderOptions || {};

        // Main parameters has priority
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

        ko.utils.registerEventHandler(element, 'slidechange', function (event, ui) {
            var options = ko.unwrap(valueAccessor());

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
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).slider('destroy');
        });

        ko.utils.registerEventHandler(element, 'slide', function (event, ui) {
            var options = ko.unwrap(valueAccessor());

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