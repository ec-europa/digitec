/**
 *
 * Event/Row
 *
 */

import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Row.module.scss';

// import Checkbox from './Checkbox';

// FlipMove needs Row to be a class (not a stateless function)
// eslint-disable-next-line react/prefer-stateless-function
class Row extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.checked !== this.props.checked;
  }

  render() {
    const { event, displayTime } = this.props;

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

    const learnMore = true;
    /*
      (event.description && event.description.length > 0) ||
      (event.speakers && event.speakers.length > 0) ||
      (event.guests && event.guests.length > 0) ||
      (event.moderator && event.moderator.length > 0);
    */

    /*eslint-disable */
    return (
      <li className={rowClasses}>
        <div className={styles.primary}>
          {learnMore ? (
            <div>
              <Link
                className={styles.title}
                to={{
                  pathname: event.slug,
                  state: { modal: true },
                }}
              >
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
        {event.register && (
          <span className={styles.secondary}>checkbox here</span>
        )}
      </li>
    );
    /* eslint-enable */
  }
}

Row.propTypes = {
  event: PropTypes.object,
  checked: PropTypes.bool,
  onToggle: PropTypes.func,
  displayTime: PropTypes.bool,
};

Row.defaultProps = {
  event: {},
  checked: false,
  displayTime: true,
};

export default Row;
