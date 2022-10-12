{%
Dim i
Dim rs = CurrentQuestion
Dim minVal = rs.MinValue
Dim maxVal = rs.MaxValue
%}

slider({
    ismulti	: 0,
    start			: '{%:= CurrentADC.PropValue("start_value") %}',
    end   			: '{%:= CurrentADC.PropValue("end_value") %}',
    min				: {%= minVal %},
    max				: {%= maxVal %},
    step			: {%= CurrentADC.PropValue("step_value") %},
    margin 			: {%= CurrentADC.PropValue("margin_value") %},
    tooltips 		: {%= CurrentADC.PropValue("tooltip") %},
    orientation		: '{%= CurrentADC.PropValue("orientation") %}',
    direction		: '{%= CurrentADC.PropValue("direction") %}',
    startContent	: '{%:= CurrentADC.PropValue("label_left") %}',
    endContent		: '{%:= CurrentADC.PropValue("label_right") %}',
    density			: {%= CurrentADC.PropValue("scale_density") %},
    decimals 		: {%= CurrentADC.PropValue("decimal_nbr") %},
    mark			: '{%:= CurrentADC.PropValue("decimal_separator") %}',
    thousand		: '{%:= CurrentADC.PropValue("thousand_separator") %}',
    prefix			: '{%:= CurrentADC.PropValue("prefix") %}',
    postfix			: '{%:= CurrentADC.PropValue("postfix") %}',
    height			: '{%= CurrentADC.PropValue("slider_height") %}',
    width			: '{%= CurrentADC.PropValue("slider_width") %}',
    scaleRemote 	: '{%= CurrentADC.PropValue("scale_max_width") %}',
    labelPosition	: '{%= CurrentADC.PropValue("label_alignment") %}',
    questionType	: '{%= CurrentQuestion.Type %}',
    instanceId		: {%= CurrentADC.InstanceId %},
    topLabelArray 	: '{%:= CurrentADC.PropValue("top_label_array") %}',
    topLabelPosition: '{%= CurrentADC.PropValue("top_label_position") %}',
    padding			: '{%= CurrentADC.PropValue("sae_padding") %}',
    responsiveWidth : {%= CurrentADC.PropValue("responsive_width") %},
    currentQuestion: '{%:= CurrentQuestion.Shortcut %}',
});
