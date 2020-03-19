import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Row.module.scss';

import Checkbox from './Checkbox';

// FlipMove needs Row to be a class (not a stateless function)
// eslint-disable-next-line react/prefer-stateless-function
class Row extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.checked !== this.props.checked;
  }

  render() {
    const { event, checked, displayTime, onToggleEvent } = this.props;

    let startsAt = null;
    let endsAt = null;
    let venue = null;

    if (displayTime) {
      startsAt = <time>{event.starts}</time>;

      endsAt = event.ends ? <time>{event.ends}</time> : null;
    }

    if (event.venue && event.venue.length > 0) {
      venue = displayTime ? `, ${event.venue}` : event.venue;
    }

    const rowClasses = classnames(
      styles.listItem,
      { [styles.blueItem]: event.color === 'blue' },
      { [styles.yellowItem]: event.color === 'yellow' },
      { [styles.purpleItem]: event.color === 'purple' },
      { [styles.greyItem]: event.color === 'grey' }
    );
    return (
      <li className={rowClasses}>
        <div className={styles.primary}>
          {event.readMore ? (
            <div>
              <Link className={styles.title} to={event.slug}>
                {event.title}
              </Link>
            </div>
          ) : (
            <span className={styles.title}>{event.title}</span>
          )}
          <span className={styles.subtitle}>
            {displayTime || (event.venue && event.venue.length > 0) ? (
              <span className={styles.timeAndVenue}>
                {startsAt}
                {displayTime && event.ends ? ' - ' : ''}
                {endsAt}
                {venue}
              </span>
            ) : null}
          </span>
        </div>
        <span className={styles.secondary}>
          <Checkbox
            event={event}
            checked={checked}
            onToggleEvent={onToggleEvent}
            transparent
          />
        </span>
      </li>
    );
  }
}

Row.propTypes = {
  event: PropTypes.object,
  checked: PropTypes.bool,
  onToggleEvent: PropTypes.func,
  displayTime: PropTypes.bool,
};

Row.defaultProps = {
  event: {},
  checked: false,
  displayTime: true,
};

export default Row;
