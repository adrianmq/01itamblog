/*global $*/

// method for removing a certain class from a jQuery elem
function removeClassIfExists(jQelem, className){

  $.each(jQelem.prop('classList'), function(key, value){

    if(value === className){
      jQelem.removeClass(className);
    }
  })
}

// method for changing visibility for a jQuery elem
function modVisibForNextElem(jQelem, elem, prop){

  var nextField = jQelem.next().next(elem);

  if(nextField){
    nextField.css('visibility', prop);
  }
}

// method to check whether input is numeric
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// numeric sort
function numericSortAoA(arr, index, type) {
  if ( type === 'asc' ) {
    arr.sort(function(a, b){ return a[index] - b[index]; });
  }
  else if ( type === 'desc' ) {
    arr.sort(function(a, b){ return b[index] - a[index]; });
  }
}






