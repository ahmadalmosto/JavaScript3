function addFriend() {
  const url = "https://www.randomuser.me/api";
  let xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    xhr.open("GET", url);
    const responseInfo = parse.Json(xhr.responseText);
    console.log(responseInfo);
    xhr.send();

  })

  xhr.onload = function () {
    if (this.status === 200 && this.status < 400) {
      console.log(xhr.status + xhr.message)
    } else {
      console.log('http error', xhr.status)
    }
  }
  xhr.onerror = function () {
    console.log('something went wrong');
  }
  axios.get(url)
    .then(function (response) {

      console.log(response);
    })
    .catch(function (error) {

      console.log(error);
    })
}

addFriend();