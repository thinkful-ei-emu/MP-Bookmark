'use strict';
/* global STORE, $ cuid */

/**
 *This JS file contains all functionality dealing with adding bookmark to the list 
 *
 * Clicking on the Add New Bookmark button 
 * event listener to display form 
 * 
 * Clicking on the Submit button 
 * event listner to add form input to the store and updating the DOM 
 */

const bookmarkList = (function(){
  /**
   * 
   * @param {object} item 
   */
  function generateListItem(item){
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

  /**
   * 
   * @param {*} list 
   */
  function generateBookmarkString(list){
    const items = list.map((item)=> generateListItem(item));
    return items.join('');
  }

  /**
   * 
   * @param {*} newItem 
   */
  function addItemToList(newItem){
    STORE.bookmarks.push(newItem);
    STORE.addingItem = !STORE.addingItem;

  }

  function addItemButton(){
    $('.add-bookmark-button').on('click', event=> {
      event.preventDefault();
      console.log('add button pushed');
      STORE.addingItem = !STORE.addingItem;
      if(STORE.addingItem === true){
        $('.add-form').append(
          `<label for="bookmark-title">Title</label>
          <input type="text" class="form-input" id="bookmark-title" name="bookmark-title" required><br>
          <label for="bookmark-url">URL Link</label>
          <input type="text" class="form-input" id="bookmark-url" name="URL-link" required><br>
          <label for="bookmark-rating">Rating</label> 
             <div>
                 <input type="radio" class="form-input" id="rating-value" name="drone" value="1" checked><label for="1">1</label>
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
          <input type="text" class="form-input" id="bookmark-description" placeholder= "Your description goes here..." name="description" required><br>
          <button type="submit">Submit</button>`
        );
      }
      render();
    });
  }

  /**
   * if time come back to this and convert to use formData method
   * 
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
  function submitNewItem(){
    $('.add-form').submit(event => {
      event.preventDefault();
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
      //adds item to the STORE
      const forSTORE= Object.assign(item, {id: cuid(), expanded: false});
      addItemToList(forSTORE);
      STORE.addingItem = !STORE.addingItem;

      //updates the DOM
      render();
    });
  }

  /**
   * 
   */
  function render(){
    // Filter item list if store prop is true by item.checked === false
    let items = [ ...STORE.bookmarks ];
    // render the shopping list in the DOM
    console.log('`render` ran');
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
  }

  //allows functions to be seen outside this file 
  return{
    render,
    addingItemFunctions,
  };
}());