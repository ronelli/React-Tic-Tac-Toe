import { Component } from "react";

interface CellState {
    symbol: string;
}

interface CellProps {
    computerMove?: string,
    cellId: number
}
class Cell extends Component<CellProps,CellState> {
    public constructor(props:CellProps){
        super(props);
        this.state = { symbol: "" };
    }
    
    private drawSymbol = () => {
        if(this.state.symbol !== ""){
            return;
        }
    }

    public render(): JSX.Element {
        return (
            <div onClick={this.drawSymbol} id={this.props.cellId.toString()}>
                {this.props.computerMove }
            </div>
        );
    }
}

export default Cell;
