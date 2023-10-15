export function createMarkup({
  tags,
  views,
  likes,
  comments,
  downloads,
  largeImageURL,
  webformatURL,
}) {
  return `
  <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo-img" />
  <div class="info">
  <div class="info-items">
    <p class="info-item">
    Likes
    </p>
    <p>${likes}</p>
    </div>
    <div class="info-items">
    <p class="info-item">
    Views
    </p>
    <p>${views}</p>
    </div>
    <div class="info-items">
    <p class="info-item">
    Comments 
    </p>
    <p>${comments}</p>
    </div>
    <div class="info-items">
    <p class="info-item">
    Downloads 
    </p>
    <p>${downloads}</p>
    </div>
  </div>
</div>
        `;
}

export function updatePictures(markup) {
  document.getElementById('gallery').innerHTML = markup;
}

export function clearPicsList() {
  document.getElementById('gallery').innerHTML = '';
}
