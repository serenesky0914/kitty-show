import React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(function (params, ref) {
  const { className, children, ...props } = params;

  return (
    <div
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
})

export default Card