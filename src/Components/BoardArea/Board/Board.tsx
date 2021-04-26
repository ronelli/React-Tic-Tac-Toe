import { Component } from "react";
import Cell from "../Cell/Cell";
import "./Board.css";
import { Button } from '@material-ui/core';

const MAX_CELLS_IN_BOARD = 9;
interface BoardState {
    markedCellsArr: number[],
    XisNext: boolean,
    computerMarkedCells: string[],
    userMoves: number[],
    computerMoves: number[],
    hasWinner: boolean,
    selectedBlockingCell: number
}

class Board extends Component<{}, BoardState> {
    private list = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3 ,6],
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]
    ];
    private boardLock = false;
    private timerId = 0;

    public constructor(props: {}) {
        super(props);
        this.state = {
            markedCellsArr: [],
            XisNext: true,
            computerMarkedCells: new Array<string>(9),
            userMoves: [],
            computerMoves: [],
            hasWinner: false,
            selectedBlockingCell: 10
        }
    }

    private getRandomCell(): number {
        let randomNum;
        do {
            randomNum = Math.floor(Math.random() * (MAX_CELLS_IN_BOARD))
        } while (this.state.markedCellsArr.includes(randomNum));
        return randomNum;
    }

    private checkCloseToWin(option: number[], opponentMoves: number[]) { 
        let optionalArr = [option[0], option[1], option[2]];
        const userMoves = opponentMoves.filter(element => optionalArr.includes(element));
        if(userMoves.length === 2){
            const blockingCellNumber = optionalArr.find(element => (element !== userMoves[0] && element !== userMoves[1]));
            if(!blockingCellNumber) return false;
            const hasMarked = this.state.markedCellsArr.find(e => e === blockingCellNumber);
            if(!hasMarked){
                this.setState({
                    selectedBlockingCell: blockingCellNumber
                });
                return true;
            }
        }
        return false;
    }

    private opponentHasSeries = (opponentMoves: number[]) => {
        for(let i = 2; i <= opponentMoves.length; i++) {
            for(let option of this.list) {
                if(this.checkCloseToWin(option, opponentMoves)){
                    return true;
                }
            }
        }
        return false;
    } 
    private checkBlockingUser = () => {
        if(this.opponentHasSeries(this.state.userMoves)){
            return true;
        }
        return false;
    }
    private computerPlay = async (cellNumber: number ) => {
        await this.setState({
            markedCellsArr: [...this.state.markedCellsArr, cellNumber],
            XisNext: true,
            computerMoves: [...this.state.computerMoves, cellNumber]});
        return window.setTimeout(() => {
            this.state.computerMarkedCells[cellNumber] = "O";
            this.setState({
            XisNext: true
            })
        }, 1000);
    }

    private victoryOpportunity = () => {
        if(this.opponentHasSeries(this.state.computerMoves)){
            return true;
        }
        return false;
    }
    private computerMove = () => {
        return new Promise<void>((res, rej) => {
            if(this.victoryOpportunity()){
                this.computerPlay(this.state.selectedBlockingCell);
                res();
            }
            else if(this.checkBlockingUser()){
                this.computerPlay(this.state.selectedBlockingCell);
                res();
            }
            else {
                const randomElement = this.getRandomCell();
                const last = () => window.setTimeout(() => {
                    this.state.computerMarkedCells[randomElement] = "O";
                    this.setState({
                        XisNext: true
                    }, () => res())
                }, 1000);
                this.setState({
                    markedCellsArr: [...this.state.markedCellsArr, randomElement],
                    XisNext: true,
                    computerMoves: [...this.state.computerMoves, randomElement]
                }, last);
                
            }
        })

    }

    public nextMove = async (selectedCellByUser: number) => {
        if(this.boardLock) {
            return;
        }
        this.boardLock = true;
        if (!this.state.XisNext || this.state.markedCellsArr.includes(selectedCellByUser)) {
            return;
        }
        await this.setState({XisNext: false});
        this.state.computerMarkedCells[selectedCellByUser] = "X";
        await this.setState({
            markedCellsArr: [...this.state.markedCellsArr, selectedCellByUser],
            userMoves: [...this.state.userMoves, selectedCellByUser],
        });

        if(this.state.hasWinner) {
            return;
        }
        if(this.calcScore(this.state.userMoves)){
            setTimeout(() => {
                alert("You Win");
            }, (500));
            return;
        }
        else if (this.state.markedCellsArr.length === MAX_CELLS_IN_BOARD) {
            setTimeout(() => {
                alert("Draw");
            }, (500));
            return;
        }
        else {
            this.computerMove().then(res => this.boardLock = false);
            if(this.calcScore(this.state.computerMoves)){
                setTimeout(() => {
                    this.setState({XisNext: false})
                    alert("Computer Won");
                }, (1500));
            }
            else {
                this.setState({XisNext: true})
            }
        }

    }
    private checkWinningPoints(optionalArr: number[], playerMarks: number[]): boolean {
        let firstCell = optionalArr[0], secondCell = optionalArr[1], thirdCell = optionalArr[2];
        if(playerMarks.includes(firstCell) && playerMarks.includes(secondCell) && playerMarks.includes(thirdCell)){
            return true;
        }
        return false;
    }

    private calcScore(opponentMoves: number[]) {
        for(let i = 3; i <= opponentMoves.length; i++) {
            for(let option of this.list) {
                if(this.checkWinningPoints(option, opponentMoves)){
                    return true;
                }
            }
        }
        return false;
    }

    private startNewGame = () => {
        this.boardLock = false;
        this.setState({
            markedCellsArr: [],
            XisNext: true,
            computerMarkedCells: new Array<string>(9),
            userMoves: [],
            computerMoves: [],
            hasWinner: false,
            selectedBlockingCell: 10
        });
    }

    public render(): JSX.Element {
        return (
            <>
                <div className="board Box">
                    { [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i =>
                        <div key={i} className="cell" onClick={() => this.nextMove(i)}>
                            <Cell cellId={i}
                                computerMove={this.state.computerMarkedCells[i]}/>
                        </div>)
                    }
                    <Button className="newGameButton" variant="contained" color="primary" onClick={() => this.startNewGame()}> Start new game
                    </Button>
                </div><hr />
            </>
        );
    }
}

export default Board;
