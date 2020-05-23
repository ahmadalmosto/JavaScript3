'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      // TODO: replace this comment and the console.log with your own code

      console.log('RepoView', repo);
      this.container.innerText = '';
        const repoInfos = [repo.name, repo.description, repo.forks, repo.updated_at];
        const repoNames = ['Repository', 'Description', 'Forks', 'Updated']

        const repoLi = createAndAppend('li', this.container);

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
  }

  window.RepoView = RepoView;
}
