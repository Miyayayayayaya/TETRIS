'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const direction = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBoard((prevBoard) => {
        // 現在のボードをコピー
        const newBoard = prevBoard.map((row) => [...row]);

        // 移動可能かどうかのフラグ
        let canMove = true;
        // 移動するブロックの座標を保存する配列
        const movingBlocks = [];

        // 1. 移動するブロックをすべて見つける
        for (let y = 0; y < prevBoard.length; y++) {
          for (let x = 0; x < prevBoard[y].length; x++) {
            if (prevBoard[y][x] === 1) {
              movingBlocks.push({ x, y });
            }
          }
        }
        // 2. ブロックが移動可能か判定
        const bottomBlock = [];
        for (const block of movingBlocks) {
          const { x, y } = block;
          for (let y = prevBoard.length - 1; y >= 0; y--) {
            if (block.y === 1) {
              for (let x = 0; x < prevBoard.length; x++) {
                if (block.x === 1) {
                  bottomBlock.push({ x, y });
                }
              }
            }
            break;
          }
          if (y + 1 >= prevBoard.length || prevBoard[y + 1][x] === 1) {
            canMove = false;
            break;
          }
        }
        for (const block of bottomBlock) {
          if (newBoard[block.y + 1][block.x] === 1) {
            canMove = false;
          }
        }

        // 3. 移動可能であれば、新しいボードにブロックを配置
        if (canMove) {
          // まず、新しいボードを空にする
          for (const block of movingBlocks) {
            newBoard[block.y][block.x] = 0;
            newBoard[block.y + 1][block.x] = 1;
          }
        }

        return newBoard;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((col, x) => (
            <div className={styles.cell} key={`${x}-${y}`}>
              <div className={styles.block} style={{ opacity: board[y][x] === 1 ? 1 : 0 }} />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
