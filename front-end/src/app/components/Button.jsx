import React from 'react';

const Button = ({children, className, onClick}) => {
  return (
    <button className={`${className} text-primary border border-primary px-7 py-2 hover:bg-primary hover:text-dark transition-colors font-rubik font-medium`}
    onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;