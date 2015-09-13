/*
* Dropdown Menu Module
*
*/

var wtf = false; // I hate life, and have no idea why it was looping twice

var Dropdown = function($parent, data, type) {
  var ListTemplate = _.template($('#template-dropdown').html());
  var liTemplate = _.template($('#template-dropdown-item').html());
  var buttonList = '';

  // LOOP THROUGH DATA & CREATE BUTTONS
  for(var i = 0; i < data.length - 1; i++) {
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

  while(wtf == false) {
    wtf = true;

      var deskList = [];
      $.ajax({
        method: "GET",
        async: false,
        url: "http://api.walmartlabs.com/v1/search?query=desk&format=json&apiKey=3dvh2s8d9fpnxskz7n483scn",
        success: function(response){
          deskList = response.items;

          for(var i = 0; i < deskList.length -1; i++) {
            var deskNode = $('a[data-name=DESK]');
            $( "<div class='imageLs' data-backCheck='" +  deskList[i].itemId +"' style='background: url(http://cdn.corporate.walmart.com/dims4/WMT/2a19d22/2147483647/thumbnail/213x80%3E/quality/90/?url=http%3A%2F%2Fcdn.corporate.walmart.com%2Faa%2F0a%2Fd71767854641859bf45e2ba07594%2Fheader-logo.png) -60px 0px/80px 20px no-repeat, url(" + deskList[i].customerRatingImage + ") right bottom/80px 16px no-repeat, url(" + deskList[i].thumbnailImage + ") 0px 0px/cover no-repeat;'></div>" ).insertAfter( deskNode );
          }
        }
      })

      var chairList = [];
      $.ajax({
        method: "GET",
        async: false,
        url: "http://api.walmartlabs.com/v1/search?query=chair&format=json&apiKey=3dvh2s8d9fpnxskz7n483scn",
        success: function(response){
          chairList = response.items;

          for(var i = 0; i < chairList.length -1; i++) {
            var chairNode = $('a[data-name=CHAIR]');
            $( "<div class='imageLs' data-backCheck='" +  chairList[i].itemId +"' style='background:url(http://cdn.corporate.walmart.com/dims4/WMT/2a19d22/2147483647/thumbnail/213x80%3E/quality/90/?url=http%3A%2F%2Fcdn.corporate.walmart.com%2Faa%2F0a%2Fd71767854641859bf45e2ba07594%2Fheader-logo.png) -60px 0px/80px 20px no-repeat, url(" + chairList[i].customerRatingImage + ") right bottom/80px 16px no-repeat, url(" + chairList[i].thumbnailImage + ") 0px 0px/cover no-repeat;'></div>" ).insertAfter( chairNode );
          }
        }
      })

      var lampList = [];
      $.ajax({
        method: "GET",
        async: false,
        url: "http://api.walmartlabs.com/v1/search?query=Lamp&format=json&apiKey=3dvh2s8d9fpnxskz7n483scn",
        success: function(response){
          lampList = response.items;

           for(var i = 0; i < lampList.length -1; i++) {
            var lampNode = $('a[data-name=LAMP]');
            $( "<div class='imageLs' data-backCheck='" +  lampList[i].itemId +"' style='background:url(http://cdn.corporate.walmart.com/dims4/WMT/2a19d22/2147483647/thumbnail/213x80%3E/quality/90/?url=http%3A%2F%2Fcdn.corporate.walmart.com%2Faa%2F0a%2Fd71767854641859bf45e2ba07594%2Fheader-logo.png) -60px 0px/80px 20px no-repeat, url(" + lampList[i].customerRatingImage + ") right bottom/80px 16px no-repeat, url(" + lampList[i].thumbnailImage + ") 0px 0px/cover no-repeat;'></div>" ).insertAfter( lampNode );
          }
        }
      })
     
      var bedList = [];
      $.ajax({
        method: "GET",
        async: false,
        url: "http://api.walmartlabs.com/v1/search?query=Bed&format=json&apiKey=3dvh2s8d9fpnxskz7n483scn",
        success: function(response){
          bedList = response.items;

          for(var i = 0; i < bedList.length -1; i++) {
            var bedNode = $('a[data-name=BED]');
            $( "<div class='imageLs' data-backCheck='" +  bedList[i].itemId +"' style='background:url(http://cdn.corporate.walmart.com/dims4/WMT/2a19d22/2147483647/thumbnail/213x80%3E/quality/90/?url=http%3A%2F%2Fcdn.corporate.walmart.com%2Faa%2F0a%2Fd71767854641859bf45e2ba07594%2Fheader-logo.png) -60px 0px/80px 20px no-repeat, url(" + bedList[i].customerRatingImage + ") right bottom/80px 16px no-repeat, url(" + bedList[i].thumbnailImage + ") 0px 0px/cover no-repeat;'></div>" ).insertAfter( bedNode );
          }
        }
      })
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