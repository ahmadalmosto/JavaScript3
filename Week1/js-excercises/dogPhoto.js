function dogPhoto() {
  var url = "https://dog.ceo/api/breeds/image/random";
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const dataResponse = JSON.parse(xhr.responseText);
    let photo = dataResponse.message;
    let button1 = document.getElementById("firstBtn");
    button1.addEventListener('click', () => {
      let ul = document.getElementById("dogList");
      let li = document.createElement('li');
      let img = document.createElement('img');
      img.src = photo;
      li.appendChild(img)
      ul.appendChild(li);

    })
    if (dataResponse.status < 400) {
      console.log(dataResponse.status);
    } else {

    }
  }
  xhr.onerror = function () {
    console.log('connection error', dataResponse.status)
  }
  xhr.open("GET", url);
  xhr.send();
}
dogPhoto();

//..........
function dogImage() {

  axios.get(url)
    .then((response) => {
      // console.log(response)
      let secondBtn = document.getElementById('secondBtn');
      secondBtn.addEventListener('click', () => {
        let photo = response.data.message
        let ul = document.getElementById('dogList');
        let li = document.createElement('li');
        let img = document.createElement('img')
        img.src = photo;
        li.appendChild(img);
        ul.appendChild(li);

      })
    })
    .catch(function (error) {
      // handle error
      console.log(error.message);
    })
};
dogImage()