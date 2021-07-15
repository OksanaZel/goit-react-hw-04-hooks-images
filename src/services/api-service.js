import axios from 'axios';
import { BASE_URL, API_KEY } from "../services/constants";

axios.defaults.baseURL = BASE_URL;
        
async function fetchImages(searchQuery, page) {
    const url = `/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`
    const { data } = await axios.get(url);
    return data.hits;
}
    
export default fetchImages;