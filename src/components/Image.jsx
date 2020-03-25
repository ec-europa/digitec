import React from 'react';
import Image from 'gatsby-image';
import PropTypes from 'prop-types';

/**
 * Gatsby Image wrapper component facilitating polyfills for IE browsers.
 * @see https://github.com/gatsbyjs/gatsby/issues/4021
 */
export const Img = ({ objFit, objPosition, imgStyle, ...rest }) => {
  const objectFit = objFit || 'cover';
  const objectPosition = objPosition || '50% 50%';
  const fontFamily = `"object-fit: ${objectFit}; object-position: ${objectPosition}"`;
  const polyfillStyles = { objectFit, objectPosition, fontFamily };

  return <Image imgStyle={{ ...imgStyle, ...polyfillStyles }} {...rest} />;
};

Img.propTypes = {
  objFit: PropTypes.string,
  objPosition: PropTypes.string,
  imgStyle: PropTypes.object,
};

Img.defaultProps = {
  objFit: '',
  objPosition: '',
  imgStyle: {},
};

export default Img;
