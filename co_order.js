"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Order Form Script
   
   Author: Alexa
   Date:   1/16/2020
   
   Filename: co_order.js
   
   Function List
   =============
   
   calcOrder()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/

//event listener for the page load that triggers an anonymous function
window.addEventListener("load", function(){
    var orderForm = document.forms.orderForm;
    orderForm.elements.orderDate.value = new Date().toDateString();
    orderForm.elements.model.focus();

    //call the calcOrder function to calculate the cost of the order
    calcOrder();

    //event handlers for the web forms to run the calcOrder() when the value of the model or qty changes
    orderForm.elements.model.onchange = calcOrder;
    orderForm.elements.qty.onchange = calcOrder;

    //must use querySelectorAll to target radio buttons
    var planOptions = document.querySelectorAll('input[name="protection"]');
    //loop through all elements in planOptions
    for (var i=0; i < planOptions.length; i++) {
       planOptions[i].onclick = calcOrder;
    }
});

function calcOrder() {
    var orderForm = document.forms.orderForm;

    //calculate the initial cost of the order
    var mIndex = orderForm.elements.model.selectedIndex;
    var mCost = orderForm.elements.model.options[mIndex].value;
    var qIndex = orderForm.elements.qty.selectedIndex;
    var quantity = orderForm.elements.qty[qIndex].value;

    //initial cost = model cost * quantity
    var initialCost = mCost*quantity;
    //write the initial cost value to the page
    orderForm.elements.initialCost.value = formatUSCurrency(initialCost);

    //retrieve the cost of the user's protection plan
    var pCost = document.querySelector('input[name="protection"]:checked').value*quantity;
    //write the protection plan adjusted cost to the page
    orderForm.elements.protectionCost.value = formatNumber(pCost, 2);

    //calculate the order subtotal and write to page
    orderForm.elements.subtotal.value = formatNumber(initialCost + pCost, 2);

    //calculate the sales tax 
    var salesTax = 0.05 * (initialCost + pCost);
    //write the sales tax to the page
    orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

    //calculate the cost of the total order
    var totalCost = initialCost + pCost + salesTax;
    //write the total cost to the page
    orderForm.elements.totalCost.value = formatUSCurrency(totalCost);

    //store the order details in hidden fields
    orderForm.elements.modelName.value = orderForm.elements.model.options[mIndex].text;
    orderForm.elements.protectionName.value = document.querySelector('input[name="protection"]:checked').nextSibling.nodeValue;
}

//function to format numeric values to always have two decimal places
function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, 
      {minimumFractionDigits: decimals,
      maximumFractionDigits: decimals});
}
//or just do pCost.toFixed(2); and so on...

//function to format numeric values as a text string using local standards
function formatUSCurrency(val) {
   return val.toLocaleString('en-US',
   {style: "currency", currency: "USD"});
}