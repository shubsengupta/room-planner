var Utils  = require('./helpers/utils');
var data  = require('./helpers/data');
var userProfile = require('./components/user-profile');
var Dropdown = require('./components/dropdown');
var Furniture  = require('./components/furniture');
var welcome = require('./components/welcome');
var rootRef = new Firebase(Utils.urls.root);
var furnitureRef = new Firebase(Utils.urls.furniture);
var backgroundRef = new Firebase(Utils.urls.background);

/*
* Application Module
*
* This is the main module that initializes the entire application.
*/

var app = {
  $welcome: null,
  $app: null,
  $signInButtons: null,
  $alert: null,
  $signOutButton: null,
  maxZIndex: 0,


  /*
  * Initalize the application
  *
  * Get intials dump of Firebase furniture data.
  */

  init: function() {
    // REGISTER ELEMENTS
    this.$welcome = $("#welcome");
    this.$app = $("#app");
    this.$officeSpace = $("#office-space");
    this.$officeSpaceWrapper = $("#office-space-wrapper");
    this.$signInButtons = $(".welcome-hero-signin");
    this.$alert = $(".alert");
    this.$signOutButton = $(".toolbar-sign-out");

    //INITIALIZE APP
    welcome.init();
    this.checkUserAuthentication();
    this.createDropdowns();
    this.setOfficeBackground();
    this.logout();
  },


  /*
  * Check User Authentication
  *
  * Hide/Show if user is loggedin/loggedout
  */

  checkUserAuthentication: function(){
    var self = this;

    rootRef.onAuth(function(authData){
      if (authData) {
        self.hideWelcomeScreen();
        self.renderFurniture();
        userProfile.init(authData);
      }
      else {
        self.showWelcomeScreen();
      }
    });
  },


  /*
  * Create Dropdowns
  *
  * Create add furniture and background dropdowns
  */

  createDropdowns: function() {
    var self = this;
    var $addFurniture = $('#add-furniture');
    var $addBackground = $('#select-background');

    //CREATE NEW FURNITURE OBJECTS
    this.furnitureDropdown = new Dropdown($addFurniture, data.furniture, 'furniture');
    this.backgroundDropdown = new Dropdown($addBackground, data.backgrounds, 'background');

    // LISTEN FOR CLICK EVENT ON DROPDOWNS
    // $('.dropdown').on('click', '.dropdown-button', function(e) {
    //   e.preventDefault();
    //   var button = $(e.currentTarget);
    //   var type = button.data('type');
    //   var name = button.data('name');

    //   switch(type) {
    //     case 'furniture': self.addFurniture(name); break;
    //     case 'background': self.changeBackground(name); break;
    //   }
    // });

    $('.imageLs').on('click', function(e) {
        e.preventDefault();
        var af = $(this).css("background");
        var bf = $(this).attr("data-backcheck");
        var cf = [af, bf];

        var button = $(e.currentTarget);
        self.addFurniture(cf);
    });

    $("#image-button").on('click', function(e) {
        $("#imageLoader").trigger("click");

    });
    $("#checkOut").on('click', function(e) {
      $( "#dialog" ).html("");
      $( "#dialog" ).dialog({
        dialogClass: "no-close",
        buttons: [
          {
            text: "Check Out",
            click: function() {
              $( this ).dialog( "close" );
            }
          }
        ]
      });
      var checkoutList = [];
      $("#office-space>div.furniture").each(function(index) {
        var $a = $(this);
        if($a.attr("data-backcheck")) {
            console.log($a.attr("data-backcheck"));
            
            $.ajax({
              method: "GET",
              async: false,
              url: "http://api.walmartlabs.com/v1/items/" + $a.attr("data-backcheck") + "?apiKey=3dvh2s8d9fpnxskz7n483scn&format=json",
              success: function(response){
                checkoutList.push(response);
                console.log(checkoutList);
                $( "#dialog" ).append("<div style='width: 100%; height: 48px;'>     <div style='display:inline-block; width: 48px;height: 100%; background: url(" + response.thumbnailImage  + ") 0px 0px/cover no-repeat '></div>              <div style=' display:inline-block; width:180px; height: 100%; overflow: hidden;padding-left:5px'> $" + response.name +   "   </div>                           <div style=' display:inline-block;height:100%; margin-left:0; margin-right:0; overflow:hidden'> " + response.salePrice +   "</div>                             </div> ");
              }
            })
        }

      })

        var total = 0;
        for(var k = 0; k < checkoutList.length; k++) total += checkoutList[k].salePrice;

        $( "#dialog" ).append("<div style='width: 100%; height: 48px;'>     <div style='display:inline-block; width: 48px;height: 100%; background: url(" + ""  + ") 0px 0px/cover no-repeat '></div>              <div style=' display:inline-block; width:180px;height: 100%; overflow: hidden;padding-left:5px'> " + "Your Total Is" +   "   </div>                           <div style=' display:inline-block;height:100%; margin-left:0; margin-right:0; overflow:hidden'> " + total +   "</div>                             </div> ");




      
        

    });

  },



  /*
  * Change Office Space Background
  *
  */

  changeBackground: function(name) {
    backgroundRef.set(name);
  },


  /*
  * Set Office Space Background
  *
  */

  setOfficeBackground: function() {
    var self = this;

    // LISTEN FOR FIREBASE UPDATE
    backgroundRef.on('value', function(snapshot) {
      var value = snapshot.val();
      var pattern = value ? 'background-' + value : '';

      self.$officeSpaceWrapper.removeClass().addClass('l-canvas-wrapper l-center-canvas ' +  pattern);
    });
  },


  /*
  * Add Furniture
  *
  * Adds a blank piece of new furniture
  */

  addFurniture: function(type) {
    furnitureRef.push({
      top: 400,
      left: 300,
      type: type,
      rotation: 0,
      locked: false,
      "z-index": this.maxZIndex + 1,
      name: ""
    });
  },


  /*
  * Create Furniture
  *
  * Adds a piece of furniture using a Firebase data snapshot
  */

  createFurniture: function(snapshot) {
    new Furniture(snapshot, this);
  },


  /*
  * Render Furniture
  *
  * Renders all existing furnture and adds new items
  * when the Firebase is updated
  */

  renderFurniture: function(){
    var self = this;

    // ADD ALL EXISTING FURNITURE
    furnitureRef.once("value", function(snapshot){
      self.setMaxZIndex(snapshot, true);

      snapshot.forEach(function(childSnapshot) {
        self.createFurniture(snapshot);
      });
    });

    // LISTEN FOR NEW FURNITURE AND ADD IT
    furnitureRef.on("child_added", function(snapshot){
      self.setMaxZIndex(snapshot);
      self.createFurniture(snapshot);
    });
  },


  /*
  * Log out of App
  *
  */

  logout: function(){
    this.$signOutButton.on("click", function(e){
      rootRef.unauth();
    });
  },


  /*
  * Show App Welcome Screen
  *
  */

  showWelcomeScreen: function(){
    this.$welcome.removeClass("is-hidden");
    this.$app.addClass("is-hidden");
  },


  /*
  * Hide App Welcome Screen
  *
  */

  hideWelcomeScreen: function(){
    this.$welcome.addClass("is-hidden");
    this.$app.removeClass("is-hidden");
  },


  /*
  * Set Furniture Stacking Order (z-index)
  *
  */

  setMaxZIndex: function(snapshot, hasChildren) {
    var value = snapshot.val();

    if (hasChildren) {
      var maxItem = _.max(value, function(item){
        return item['z-index'];
      });

      this.maxZIndex = maxItem['z-index'] || 0;
    }
    else {
      var zIndex = (value['z-index'] >= this.maxZIndex) ? value['z-index'] : this.maxZIndex;
      this.maxZIndex = zIndex;
    }
  }
};


/*
* Initialize App
*
*/

$(document).ready(function() {
  app.init();
});


// EXPORT MODULE
module.exports = app;

/* Add Image to Canvas */
var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');

$(document).ready(handleImage());
$(window).resize(refreshCanvas());

refreshCanvas();

function refreshCanvas() {
    //canvas/context resize
    canvas.attr("width", $(window).get(0).innerWidth / 2);
    canvas.attr("height", $(window).get(0).innerHeight / 2);
    drawImage();
}

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();

        img.onload = function(){

            var oc = document.createElement('canvas'), octx = oc.getContext('2d');
            
            oc.width = img.width * 0.5;
            oc.height = img.height * 0.5;
            octx.drawImage(img, 0,0, oc.width,oc.height);

            /// step 2
            octx.drawImage(oc,0,0,oc.width * 0.5,oc.height * 0.5);
            
            img.width = canvas.width;
            img.height = canvas.height;

            ctx.drawImage(oc,0,0,oc.width * 0.5, oc.height * 0.5,
                             0,0,canvas.width,canvas.height);

        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}