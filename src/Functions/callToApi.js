// import md5 from 'md5';

export const callToApi = async (query, page) => {
  const API_KEY_BEFORE_HIDE = "41545287-03d64db3978578b8466972b4a";
  // const API_KEY = md5(API_KEY_BEFORE_HIDE);
  const endpoint = `https://pixabay.com/api/?key=${API_KEY_BEFORE_HIDE}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;
  const resp = await fetch(endpoint);
  const extractedResp = await resp.json();
  return extractedResp;
};
