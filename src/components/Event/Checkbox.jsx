/**
 * Events/Checkbox
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Checkbox.module.scss';

class Checkbox extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.checked !== this.props.checked;
  }

  toggle() {
    const { event, onToggleEvent } = this.props;
    return onToggleEvent(event);
  }

  render() {
    const { event, checked, idPrefix, transparent } = this.props;

    const checkboxClasses = classnames(
      { [styles.withBackground]: !transparent },
      { [styles.blueItem]: event.color === 'blue' },
      { [styles.yellowItem]: event.color === 'yellow' },
      { [styles.purpleItem]: event.color === 'purple' },
      { [styles.greyItem]: event.color === 'grey' }
    );

    return (
      <div className={checkboxClasses}>
        <input
          id={idPrefix + event.id}
          type="checkbox"
          className={styles.checkbox}
          checked={checked}
          onChange={this.toggle}
          aria-hidden="true"
        />
        <label htmlFor={idPrefix + event.id} className={styles.label}>
          <span className={styles.unchecked} />
          <span className={styles.checked} />
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  event: PropTypes.object,
  checked: PropTypes.bool,
  transparent: PropTypes.bool,
  onToggleEvent: PropTypes.func,
  idPrefix: PropTypes.string,
};

Checkbox.defaultProps = {
  event: {},
  checked: false,
  transparent: false,
  idPrefix: '',
};

export default Checkbox;
