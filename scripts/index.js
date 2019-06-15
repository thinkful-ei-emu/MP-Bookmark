'use strict';
/* global $, api, bookmarkList, deletingItems, filtering, expandingItem, cuid */

const STORE={
  bookmarks: [
    {
      id: cuid(),
      title: 'Google',
      url: 'http://google.com',
      description: 'This is a description',
      rating: 2,
      expanded: false
    },
    {
      id: cuid(),
      title: 'Google',
      url: 'http://google.com',
      description: 'This is a description',
      rating: 4,
      expanded: false
    }
  ],
  addingItem: false,
  errorMessage: null,
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
    .then(item => {
      console.log(item);
    });
});