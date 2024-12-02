
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
    const { type, id } = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        fetch(`/api/content/${type}/${id}`)
            .then(response => response.json())
            .then(data => setDetails(data))
            .catch(error => console.error('Error fetching details:', error));
    }, [type, id]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{details.title}</h1>
            <p>{details.description}</p>
            <p>Release Date: {details.releaseDate}</p>
            <p>Rating: {details.rating}</p>
        </div>
    );
};

export default Details;