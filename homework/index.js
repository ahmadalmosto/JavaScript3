'use strict';

{

  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;

  }

  (function headerContent() {
    // const root = document.getElementById('root');
    const header = createAndAppend('header', root, {
      class: 'headerContent'
    });
    const h2 = createAndAppend('h2', header, {
      text: 'HYF Repositories'
    });

  }());

  function main(url) {
    fetchJSON(url, (err, repos) => {
      console.log(repos)
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }

      for (let repo of repos) {

        const ul = createAndAppend('ul', root);
        const li = createAndAppend('li', ul);
        repo.updated_at = new Date(repo.updated_at).toLocaleString();
        li.innerHTML = `Repository : ${repo.name}</br> Description : ${repo.description}
        </br> Forks : ${repo.forks}</br> Updated : ${repo.updated_at}`;

        repos.sort((a, b) => {
          return a.name.localeCompare(b.name);
        })

      }

    });
  }
  

  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=10';
  window.onload = () => main(HYF_REPOS_URL);
}
