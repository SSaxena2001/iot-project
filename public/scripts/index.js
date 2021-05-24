function displayDate() {
  document.getElementById("ShowTime").innerHTML = Date();
}
function AutoRefresh(t) {
  setTimeout("location.reload(true);", t);
}
