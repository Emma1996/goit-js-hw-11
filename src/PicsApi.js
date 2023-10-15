const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '39759882-73fa965e3ac5dd440dc8af6ef';
import Notiflix from 'notiflix';

Notiflix.Notify.init();

export default class PicsApi {
  constructor() {
    this.page = 1;
    this.query = '';
    this.perPage = 90;
    this.totalHits = 0;
  }

  async getPics() {
    const url = `${ENDPOINT}?key=${API_KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`;

    const res = await fetch(url);
    const data = await res.json();
    this.totalHits = data.totalHits;
    if (data.hits) {
      return {
        pics: data.hits.map(item => {
          return {
            webformatURL: item.webformatURL,
            largeImageURL: item.largeImageURL,
            tags: item.tags,
            likes: item.likes,
            views: item.views,
            comments: item.comments,
            downloads: item.downloads,
          };
        }),
        totalHits: data.totalHits,
      };
    } else {
      return {
        pics: [],
        totalHits: 0,
      };
    }
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}

//Different approach
// getPics = async query => {
//   try {
//     const res = await fetch(
//       `${ENDPOINT}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
//     );
//     const data = await res.json();
//     if (data.hits) {
//       return data.hits.map(item => {
//         return {
//           webformatURL: item.webformatURL,
//           largeImageURL: item.largeImageURL,
//           tags: item.tags,
//           likes: item.likes,
//           views: item.views,
//           comments: item.comments,
//           downloads: item.downloads,
//         };
//       });
//     }

//     return [];
//   } catch (error) {
//     console.error(error);
//     Notiflix.Notify.failure(` ${error?.response?.data?.message || error}`);
//   }
// };

// async function getPics(query) {
//   const response = await axios.get(`${ENDPOINT}?key=${API_KEY}&q=${query}`, {
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
//     },
//   });

//   return response.data.pictures;
// }

//export default { getPics };
