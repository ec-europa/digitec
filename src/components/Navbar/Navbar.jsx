/**
 *
 * Navbar
 *
 */

import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';

import styles from './Navbar.module.scss';
import digitecLogo from '../../img/DIGITEC.svg';
import euLogo from '../../img/europe.svg';
import NavbarItem from './Item';
import NavbarSeparator from './Separator';

class Navbar extends React.PureComponent {
  constructor(props) {
    super(props);

    // Bindings
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRequestToggleDrawer = this.handleRequestToggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);

    // Init
    this.header = null;
    this.navigation = null;
    this.headroom = null;

    this.state = {
      drawerOpen: false,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line global-require
    const Headroom = require('headroom.js');

    this.headroom = new Headroom(this.header, {
      offset: 6 * 16,
      tolerance: 5,
      classes: {
        initial: styles.headroom,
        pinned: styles.headroomPinned,
        unpinned: styles.headroomUnpinned,
        top: styles.headroomTop,
      },
    });

    this.headroom.init();
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('focus', this.handleFocusChange, true);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('focus', this.handleFocusChange);
    this.headroom.destroy();
  }

  handleFocusChange(event) {
    if (this.header.contains(document.activeElement)) {
      // Make sure to pin the header when a child is focused
      this.headroom.pin();

      // Toggle the drawer if it's closed
      if (
        !this.state.drawerOpen &&
        this.navigation.contains(document.activeElement)
      ) {
        this.setState({ drawerOpen: !this.state.drawerOpen });
        event.preventDefault();
      }
    } else if (this.state.drawerOpen) {
      this.setState({ drawerOpen: !this.state.drawerOpen });
      event.preventDefault();
    }
  }

  handleKeyDown(event) {
    // Close drawer on ESC
    if (this.state.drawerOpen && event.keyCode === 27) {
      event.preventDefault();
      this.setState({ drawerOpen: !this.state.drawerOpen });
    }
  }

  handleRequestToggleDrawer(event) {
    event.preventDefault();
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  closeDrawer() {
    if (this.state.drawerOpen) {
      this.setState({ drawerOpen: !this.state.drawerOpen });
    }
  }

  render() {
    const { title } = this.props;
    const { drawerOpen } = this.state;

    return (
      <nav
        className={styles.container}
        ref={c => {
          this.header = c;
        }}
      >
        <input
          type="checkbox"
          id="toggleDrawer"
          className={styles.toggleDrawer}
          checked={drawerOpen}
          aria-label="Toggle the drawer"
        />
        <div className={styles.mobileBar}>
          <label
            htmlFor="toggleDrawer"
            className={styles.navToggle}
            onClick={this.handleRequestToggleDrawer}
            id="toggle-drawer"
            role="button"
            aria-label="Toggle the drawer"
          >
            <span />
            <span />
            <span />
          </label>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{title}</h1>
          </div>
        </div>
        <label
          htmlFor="toggleDrawer"
          className={styles.overlay}
          onClick={this.handleRequestToggleDrawer}
          role="button"
          aria-label="Toggle the drawer"
        />
        <div
          className={styles.navigation}
          ref={c => {
            this.navigation = c;
          }}
        >
          <div className={styles.innerNavbar}>
            <div className={styles.navigationHeader}>
              <div className={styles.logos}>
                <a
                  href="http://europa.eu/index_en.htm"
                  className={styles.logoEuropa}
                >
                  <img
                    src={euLogo}
                    alt="DIGITEC 2018"
                    className={styles.logo}
                  />
                </a>
                <Link to="/" className={styles.logoLink}>
                  <img
                    src={digitecLogo}
                    alt="DIGITEC 2018"
                    className={styles.logo}
                  />
                </Link>
              </div>
              <div className={styles.navigationHeaderTitle}>
                <h1>20 November, 2018</h1>
              </div>
              <div className={styles.navigationHeaderTitle}>
                <h1>Square, Brussels</h1>
              </div>
            </div>
            <ul className={styles.navLinks}>
              <NavbarItem to="/" mobileOnly onClick={this.closeDrawer}>
                Home
              </NavbarItem>
              <NavbarItem to="/speakers" onClick={this.closeDrawer}>
                Speakers
              </NavbarItem>
              <NavbarItem to="/programme" onClick={this.closeDrawer}>
                Programme
              </NavbarItem>
              <NavbarItem
                to="/my-digitec"
                onClick={this.closeDrawer}
                mobileOnly
              >
                My DIGITEC
              </NavbarItem>
              <NavbarItem to="/expo" onClick={this.closeDrawer}>
                Expo
              </NavbarItem>
              <NavbarItem to="/practical" onClick={this.closeDrawer}>
                Practical
              </NavbarItem>
              {/*
              <NavbarItem to="https://europa.eu/digitec/newsletters">
                Newsletter
              </NavbarItem>
              */}
              <NavbarSeparator />
              <NavbarItem
                to="https://twitter.com/hashtag/digitec18"
                target="_blank"
                rel="noopener noreferrer"
                mobileOnly
              >
                #digitec18
              </NavbarItem>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  title: PropTypes.string,
};

Navbar.defaultProps = {
  title: '',
};

export default Navbar;
