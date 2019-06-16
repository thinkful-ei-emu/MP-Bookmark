'use strict';

let api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Martha';

  // with errors  
  //   let listApiFetch = function(...args) {
  //     let error;
  //     return fetch(...args)
  //       .then(res => {
  //         if (!res.ok) {
  //           error = {code: res.status};
  //           if (!res.headers.get('content-type').includes('json')) {
  //             error.message = res.statusText;
  //             return Promise.reject(error);
  //           }
  //         }
  //         return res.json();
  //       })
  //       .then(data => {
  //         if (error) {
  //           error.message = data.message;
  //           return Promise.reject(error);
  //         }
  //         return data;
  //       });
  //   };

  let getItems = function() {
    let error;
    return fetch(`${BASE_URL}/bookmarks`)
      .then(res => {
        if (!res.ok) {
          error = {code: res.status};
          if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
          }
        }
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
        STORE.bookmarks = data;
        bookmarkList.render();
      });
  };

  let createItem = function(bookmark) {
    let newItem = JSON.stringify(bookmark);
    return fetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newItem
    })
      .then(getItems());
  };

  let deleteItem = function(id) {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE',
    });
  };

  return {
    getItems, 
    createItem,
    deleteItem
  };
}());