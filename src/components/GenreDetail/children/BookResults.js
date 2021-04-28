import React from 'react';

const BookResults = ({books, onBookCoverClick}) => {
    return (
        <div className="results-container">
            <div className="wrapper">
                {(books.length && books.map(({book, viewableLink}, index) => {
                    return (
                        <div className="book-container" key={index}>
                            <figure className="book-cover" onClick={() => onBookCoverClick(viewableLink)}>
                                <img src="https://via.placeholder.com/145x205" />
                            </figure>
                            <div className="book-info">
                                <p>{book.title}</p>
                                <span>{book.authors[0].name}</span>
                            </div>
                        </div>
                    )
                })) || <span>No Results Found</span>}
            </div>
        </div>
    )
}

export default BookResults;

// Using placeholder images as image links are not available in response - https://via.placeholder.com/145x205