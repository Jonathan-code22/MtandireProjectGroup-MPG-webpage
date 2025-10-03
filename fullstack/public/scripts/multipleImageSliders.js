//let sliderMain = document.getElementById("slider-main");
//let item = sliderMain.getElementsByClassName("item");

function next(t) {
  let elm = t.parentElement.parentElement.children[0];
  let item = elm.getElementsByClassName("item");
  elm.append(item[0]);
  
  //sliderMain.append(item[0]);
}

function prev(t) {
  let elm = t.parentElement.parentElement.children[0];
  let item = elm.getElementsByClassName("item");
  elm.prepend(item[item.length-1]);
  //sliderMain.prepend(item[item.length-1]);
}