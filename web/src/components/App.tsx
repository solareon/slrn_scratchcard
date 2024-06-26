import React, { useRef, useEffect, useState, useCallback } from "react";
import { isEnvBrowser } from "../utils/misc";
import { icon, library } from "@fortawesome/fontawesome-svg-core";
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
import "./App.css";
import JsBarcode from "jsbarcode";

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
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";

// This will set the NUI to visible if we are
// developing in browser
debugData([
    {
        action: "setVisible",
        data: true,
    },
]);
debugData([
    {
        action: "cardSetup",
        data: { gridSizeX: 5, gridSizeY: 5, cardBgColor: "#ff00ff" },
    },
]);
debugData([
    {
        action: "prizeData",
        data: [
            { icon: "money-bill", amount: 20, color: "gold" },
            { icon: "money-bill", amount: 20, color: "gold" },
            { icon: "landmark", amount: 50 },
            { icon: "landmark", amount: 50 },
            { icon: "wallet", amount: 10 },
            { icon: "wallet", amount: 10 },
            { icon: "sack-dollar", amount: 26 },
            { icon: "sack-dollar", amount: 27 },
            { icon: "money-bill-1", amount: 28 },
            { icon: "money-bill-1", amount: 29 },
            { icon: "coins", amount: 30 },
            { icon: "coins", amount: 31 },
            { icon: "receipt", amount: 32 },
            { icon: "receipt", amount: 33 },
            { icon: "vault", amount: 34 },
            { icon: "vault", amount: 35 },
            { icon: "piggy-bank", amount: 36 },
            { icon: "piggy-bank", amount: 37 },
            { icon: "money-bill-wave", amount: 38 },
            { icon: "money-bill-wave", amount: 39 },
            { icon: "money-bill-1-wave", amount: 40 },
            { icon: "money-bill-1-wave", amount: 41 },
            { icon: "money-bill-transfer", amount: 42 },
            { icon: "money-bill-transfer", amount: 43 },
            { icon: "money-bill-transfer", amount: 43 }
        ],
    },
]);

interface CardData {
    gridSizeX: number;
    gridSizeY: number;
    cardBgColor: string;
    // other properties
  }

