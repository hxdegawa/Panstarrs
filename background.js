let isDisabled,
    isFirstTimeOfDay,
    lastBootedDate,
    isFirstTime,
    isNotifDisabled;

chrome.storage.local.get({'lastBootedDate' : 0}, function (e) {
  lastBootedDate = e.lastBootedDate;
});

chrome.storage.local.get({'isFirstTimeOfDay' : true}, function (e) {
  isFirstTimeOfDay = e.isFirstTimeOfDay;
});

chrome.storage.local.get({'isNotifDisabled' : true}, function (e) {
  isNotifDisabled = !e.isNotifDisabled;
});

chrome.storage.local.get({'isDisabled' : false}, function (e) {
  isDisabled = !e.isDisabled;
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request === "checkMainStatus"){
    sendResponse({"status": isDisabled});
  }else if (request === "changeMainStatus"){
    chrome.storage.local.get("isDisabled", function(e){
      if(e.isDisabled){
        chrome.storage.local.set({"isDisabled": false}, null);
      }else{
        chrome.storage.local.set({"isDisabled": true}, null);
      }
      isDisabled = e.isDisabled;
    });
    sendResponse({"status": !isDisabled});
  }else if (request === "checkNotificationStatus"){
    sendResponse({"status": isNotifDisabled});
  }
  else if(request === "changeNotificationStatus"){
    chrome.storage.local.get("isNotifDisabled", function(e){
      if(e.isNotifDisabled){
        chrome.storage.local.set({"isNotifDisabled": false}, null);
      }else{
        chrome.storage.local.set({"isNotifDisabled": true}, null);
      }
      isNotifDisabled = e.isNotifDisabled;
    });
    sendResponse({"status": !isNotifDisabled});
  }else if (request.date && request.query === "isFirstTimeOfDay"){
    
    console.log(request.date !== lastBootedDate, request.date, lastBootedDate);
    sendResponse({"status": request.date !== lastBootedDate});
    chrome.storage.local.set({"lastBootedDate": request.date}, null);
    lastBootedDate = request.date;

  }
});
