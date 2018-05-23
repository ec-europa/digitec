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
    const { to, children, mobileOnly, primary, ...rest } = this.props;

    return (
      <li
        className={classnames(styles.item, { [styles.mobileOnly]: mobileOnly })}
      >
        <Link
          className={classnames(styles.link, { [styles.primary]: primary })}
          exact
          activeClassName={styles.active}
          to={to}
          {...rest}
        >
          {children}
        </Link>
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
};

Item.defaultProps = {
  children: null,
  location: {
    pathname: '',
  },
  mobileOnly: false,
  primary: false,
};

export default Item;
