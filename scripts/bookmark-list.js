'use strict';
/* global STORE, cuid */

/**
 * my iffy function that will expose general functions that will be used 
 * throughout the app
 */
const bookmarkList = (function(){

  function render(){
    // Filter item list if store prop is true by item.checked === false
    let items = [ ...STORE.bookmarks ];
    // render the shopping list in the DOM
    console.log('`render` ran');
    const bookmarkItems = generateBookmarkString(items);
    // insert that HTML into the DOM
    $('.bookmark-list').html(bookmarkItems);
  }

  function generateListItem(item){
    console.log('generate item', item);
    return `
    <li class="js-item-index-element" data-item-index="${item.id}">
    <span class="bookmark-title">${item.title}</span><br>
    <span class="bookmark-rating">Rating ${item.rating} out of 5</span>
    <div class="bookmark-item-controls">
      <button class="condensed-view-toggle js-item-toggle">
          <span class="button-label">More Info</span>
      </button>
      <button class="bookmark-item-delete js-item-delete">
          <span class="button-label">Delete</span>
      </button>
    </div>
    <div class="bookmark-item-not-condensed">
      <span>${item.description}</span><br>
      <form>
        <input type="button" value="Visit Site" onclick="window.location.href=${item.url}"/>
      </form>
    </div>
  </li>`;
  }

  function generateBookmarkString(list){
    const items = list.map((item)=> generateListItem(item));
    return items.join('');
  }

  function addItemToList(newItem){
    console.log('addItem ran');
    STORE.bookmarks.push(newItem);
    console.log('STORE', STORE);
  }

  function addItemButton(){
    $('.add-bookmark-button').on('click', event=> {
      event.preventDefault();
      //console.log('add button pushed');
      // STORE.addingItem = !STORE.addingItem;
      // if(STORE.addingItem === true){
      //   $(event.currentTarget.toggleClass(''))
      // }
      // render();
    });
  }

  function submitNewItem(){
    $('.add-form').submit(event => {
      event.preventDefault();

      //can't find or remember slides on the better way to handle data here...
      const newTitle = $(event.currentTarget).find('#bookmark-title').val();
      const newUrlLink = $(event.currentTarget).find('#bookmark-url').val();

      //need to figure out how to capture the value of a radio button
      const newRating = $(event.currentTarget).find('input[type=radio][name=bookmark-rating]:checked').val();
      //$( "select#foo option:checked" ).val();
      const newDescription = $(event.currentTarget).find('#bookmark-description').val();
      const item ={
        title: newTitle,
        url: newUrlLink,
        rating: newRating,
        description: newDescription
      };
      //clears values
      $('.form-input').val('');
      //adds item to the STORE
      const forSTORE= Object.assign(item, {id: cuid(), expanded: false});
      console.log('new item', forSTORE);
      addItemToList(forSTORE);
      //updates the DOM
      render();
    });
  }

  function bindEventListeners(){
    addItemButton();
    submitNewItem();
  }

  return{
    render,
    bindEventListeners,
  };
}());