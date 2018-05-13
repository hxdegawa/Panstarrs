$(function(){
  if(location.href.match("monka") === null && location.href.match("contents") === null && location.href.match("tokyo-shoseki") === null){
    
    let sound = new Audio(chrome.extension.getURL("Panstarrs.wav")),
        isMenuOpend = false;
    
    chrome.runtime.sendMessage({date: Date().split(" ")[2], query: "isFirstTimeOfDay"}, function(response) {
      if(response.status){
        sound.play();
        $("body").append('<div class="panstarrs-intro"></div>');
        $(".panstarrs-intro").css("background-image", "url(" + chrome.extension.getURL('images/Panstarrs_loaded.svg') + ")");
        setTimeout(function(){
          $(".panstarrs-menu").addClass("active");
          $(".panstarrs-disabled").addClass("active");
        }, 6000);
      }else{
//        $("body").append('<img id="pasntarrs-loading-icon" class="panstarrs-load" src="' + chrome.extension.getURL('images/panstarrs.svg') + '" />')
        $(".panstarrs-menu").addClass("active");
        $(".panstarrs-disabled").addClass("active");
      }
    });
    
    $("body").find(".u-page-top").remove();
    $("body").append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet"><div class="panstarrs-menu">menu</div> <div class="panstarrs-disabled"><i>warning</i><span>Disabled</span></div> <div class="panstarrs-notification-disabled"><i class="material-icons">notifications_off</i><span>Disabled</span></div> <div class="panstarrs-menu-wrapper"><div class="panstarrs-menu-col panstarrs-toggle">Toggle</div> <div class="panstarrs-menu-col troll">Troll</div> <div class="panstarrs-menu-col panstarrs-notification">Notification</div></div>')

    $(".panstarrs-menu").click(function(){
      if(isMenuOpend){
        $(".panstarrs-menu").removeClass("open");
        $(".panstarrs-menu-col").removeClass("visible");
        isMenuOpend = !isMenuOpend
      }else{
        $(".panstarrs-menu").addClass("open");
        $(".panstarrs-menu-col").addClass("visible");
        isMenuOpend = !isMenuOpend
      }
    });
    
    $(".troll").click(function(){
      $("body > *:not(div[class*=panstarrs])").addClass("trolled");
      setTimeout(function(){
        window.location.href = "https://twitter.com";
      }, 1500);
    });
    
    chrome.runtime.sendMessage("checkMainStatus", function(response) {
      if(response.status){
        $(".panstarrs-disabled").addClass("visible");
        $(".panstarrs-notification-disabled").addClass("double");
      }
    });
    
    chrome.runtime.sendMessage("checkNotificationStatus", function(response) {
      if(response.status){
        $(".panstarrs-notification-disabled").addClass("visible");
        $(".panstarrs-disabled").addClass("connected");
      }
    });
    
    $(".panstarrs-toggle").click(function(){
      chrome.runtime.sendMessage("changeMainStatus", function(response) {
        if(response.status){
          $(".panstarrs-disabled").addClass("visible");
          $(".panstarrs-notification-disabled").addClass("double");
        }else{
          $(".panstarrs-disabled").removeClass("visible");
          $(".panstarrs-notification-disabled").removeClass("double");
        }
      });
    });
    
    $(".panstarrs-notification").click(function(){
      chrome.runtime.sendMessage("changeNotificationStatus", function(response) {
        if(response.status){
          $(".panstarrs-notification-disabled").addClass("visible");
          $(".panstarrs-disabled").addClass("connected");
        }else{
          $(".panstarrs-notification-disabled").removeClass("visible");
          $(".panstarrs-disabled").removeClass("connected");
        }
      });
    });

  }else if(location.href.match("contents")){
    
  }else if(location.href.match("tokyo-shoseki.co.jp")){
    
  }
});