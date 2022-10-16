let xhr = new XMLHttpRequest();

let engine = "duckduckgo"
let search = "apple"
let lang = "fr-fr"

xhr.open("GET", "https://serpapi.com/search.json?engine="+engine+"&q="+search+"&kl="+lang);
xhr.responseType = 'json';
xhr.setRequestHeader("Access-Control-Allow-Origin","*")
document.domain = "serpapi.com";
xhr.send();

// function callOtherDomain() {
//     if (xhr) {
//         xhr.open("GET", "https://serpapi.com/search.json?engine="+engine+"&q="+search+"&kl="+lang,true);
//         xhr.withCredentials = true;
//         // xhr.onreadystatechange = function(content){
//         //     var response = JSON.parse(xhr.response);
//         //     console.log(response);
//         // }
//         xhr.onload = () => {
//             var response = JSON.parse(xhr.response);
//             console.log(response);
//         }
//         xhr.send();
//     }
// }

// // document.domain = "serpapi.com";

// callOtherDomain()

// $.ajax({
//     type: 'GET',
//     url: "https://serpapi.com/search.json?engine="+engine+"&q="+search+"&kl="+lang,
//     crossDomain: true,
//     // data: '{"some":"json"}',
//     dataType: 'json',
//     success: function(responseData, textStatus, jqXHR) {
//         // var value = responseData.someKey;
//         var response = JSON.parse(responseData);
//         console.log(response);
//     },
//     error: function (responseData, textStatus, errorThrown) {
//         alert('GET failed.');
//     }
// });
