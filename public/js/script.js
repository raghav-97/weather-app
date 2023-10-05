const btn = document.getElementsByClassName("nav-link");

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("load", function () {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log(latitude, longitude);
      });
    } else {
      console.log("Location Not Found");
    }
  });
}

let date = new Date();
console.log(date);


