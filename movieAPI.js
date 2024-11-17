import accepts from 'accepts';
import dotenv from 'dotenv';
dotenv.config();
const API_KEY = process.env.MOVIE_API_KEY;

// Function to search database for movie, tv show, actor
// Parameters: string to search
// returns list of search results in json format
// Need to call with await
export async function searchMovieDatabase(stringToSearch){
    let responselist = [];
    const query = encodeURIComponent(stringToSearch);
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: API_KEY
        }
    };

    try{
        const response = await fetch(url, options);
        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }

        const responseData = await response.json();
        responseData.results.forEach(element => {
            responselist.push(element);
        });
        return responselist

    } catch(error){
        console.error(error.message);
    }

}

// Function to get popular movies
// returns list of movies that are popular in the movieDB
// Need to call with await
export async function popularMovies(){
    let responseList = [];
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: API_KEY
        }
    }
    try{
        const response = await fetch(url, options);
        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`);
        }

        const responseData = await response.json();
        responseData.results.forEach(element => {
            responseList.push(element);
        });
        return responseList
    } catch(error){
        console.log(error.message);
    }
}

// Function to get popular tv shows
// returns list of tv shows that are popular in the movieDB
// Need to call with await
export async function popularTVShows(){
    let responseList = [];
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: API_KEY
        }
    }
    try{
        const response = await fetch(url, options);
        if(!response.ok){
            throw new Error(`Response Status: ${response.status}`)
        }
        const responseData = await response.json();
        responseData.results.forEach(element => {
            responseList.push(element);
        });
        return responseList;
    } catch(error){
        console.log(error);
    }
}
