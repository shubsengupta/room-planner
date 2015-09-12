/*
* Dropdown Menu Module
*
*/

var Dropdown = function($parent, data, type) {
  var ListTemplate = _.template($('#template-dropdown').html());
  var liTemplate = _.template($('#template-dropdown-item').html());
  var buttonList = '';

  // LOOP THROUGH DATA & CREATE BUTTONS

  var ItemList;
  $.ajax({
    method: "GET",
    async: false,
    url: "http://api.walmartlabs.com/v1/search?query=desk&format=json&apiKey=3dvh2s8d9fpnxskz7n483scn",
    success: function(response){
      ItemList = response.items;
    }
  })

  for(var i = 0; i < ItemList.length; i++) {
    buttonList = buttonList + liTemplate({
      name: ItemList[i].itemId,
      description: ItemList[i].name,
      background: ItemList[i].background,
      icon: ItemList[i].name,
      type: type,
      thumbnail : ItemList[i].thumbnailImage
    });

    //$('.dropdown-button-icon', $(this)).css("background", "url(" + ItemList[i].thumbnailImage + ") center center no-repeat");


  }
    // ADD DROPDOWN TO DOM
  $parent.append(ListTemplate({items: buttonList}));

  $(".dropdown-button-icon", $('.dropdown-items')).each( function(index) {
    if(index < ItemList.length) {
    var av = $($(".dropdown-button-icon", $('.dropdown-items'))[index]);
    av.css("background", "url(" + ItemList[index].thumbnailImage + ") center center no-repeat");
  }
  })

  // $(".dropdown-items li").each(function(index) {

  //   $('.dropdown-button-icon').css("background", "url(" + ItemList[index].thumbnailImage + ") center center no-repeat");

  // })

  //TOGGLE MENU OPEN/CLOSE
  $parent.on('click', function(e) {
    e.preventDefault();
    $parent.find('.dropdown, .dropdown-overlay').toggleClass('is-visible');
  });

  // CLOSE MENU WHEN CLICKING OVERLAY
  $parent.on('click', '.dropdown-overlay', function(e) {
    e.stopPropagation();
    $parent.find('.dropdown, .dropdown-overlay').removeClass('is-visible');
  });
};


// EXPORT MODULE
module.exports = Dropdown;