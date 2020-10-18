const table: HTMLTableElement = document.createElement('table');
const rows: HTMLTableRowElement[] = [];
const cells: HTMLTableCellElement[][] = [];
const result: HTMLDivElement = document.createElement('div');

let turn: 'O' | 'X' = 'X';
let count = 0;

function callback(event: MouseEvent) {
  const rowIndex: number = rows.indexOf(
    (event.currentTarget as HTMLTableCellElement)
      .parentNode as HTMLTableRowElement
  );

  const cellIndex: number = cells[rowIndex].indexOf(
    event.currentTarget as HTMLTableCellElement
  );

  count += 1;

  if (cells[rowIndex][cellIndex].textContent !== '') {
    console.log('빈 칸이 아닙니다.');
  } else {
    cells[rowIndex][cellIndex].textContent = turn;

    let full = false;
    if (
      cells[rowIndex][0].textContent === turn &&
      cells[rowIndex][1].textContent === turn &&
      cells[rowIndex][2].textContent === turn
    ) {
      full = true;
    }

    if (
      cells[0][cellIndex].textContent === turn &&
      cells[1][cellIndex].textContent === turn &&
      cells[2][cellIndex].textContent === turn
    ) {
      full = true;
    }

    if (
      cells[0][0].textContent === turn &&
      cells[1][1].textContent === turn &&
      cells[2][2].textContent === turn
    ) {
      full = true;
    }

    if (
      cells[0][2].textContent === turn &&
      cells[1][1].textContent === turn &&
      cells[2][0].textContent === turn
    ) {
      full = true;
    }

    if (full) {
      result.textContent = `${turn}님이 승리!`;
      turn = 'X';
      cells.forEach((row) => {
        row.forEach((cell) => {
          const draftCell = cell;
          draftCell.textContent = '';
        });
      });
    } else if (count === 9) {
      result.textContent = `무승부!`;
      turn = 'X';
      cells.forEach((row) => {
        row.forEach((cell) => {
          const draftCell = cell;
          draftCell.textContent = '';
        });
      });
    } else {
      turn = turn === 'O' ? 'X' : 'O';
    }
  }
}

for (let i = 1; i <= 3; i += 1) {
  const row: HTMLTableRowElement = document.createElement('tr');

  rows.push(row);
  cells.push([]);

  for (let j = 1; j <= 3; j += 1) {
    const cell: HTMLTableCellElement = document.createElement('td');
    cell.addEventListener('click', callback);
    cells[i - 1].push(cell);
    row.appendChild(cell);
  }

  table.appendChild(row);
}

document.body.appendChild(table);
document.body.appendChild(result);
