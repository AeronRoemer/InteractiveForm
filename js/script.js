//initial display changes made with jQuery.
//without these, site will dislay plain HTML design.
$('#name').focus();
$('#other-title').hide();
$('#color').children('option').hide();
$('#credit-card').hide();
$('#paypal').hide();
$('#bitcoin').hide();
// variables for activity section
const activitesInput = $('.activities input');
let totalCost = 0;
// variables for payment section
const payment = $('#payment');

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
activitesInput.change(function(){
    console.log($(this).attr('data-day-and-time'));

// I need to go over each timeslot and disable any conflicting activites
// I'm not sure quite what's wrong with this loop, or what syntax I'd have to use to get it right. 

    activitesInput.each(function(index, activity){
        const dateTime = index.attr('data-day-and-time');
        if ($(this).attr('data-day-and-time') === dateTime){
            console.log(activity, index);
        }
    });

    //total cost calculations 
    if ($(this).is(':checked')) {
    // adds to the total cost when checked
    totalCost += parseInt($(this).attr('data-cost'));
    } else if ($(this).is(':not(:checked)')){
    // subtracts when unchecked
        totalCost -= parseInt($(this).attr('data-cost'));
    }
    //displays cost total as it changes, or no cost if the user refreshes page and goes into the neagtive. 
    if (totalCost >= 0 ){
    $('#cost').html("<h2>Your total cost is: " +totalCost+ "</h2><br>");
    } else {
        $('#cost').html("<h2>Yout total cost will be displayed here</h2><br>");
    }

})

//payment methods hide-show function
payment.change(function(){
if (payment.val() === "credit card"){
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
} else if (payment.val() === "paypal"){
    $('#credit-card').hide();
    $('#paypal').show();
    $('#bitcoin').hide();
} else if (payment.val() === "bitcoin"){
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
}
});