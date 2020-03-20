import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Item.module.scss';

const Item = ({ to, children, mobileOnly, primary, external, ...rest }) => (
  <li className={classnames(styles.item, { [styles.mobileOnly]: mobileOnly })}>
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
