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

function triggerGlyphiconASC(a) {
    a.attr("data-type", "asc"),
    a.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up")
}

function triggerGlyphiconDESC(a) {
    a.attr("data-type", "desc"),
    a.removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down")
}