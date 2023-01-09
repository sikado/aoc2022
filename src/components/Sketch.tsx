import P5 from "p5";
import { Component, createRef } from "react";

export interface SketchProps {
    sketch: (width: number) => (p5: P5) => void;
}

export default class Sketch extends Component<SketchProps> {
    private readonly canvaParent;
    private P5Instance: P5 | null = null;

    constructor(props: SketchProps) {
        super(props);
        this.canvaParent = createRef<HTMLDivElement>();
    }

    componentDidMount() {
        this.P5Instance = new P5(
            this.props.sketch(this.canvaParent.current!.clientWidth),
            this.canvaParent.current!
        );
    }

    componentWillUnmount(): void {
        this.P5Instance?.remove();
    }

    render() {
        return <div ref={this.canvaParent}></div>;
    }
}
