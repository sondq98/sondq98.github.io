
// Đối tượng Validator
function Validator(options) {

    // Lấy form element cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        var selectorRules = {};

        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            // Biến kiểm tra tất cả input hợp lệ hay chưa.
            var flagValid = true;

            // Validate các rule, nếu có ít nhất 1 rule không thỏa mãn, flagValid = false.
            options.rules.forEach((optionRule) => {
                var inputElement = formElement.querySelector(optionRule.selector);
                var isValid = validate(inputElement, optionRule);
                if (!isValid) {
                    flagValid = false;
                }
            })

            // Nếu tất cả input hợp lệ:
            // 1. Nếu có submit func trong options, dùng submit func đó
            // 2. Nếu không có submit func truyền vào, dùng submit mặc định
            if (flagValid) {

                // Trường hợp submit bằng Js
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]:not([disable])');

                    var formValues = Array.from(enableInputs).reduce(function (output, currentInput) {
                        switch (currentInput.type) {
                            case 'checkbox':
                                if (!currentInput.matches(':checked')) {
                                    output[currentInput.name] = '';
                                    return output
                                }
                                if (!Array.isArray(output[currentInput.name])) {
                                    output[currentInput.name] = [];
                                }
                                output[currentInput.name].push(currentInput.value)
                                break;

                            case 'radio':
                                output[currentInput.name] = formElement.querySelector('input[name="' + currentInput.name + '"]:checked').value;
                                break;

                            case 'file':
                                output[currentInput.name] = currentInput.files;
                                break;

                            default:
                                output[currentInput.name] = currentInput.value;
                        }

                        return output;
                    }, {});

                    // var formValues = {};
                    // enableInputs.forEach((input) => {
                    //     formValues[input.name] = input.value;
                    // })
                    options.onSubmit(formValues);
                }
                // Trường hợp submit mặc định
                else {
                    formElement.submit();
                }
            }
        }

        // Lặp qua mỗi rule và xử lý listener (blur, input,...)
        options.rules.forEach(optionRule => {

            // Thêm các bộ key:value của các rule vào đối tượng selectorRules
            if (selectorRules[optionRule.selector] === undefined) {
                selectorRules[optionRule.selector] = [optionRule.test];
            } else {
                selectorRules[optionRule.selector].push(optionRule.test);
            }

            // Lấy ra cac element trong rule
            var inputElements = formElement.querySelectorAll(optionRule.selector)

            // Thêm các listener cho element được chọn
            inputElements.forEach(function (inputElement) {
                // Thêm hành vi cho sự kiện blur (thực hiện hàm validate)
                inputElement.onblur = function () {
                    validate(inputElement, optionRule);
                }

                // Thêm hành vi cho sự kiện oninput (nếu người dùng bắt đầu nhập thì xóa đi error message)
                inputElement.oninput = function () {
                    var errorElement = getFormGroup(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getFormGroup(inputElement, options.formGroupSelector).classList.remove('invalid')
                }
            })
        });


    }

    // Hàm thực hiện validate (Kiểm tra input hợp lệ hay chưa, nếu chưa thì trả ra mess)
    function validate(inputElement, optionRule) {
        var errorElement = getFormGroup(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra mảng rules là value của key 'rule.selector' trong object selectorRules
        var rules = selectorRules[optionRule.selector];

        // Gọi hàm xử lý từng rule trong các rules

        for (let rule of rules) {
            switch (inputElement.type) {
                case 'checkbox':
                    errorMessage = rule(formElement.querySelector(optionRule.selector + ':checked'));
                    break;
                case 'radio':
                    errorMessage = rule(formElement.querySelector(optionRule.selector + ':checked'));
                    break;
                default:
                    errorMessage = rule(inputElement.value);
            }
            if (errorMessage) break;
        }

        // Nếu có lỗi, in ra thông báo lỗi. Nếu không còn lỗi, xóa thông báo lỗi khỏi màn hình
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getFormGroup(inputElement, options.formGroupSelector).classList.add('invalid')
        } else {
            errorElement.innerText = '';
            getFormGroup(inputElement, options.formGroupSelector).classList.remove('invalid')
        }

        // If có lỗi, return false, if không có lỗi, return true
        return !errorMessage
    }

    //  Hàm lấy ra đối tượng form-group 
    function getFormGroup(element, selector) {
        return element.closest(selector);
    }
}


// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (inputValue) {
            return inputValue ? undefined : message || 'Vui lòng nhập trường này';
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (inputValue) {
            var mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            return mailFormat.test(inputValue) ? undefined : message || 'Địa chỉ email không hợp lệ!';
        }
    }
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (inputValue) {
            return inputValue.length >= min ? undefined : message || `Độ dài tối thiểu ${min} kí tự!`;
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (inputValue) {
            return inputValue === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}