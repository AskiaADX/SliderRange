{% If CurrentQuestion.Type = "numeric" Then %}
    {%:= CurrentADC.GetContent("dynamic/numeric.js").ToText() %}
{% ElseIf CurrentQuestion.Type = "multiple" Then %}
    {%:= CurrentADC.GetContent("dynamic/multiple.js").ToText() %}
{% EndIf %}