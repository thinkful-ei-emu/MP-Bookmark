'use strict';
/* global STORE, $ cuid */
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
    <li class="js-item-index-element" data-item-index="${item.id}">
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
    <div class="bookmark-item-not-condensed">
      <span>${item.description}</span><br>
    <form>
      <input type="button" value="Visit Site" onclick="window.location.href="${item.url}"/>
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
          <input required type="text" class="form-input" id="bookmark-title" name="bookmark-title"><br>
          
          <label for="bookmark-url">URL Link</label>
          <input required ype="text" class="form-input" id="bookmark-url" name="URL-link"><br>
          
          <label for="bookmark-rating">Rating</label> 
             <div>
                 <input required type="radio" class="form-input" id="rating-value" name="drone" value="1"><label for="1">1</label>
             </div>  
             <div>
                <input type="radio" class="form-input" id="rating-value" name="drone" value="2"><label for="2">2</label>
              </div>
              <div>
                 <input type="radio" class="form-input" id="rating-value" name="drone" value="3"><label for="3">3</label>
              </div>
              <div>
                 <input type="radio" class="form-input" id="rating-value" name="drone" value="4"><label for="4">4</label>
              </div>
              <div>
                  <input type="radio" class="form-input" id="rating-value" name="drone" value="5"><label for="5">5</label>
              </div><br>
          
          <label for="bookmark-description">Description</label>
          <input required type="text" class="form-input" id="bookmark-description" placeholder= "Your description goes here..." name="description"><br>
          
          <button type="submit" class="submit-button">
            <span class="button-label">Submit</span>
          </button>
          
          <button id="cancel-button">
            <span class="button-label">Cancel</span>
          </button>
          </div>
          `
        );
      }
      render();
    });
  }

  function cancelFormButton(){
    $('.add-form').on('click', '#cancel-button', event => {
      event.preventDefault();
      $('.form').remove();
      STORE.addingItem = !STORE.addingItem;
      render();
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
        description: newDescription
      };
      //adds item to the STORE
      const forSTORE= Object.assign(item, {id: cuid(), expanded: false});
      addItemToList(forSTORE);
      STORE.addingItem = !STORE.addingItem;
      //updates the DOM
      render();
    });
  }


  /**
   * This function updates the store by adding the new item to the bookmarks array 
   * and changes the status of the addingItem method 
   * @param {*} newItem 
   */
  function addItemToList(newItem){
    STORE.bookmarks.push(newItem);
    STORE.addingItem = !STORE.addingItem;
  }


  /**
   * used to render the page
   */
  function render(){
    // Filter item list if store prop is true by item.checked === false
    let items = [ ...STORE.bookmarks ];
    // render the shopping list in the DOM
    console.log('`render` ran');

    if (STORE.minimumValue > 1){
      items = items.filter(item => item.rating >= STORE.minimumValue);
    }

    const bookmarkItems = generateBookmarkString(items);
    // insert that HTML into the DOM
    $('.bookmark-list').html(bookmarkItems);
  }

  /**
   * 
   */
  function addingItemFunctions(){
    addItemButton();
    submitNewItem();
    cancelFormButton();
  }

  //allows functions to be seen outside this file 
  return{
    render,
    addingItemFunctions,
  };
}());



/**
   * if time come back to this and convert to use formData method
   * for the submit new item function
   * EXAMPLE FROM GOOGLE DOC
   * function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}
$('#contactForm').submit(event => {
  event.preventDefault();
  // These two lines are THE SAME
  // let formElement = document.querySelector("#contactForm");
  let formElement = $('#contactForm')[0];
  // the [0] here selects the native element
  console.log( serializeJson(formElement) );
});
   */