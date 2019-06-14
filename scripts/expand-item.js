'use strict';
/* global $, bookmarkList*/

// eslint-disable-next-line no-unused-vars

const expandingItem = (function(){

  function clickMoreInfo(){
    $('.bookmark-list').on('click', '.condensed-view-button', event =>{
      event.preventDefault();
      console.log(event.currentTarget);
      $(event.currentTarget).closest('li').find('.bookmark-item-not-condensed').toggleClass('.hide-more-info');
      bookmarkList.render();
    });
  }
  
  return{
    clickMoreInfo
  };
}());
