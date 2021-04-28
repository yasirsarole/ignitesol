import React from 'react';
import axios from 'axios';

// import components
import SearchContainer from './children/SearchContainer';
import Loader from '../Loader';

class GenreDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      books: [],
      nextPageUrl: null,
      prevPageUrl: null,
      pageTitle: null
    }
  }

    async componentDidMount() {
      let booksTotal = {};
      let nextPageUrl = null;
      let prevPageUrl = null;

      await axios.get('http://skunkworks.ignitesol.com:8000/books')
        .then(function (response) {
          booksTotal =  response.data.results;
          nextPageUrl =  response.data.next;
          prevPageUrl =  response.data.previous;
        })
        .catch(function (error) {
          console.log('error==>', error)
        })
        
        let pageTitle = this.props.location.state;

        // filter books according to the genre
        let books = this.filterbooks(booksTotal, pageTitle);

        // console.log('books==>', books)

        this.setState({
          books,
          nextPageUrl,
          prevPageUrl,
          pageTitle
        })
    }

    // function for filtering books according to the genre
    filterbooks = (booksTotal, pageTitle) => {
      let books =  booksTotal.filter((book) => {
        var returnBook = false;

        if (book.subjects.length) {
          book.subjects.forEach((subject) => {
            if (subject.toLowerCase().indexOf(pageTitle.toLowerCase()) > -1) {
              returnBook = true;
            }
          })
        }

        return returnBook;
      });

      // viewable link for each book
      books.forEach((book, index) => {
        let formatArray = Object.values(book.formats);
        let viewableLink = '';

        formatArray.forEach(format => {
          // check for html
          if (format.indexOf('.htm') > -1 || format.indexOf('.html') > -1) {
            viewableLink = format
          }
          // check for pdf
          if (format.indexOf('.pdf') > -1 && !viewableLink) {
            viewableLink = format
          }
          // check for txt
          if (format.indexOf('.txt') > -1 && !viewableLink) {
            viewableLink = format
          }
        })

        books[index] = {
          book,
          viewableLink
        }
      })

      return books;
    }

    render() {
        return (
          <>
          {
            (!this.state.pageTitle && <Loader />) || (<div className="main-container">
              <div className="wrapper">
                <SearchContainer pageTitle={this.state.pageTitle} />
              </div>
            </div>)
          }
          </>
        )
    }
}

export default GenreDetail;

// Using placeholder images as image links are not available in response - https://via.placeholder.com/145x205