// function getData() {
//   let body = document.querySelector('body');
//   let img = document.createElement('img')
//   body.appendChild(img);
//   const url = "https://xkcd.now.sh/?comic=latest";
//   const xhr = new XMLHttpRequest();
//   xhr.responseType = 'json';
//   xhr.onload = function () {
//     if (xhr.status == 200) {
//       console.log(xhr.status);
//       img.src = xhr.response.img;   
//     } else {
//       console.log(xhr.status);
//   }
//   }
//   xhr.onerror = function () {
//    console.log("something went wrong")

//   }


//   xhr.open("GET", url);
//   xhr.send();
// }
// getData();


function getData() {
  const url = "https://xkcd.now.sh/?comic=latest";
  let body = document.querySelector('body');
  let img = document.createElement('img')
  body.appendChild(img);
  axios.get(url)
    .then(function (response) {
      // handle success
      console.log(response);
      img.src = response.data.img;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })


}
getData();