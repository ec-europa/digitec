import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import Measure from 'react-measure';

// Load styles
import styles from './Gallery.module.scss';

const photosPerPage = 8;

class GalleryComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: null,
      pageNum: 0,
      totalPages: props.photos.length / photosPerPage,
      loadedAll: false,
      currentImage: 0,
      lightboxIsOpen: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.loadMorePhotos = this.loadMorePhotos.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.loadMorePhotos(), 500);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 50
    ) {
      this.loadMorePhotos();
    }
  }

  loadMorePhotos(e) {
    if (e) {
      e.preventDefault();
    }

    if (this.state.pageNum >= this.state.totalPages) {
      this.setState({ loadedAll: true });
      return;
    }

    const { photos } = this.props;

    const newPhotos = photos.slice(
      this.state.pageNum * photosPerPage,
      (this.state.pageNum + 1) * photosPerPage
    );

    this.setState({
      photos: this.state.photos
        ? this.state.photos.concat(newPhotos)
        : newPhotos,
      pageNum: this.state.pageNum + 1,
      loadedAll: this.state.pageNum + 1 >= this.state.totalPages,
    });
  }

  openLightbox(event, obj) {
    event.preventDefault();

    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  render() {
    const { photos, loadedAll } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.header} />
        {photos ? (
          <div>
            <Measure whitelist={['width']}>
              {({ width }) => {
                let cols = 1;
                if (width >= 480) {
                  cols = 2;
                }
                if (width >= 1024) {
                  cols = 3;
                }
                return (
                  <Gallery
                    photos={photos}
                    cols={cols}
                    onClick={this.openLightbox}
                  />
                );
              }}
            </Measure>
            {!loadedAll && (
              <div className={styles.clearfix}>
                <p className="u-pt-1rem u-ta-center">
                  Keep scrolling down to load more pictures!
                </p>
              </div>
            )}
            <Lightbox
              images={photos}
              backdropClosesModal
              onClose={this.closeLightbox}
              onClickPrev={this.gotoPrevious}
              onClickNext={this.gotoNext}
              currentImage={this.state.currentImage}
              isOpen={this.state.lightboxIsOpen}
              showImageCount={false}
            />
          </div>
        ) : (
          <p className="u-pt-1rem u-ta-center">Loading...</p>
        )}
        <div className={styles.clearfix} />
      </div>
    );
  }
}

GalleryComponent.propTypes = {
  photos: PropTypes.array,
};

GalleryComponent.defaultProps = {
  photos: [],
};

export default GalleryComponent;
