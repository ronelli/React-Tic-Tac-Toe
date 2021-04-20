import { Component } from "react";
import "./RandomWord.css";
import { Typography } from "@material-ui/core";
interface RandomWordState {
	words: string[];
    currentWord: string;
}

class RandomWord extends Component<{}, RandomWordState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
			words: ["Tic","Tac","Toe"],
            currentWord: "Tic"
        };
    }

    public render(): JSX.Element {
        return (
            <Typography variant="h3" className="randomWord">
                <span>{this.state.currentWord}</span>
            </Typography>
        );
    }
    
    public componentDidMount(): void {
        setInterval(() => {
            const index = this.state.words.findIndex(word => word === this.state.currentWord);
            this.setState({
                currentWord: this.state.words[(index + 1) % 3]
            })
        }, 1500)
    }
    
}

export default RandomWord;
