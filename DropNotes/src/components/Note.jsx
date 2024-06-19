import { forwardRef } from "react";

// export default function Note({ initialPosition, ...props }) {
//     console.log(initialPosition?.x , "intialPosotion___")
//   return (

//   );
// }

const Note = forwardRef(({ context, initialPosition, ...props }, ref) => {
  console.log(initialPosition , "intialPostion___")
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${initialPosition?.x}px`,
        top: `${initialPosition?.y}px`,
        border: "1px solid black",
        userSelect: "none",
        padding: "10px",
        width: "200px",
        cursor: "move",
        backgroundColor: "lightyellow",
      }}
      {...props}
    >
      {context}
    </div>
  );
});

export default Note;
