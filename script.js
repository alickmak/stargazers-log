const repoList = document.getElementById('starred-list');

fetch('events.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Unable to load starred repositories.');
    }
    return response.json();
  })
  .then((data) => {
    const repositories = data.repositories || [];

    if (!repositories.length) {
      repoList.innerHTML = '<li class="empty-state">No starred repositories found.</li>';
      return;
    }

    repoList.innerHTML = repositories
      .map(
        (repo) => `
          <li class="repo-item">
            <div class="repo-header">
              <a class="repo-name" href="${repo.url}" target="_blank" rel="noreferrer">
                ${repo.owner}/${repo.name}
              </a>
              <span class="repo-stars">★ ${repo.stars}</span>
            </div>
            <p class="repo-description">${repo.description}</p>
            <div class="repo-meta">
              <span class="repo-tag">${repo.language}</span>
              <span>Created ${repo.created_at}</span>
            </div>
          </li>
        `
      )
      .join('');
  })
  .catch((error) => {
    repoList.innerHTML = `<li class="empty-state">${error.message}</li>`;
  });
