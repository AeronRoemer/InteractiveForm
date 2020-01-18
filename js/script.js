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
// variables and regex variables for payment section
const payment = $('#payment');
const userName = $('#name');
const activitiesSelected = $('.activities')
const email = $('#mail');

const zipReg = /^[0-9]{5}$/;
const zipNum = $('#zip');

const cvvNum = $('#cvv');
const cvvReg = /^[0-9]{3,4}$/;

const ccReg = /^[0-9]{13,16}$/;
const ccNum = $('#cc-num');

const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let submit = false;

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


activitesInput.change(function(e){

    let dateTime = $(this).attr('data-day-and-time');
    //disables or enables conference activities based on competing choices. 
    activitesInput.each(function(index, activity){
        // if the target is checked, and the timeslot matches an unchecked timeslot, it will be disabled 
        if ($(e.target).is(':checked') && (dateTime === $(activity).attr('data-day-and-time') && $(activity).is(':not(:checked)')))
        {$(activity).prop('disabled', true)
     } else if (!$(e.target).is(':checked')){
            $(activity).prop('disabled', false);
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
        totalCost = 0;
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

//FUNCTIONS TO CHECK FOR VALID SUBMISSION BEHAVIOR
//checks to make sure areas contain information

function containsThings (input){
    if (input.val().length > 0){
        return true;
    } else if (!$('#length-err').length) {
        $(input).before('<span id="length-err" class="error">Please provide an entry</span>');
       submit = false;
    }
}

function boxesChecked (){
 if ($('input:checkbox:checked').length > 0){
    console.log('selections')
     return submit = true;
 } else if (!$('#select-err').length) {
    $('#cost').html('<span id="select-err" class="error">Please select at least one event</span>');
    submit = false;
 }
}


// regex validation for credit card and email
function creditValidation (){
    if (ccReg.test(ccNum.val()) && zipReg.test(zipNum.val()) && cvvReg.test(cvvNum.val())) {
        $('#cc-error').remove();
        console.log('okay');
        return submit = true;  
    } else if (!$('#cc-error').length){
        $('#credit-card').after('<span id="cc-error" class="error">Please provide a valid credit card entry</span><br>');
        console.log('not okay')
        return submit = false;
    }
}

function emailValidation (){
    if (emailReg.test(email.val())) {
        $('#email-error').remove();
        return submit = true;
    } else if(!$('#email-error').length){
        email.after('<span id="email-error" class="error">Please provide a valid entry</span><br>');
        submit = false;
    } 
}
//checks that credit card is selected and validates

function ccSelected(){
    if (payment.val() === "credit card" && creditValidation()){
       console.log('okay')
    }
}
//submit event listener 

$('#main-form').submit(function (e){
    e.preventDefault();
    if (containsThings(userName) && containsThings(email));
   creditValidation();
   emailValidation();
   boxesChecked();
   
});
