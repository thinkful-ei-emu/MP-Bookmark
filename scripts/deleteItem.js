'use strict';
/* global bookmarkList, $, STORE*/
// eslint-disable-next-line no-unused-vars


const deletingItems = (function(){

  /**
  * event listener for clicking the delete button
  */
  function clickDelete(){
    $('.bookmark-list').on('click', '.bookmark-item-delete', event =>{
      const selectedBookmark = identifyItemById(event.currentTarget);
      deleteListItem(selectedBookmark);
      bookmarkList.render();
    });
  }

  /**
   * what happens when you click the delete button
   * @param {*} selectedBookmark 
   */
  function deleteListItem(selectedBookmark){
    const index = STORE.bookmarks.findIndex(item=> item.id === selectedBookmark);
    STORE.bookmarks.splice(index, 1);
  }
  
  
  /**
   * needed to make sure we are deleting the correct item from the list
   * @param {*} item 
   */
  function identifyItemById(item){
    return $(item)
      .closest('.js-item-index-element')
      .data('item-index');
  }

  return{
    clickDelete,
    identifyItemById
  };
}());