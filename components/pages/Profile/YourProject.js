// import PropTypes from "prop-types";
// import React, { useReducer } from "react";
// import "./YourProject.css";

// const YourProject = ({ property1, frameClassName, frame = "/img/frame-17-7.svg" }) => {
//   function reducer(state, action) {
//     switch (action) {
//       case "click":
//         return {
//           ...state,
//           property1: "open",
//         };
//       default:
//         return state;
//     }
//   }

//   const [state, dispatch] = useReducer(reducer, {
//     property1: property1 || "closed",
//   });

//   return (
//     <div
//       className={`frame ${state.property1}`}
//       onClick={() => {
//         dispatch("click");
//       }}
//     >
      
//       <div className="div">
//         <div className="div-2">
//           <div className="rectangle-wrapper">
//             <div className="rectangle" />
//           </div>
//           <div className="text-wrapper">UI Design</div>
//           <div className="div-wrapper">
//             <div className="text-wrapper-2">Profficient</div>
//           </div>
//         </div>
//         <img
//           className={`img ${frameClassName}`}
//           alt="Frame"
//           src={state.property1 === "open" ? "/img/frame-17-6.png" : frame}
//         />
//       </div>
//       <p className="p">Experience : Design Executive, Coding Club IITG</p>
//       <p className="p">Tools : Figma, Sketch, Webflow</p>
//     </div>
//   );
// };

// YourProject.propTypes = {
//   property1: PropTypes.oneOf(["closed", "open"]),
//   frame: PropTypes.string,
//   frameClassName: PropTypes.string,
// };

// export default YourProject;
