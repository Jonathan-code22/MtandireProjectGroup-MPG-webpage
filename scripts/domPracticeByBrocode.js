const mypic = document.getElementById("actualPic");
const actualButton = document.getElementById("actualButton");

actualButton.addEventListener("click", event => {
  if(mypic.style.visibility === "hidden"){
      mypic.style.visibility = "visible";
      actualButton.textContent = "Hide";      
  }
  else{
      mypic.style.visibility = "hidden";
      actualButton.textContent = "Show";
  }
});




