import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
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
      currentIndex: 0,
      lightboxIsOpen: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.loadMorePhotos = this.loadMorePhotos.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
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
    const { totalPages, pageNum, photos } = this.state;
    const { photos: photosFromProps } = this.props;

    if (e) {
      e.preventDefault();
    }

    if (pageNum >= totalPages) {
      this.setState({ loadedAll: true });
      return;
    }

    const newPhotos = photosFromProps.slice(
      pageNum * photosPerPage,
      (pageNum + 1) * photosPerPage
    );

    this.setState({
      photos: photos ? photos.concat(newPhotos) : newPhotos,
      pageNum: pageNum + 1,
      loadedAll: pageNum + 1 >= totalPages,
    });
  }

  openLightbox(event, obj) {
    event.preventDefault();

    this.setState({
      currentIndex: obj.index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentIndex: 0,
      lightboxIsOpen: false,
    });
  }

  render() {
    const { photos, loadedAll, lightboxIsOpen, currentIndex } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header} />
        {photos && photos.length > 0 ? (
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
            <ModalGateway>
              {lightboxIsOpen ? (
                <Modal closeOnBackdropClick onClose={this.closeLightbox}>
                  <Carousel views={photos} currentIndex={currentIndex} />
                </Modal>
              ) : null}
            </ModalGateway>
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>No photos for the moment.</p>
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
