'use strict';
/* global $, STORE, bookmarkList*/

// eslint-disable-next-line no-unused-vars

/**
 * event listener on the button that changes the state of the store
 * and runs the list item to the display function
 */
const expandingItem = (function(){

  function clickMoreInfo(){
    $('.bookmark-list').on('click', '.condensed-view-button', event =>{
      event.preventDefault();
      const listItem = $(event.currentTarget).closest('li').find('.bookmark-item-not-condensed');
      displayMoreInfo(listItem);
      
    });
  }

  /**
   * toggles the class to the specific item in the list
   * @param {*} listItem 
   */
  function displayMoreInfo(listItem){
    listItem.toggleClass('hide-more-info');
  }

  return{
    clickMoreInfo
  };
}());
