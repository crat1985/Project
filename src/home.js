function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function afficherDate() {
  while (true) {
    await pause(1000);
    var day = new Date();
    var hour =
      ("0" + day.getHours()).slice(-2) +
      ":" +
      ("0" + day.getMinutes()).slice(-2);
    var dateheure = hour;
    var dateheure = dateheure.replace(/(^\w{1})|(\s+\w{1})/g, (lettre) =>
      lettre.toUpperCase()
    );
    document.getElementById("hour").innerHTML = dateheure;
  }
}
afficherDate();

const searchBar = document.querySelector(".search-bar")
searchBar.addEventListener("keypress",e=>{
  if(e.key=="Enter"){
    location.href = "https://google.com/search?q="+searchBar.value
  }
})