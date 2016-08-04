window.addEventListener("DOMContentLoaded", function() {
  var img = document.querySelector(".logo");
  if (img) {
    img.addEventListener("click", function() {
      img.className = "logo click";
      setTimeout(function() {
        if (window.navigator.userAgent.toLowerCase().indexOf("android") != -1) {
          location.href = "https://play.google.com/store/apps/details?id=info.justaway";
        } else {
          location.href = "https://itunes.apple.com/jp/app/justaway/id884527819";
        }
      }, 1000);
    });
  }
}, false);