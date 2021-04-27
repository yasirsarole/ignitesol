import React from 'react';
import { Link } from 'react-router-dom';

// import assets
import Pattern from '../../assets/Pattern.svg';
import Fiction from '../../assets/Fiction.svg';
import Philosophy from '../../assets/Philosophy.svg';
import Drama from '../../assets/Drama.svg';
import History from '../../assets/History.svg';
import Humour from '../../assets/Humour.svg';
import Adventure from '../../assets/Adventure.svg';
import Politics from '../../assets/Politics.svg';
import Next from '../../assets/Next.svg';

class GutenbergHome extends React.Component {
  constructor() {
    super();

    this.state = {
      genres: [{
        title: 'FICTION',
        logo: Fiction
      },{
        title: 'PHILOSOPHY',
        logo: Philosophy
      },{
        title: 'DRAMA',
        logo: Drama
      },{
        title: 'HISTORY',
        logo: History
      },{
        title: 'HUMOUR',
        logo: Humour
      },{
        title: 'ADVENTURE',
        logo: Adventure
      },{
        title: 'POLITICS',
        logo: Politics
      }]
    }
  }
  render() {
    return (
      <>
        <div className="home-container">
          <div className="banner-container">
            <figure className="background-image">
              <img src={Pattern} alt="Home Background Image" />
            </figure>
            <div className="moving-container">
              <div className="wrapper">
                <h1>Gutenberg Project</h1>
                <p>A social cataloging website that allows you to freely search its database of books, annotations, and reviews.</p>
              </div>
            </div>
          </div>
          <div className="genres-main">
            <div className="wrapper">
              <div className="genres-container">
                {this.state.genres.map(({title, logo}) => {
                  return (
                    <Link to="/genre-detail" className="genre-section" key={title}>
                      <div className="genre-right">
                        <figure className="genre-logo">
                          <img src={logo} alt={title} />
                        </figure>
                        <span>{title}</span>
                      </div>
                      <figure className="arrow-logo">
                          <img src={Next} alt='Next' />
                      </figure>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default GutenbergHome;
