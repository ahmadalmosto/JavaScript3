'use strict';

{
  const select = document.querySelector('select');
  async function fetchJSON(url, cb) {
    try {
      const response = await axios.get(url)
      const data = response.data
      cb(null, data)
    } catch (error) {
      cb(error, null)
    }
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

    function renderRepoDetails(repo, ul) {
      createAndAppend('li', ul, {
        text: repo.name
      });
    }

    function main(url) {
      fetchJSON(url, (err, repos) => {
        const root = document.getElementById('root');
        if (err) {
          document.querySelector('.main-container').classList.add('remove');
          createAndAppend('div', root, {
            text: err.message,
            class: 'alert-error',
          });
          return;
        }

        addRepo(repos)
      });
    }

    function addRepo(repos) {
      const repoContainer = document.querySelector('.repo-container');
      const repoUl = createAndAppend('ul', repoContainer);
      const contributorsContainer = document.querySelector('.contributors-container');
      const contributorUl = createAndAppend('ul', contributorsContainer);

      repos
        .sort((a, b) =>
          a.name.localeCompare(b.name, 'en', {
            ignorePunctuation: true,
          }),
        )
        .forEach((repo, index) => {
          createAndAppend('option', select, {
            text: `${repo.name}`.toUpperCase(),
            value: index
          });

          select.addEventListener('change', (e) => {
            if (e.target.value == index) {
              contributorUl.innerText = '',
                repoContainer.innerText = '';
              createRepoInfo(repo, repoContainer, repoUl);
              getContributor(repo, contributorUl)
            }
          });
        });

      createRepoInfo(repos[0], repoUl);
      getContributor(repos[0], contributorUl)
    }

    function getContributor(repo, contributorUl) {
      const contributorURL = repo.contributors_url;
      fetchJSON(contributorURL, (contributorsError, contributorsData) => {
        if (contributorsError) {
          createAndAppend('div', root, {
            text: contributorsError.message,
            class: 'alert-error',
          });
          return;
        }

        console.log(contributorsData)
        contributorsData.forEach(person => {

          const personLi = createAndAppend('li', contributorUl);
          createAndAppend('img', personLi, {
            src: `${person.avatar_url}`,
            class: 'imageContributor'
          })
          createAndAppend('a', personLi, {
            text: `${person.login}`,
            href: `${person.html_url}`
          })
          createAndAppend('span', personLi, {
            text: `${person.contributions}`,
            class: 'numContribution'
          })
        })
      })
    }

    function createRepoInfo(repo, repoUl) {
      // console.log(repo);
      const repoInfos = [repo.name, repo.description, repo.forks, repo.updated_at];
      const repoNames = ['Repository', 'Description', 'Forks', 'Updated']

      const repoLi = createAndAppend('li', repoUl);

      repoInfos.forEach((info, index) => {
        const p = createAndAppend('p', repoLi);
        createAndAppend('span', p, {
          text: `${repoNames[index]}`
        });
        createAndAppend('span', p, {
          text: ` : ${info}`
        });
      })
    }
  
  var HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}