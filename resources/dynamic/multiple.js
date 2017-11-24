{%
Dim i
Dim lastValue = 0
Dim rs = CurrentQuestion.AvailableResponses
For i = 1 To rs.count
    If Not(rs[i].IsExclusive) Then
        lastValue = lastValue + 1
    EndIf
Next
' Dim minVal = rs[1].Caption.ToNumber()
' Dim maxVal = rs[lastValue].Caption.ToNumber()
Dim minVal = 1
Dim maxVal = lastValue
Dim stepVal = maxVal - minVal
stepVal = stepVal / (lastValue - 1)
%}

slider({
    ismulti	: 1,
    start			: '{%:= CurrentADC.PropValue("start_value") %}',
    end   			: '{%:= CurrentADC.PropValue("end_value") %}',
    min				: {%= minVal %},
    max				: {%= maxVal %},
    step			: {%= stepVal %},
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
    negative		: '{%:= CurrentADC.PropValue("negatives_numbers") %}',
    height			: '{%= CurrentADC.PropValue("slider_height") %}',
    width			: '{%= CurrentADC.PropValue("slider_width") %}',
    scaleRemote 	: '{%= CurrentADC.PropValue("scale_max_width") %}',
    labelPosition	: '{%= CurrentADC.PropValue("label_alignment") %}',
    questionType	: '{%= CurrentQuestion.Type %}',
    excluPosition	: '{%= CurrentADC.PropValue("exclu_alignment") %}',
    instanceId		: {%= CurrentADC.InstanceId %},
    topLabelArray 	: '{%:= CurrentADC.PropValue("top_label_array") %}',
    topLabelPosition: '{%= CurrentADC.PropValue("top_label_position") %}',
    padding			: '{%= CurrentADC.PropValue("sae_padding") %}',
    responsiveWidth : {%= CurrentADC.PropValue("responsive_width") %},
    currentQuestion: '{%:= CurrentQuestion.Shortcut %}',
    responsesValues:  [{% Dim j
		For j = 1 To lastValue
    %}"{%:= CurrentQuestion.Responses[j].Caption %}"{%:= On((j <> lastValue),",","") %}{% Next j %}]
});