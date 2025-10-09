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
  const KEY_CODES = {
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
  };
  const makeBlock = () => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => [...row]);
      blockShape_1(2, 4, newBoard);
      return newBoard;
    });
  };
  const moveBlockHorizontally = (direction: 'left' | 'right') => {
    setBoard((prevBoard) => {
      const newBoard = structuredClone(prevBoard);
      const movingBlock = [];
      for (let y = 0; y < newBoard.length; y++) {
        for (let x = 0; x < newBoard[y].length; x++) {
          if (newBoard[y][x] === 1) {
            movingBlock.push({ x, y });
          }
        }
      }
      const dx = direction === 'left' ? -1 : 1;
      const canMove = movingBlock.every((block) => {
        const X = block.x + dx;
        return 0 <= X && X < newBoard[0].length && newBoard[block.y][X] !== 2;
      });
      if (canMove) {
        for (const block of movingBlock) {
          newBoard[block.y][block.x] = 0;
        }
        for (const block of movingBlock) {
          newBoard[block.y][block.x + dx] = 1;
        }
      }
      return newBoard;
    });
  };
  const moveBlockVertically = (direction: 'up' | 'down') => {
    setBoard((prevBoard) => {
      const newBoard = structuredClone(prevBoard);
      const movingBlock = [];
      for (let y = 0; y < newBoard.length; y++) {
        for (let x = 0; x < newBoard[y].length; x++) {
          if (newBoard[y][x] === 1) {
            movingBlock.push({ x, y });
          }
        }
      }
      if (direction === 'down') {
        const canMove = movingBlock.every((block) => {
          const Y = block.y + 1;
          return Y < newBoard.length && newBoard[Y][block.x] !== 2;
        });
        if (canMove) {
          for (const block of movingBlock) {
            newBoard[block.y][block.x] = 0;
          }
          for (const block of movingBlock) {
            newBoard[block.y + 1][block.x] = 1;
          }
        }
      }

      return newBoard;
    });
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case KEY_CODES.ARROW_LEFT:
          moveBlockHorizontally('left');
          break;
        case KEY_CODES.ARROW_RIGHT:
          moveBlockHorizontally('right');
          break;
        case KEY_CODES.ARROW_DOWN:
          moveBlockVertically('down');
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
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
        console.log(movingBlocks);
        // 2. 移動ブロックの下の判定
        for (const block of movingBlocks) {
          const { x, y } = block;
          if (y + 1 >= prevBoard.length || prevBoard[y + 1][x] === 2) {
            canMove = false;
            break;
          }
        }
        // 3. 移動可能であれば、新しいボードにブロックを配置
        if (canMove) {
          // まず、新しいボードを空にする
          for (const block of movingBlocks) {
            newBoard[block.y][block.x] = 0;
          }
          for (const block of movingBlocks) {
            newBoard[block.y + 1][block.x] = 1;
          }
        } else {
          for (const block of movingBlocks) {
            newBoard[block.y][block.x] = 2;
          }
          blockShape_1(2, 4, newBoard);
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
              <div
                className={styles.block}
                style={{ opacity: board[y][x] === 1 || board[y][x] === 2 ? 1 : 0 }}
              />
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
