import React from 'react';

const Offcanvas = ({show, children, className}) => {
  return (
    <>
      {show && 
        <div className={`${className} fixed right-0 top-0 w-screen h-screen max-w-screen max-h-screen overflow-hidden`}>
          {children}
        </div>
      }
    </>
  );
};

export default Offcanvas;