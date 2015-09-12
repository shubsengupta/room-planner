/*
* Dropdown Menu Module
*
*/

var Dropdown = function($parent, data, type) {
  var ListTemplate = _.template($('#template-dropdown').html());
  var liTemplate = _.template($('#template-dropdown-item').html());
  var buttonList = '';

  // LOOP THROUGH DATA & CREATE BUTTONS
  for(var i = 0; i < data.length; i++) {
    buttonList = buttonList + liTemplate({
      name: data[i].name,
      description: data[i].description,
      background: data[i].background,
      icon: data[i].icon,
      type: type
    });
  }



  

    // ADD DROPDOWN TO DOM
  $parent.append(ListTemplate({items: buttonList}));


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
      var deskNode = $('a[data-name=DESK]');
      $( "<div class='imageLs' style='background: url(" + ItemList[i].thumbnailImage + ") no-repeat;background-size: cover;'></div>" ).insertAfter( deskNode );
    }


    $.ajax({
      method: "GET",
      async: false,
      url: "http://api.walmartlabs.com/v1/search?query=chair&format=json&apiKey=3dvh2s8d9fpnxskz7n483scn",
      success: function(response){
        ItemList = response.items;
      }
    })

    for(var i = 0; i < ItemList.length; i++) {
      var deskNode = $('a[data-name=CHAIR]');
      $( "<div class='imageLs' style='background: url(" + ItemList[i].thumbnailImage + ") no-repeat;background-size: cover;'></div>" ).insertAfter( deskNode );
    }



    $.ajax({
      method: "GET",
      async: false,
      url: "http://api.walmartlabs.com/v1/search?query=Lamp&format=json&apiKey=3dvh2s8d9fpnxskz7n483scn",
      success: function(response){
        ItemList = response.items;
      }
    })

    for(var i = 0; i < ItemList.length; i++) {
      var deskNode = $('a[data-name=LAMP]');
      $( "<div class='imageLs' style='background: url(" + ItemList[i].thumbnailImage + ") no-repeat;background-size: cover;'></div>" ).insertAfter( deskNode );
    }



    $.ajax({
      method: "GET",
      async: false,
      url: "http://api.walmartlabs.com/v1/search?query=Bed&format=json&apiKey=3dvh2s8d9fpnxskz7n483scn",
      success: function(response){
        ItemList = response.items;
      }
    })

    for(var i = 0; i < ItemList.length; i++) {
      var deskNode = $('a[data-name=BED]');
      $( "<div class='imageLs' style='background: url(" + ItemList[i].thumbnailImage + ") no-repeat;background-size: cover;'></div>" ).insertAfter( deskNode );
    }



      //$('.dropdown-button-icon', $(this)).css("background", "url(" + ItemList[i].thumbnailImage + ") center center no-repeat");




  // $(".dropdown-button-icon", $('.dropdown-items')).each( function(index) {
  //   if(index < ItemList.length) {
  //   var av = $($(".dropdown-button-icon", $('.dropdown-items'))[index]);
  //   av.css("background", "url(" + ItemList[index].thumbnailImage + ") center center no-repeat");
  // }
  // })

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