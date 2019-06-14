'use strict';
/* global bookmarkList, STORE, cuid */

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
      title: 'Google2',
      url: 'http://google.com',
      description: 'This is a description',
      rating: 2,
      expanded: false
    },
    {
      id: cuid(),
      title: 'Google3',
      url: 'http://google.com',
      description: 'This is a description',
      rating: 2,
      expanded: false
    },
    {
      id: cuid(),
      title: 'Google4',
      url: 'http://google.com',
      description: 'This is a description',
      rating: 2,
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
}

$(main);
