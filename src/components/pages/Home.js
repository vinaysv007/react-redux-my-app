import React from 'react';
import slideBg1 from '../../img/bg1.png';
import slideBg2 from '../../img/bg2.png';
import slideBg3 from '../../img/bg3.png';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5, faCss3, faReact } from '@fortawesome/free-brands-svg-icons';
import { faBold } from '@fortawesome/free-solid-svg-icons';

class Home extends React.Component {
    constructor(props) {
        super(props);
        library.add(faHtml5, faCss3, faReact, faBold);
    }
    render() {

        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div id="slides" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#slides" data-slide-to="0" className="active"></li>
                            <li data-target="#slides" data-slide-to="1"></li>
                            <li data-target="#slides" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={slideBg1} alt={'slideBg1'} />
                                <div className="carousel-caption">
                                    <h1 className="display-4">Website Development and Managing</h1>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={slideBg2} alt={'slideBg2'} />
                                <div className="carousel-caption">
                                    <h1 className="display-4">Game Development</h1>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={slideBg3} alt={'slideBg3'} />
                                <div className="carousel-caption">
                                    <h1 className="display-4">Explore Communities </h1>
                                    <a className="btn btn-primary btn-lg" href="/login" role="button">Join Community</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row text-center padding">
                        <div className="skills col-12">
                            <h1 className="display-4">SKILLS</h1>
                            <hr />
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                            <FontAwesomeIcon className="faHtml5" icon={faHtml5} />
                            <h3>HTML5</h3>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                            <FontAwesomeIcon className="faCss3" icon={faCss3} />
                            <h3>CSS3</h3>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                            <FontAwesomeIcon className="faBold" icon={faBold} />
                            <h3>BOOTSTRAP</h3>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                            <FontAwesomeIcon className="faReact" icon={faReact} />
                            <h3>REACT</h3>
                        </div>
                    </div>

                </div >
                <div className="container-fluid">
                    <footer>
                        <div className="row-fluid">
                            <div className="col-12 text-center">
                                <hr className="light" />
                                <h5>&copy; vevistudios.com</h5>
                            </div>
                        </div>
                    </footer>
                </div>
            </React.Fragment>
        )
    }
}

export default Home;