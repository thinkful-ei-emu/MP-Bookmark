'use strict';
/* global, STORE */

const filtering = (function(){

  function dropDownInput(){
    $('#dropdown-options').change(function(){
      const value = $('#dropdown-options').val();
      STORE.minimumValue = value;
      bookmarkList.render();
    });
  }

  return{
    dropDownInput
  };
}());