import React from 'react';
import axios from 'axios';

class GenreDetail extends React.Component {
    componentDidMount() {
        axios.get('http://skunkworks.ignitesol.com:8000/books')
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    render() {
        return <div>This is genre detail page</div>
    }
}

export default GenreDetail;