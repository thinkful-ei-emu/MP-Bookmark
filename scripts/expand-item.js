'use strict';
/* global STORE*/

const expandingItem = (function(){

  function clickMoreInfo(){
    $('.bookmark-list').on('click', '.condensed-view-button', event =>{
      event.preventDefault();
      $('.js-item-index-element').append(
        `<div class="bookmark-item-not-condensed">
        <span>${item.description}</span><br>
        <form>
          <input type="button" value="Visit Site" onclick="window.location.href=${item.url}"/>
        </form>
      </div>`
      );
      bookmarkList.render();
    });
  }
  
  return{
    clickMoreInfo
  };
}());