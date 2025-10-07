'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

const blockShape_1 = (i: number, j: number, board: number[][]) => {
  board[i][j] = 1;
  board[i - 1][j] = 1;
  board[i][j - 1] = 1;
  board[i][j + 1] = 1;
  return board;
};

export default function Home() {
  const [board, setBoard] = useState([
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
  const newBoard = structuredClone(board);
  const makeBlock = () => {
    blockShape_1(2, 4, newBoard);
    setBoard(newBoard);
  };

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

        // 2. 移動ブロックの下の判定
        for (const block of movingBlocks) {
          const { x, y } = block;
          if (prevBoard[y + 1][x] === 2 || prevBoard[y + 1][x] === undefined) {
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
      <div className={styles.makeBlockButton} onClick={makeBlock}>
        生成
      </div>
    </div>
  );
}
