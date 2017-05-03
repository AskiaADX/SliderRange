(function () {
    var currentInstanceId,
        currentInstance,
        optionsSliderCreation,
        numbers;
    var sliderConfig = {};
    
    function sliderCreation() {
        if (optionsSliderCreation.end % 1 != 0 && optionsSliderCreation.mark != ".") {
            var endStr = optionsSliderCreation.end.toString();
            endStr = endStr.replace(".", optionsSliderCreation.mark);
            optionsSliderCreation.end = endStr;
        }
        
        if (optionsSliderCreation.start % 1 != 0 && optionsSliderCreation.mark != ".") {
            var startStr = optionsSliderCreation.start.toString();
            startStr = startStr.replace(".", optionsSliderCreation.mark);
            optionsSliderCreation.start = startStr;
        }
        
       
        noUiSlider.create(currentInstance, {
            start		: [optionsSliderCreation.start, optionsSliderCreation.end],
            step		: optionsSliderCreation.step,
            margin		: optionsSliderCreation.margin,
            direction	: optionsSliderCreation.direction,
            orientation	: optionsSliderCreation.orientation,
            behaviour	: 'tap-drag',
            animate		: true,
            animationDuration : 300,
            connect		: true,
            tooltips	: optionsSliderCreation.tooltips,
            range		: {
                'min'		: optionsSliderCreation.min,
                'max'		: optionsSliderCreation.max
            },
            pips: {
                mode		: 'steps',
                density		: optionsSliderCreation.density,
                format 		: wNumb({
                    decimals 	: optionsSliderCreation.decimals,
                    thousand 	: optionsSliderCreation.thousand,
                    mark		: optionsSliderCreation.mark,
                    prefix		: optionsSliderCreation.prefix,
                    postfix		: optionsSliderCreation.postfix,
                    negative	: optionsSliderCreation.negative
                })
            },
            format 		: wNumb({
                decimals 	: optionsSliderCreation.decimals,
                thousand 	: optionsSliderCreation.thousand,
                mark		: optionsSliderCreation.mark,
                prefix		: optionsSliderCreation.prefix,
                postfix		: optionsSliderCreation.postfix,
                negative	: optionsSliderCreation.negative
            }),
            instanceId	: currentInstanceId
        });
        currentInstance.style.height = optionsSliderCreation.height;
        if (optionsSliderCreation.orientation === "vertical") {
            currentInstance.style.maxWidth = optionsSliderCreation.width;
            currentInstance.style.width = "100%";
        }
    }; 
    
    function getNumber(instanceId, value) {
        return sliderConfig[instanceId].elements.noUiSlider.options.format.from(value);
    }
    
    function stateOn(instanceId) {
        var bar = sliderConfig[instanceId].elements.bar;
        var tooltip = sliderConfig[instanceId].elements.tooltip;
        bar.classList.add('stateOn');
        for (var i = 0, l = tooltip.length; i < l; i++) {
            tooltip[i].style.display = "block";
        }
        bar.classList.remove('stateOff');
    }
    
    function stateOff(instanceId) {
        var bar = sliderConfig[instanceId].elements.bar;
        var tooltip = sliderConfig[instanceId].elements.tooltip;
        bar.classList.add('stateOff');
        for (var i = 0, l = tooltip.length; i < l; i++) {
            tooltip[i].style.display = "none";
        }
        bar.classList.remove('stateOn');
    }
    
    function uncheck(instanceId) {
        var inputs = sliderConfig[instanceId].elements.inputs;
        var exclus = sliderConfig[instanceId].elements.inputExclu;
        var nbrs = sliderConfig[instanceId].elements.numbers;
        var excluButton = sliderConfig[instanceId].elements.exclusives;
        
        for (var i = 0, l = excluButton.length; i < l; i++) {
            excluButton[i].classList.remove('selected');
        }
        for (var i = 0, l = inputs.length; i < l; i++) {
            inputs[i].checked = false;
        }
        for (var i = 0, l = exclus.length; i < l; i++) {
            exclus[i].checked = false;
        }
        for (var i = 0, l = nbrs.length; i < l; i++) {
            nbrs[i].classList.remove("currentNumber");
        }

    }
    
    function allNull(instanceId) {
        var inputs = sliderConfig[instanceId].elements.inputs;
        var nbrs = sliderConfig[instanceId].elements.numbers;

        for (var i = 0, l = inputs.length; i < l; i++) {
            if (inputs[i].type !== "button") {
                inputs[i].value = null;
            }
        }
        for (var i = 0, l = nbrs.length; i < l; i++) {
            if (!nbrs[i]) {
                alert("Warning : the step value doesn't take care of max and min value");
                return;
            }
            nbrs[i].classList.remove("currentNumber");
        }
    }
    
    function checkMultiples(instanceId) {
        var inputs = sliderConfig[instanceId].elements.inputs;
        var nbrs = sliderConfig[instanceId].elements.numbers;
        stateOn(instanceId);
        uncheck(instanceId);
        
        var step = sliderConfig[instanceId].step;
        var pos = sliderConfig[instanceId].elements.noUiSlider.get();
        var pos1 = getNumber(instanceId, pos[0]);
        var pos2 = getNumber(instanceId, pos[1]);

        var pos1Ready = true;
        for (var i = 0, l= nbrs.length; i < l; i++) {
            var number = parseFloat(getNumber(instanceId, nbrs[i].textContent));
            if (pos1 === number && pos1Ready) {
                pos1 = i;
                pos1Ready = false;
            }
            if (pos2 === number) {
                pos2 = i;
                break;
            }
        }

        nbrs[pos1].classList.add("currentNumber");
        nbrs[pos2].classList.add("currentNumber");
        inputs[pos1].checked = true;
        inputs[pos2].checked = true;
        if (window.askia 
            && window.arrLiveRoutingShortcut 
            && window.arrLiveRoutingShortcut.length > 0
            && window.arrLiveRoutingShortcut.indexOf(sliderConfig[instanceId].currentQuestion) >= 0) {
            askia.triggerAnswer();
        }
    }
    
    function checkNumeric(instanceId) {
        var inputs = sliderConfig[instanceId].elements.inputs;
        var nbrs = sliderConfig[instanceId].elements.numbers;

        allNull(instanceId);
        stateOn(instanceId);
        var pos = sliderConfig[instanceId].elements.noUiSlider.get();
        var pos1 = getNumber(instanceId, pos[0]);
        var pos2 = getNumber(instanceId, pos[1]);
       
        inputs[0].value = pos1;
        inputs[1].value = pos2;

        var pos1Ready = true;
        for (var i = 0, l= nbrs.length; i < l; i++) {
            var number = parseFloat(getNumber(instanceId, nbrs[i].textContent));
            if (pos1 === number && pos1Ready) {
                pos1 = i;
                pos1Ready = false;
            }
            if (pos2 === number) {
                pos2 = i; 
                break;
            }
        }
        nbrs[pos1].classList.add("currentNumber");
        nbrs[pos2].classList.add("currentNumber");
        if (window.askia 
            && window.arrLiveRoutingShortcut 
            && window.arrLiveRoutingShortcut.length > 0
            && window.arrLiveRoutingShortcut.indexOf(sliderConfig[instanceId].currentQuestion) >= 0) {
            askia.triggerAnswer();
        }
    }
    
    function exclusivesMultiples(exclusive, instanceId) {
        sliderConfig[instanceId].elements.noUiSlider.set([sliderConfig[instanceId].start, sliderConfig[instanceId].end]);
        stateOff(instanceId);
        uncheck(instanceId);
        for (var i = 0, l = sliderConfig[instanceId].elements.exclusives.length; i < l; i++) {
            if (sliderConfig[instanceId].elements.exclusives[i] === exclusive) {
                sliderConfig[instanceId].elements.inputExclu[i].checked = true;
                if (window.askia 
                    && window.arrLiveRoutingShortcut 
                    && window.arrLiveRoutingShortcut.length > 0
                    && window.arrLiveRoutingShortcut.indexOf(sliderConfig[instanceId].currentQuestion) >= 0) {
                    askia.triggerAnswer();
                }
                return;
            }
        }
    }
    
    function init() {
        var handles = currentInstance.getElementsByClassName('noUi-handle');
        if (optionsSliderCreation.orientation === "horizontal" && sliderConfig[currentInstanceId].height.replace(/\D/g, "") > 20) {
            for (var i = 0, l = handles.length; i < l; i++) {
                var newHeight = parseInt(sliderConfig[currentInstanceId].height.replace(/\D/g, "")) + 10;
                handles[i].style.maxHeight = newHeight + "px";
                handles[i].style.height = "115%";
            }
        } else if (optionsSliderCreation.orientation === "vertical" && sliderConfig[currentInstanceId].width.replace(/\D/g, "") > 20) {
            for (var i = 0, l = handles.length; i < l; i++) {
                var newWidth = parseInt(sliderConfig[currentInstanceId].width.replace(/\D/g, "")) + 10;
                handles[i].style.maxWidth = newWidth + "px";
                handles[i].style.width = "110%";
            }
        }
        numbers = Array.prototype.slice.call(currentInstance.querySelectorAll('.noUi-value-sub'));
        var startAndEnd = currentInstance.querySelectorAll('.noUi-value-large');
        numbers.unshift(startAndEnd[0]);
        numbers.push(startAndEnd[1]);
        sliderConfig[currentInstanceId].elements.numbers = numbers;
        
        //currentInstance.noUiSlider.on('update', function() {
        //    var instanceId = this.options.instanceId;
        //    if (sliderConfig[instanceId].questionType === "multiple") {
        //        checkMultiples(instanceId);
        //    } else if (sliderConfig[instanceId].questionType === "numeric") {
        //        checkNumeric(instanceId)
        //    }
        //});

        //currentInstance.noUiSlider.on('end', function() {
        //    var instanceId = this.options.instanceId;
        //    if (sliderConfig[instanceId].questionType === "multiple") {
        //        checkMultiples(instanceId);
        //    } else if (sliderConfig[instanceId].questionType === "numeric") {
        //        checkNumeric(instanceId);
        //    }
        //});

        currentInstance.noUiSlider.on('change', function() {
            var instanceId = this.options.instanceId;
            if (sliderConfig[instanceId].questionType === "multiple") {
                checkMultiples(instanceId);
            } else if (sliderConfig[instanceId].questionType === "numeric") {
                checkNumeric(instanceId);
            }
        });

        if (optionsSliderCreation.questionType === "multiple") {
            var exclusives = sliderConfig[currentInstanceId].elements.exclusives;
            for (var i = 0, l = exclusives.length; i < l; i++) {
                exclusives[i].instanceId = currentInstanceId;
                exclusives[i].addEventListener('click', function() {
                    exclusivesMultiples(this, this.instanceId);
                    this.classList.add('selected');
                });
            }
        }

        var higher;
        var container = document.getElementById('labelsTop-' + currentInstanceId);
        var container2 = document.getElementById('labelsBottom-' + currentInstanceId);
        if (sliderConfig[currentInstanceId].orientation === "horizontal") {
            var labelArray = sliderConfig[currentInstanceId].topLabelArray.split(',');
            var labelPos = sliderConfig[currentInstanceId].topLabelPosition.split(',');
            if (labelPos.length === labelArray.length && (labelPos[0] !== "" || labelArray[0] !== "")) {
                var wrapper = document.createElement('div');
                wrapper.classList.add('top-label');
                wrapper.id = "top-label-" + currentInstanceId;

                var toAdd;
                if (sliderConfig[currentInstanceId].labelPosition === "top") {
                    toAdd = 25 + (parseInt(sliderConfig[currentInstanceId].padding) * 2);    
                } else {
                    toAdd = parseInt(container.offsetHeight) - 15;    
                }
                                                
                for (var i = 0, l = labelArray.length; i < l; i++) {
                    var pip = document.createElement('span');
                    pip.classList.add('pips');
                    pip.style.left = labelPos[i] + "%";
                    pip.style.marginTop = toAdd + "px";
                    wrapper.appendChild(pip);

                    var span = document.createElement('span');
                    span.innerHTML = "<span>" + labelArray[i] + "</span>";
                    span.classList.add('topLabel');
                    span.style.left = labelPos[i] + "%";
                    wrapper.appendChild(span);
                }
                container.appendChild(wrapper);
                var labels = container.querySelectorAll('#adc_' + currentInstanceId + ' .topLabel');
                for (var i = 0, l = labels.length; i < l; i++) {
                    labels[i].style.marginLeft = - labels[i].offsetWidth / 2 + "px";
                    labels[i].style.marginTop = toAdd - labels[i].offsetHeight + "px";
                    if (!higher || labels[i].offsetHeight > higher) {
                        higher = labels[i].offsetHeight;
                    }
                }
            }
        }

        var start = document.createElement('label');
        start.textContent = sliderConfig[currentInstanceId].startContent;
        start.classList.add('startAndEnd');
        start.classList.add('startAndEnd-' + currentInstanceId);
        start.id = "adc-slider-range-start";

        if (optionsSliderCreation.orientation === "horizontal" && optionsSliderCreation.labelPosition === "top") {
            container.appendChild(start);
        }
        else {
            container2.appendChild(start);
        }

        var end = document.createElement('label');
        end.textContent = sliderConfig[currentInstanceId].endContent;
        end.classList.add('startAndEnd');
        end.classList.add('startAndEnd-' + currentInstanceId);
        end.id = "adc-slider-range-end";

        if (optionsSliderCreation.orientation === "horizontal" && optionsSliderCreation.labelPosition === "top") {
            container.appendChild(end);
        }
        else {
            container2.appendChild(end);
        }

        if (!sliderConfig[currentInstanceId].endContent || !sliderConfig[currentInstanceId].startContent) {
            end.style.display = "none";
            start.style.display = "none";
        }
        
        var startAndEnd = document.querySelectorAll('.startAndEnd-' + currentInstanceId);
        var start = startAndEnd[0];
        var end = startAndEnd[1];
        var height = currentInstance.style.height.replace(/\D/g, "");
        var toAdd = (start.offsetHeight > end.offsetHeight) ?start.offsetHeight : end.offsetHeight;

        if (optionsSliderCreation.orientation === "horizontal") {
            switch (optionsSliderCreation.labelPosition) {
                case "top" :
                    var topLabelsContainer = document.getElementById('top-label-' + currentInstanceId);
                    toAdd += parseInt(sliderConfig[currentInstanceId].padding) * 2;
                    container.style.height = 60 + toAdd + "px";
                    if (topLabelsContainer) {
                        topLabelsContainer.style.position = "absolute";
                        topLabelsContainer.style.marginTop = parseInt(container.style.height) - higher - 15 + "px";
                    }
                    start.style.marginLeft = "0";
                    end.style.marginTop = - 10 - start.offsetHeight + "px";
                    end.style.marginRight = "0";
                    break;
                case "bottom" :
                    container2.style.marginTop = "50px";
                    start.style.marginLeft = "0";
                    end.style.marginRight = "0";
                    end.style.marginTop = - 10 - start.offsetHeight + "px";
                    if (optionsSliderCreation.questionType === "multiple") {
                        document.querySelector('#container-' + currentInstanceId).style.marginTop = 10 + toAdd + "px";
                    }
                    break;
                case "side" :
                    document.querySelector('#slider-container-' + currentInstanceId).style.maxWidth = 50 + end.offsetWidth + start.offsetWidth + parseInt(optionsSliderCreation.width) + "px";
                    start.style.marginTop = - currentInstance.offsetHeight / 2 - start.offsetHeight / 2 + "px";
                    end.style.marginTop = - 10 - start.offsetHeight + "px";
                    start.style.marginLeft = 0;
                    end.style.marginRight = 0;
                    if (container2.offsetWidth - (50 + end.offsetWidth + start.offsetWidth) <= parseInt(optionsSliderCreation.width) && !end.classList.contains('top')) {
                        document.querySelector('#sliderRange-' + currentInstanceId).style.maxWidth = container2.offsetWidth - (50 + end.offsetWidth + start.offsetWidth) + "px";
                        document.querySelector('#labelsTop-' + currentInstanceId).style.maxWidth = container2.offsetWidth - (50 + end.offsetWidth + start.offsetWidth) + "px";
                    }
                    break;
            }
        } else if (optionsSliderCreation.orientation === "vertical") {
            end.style.left = "50%";
            start.style.left = "50%";
            
            start.style.marginTop = - 30 - start.offsetHeight - parseInt(optionsSliderCreation.height) + "px";
            end.style.marginTop = 50 - parseInt(start.style.marginTop) + "px";
            end.style.marginLeft = - end.offsetWidth / 2 + "px";
            start.style.marginLeft = - start.offsetWidth / 2 + "px";
            
            if (optionsSliderCreation.questionType === "multiple") {
                document.querySelector('#container-' + currentInstanceId).style.marginTop = parseInt(end.style.marginTop) + end.offsetHeight + 50 + "px";
            }
        }
        
        stateOff(currentInstanceId);
        if (optionsSliderCreation.questionType === "multiple") {
            uncheck(currentInstanceId);
        } else if (optionsSliderCreation.questionType === "numeric") {
            allNull(currentInstanceId);
        }

        var endTop = parseInt(end.style.marginTop);
        function resize (){
            for (var instanceId in sliderConfig) {
                if (sliderConfig[instanceId].orientation === "vertical") {
                    continue;
                }
                if (window.innerWidth <= parseInt(sliderConfig[instanceId].scaleRemote)) {
                    var scale = sliderConfig[instanceId].instance.querySelector('.noUi-pips');
                    scale.style.display = "none";
                } else if (window.innerWidth >= parseInt(sliderConfig[instanceId].scaleRemote)) {
                    var scale = sliderConfig[instanceId].instance.querySelector('.noUi-pips');
                    scale.style.display = "";
                }
                var startAndEndWidth = start.offsetWidth + end.offsetWidth + 20;
                var verify = container2.offsetWidth - (50 + end.offsetWidth + start.offsetWidth);
                
                if (sliderConfig[instanceId].labelPosition === "side" && sliderConfig[instanceId].instance.offsetWidth <= sliderConfig[instanceId].responsiveWidth) {
                    if (!higher) {
                        higher = 0;
                    }
                    start.style.marginTop = - higher - container.offsetHeight - currentInstance.offsetHeight - start.offsetHeight + "px";
                    if (sliderConfig[instanceId].questionType === "multiple") {
                        document.querySelector('#container-' + currentInstanceId).style.marginTop = 35 + container.offsetHeight + currentInstance.offsetHeight + start.offsetHeight + "px";
                    }
                    document.querySelector('#sliderRange-' + currentInstanceId).style.maxWidth = "";
                    document.querySelector('#labelsTop-' + currentInstanceId).style.maxWidth = "";
                    end.style.marginTop = - 10 - start.offsetHeight + "px";
                    end.classList.add('top');
                } else if (sliderConfig[instanceId].labelPosition === "side" && verify > sliderConfig[instanceId].responsiveWidth) {
                    if (sliderConfig[instanceId].questionType === "multiple") {
                        document.querySelector('#container-' + currentInstanceId).style.marginTop = 50 + "px";
                    }
                    start.style.marginTop = - currentInstance.offsetHeight / 2 - start.offsetHeight / 2 + "px";
                    end.style.marginTop = - 10 - start.offsetHeight + "px";
                    end.classList.remove('top');
                }
                
                if (window.innerWidth <= startAndEndWidth) {
                    if (sliderConfig[instanceId].labelPosition === "bottom") {
                        end.style.marginTop = endTop + start.offsetHeight + "px";
                        if (sliderConfig[instanceId].questionType === "multiple") {
                            document.querySelector('#container-' + currentInstanceId).style.marginTop = 10 + start.offsetHeight + end.offsetHeight + "px";
                        }
                    } else if (sliderConfig[instanceId].labelPosition === "top") {
                        end.style.marginTop = endTop - start.offsetHeight + "px";
                    } else {
                        start.style.marginTop = - 10 - container.offsetHeight - currentInstance.offsetHeight - start.offsetHeight + "px";
                        if (sliderConfig[instanceId].questionType === "multiple") {
                            document.querySelector('#container-' + currentInstanceId).style.marginTop = 10 + container.offsetHeight + currentInstance.offsetHeight + start.offsetHeight + "px";
                        }
                        end.style.marginTop = - 10 - start.offsetHeight * 2 + "px";
                        end.style.marginRight = "0";
                        start.style.marginLeft = "0";
                    }
                } else if (window.innerWidth > startAndEndWidth) {
                    if (sliderConfig[instanceId].labelPosition !== "side") {
                        end.style.marginTop = endTop + "px";
                    }
                    if (sliderConfig[instanceId].labelPosition === "bottom" && sliderConfig[instanceId].questionType === "multiple") {
                        document.querySelector('#container-' + currentInstanceId).style.marginTop = 10 + toAdd + "px";
                    }
                    if (sliderConfig[instanceId].labelPosition === "side") {
                        end.style.marginTop = - 10 - start.offsetHeight + "px";
                        if (container2.offsetWidth - (50 + end.offsetWidth + start.offsetWidth) <= parseInt(sliderConfig[instanceId].width) && !end.classList.contains('top')) {
                            document.querySelector('#sliderRange-' + currentInstanceId).style.maxWidth = container2.offsetWidth - (50 + end.offsetWidth + start.offsetWidth) + "px";
                            document.querySelector('#labelsTop-' + currentInstanceId).style.maxWidth = container2.offsetWidth - (50 + end.offsetWidth + start.offsetWidth) + "px";
                        }
                    }
                }
            }
        };
        window.onresize = resize;
        window.onload = resize;
        
        if (sliderConfig.instanceId > 1) {
            currentInstance.style.marginTop = 100 + "px";
        }
        
        if (optionsSliderCreation.questionType === "multiple") {
            var inputs = sliderConfig[currentInstanceId].elements.inputs;
            var checked = document.querySelectorAll(".selected-" + currentInstanceId);
            if (checked.length === 2) {
                var input1;
                var input2;

                for (var i = 0, l = inputs.length; i < l; i++) {
                    for (var k = 0; k < 2; k++) {
                        if (inputs[i] === checked[k] && (!input1 && input1 !== 0)) {
                            input1 = i;
                        } else if (inputs[i] === checked[k] && !input2) {
                            input2 = i;
                        }
                    }
                }
                currentInstance.noUiSlider.set([getNumber(currentInstanceId, sliderConfig[currentInstanceId].elements.numbers[input1].innerHTML), getNumber(currentInstanceId, sliderConfig[currentInstanceId].elements.numbers[input2].innerHTML)]);
                checkMultiples(currentInstanceId);
            } else if (checked.length === 1) {
                var inputs = sliderConfig[currentInstanceId].elements.inputExclu;
                var input;

                for (var i = 0, l = inputs.length; i < l; i++) {
                    if (inputs[i] === checked[0]) {
                        input = i;
                    }
                }
                var exclu = sliderConfig[currentInstanceId].elements.exclusives[input];
                
                exclusivesMultiples(exclu, exclu.instanceId);
                exclu.classList.add('selected');
            } else {
                return;
            }
        } else if (optionsSliderCreation.questionType === "numeric") {
            var inputs = sliderConfig[currentInstanceId].elements.inputs;
            var selected = document.querySelectorAll('input[value][type="number"]:not([value=""]');
            if (!selected.length) {
                return;
            }
            var toUse = [];
            if (selected.length !== 2 && selected.length > 2) {
                for (var i = 0, l = selected.length; i < l; i++) {
                    if (selected[i].classList.contains('input-slider-' + currentInstanceId)) {
                        toUse.push(selected[i]);
                    }
                }
            }
            if (selected.length === 2) {
                toUse = selected;
            }
            if (toUse.length !== 2) {
                return;
            }
            
            currentInstance.noUiSlider.set([toUse[0].defaultValue, toUse[1].defaultValue]);
            checkNumeric(currentInstanceId);
        }
    };
    
    
    window.slider = function(options) {
        currentInstanceId = options.instanceId;
        currentInstance = document.getElementById('sliderRange-' + currentInstanceId);
        
        var pipsNumber = (options.max - options.min) / options.step;
        pipsNumber += 1;
        var startPercent = parseInt(options.start);
        var endPercent = parseInt(options.end);
        options.start = parseInt(pipsNumber * (startPercent / 100));
        options.end = parseInt(pipsNumber * (endPercent / 100));
        options.start = options.min + options.start * options.step;
        options.end = options.min + options.end * options.step;

        if (options.start < options.min) {
            options.start = options.min;
        }

        sliderConfig[currentInstanceId] = {
            decimals 		: options.decimals || 0,
            density			: options.density || 1,
            direction		: options.direction || "ltr",
            elements 		: {
                bar 		: null,
                exclusives 	: null,
                inputs 		: null,
                inputExclu 	: null,
                noUiSlider 	: null,
                numbers		: null,
                tooltip 	: null
            },
            end   			: options.end || 66,
            endContent		: options.endContent || '',
            excluPosition	: options.excluPosition || "center",
            height			: options.height,
            instance		: currentInstance,
            instanceId		: currentInstanceId,
            labelPosition	: options.labelPosition,
            margin 			: options.margin || 0,
            mark			: options.mark || ",",
            max				: (!isNaN(options.max))? options.max : 100,
            min				: options.min || 0,
            negative		: options.negative || "-",
            orientation		: options.orientation || "horizontal",
            padding			: options.padding,
            postfix			: options.postfix || "",
            prefix			: options.prefix || "",
            questionType	: options.questionType,
            responsiveWidth : options.responsiveWidth,
            scaleRemote 	: options.scaleRemote || 500,
            start			: options.start || 33,
            startContent	: options.startContent || '',
            step			: options.step || 1,
            thousand 		: options.thousand || " ",
            tooltips 		: !(!options.tooltips),
            topLabelArray	: options.topLabelArray || "",
            topLabelPosition: options.topLabelPosition || "",
            width			: options.width,
            currentQuestion: options.currentQuestion || ""
        }
        
        if (options.questionType === "multiple") {
            var excluContainer = document.getElementById("container-" + currentInstanceId);
            sliderConfig[currentInstanceId].elements.inputExclu = excluContainer.getElementsByClassName('input-exclusive');
            sliderConfig[currentInstanceId].elements.exclusives = excluContainer.getElementsByClassName('exclusive');
        }
        
        optionsSliderCreation = sliderConfig[currentInstanceId];
        sliderCreation();

        sliderConfig[currentInstanceId].elements.bar = currentInstance.getElementsByClassName('noUi-connect')[0];
        sliderConfig[currentInstanceId].elements.tooltip = currentInstance.getElementsByClassName('noUi-tooltip');
        sliderConfig[currentInstanceId].elements.inputs = document.getElementsByClassName('input-slider-' + currentInstanceId);
        sliderConfig[currentInstanceId].elements.noUiSlider = currentInstance.noUiSlider;
        init();
    }
})();