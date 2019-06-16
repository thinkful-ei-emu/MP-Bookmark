'use strict';
/* global STORE, api, $*/
/**
 *This JS file contains all functionality dealing with adding bookmark to the list 
 * Clicking on the Add New Bookmark button 
 * event listener to display form 
 * Clicking on the Submit button 
 * event listner to add form input to the store and updating the DOM 
 */
const bookmarkList = (function(){
  /**
   * template for all items to be added to the list
   * @param {object} item 
   */
  function generateListItem(item){
    return `
    <li class="js-item-index-element list-group-item" data-item-index="${item.id}">
    <span class="bookmark-title">${item.title}</span><br>
    <span class="bookmark-rating">Rating ${item.rating} out of 5</span>
    <div class="bookmark-item-controls">
      <button class="condensed-view-button">
          <span class="button-label">More Info</span>
      </button>
      <button class="bookmark-item-delete">
          <span class="button-label">Delete</span>
      </button>
    </div>
    <div class="bookmark-item-not-condensed hide-more-info">
    <hr>
      <span>${item.desc}</span><br>
    <form>
      <a target="_blank" type="button" value="Visit Site" href='${item.url}'>Visit Site</a>
    </form>
    </div>
    </li>`;
  }

  /**
   * converts the list of items into a string
   * @param {*} list 
   */
  function generateBookmarkString(list){
    const items = list.map((item)=> generateListItem(item));
    return items.join('');
  }

  /**
   * This function displays the form when user clicks add button
   */
  function addItemButton(){
    $('.add-bookmark-button').on('click', event=> {
      event.preventDefault();
      STORE.addingItem = !STORE.addingItem;
      if(STORE.addingItem === true){
        $('.add-form').append(
          `
          <div class="form">
            <label for="bookmark-title">Title</label>
            <input required type="text" id="bookmark-title" name="bookmark-title"><br>

            <label for="bookmark-url">URL Link</label>
            <input type="text" placeholder= "http://..." id="bookmark-url" name="URL-link"><br>

            <label for="bookmark-rating">Rating</label> 

              <input type="radio" id="rating-value" name="drone" value="1">
              <label for="1">1</label>

              <input type="radio" id="rating-value" name="drone" value="2">
              <label for="2">2</label>

              <input type="radio" id="rating-value" name="drone" value="3">
              <label for="3">3</label>

              <input type="radio" id="rating-value" name="drone" value="4">
              <label for="4">4</label>

              <input type="radio" id="rating-value" name="drone" value="5">
              <label for="5">5</label><br>

            <label for="bookmark-description">Description</label>
            <input type="text" id="bookmark-description" placeholder= "Your description goes here..." name="description"><br>

          <button type="submit">Submit</button>
          <button id="cancel-button">Cancel</button>
          </div>
          `
        );
      }
    });
  }

  function cancelFormButton(){
    $('.add-form').on('click', '#cancel-button', event => {
      event.preventDefault();
      $('.form').remove();
      STORE.addingItem = !STORE.addingItem;
    });
  }

  /**
   * this function captures the values from the user submitted form 
   * and sends those to the addItemToList
   */
  function submitNewItem(){
    $('.add-form').submit(event => {
      event.preventDefault();
      const newTitle = $(event.currentTarget).find('#bookmark-title').val();
      const newUrlLink = $(event.currentTarget).find('#bookmark-url').val();
      const newRating = $(event.currentTarget).find('#rating-value:checked').val();
      const newDescription = $(event.currentTarget).find('#bookmark-description').val();
      const item ={
        title: newTitle,
        url: newUrlLink,
        rating: newRating,
        desc: newDescription
      };
      //adds item to the STORE
      const forSTORE= Object.assign(item, {expanded: false});
      api.createItem(forSTORE)
        .then(api.getItems())
        .catch((err) => {
          setError(err.message);
          renderError();
        });
    });
  }

  /**
   * used to render the page
   */
  function render(){
    renderError();
    // Filter item list if store prop is true by item.checked === false
    let items = [...STORE.bookmarks];
    if (STORE.minimumValue > 1){
      items = items.filter(item => item.rating >= STORE.minimumValue);
    }
    const bookmarkItems = generateBookmarkString(items);
    // insert that HTML into the DOM
    $('.bookmark-list').html(bookmarkItems);
  }

  function renderError(){
    if (STORE.error) {
      const el = generateError(STORE.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
  }

  function generateError(message){
    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }

  function setError (error) {
    STORE.error = error;
  }

  function handleCloseError() {
    $('.error-container').on('click', '#cancel-error', () => {
      STORE.error = null;
      renderError();
    });
  }

  function addingItemFunctions(){
    addItemButton();
    submitNewItem();
    cancelFormButton();
    handleCloseError();
    setError();
  }

  //allows functions to be seen outside this file 
  return{
    render,
    addingItemFunctions,
  };
}());