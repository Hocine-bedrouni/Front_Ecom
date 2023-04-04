import React from 'react';

const ErgonomyIcon = (props) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={60}
    height={60}
    fill="none"
    {...props}
  >
    <mask
      id="b"
      width={36}
      height={36}
      x={13}
      y={13}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path fill="url(#a)" d="M13.2 13.2h35v35h-35z" />
    </mask>
    <g mask="url(#b)">
      <path fill="#FE880C" d="M5.123 6.47h49.808v49.807H5.123z" />
    </g>
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#c" transform="scale(.0078)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="c"
        width={128}
        height={128}
      />
    </defs>
  </svg>
  );
};

export default ErgonomyIcon;