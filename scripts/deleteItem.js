'use strict';
/* global STORE, cuid */

const deletingItems = (function(){

  //event listener for clicking the delete button
  function clickDelete(){
    $('.bookmark-list').on('click', '.js-item-delete', event =>{
      const selectedBookmark = identifyItemById(event.currentTarget);
      console.log(event);
      deleteListItem(selectedBookmark);
      bookmarkList.render();
    });
  }

  //what happens when you click the delete button
  function deleteListItem(selectedBookmark){
    const index = STORE.bookmarks.findIndex(item=> item.id === selectedBookmark);
    STORE.bookmarks.splice(index, 1);
  }

  //needed to make sure we are deleting the correct item from the list
  function identifyItemById(item){
    return $(item)
      .closest('.js-item-index-element')
      .data('item-index');
  }

  return{
    clickDelete
  };
}());