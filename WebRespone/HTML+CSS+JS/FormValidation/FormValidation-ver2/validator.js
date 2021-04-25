function Validator(formSelector) {
    var formRules = {};
    var _this = this;

    function getParent(element, selector) {
        return element.closest(selector);
    }

    // Định nghĩa các func rule
    var validatorRules = {
        required: function (inputValue) {
            return inputValue ? undefined : 'Vui lòng nhập trường này';
        },
        email: function (inputValue) {
            var mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            return mailFormat.test(inputValue) ? undefined : 'Địa chỉ email không hợp lệ!';
        },
        min: function (min) {
            return function (inputValue) {
                return inputValue.length >= min ? undefined : `Độ dài tối thiểu ${min} kí tự!`;
            }
        },
        max: function (max) {
            return function (inputValue) {
                return inputValue.length <= max ? undefined : `Độ dài tối đa ${max} kí tự!`;
            }
        },
    }

    // Lấy ra form cần validate
    var formElement = document.querySelector(formSelector)

    // Xử lý khi tìm thấy formElemnt
    if (formElement) {
        // Lấy ra các input bên file HTML cần rules
        var inputs = formElement.querySelectorAll('input[name][rules]');
        for (var input of inputs) {

            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {
                var ruleInfo;
                var isRuleHasValue = rule.includes(':');
                if (isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }

                var ruleFunc = validatorRules[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1])
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc)
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            // Lắng nghe sự kiện để validate (blur, input,change,...)

            input.onblur = handleValidate;
            input.oninput = handleClearError;
            input.onclick = handleClearError;
        }

        //Hàm kiểm tra input có đang bị lỗi không?
        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;

            for (var rule of rules) {
                errorMessage = rule(event.target.value);
                if (errorMessage) break;
            }

            // Nếu có lỗi thì in error mess ra màn hình
            if (errorMessage) {
                var formGroup = getParent(event.target, '.form-group')

                if (formGroup) {
                    formGroup.classList.add('invalid');
                    var formMessage = formGroup.querySelector('.form-message')
                    if (formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }
            return !errorMessage;
        }

        // Hàm clear mess lỗi
        function handleClearError(event) {
            var formGroup = getParent(event.target, '.form-group')

            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');

                var formMessage = formGroup.querySelector('.form-message')
                if (formMessage) {
                    formMessage.innerText = '';
                }
            }
        }

    } else {
        console.log('formSelector không tốn tại');
    }

    // Xử lý hành vi submit form
    formElement.onsubmit = function(event) {
        event.preventDefault();
        var isValid = true;
        var inputs = formElement.querySelectorAll('input[name][rules]');

        // Validate tất cả input. Nếu có lỗi => thông báo lỗi
        for (var input of inputs) {
            if (!handleValidate({ target: input })) {
                isValid = false;
            }
        }

        // Nếu tất cả input hợp lệ
        if (isValid) {
            // Nếu có func Submit truyền vào
            if (typeof _this.onSubmit === 'function') {
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

                _this.onSubmit(formValues);
            } else {
                formElement.submit();
            }
        } else {
            // Không làm gì cả
        }
    }
}