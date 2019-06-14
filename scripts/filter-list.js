'use strict';
/* global, STORE */

const filtering = (function(){

  function dropDownInput(){
    $('select').change(function(){
      const value = $('select').val();
      STORE.minimumValue = value;
      bookmarkList.render();
    });
  }

  return{
    dropDownInput
  };
}());