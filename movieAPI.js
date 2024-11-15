import accepts from 'accepts';
import dotenv from 'dotenv';
dotenv.config();
const API_KEY = process.env.MOVIE_API_KEY;

// Function to search movie by name
// Parameters: movie name
// returns list of movie search results
// Need to call with await
async function searchMovie(movieName){
    let responselist = [];
    const movie = encodeURIComponent(movieName);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie}&include_adult=false&language=en-US&page=1`;
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

// Function to search movie by rating 
// returns list of movies that are popular in the movieDB
// Need to call with await
async function popularMovies(){
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


// Function to return movie poster
// Parameters: movie name
// returns image url
// Need to call with await

// Function to search actor
// Parameters: Actor name
// Need to call with await
