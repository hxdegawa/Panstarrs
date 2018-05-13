$(function(){
  
  let duration,
      durationMS,
      timer;
  
  if(location.href.match("monka") === null && location.href.match("contents") === null && location.href.match("tokyo-shoseki") === null){
    
    if(Notification.permission === 'default'){
      Notification.requestPermission();
    };
    
    function autoStart(){
        if($(".movie").eq(0).hasClass("good")){
    //    Already started few movies

          if($(".good").last().next().attr("class") === "evaluation-test"){
    //        The next column is evaluation-test
            $(".good").last().next().find("p").last().click();
            showNotification("We've reached to evaluation test");

          }else if($(".good").last().next().attr("class") === "essay-test"){
    //        The next column is essay-test
            $(".good").last().next().find("p").last().click();
            showNotification("We've reached to essay test");

          }else if($(".good").last().next().attr("class") === "movie"){
    //        The next column is movie
            $(".good").last().next().find("p").last().click();
            showNotification("Moving to movie");
          }

        }else{
    //    First time starting this curriculumn
          $(".movie").eq(0).find("p").last().click();
        }
      }
    
    function showNotification(message){
      chrome.runtime.sendMessage("checkNotificationStatus", function(response){
        if(!response.status){
          new Notification("Panstarrs", {body: message, icon: chrome.extension.getURL("images/icon.png")}).show();
        }
      })
    }
    
    $(".panstarrs-toggle").click(function(){
      chrome.runtime.sendMessage("checkMainStatus", function(response) {
        if(response.status){
          autoStart();
        }else{
        }
      });
    });
    
    chrome.runtime.sendMessage("checkMainStatus", function(response) {
      if(!response.status){
        setTimeout(function(){
          autoStart();
        }, 7000);

        $(window).on("message", function(e){
          if(e.originalEvent.data === "evaluate-sent"){
            setTimeout(function(){
              autoStart();
            }, 1000);
          }else if(e.originalEvent.data.movieLength){
            duration = e.originalEvent.data.movieLength;
            durationMS = Math.floor(duration * 1000);
            waitWhileWatching(durationMS);
          }
        });

        function waitWhileWatching(milliseconds){
          clearTimeout(timer);
          timer = setTimeout(function(){
            autoStart();
          }, milliseconds);
        }
      }
    })

  }else if(location.href.match("contents")){
    chrome.runtime.sendMessage("checkMainStatus", function(response) {
      if(!response.status){
        $("#evaluate-btn").click(function(){
          if(location.href.match("result") === null){
            window.parent.postMessage("evaluate-sent", 'https://www.nnn.ed.nico');
          }
        });
      }
    });
  }else if(location.href.match("tokyo-shoseki.co.jp")){
    chrome.runtime.sendMessage("checkMainStatus", function(response) {
      if(!response.status){
        $("#video01").on("loadeddata", function(){
          window.parent.parent.postMessage({"movieLength": $("#video01")[0].duration}, 'https://www.nnn.ed.nico');
        });
      }
    });
  }
});