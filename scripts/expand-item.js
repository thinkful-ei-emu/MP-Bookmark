'use strict';
/* global $, STORE, bookmarkList*/

// eslint-disable-next-line no-unused-vars

const expandingItem = (function(){

  function clickMoreInfo(){
    $('.bookmark-list').on('click', '.condensed-view-button', event =>{
      event.preventDefault();
      STORE.bookmarks.expanded = !STORE.bookmarks.expanded;
      const listItem = $(event.currentTarget).closest('li').find('.bookmark-item-not-condensed');
      console.log(1, listItem);
      displayMoreInfo(listItem);
      
    });
  }

  //render for expanded
  function displayMoreInfo(listItem){
    listItem.toggleClass('hide-more-info');
    console.log(2, listItem);
  }

  return{
    clickMoreInfo
  };
}());
