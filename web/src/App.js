import React, { useRef, useEffect, useState, useCallback } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faDollarSign,
    faMoneyBill,
    faSackDollar,
    faMoneyBill1,
    faLandmark,
    faWallet,
    faCoins,
    faReceipt,
    faVault,
    faPiggyBank,
    faMoneyBillWave,
    faMoneyBill1Wave,
    faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import JsBarcode from "jsbarcode"; // Import jsbarcode

// Add the icons to the library
library.add(
    faMoneyBill,
    faSackDollar,
    faMoneyBill1,
    faLandmark,
    faWallet,
    faCoins,
    faReceipt,
    faVault,
    faPiggyBank,
    faMoneyBillWave,
    faMoneyBill1Wave,
    faMoneyBillTransfer
);

function App() {
    const prizeCanvasRef = useRef(null);
    const scratchCanvasRef = useRef(null);
    const barcodeCanvasRef = useRef(null); // Barcode canvas reference
    const [isDrawing, setIsDrawing] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 600, height: 900 }); // Fixed size for 5x5 grid
    const [hasWon, setHasWon] = useState(false);
    const [shapes, setShapes] = useState([]); // Track the shapes in the grid
    const rows = 5;
    const cols = 5;

    const handleResize = useCallback(() => {
        setCanvasSize({ width: 600, height: 900 }); // Fixed size for 5x5 grid
    }, []);

    const generateShapes = useCallback(() => {
        const newShapes = [];

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                const shapeType = "shape";
                row.push({ type: shapeType });
            }
            newShapes.push(row);
        }
        setShapes(newShapes);
    }, []);

    const generateBarcode = useCallback(() => {
        const generateRandomNumber = () => {
            let randomBarcode = "";
            while (randomBarcode.length < 23) {
                randomBarcode += Math.floor(Math.random() * 10); // Append a random digit (0-9)
            }
            return randomBarcode;
        };
        const randomBarcode = generateRandomNumber();
        console.log(randomBarcode);
        const barcodeCanvas = barcodeCanvasRef.current;
        JsBarcode(barcodeCanvas, randomBarcode, {
            format: "CODE128",
            width: 3,
            height: 40,
            background: "#555555",
            lineColor: "#ffffff"
        });
    }, []);

    const drawPrizeLayer = useCallback(() => {
        const icons = [
            faMoneyBill,
            faSackDollar,
            faMoneyBill1,
            faLandmark,
            faWallet,
            faCoins,
            faReceipt,
            faVault,
            faPiggyBank,
            faMoneyBillWave,
            faMoneyBill1Wave,
            faMoneyBillTransfer,
        ];
        const amounts = [1, 2, 5, 10, 20, 50, 100];
        const prizeCanvas = prizeCanvasRef.current;
        const ctx = prizeCanvas.getContext("2d");
        const cellWidth = prizeCanvas.width / cols;
        const cellHeight = (prizeCanvas.height - 100) / rows;

        // Clear the prize layer before drawing shapes
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "#555";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        shapes.forEach((row, i) => {
            row.forEach((shape, j) => {
                const x = j * cellWidth;
                const y = i * cellHeight;

                // Draw border around each cell with rounded corners
                const borderPadding = 0.05 * cellWidth;
                const borderRadius = 10; // Radius for rounded corners
                ctx.strokeStyle = "white"; // Inverted border color
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x + borderPadding + borderRadius, y + borderPadding);
                ctx.lineTo(
                    x + cellWidth - borderPadding - borderRadius,
                    y + borderPadding
                );
                ctx.quadraticCurveTo(
                    x + cellWidth - borderPadding,
                    y + borderPadding,
                    x + cellWidth - borderPadding,
                    y + borderPadding + borderRadius
                );
                ctx.lineTo(
                    x + cellWidth - borderPadding,
                    y + cellHeight - borderPadding - borderRadius
                );
                ctx.quadraticCurveTo(
                    x + cellWidth - borderPadding,
                    y + cellHeight - borderPadding,
                    x + cellWidth - borderPadding - borderRadius,
                    y + cellHeight - borderPadding
                );
                ctx.lineTo(
                    x + borderPadding + borderRadius,
                    y + cellHeight - borderPadding
                );
                ctx.quadraticCurveTo(
                    x + borderPadding,
                    y + cellHeight - borderPadding,
                    x + borderPadding,
                    y + cellHeight - borderPadding - borderRadius
                );
                ctx.lineTo(x + borderPadding, y + borderPadding + borderRadius);
                ctx.quadraticCurveTo(
                    x + borderPadding,
                    y + borderPadding,
                    x + borderPadding + borderRadius,
                    y + borderPadding
                );
                ctx.closePath();
                ctx.stroke();

                // Choose a random icon from the list
                const randomIcon =
                    icons[Math.floor(Math.random() * icons.length)];
                const [width, height, , , svgPathData] = randomIcon.icon;

                const svgString = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
            <path fill="white" d="${svgPathData}"/> <!-- Inverted fill color -->
          </svg>`;
                const img = new Image();
                img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;

                img.onload = () => {
                    // Calculate the size of the icon to occupy a square dimension at the top of the cell
                    const iconSize = Math.min(cellWidth, cellHeight) * 0.5;
                    const offsetX = (cellWidth - iconSize) / 2;
                    const offsetY = cellHeight * 0.2;

                    ctx.drawImage(
                        img,
                        x + offsetX,
                        y + offsetY,
                        iconSize,
                        iconSize
                    );

                    // Choose a random amount from the list
                    const amount =
                        amounts[Math.floor(Math.random() * amounts.length)];

                    // Draw the amount just below the icon
                    ctx.font = `bold ${
                        cellHeight * 0.18
                    }px 'Roboto', sans-serif`;
                    ctx.fillStyle = "white"; // Inverted text color
                    ctx.textAlign = "center";
                    ctx.fillText(
                        `$${amount}`,
                        x + cellWidth / 2,
                        y + offsetY + iconSize + cellHeight * 0.2
                    );
                };
            });
        });
    }, [shapes]);

    const drawScratchLayer = useCallback(() => {
        const scratchCanvas = scratchCanvasRef.current;
        const ctx = scratchCanvas.getContext("2d");

        // Create a canvas for the sparkle pattern
        const sparkleCanvas = document.createElement("canvas");
        const sparkleCtx = sparkleCanvas.getContext("2d");
        sparkleCanvas.width = 100;
        sparkleCanvas.height = 100;

        // Draw the purple base
        sparkleCtx.fillStyle = "#00963C";
        sparkleCtx.fillRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);

        // Draw random sparkles
        for (let i = 0; i < 75; i++) {
            sparkleCtx.fillStyle = "rgba(255, 255, 255, " + Math.random() + ")";
            sparkleCtx.beginPath();
            sparkleCtx.arc(
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 2,
                0,
                Math.PI * 2
            );
            sparkleCtx.fill();
        }

        // Create a pattern from the sparkle canvas
        const sparklePattern = ctx.createPattern(sparkleCanvas, "repeat");

        // Fill the scratch area with the sparkle pattern
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = sparklePattern;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw a thicker black border around each cell
        const cellWidth = scratchCanvas.width / cols;
        const cellHeight = (scratchCanvas.height - 100) / rows;
        const borderWidth = cellWidth * 0.04;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = j * cellWidth;
                const y = i * cellHeight;

                // Draw black border around each cell
                ctx.strokeStyle = "black";
                ctx.lineWidth = borderWidth;
                ctx.strokeRect(x, y, cellWidth, cellHeight);

                // Get Font Awesome SVG data
                const icon = faDollarSign.icon;
                const [width, height, , , svgPathData] = icon;

                // Create an SVG string with the gold gradient
                const svgString = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:rgb(255,45,0);stop-opacity:1" />
                  <stop offset="100%" style="stop-color:rgb(255,215,0);stop-opacity:1" />
                </linearGradient>
              </defs>
              <path fill="url(#goldGradient)" stroke="#000" stroke-width="6" d="${svgPathData}"/>
            </svg>`;
                const img = new Image();
                img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;

                img.onload = () => {
                    // Calculate the size of the icon to occupy 80% of the cell
                    const iconWidth = cellWidth * 0.8;
                    const iconHeight = cellHeight * 0.8;
                    const offsetX = (cellWidth - iconWidth) / 2;
                    const offsetY = (cellHeight - iconHeight) / 2;

                    // Draw the SVG symbols in a grid
                    ctx.drawImage(
                        img,
                        x + offsetX,
                        y + offsetY,
                        iconWidth,
                        iconHeight
                    );
                };
            }
        }
    }, []);

    useEffect(() => {
        handleResize(); // Set the fixed size on component mount
        generateShapes();
        generateBarcode();
    }, [generateShapes, handleResize, generateBarcode]);

    useEffect(() => {
        drawPrizeLayer();
        drawScratchLayer();
    }, [shapes, canvasSize, drawPrizeLayer, drawScratchLayer]);

    const handleMouseDown = () => {
        setIsDrawing(true);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleMouseMove = (event) => {
        if (event.buttons !== 1) {
            setIsDrawing(false);
            return;
        }

        setIsDrawing(true); // Ensure drawing continues if the mouse is pressed

        if (!isDrawing || hasWon) return;

        const canvas = scratchCanvasRef.current;
        const ctx = canvas.getContext("2d");

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const eraserSize = 50; // Diameter of the eraser circle

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, eraserSize / 2, 0, Math.PI * 2, true);
        ctx.fill();

        // Calculate erased area
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let erasedPixels = 0;

        for (let i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] === 0) {
                erasedPixels++;
            }
        }

        const totalPixels = canvas.width * canvas.height;
        const erasedPercentage = (erasedPixels / totalPixels) * 100;

        if (erasedPercentage > 75) {
            setHasWon(true);
            animateScratchLayerErase();
        }
    };

    const handleMouseLeave = () => {
        setIsDrawing(false);
    };

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    const resetGame = () => {
        setHasWon(false);
        generateShapes();
        drawScratchLayer(); // Ensure the cover layer is redrawn
    };

    const animateScratchLayerErase = () => {
        const canvas = scratchCanvasRef.current;
        const ctx = canvas.getContext("2d");
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.sqrt(centerY * centerY + centerY * centerY);
        let currentRadius = 0;
        const speed = 5;

        ctx.globalCompositeOperation = "destination-out";
        const eraseCircle = () => {
            ctx.beginPath();
            ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
            ctx.fill();

            currentRadius += speed;
            if (currentRadius < maxRadius) {
                requestAnimationFrame(eraseCircle);
            } else {
                setHasWon(true);
            }
        };

        eraseCircle();
    };

    return (
        <div className="App">
            {hasWon && <div className="message">Congratulations, You Win!</div>}
            <div className="canvas-container">
                <canvas
                    ref={prizeCanvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                ></canvas>
                <canvas
                    className="barcode"
                    ref={barcodeCanvasRef}
                    width={canvasSize.width}
                    height={100}
                ></canvas>
                <canvas
                    ref={scratchCanvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                ></canvas>
            </div>
            {hasWon && (
                <button onClick={resetGame} className="reset-button">
                    Reset Game
                </button>
            )}
        </div>
    );
}

export default App;
