//initial display changes made with jQuery.
//without these, site will dislay plain HTML design.
$('#name').focus();
$('#other-title').hide();
$('#color').children('option').hide();
// variables for activity section
let totalCost = 0;

//displays & hides 'Other' textarea based on user choice of Job Title.
$('#title').change(function(){
    if ($(this).val() == 'other'){
     $('#other-title').show();
    } else if ($(this).val() !== 'other'){
    $('#other-title').hide();
    }
})

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
})

//displays or hides conference activities based on competing choices. 
$('.activities input').change(function(){

    //total cost calculations 
    if ($(this).is(':checked')) {
    // adds to the total cost when checked
    totalCost += parseInt($(this).attr('data-cost'));
    console.log(totalCost);
    } else if ($(this).is(':not(:checked)')){
    // subtracts when unchecked
        totalCost -= parseInt($(this).attr('data-cost'));
        console.log(totalCost);  
    }
    //displays cost total as it changes
    $('#cost').html("<h2>Your total cost is: " +totalCost+ "</h2><br>");
})
