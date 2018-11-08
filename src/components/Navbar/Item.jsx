/**
 *
 * Item
 *
 * Not a PureComponent (same as Link)
 *
 */

import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Item.module.scss';

class Item extends React.Component {
  render() {
    const { to, children, mobileOnly, primary, external, ...rest } = this.props;

    // Remove router's properties from "rest"
    delete rest.match;
    delete rest.location;
    delete rest.history;
    delete rest.staticContext;

    return (
      <li
        className={classnames(styles.item, { [styles.mobileOnly]: mobileOnly })}
      >
        {to.indexOf('http') === 0 || to.indexOf('https') === 0 || external ? (
          <a
            className={classnames(styles.link, { [styles.primary]: primary })}
            href={to}
            {...rest}
          >
            {children}
          </a>
        ) : (
          <Link
            className={classnames(styles.link, { [styles.primary]: primary })}
            exact
            activeClassName={styles.active}
            to={to}
            {...rest}
          >
            {children}
          </Link>
        )}
      </li>
    );
  }
}

Item.propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  mobileOnly: PropTypes.bool,
  primary: PropTypes.bool,
  external: PropTypes.bool,
};

Item.defaultProps = {
  children: null,
  location: {
    pathname: '',
  },
  mobileOnly: false,
  primary: false,
  external: false,
};

export default Item;
