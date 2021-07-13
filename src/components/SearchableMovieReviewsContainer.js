import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'your-key-here';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=&lt;search-term>';

class SearchableMovieReviewsContainer extends Component {
    state = {
        searchTerm: '',
        reviews: []
    };

    handleSearchInputChange = event => this.setState({searchTerm: event.target.value})

    handleSubmit = event => {
        event.preventDefault()

        fetch(URL.concat(this.state.searchTerm))
        .then(resp => resp.json())
        .then(resp => this.setState({reviews: resp.results}))
    }

    render() {
        return (
            <div className='searchable-moview-reviews'>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='search-input'>Search Movie Reviews</label>
                    <input id='search-input' type='text' onChange={this.handleSearchInputChange}></input>
                    <button type='submit'>Submit</button>
                </form>
                {typeof this.state.reviews === 'object' && this.state.reviews.length > 0 && <h1>Movie Review By Search:</h1>}
                <MovieReviews reviews={this.state.reviews} />
            </div>
        )
    }
}

export default SearchableMovieReviewsContainer;