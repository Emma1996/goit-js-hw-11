import PicsApi from './PicsApi';
import LoadMoreBtn from './LoadMoreBtn.js';
import { clearPicsList, createMarkup, updatePictures } from './markup.js';
import Notiflix from 'notiflix';

Notiflix.Notify.init();
const picsApi = new PicsApi();
const loadMoreBtn = new LoadMoreBtn('loadMoreBtn', true);
let markups = [];
let notFirstCall = false;
const form = document.getElementById('search-form');
const input = document.querySelector('input');

form.addEventListener('submit', onSubmit);
input.addEventListener('input', e => {
  loadMoreBtn.hide();
  markups = [];
  clearPicsList();
});

async function onSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const inputValue = form.elements.searchQuery.value;

  picsApi.query = inputValue;
  picsApi.resetPage();
  await fetchPics();
  if (notFirstCall && picsApi.totalHits > 0) {
    Notiflix.Notify.success(`Hooray! We found ${picsApi.totalHits} images.`);
  }
  notFirstCall = true;
}

const onLoadMore = async () => {
  picsApi.incrementPage();
  await fetchPics();
};

loadMoreBtn.getButton().addEventListener('click', onLoadMore);

const fetchPics = async () => {
  const data = await picsApi.getPics();
  if (data.pics.length === 0) {
    Notiflix.Notify.info(`No data found for this entry: ${picsApi.query}.`);
  }

  markups = markups.concat(data.pics.map(element => createMarkup(element)));
  updatePictures(markups);
  if (markups.length > 0) {
    loadMoreBtn.show();
  }

  if (markups.length == data.totalHits && markups.length > 0) {
    loadMoreBtn.hide();
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
};
