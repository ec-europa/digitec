/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Headroom from 'headroom.js';

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
    this.headroom = new Headroom(this.header, {
      offset: 6 * 16,
      tolerance: 5,
      classes: {
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
    const { drawerOpen } = this.state;

    if (this.header.contains(document.activeElement)) {
      // Make sure to pin the header when a child is focused
      this.headroom.pin();

      // Toggle the drawer if it's closed
      if (!drawerOpen && this.navigation.contains(document.activeElement)) {
        this.setState({ drawerOpen: !drawerOpen });
        event.preventDefault();
      }
    } else if (drawerOpen) {
      this.setState({ drawerOpen: !drawerOpen });
      event.preventDefault();
    }
  }

  handleKeyDown(event) {
    const { drawerOpen } = this.state;

    // Close drawer on ESC
    if (drawerOpen && event.keyCode === 27) {
      event.preventDefault();
      this.setState({ drawerOpen: !drawerOpen });
    }
  }

  handleRequestToggleDrawer(event) {
    const { drawerOpen } = this.state;
    event.preventDefault();

    this.setState({ drawerOpen: !drawerOpen });
  }

  closeDrawer() {
    const { drawerOpen } = this.state;

    if (drawerOpen) {
      this.setState({ drawerOpen: !drawerOpen });
    }
  }

  render() {
    const { title } = this.props;
    const { drawerOpen } = this.state;

    return (
      <nav
        className={styles.container}
        ref={(c) => {
          this.header = c;
        }}
      >
        <input
          tabIndex="0"
          type="checkbox"
          id="toggleDrawer"
          className={styles.toggleDrawer}
          checked={drawerOpen}
          aria-label="Toggle the drawer"
          onClick={this.handleRequestToggleDrawer}
          onKeyPress={this.handleRequestToggleDrawer}
        />
        <div className={styles.mobileBar}>
          <button
            aria-label="Toggle the drawer"
            className={styles.navToggle}
            id="toggle-drawer"
            onClick={this.handleRequestToggleDrawer}
            onKeyPress={this.handleRequestToggleDrawer}
            tabIndex="0"
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{title}</h1>
          </div>
        </div>
        <label
          aria-label="Toggle the drawer"
          className={styles.overlay}
          htmlFor="toggleDrawer"
          onClick={this.closeDrawer}
        />
        <div
          className={styles.navigation}
          ref={(c) => {
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
              <NavbarItem to="/gallery" onClick={this.closeDrawer}>
                Gallery
              </NavbarItem>
              <NavbarItem to="/practical" onClick={this.closeDrawer}>
                Practical
              </NavbarItem>
              <NavbarItem to="/digitec/news/" external>
                Newsletter
              </NavbarItem>
              <NavbarItem to="/digitec/news/past-events" external>
                Past Events
              </NavbarItem>
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
