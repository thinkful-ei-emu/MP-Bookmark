'use strict';
/* global $, api, bookmarkList, deletingItems, filtering, expandingItem, cuid */

const STORE={
  bookmarks: [],
  addingItem: false,
  error: null,
  minimumValue: 1
};

function main(){
  bookmarkList.addingItemFunctions();
  bookmarkList.render();
  deletingItems.clickDelete();
  filtering.dropDownInput();
  expandingItem.clickMoreInfo();
}

$(main).ready(function(){
  api.getItems()
    .then((bookmarks) => {
      console.log(bookmarks);
      STORE.bookmarks = bookmarks;
      bookmarkList.render();
    })
    .catch(err => {});
});