const App: React.FC = () => {

    const prizeCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const scratchCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const barcodeCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 600, height: 900 });
    const [hasWon, setHasWon] = useState(false);
    const [prizeData, setPrizeData] = useState<any[]>([]);
    const [gridSizeX, setGridSizeX] = useState(5);
    const [gridSizeY, setGridSizeY] = useState(5);
    const [cardBgColor, setBgColor] = useState("#00963C");

    const shuffleArray = (array: any[]) => {
        let currentIndex = array.length, randomIndex;
    
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
    
        return array;
    };

    const generateBarcode = useCallback(() => {
        const generateRandomNumber = () => {
            let randomBarcode = "";
            while (randomBarcode.length < 23) {
                randomBarcode += Math.floor(Math.random() * 10);
            }
            return randomBarcode;
        };
        const randomBarcode = generateRandomNumber();
        const barcodeCanvas = barcodeCanvasRef.current;
        JsBarcode(barcodeCanvas, randomBarcode, {
            format: "CODE128",
            width: 3,
            height: 40,
            background: "#555555",
            lineColor: "#ffffff",
        });
    }, []);

    const drawPrizeLayer = useCallback(() => {
        const prizeCanvas = prizeCanvasRef?.current;
        if (!prizeCanvas) return;
        const ctx = prizeCanvas?.getContext("2d");
        if (!ctx) return;
        const cellWidth = prizeCanvas.width / gridSizeY;
        const cellHeight = (prizeCanvas.height - 100) / gridSizeX;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "#555";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        let prizeIndex = 0;

        for (let i = 0; i < gridSizeX; i++) {
            for (let j = 0; j < gridSizeY; j++) {
                const x = j * cellWidth;
                const y = i * cellHeight;

                const borderPadding = 0.05 * cellWidth;
                const borderRadius = 10;
                ctx.strokeStyle = "white";
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
                const iconData = icon({ prefix: 'fas', iconName: prizeData[prizeIndex]?.icon});
                const iconColor = prizeData[prizeIndex]?.color || 'white';
                const [width, height, , , svgPathData] = iconData.icon;

                const svgString = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
                    <path fill="${iconColor}" d="${svgPathData}"/> <!-- Inverted fill color -->
                    </svg>`;
                const img = new Image();
                img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;

                const amount = prizeData[prizeIndex]?.amount || 1;
                prizeIndex++;
                img.onload = () => {
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

                    ctx.font = `bold ${
                        cellHeight * 0.18
                    }px 'Roboto', sans-serif`;
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    ctx.fillText(
                        `$${amount}`,
                        x + cellWidth / 2,
                        y + offsetY + iconSize + cellHeight * 0.2
                    );
                };
            }
        }
    }, [prizeData, gridSizeX, gridSizeY]);

    const drawScratchLayer = useCallback(() => {
        const scratchCanvas = scratchCanvasRef?.current;
        if (!scratchCanvas) return;

        const ctx = scratchCanvas?.getContext("2d", {
            willReadFrequently: true,
        });
        if (!ctx) return;

        const sparkleCanvas = document.createElement("canvas");
        const sparkleCtx = sparkleCanvas.getContext("2d");
        sparkleCanvas.width = 100;
        sparkleCanvas.height = 100;

        if (sparkleCtx) {
            sparkleCtx.fillStyle = cardBgColor;
            sparkleCtx.fillRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);

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
        };

        const sparklePattern = ctx.createPattern(sparkleCanvas, "repeat");
        if (!sparklePattern) return;

        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = sparklePattern;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const cellWidth = scratchCanvas.width / gridSizeY;
        const cellHeight = (scratchCanvas.height - 100) / gridSizeX;
        const borderWidth = cellWidth * 0.04;

        for (let i = 0; i < gridSizeX; i++) {
            for (let j = 0; j < gridSizeY; j++) {
                const x = j * cellWidth;
                const y = i * cellHeight;

                ctx.strokeStyle = "black";
                ctx.lineWidth = borderWidth;
                ctx.strokeRect(x, y, cellWidth, cellHeight);

                const icon = faDollarSign.icon;
                const [width, height, , , svgPathData] = icon;

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
                    const iconWidth = cellWidth * 0.8;
                    const iconHeight = cellHeight * 0.8;
                    const offsetX = (cellWidth - iconWidth) / 2;
                    const offsetY = (cellHeight - iconHeight) / 2;

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
    }, [gridSizeX, gridSizeY, cardBgColor]);

    const handleMouseDown = () => {
        setIsDrawing(true);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (event.buttons !== 1) {
            setIsDrawing(false);
            return;
        }

        setIsDrawing(true);

        if (!isDrawing || hasWon) return;

        const canvas = scratchCanvasRef?.current;
        if (!canvas) return;
        const ctx = canvas?.getContext("2d");
        if (!ctx) return;

        const rect = canvas?.getBoundingClientRect();
        if (!rect) return;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const eraserSize = 100;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, eraserSize / 2, 0, Math.PI * 2, true);
        ctx.fill();

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let erasedPixels = 0;

        for (let i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] === 0) {
                erasedPixels++;
            }
        }

        const totalPixels = canvas.width * canvas.height;
        const erasedPercentage = (erasedPixels / totalPixels) * 100;

        if (erasedPercentage >= 65) {
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

    useNuiEvent<CardData>("cardSetup", (cardData: CardData) => {
        if (cardData && typeof cardData.gridSizeX === 'number' && typeof cardData.gridSizeY === 'number' && typeof cardData.cardBgColor === 'string') {
            setGridSizeX(cardData.gridSizeX);
            setGridSizeY(cardData.gridSizeY);
            setBgColor(cardData.cardBgColor);
        } else {
            console.error('Invalid card data received:', cardData);
        }
    });

    useNuiEvent<any[]>("prizeData", (prizeArray) => {
        if (Array.isArray(prizeArray)) {
            setPrizeData(shuffleArray(prizeArray));
        } else {
            console.error("prizeData is not an array:", prizeArray);
        }
    });

    const resetGame = () => {
        setHasWon(false);
        generateBarcode();
        drawPrizeLayer();
        drawScratchLayer();
    };

    useEffect(() => {
        if (prizeData.length > 0) {
            resetGame();
        }
    }, [prizeData]);

    const animateScratchLayerErase = () => {
        const canvas = scratchCanvasRef?.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = 550;
        let currentRadius = 0;
        const speed = 10;

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

    const closeGame = () => {
        if (isEnvBrowser()) {
            resetGame();
        } else {
            fetchNui("scratcherComplete");
        }
    };

    return (
        <div className="nui-wrapper">
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
                {hasWon && (
                    <button onClick={closeGame} className="reset-button">
                        Collect Prize
                    </button>
                )}
            </div>
        </div>
    );
};

export default App;
