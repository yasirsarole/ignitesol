import React from 'react';
import axios from 'axios';

// import components
import SearchContainer from './children/SearchContainer';
import BookResults from './children/BookResults';
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

    componentDidMount() {
      document.addEventListener('scroll', this.trackScrolling);

      this.getBooksFromApi('http://skunkworks.ignitesol.com:8000/books');
    }
    
    componentWillUnmount() {
      document.removeEventListener('scroll', this.trackScrolling);
    }

    // get document height
    getDocHeight = () => {
      var D = document;
      return Math.max(
          D.body.scrollHeight, D.documentElement.scrollHeight,
          D.body.offsetHeight, D.documentElement.offsetHeight,
          D.body.clientHeight, D.documentElement.clientHeight
      )
    }

    // check the scroll percentage
    amountscrolled = () => {
      var winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
      var docheight = this.getDocHeight()
      var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
      var trackLength = docheight - winheight
      var pctScrolled = Math.floor(scrollTop/trackLength * 100) 

      return pctScrolled;
    } 

    trackScrolling = () => {
      if (this.amountscrolled() === 100) {
        this.getBooksFromApi(this.state.nextPageUrl);
      }
    };

    // function to get books from api
    getBooksFromApi = async (apiUrl) => {
      let booksTotal = null;
      let nextPageUrl = null;
      let prevPageUrl = null;

      await axios.get(apiUrl)
      .then(function (response) {
        booksTotal =  response.data.results;
        nextPageUrl =  response.data.next;
        prevPageUrl =  response.data.previous;
      })
      .catch(function (error) {
        console.log('error==>', error)
      });

      let pageTitle = this.props.location.state;

      // filter books according to the genre
      let books = this.filterbooks(booksTotal, pageTitle);

      this.setState({
        books: [...this.state.books, ...books],
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

    // logic to check if link is present
    onBookCoverClick = (viewableLink) => {
      if (viewableLink) {
        window.open(viewableLink, "_blank");
      } else {
        alert("No viewable version available");
      }
    }

    render() {
        return (
          <>
          {
            (!this.state.pageTitle && <Loader />) || (<div className="main-container">
              <div className="wrapper">
                <SearchContainer pageTitle={this.state.pageTitle} />
              </div>
              <BookResults books={this.state.books} onBookCoverClick={this.onBookCoverClick} />
            </div>)
          }
          </>
        )
    }
}

export default GenreDetail;
