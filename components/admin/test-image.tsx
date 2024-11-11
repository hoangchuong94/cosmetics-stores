// import React, { useRef, useState, useEffect } from 'react';
// import { fabric } from 'fabric';

// const App = () => {
//   const canvasRef = useRef(null);
//   const [canvas, setCanvas] = useState(null);

//   useEffect(() => {
//     const initCanvas = new fabric.Canvas(canvasRef.current);
//     setCanvas(initCanvas);
//   }, []);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (f) => {
//       const data = f.target.result;
//       fabric.Image.fromURL(data, (img) => {
//         img.scale(0.5);
//         canvas.add(img);
//       });
//     };

//     reader.readAsDataURL(file);
//   };

//   const changeColor = (color) => {
//     const imgObj = canvas.getObjects().find(obj => obj.type === 'image');
//     if (!imgObj) return;

//     imgObj.filters.push(new fabric.Image.filters.Tint({ color }));
//     imgObj.applyFilters();
//     canvas.renderAll();
//   };

//   return (
//     <div className="App">
//       <h1>Change Product Color</h1>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       <div className="color-buttons">
//         <button onClick={() => changeColor('red')}>Red</button>
//         <button onClick={() => changeColor('green')}>Green</button>
//         <button onClick={() => changeColor('blue')}>Blue</button>
//       </div>
//       <canvas ref={canvasRef} width={800} height={600} />
//     </div>
//   );
// };

// export default App;
