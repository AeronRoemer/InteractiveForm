//initial display changes made with jQuery.
//without these, site will dislay plain HTML design.
$('#name').focus();
$('#other-title').hide();
$('#color').children('option').hide();
$('#color option[value=default]').attr("selected", "selected");


//displays & hides 'Other' textarea based on user choice of Job Title.
$('#title').change(function(){
    if ($(this).val() == 'other'){
     $('#other-title').show();
    } else if ($(this).val() !== 'other'){
    $('#other-title').hide();
    }
}
)

//displays and hides available colors based on user choice of design. 

$('#design').change(function(){
   if ($(this).val() == 'js puns'){
       $('#color').children('option').show(); //displays all
       $('#color option[value=cornflowerblue]').attr("selected", "selected"); //sets default option
       //hides unwanted
       $('#color option[value=steelblue]').hide();
       $('#color option[value=dimgrey]').hide();
       $('#color option[value=tomato]').hide();
    } else {
        $('#color').children('option').show(); //displays all
        $('#color option[value=steelblue]').attr("selected", "selected"); //sets default option
        //hides unwanted
        $('#color option[value=cornflowerblue]').hide();
        $('#color option[value=darkslategrey]').hide();
        $('#color option[value=gold]').hide();
       }
}
)