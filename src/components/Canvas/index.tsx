import { NymaGame } from 'game/NymaGame';
import React, { Component, RefObject } from 'react';

export enum AppMode {
  Start, Game, End,
}

type CanvasProps = {};
export type CanvasDimension = { width: number, height: number };

interface CanvasState {
  appMode: AppMode | undefined;
  context: CanvasRenderingContext2D | null;
  canvasDim: CanvasDimension;
}

export class Canvas extends Component<CanvasProps, CanvasState> {
  state: CanvasState = {
    appMode: undefined,
    context: null,
    canvasDim: {
      width: 500,
      height: 500,
    },
  };

  canvasRef: RefObject<HTMLCanvasElement>;

  constructor(props: CanvasProps) {
    super(props);
    this.canvasRef = React.createRef<HTMLCanvasElement>();
  }

  componentDidMount() {
    const context = this.canvasRef.current!.getContext('2d')!;
    this.setState({ context, appMode: AppMode.Start });
  }

  componentDidUpdate() {
    switch (this.state.appMode) {
      case AppMode.Start: {
        this.start().then((mode) => {
          this.setState({ appMode: mode });
        });
        break;
      }
      case AppMode.Game: {
        this.play().then((mode) => {
          this.setState({ appMode: mode });
        });
        break;
      }
      case AppMode.End: {
        break;
      }
      default: {
        // eslint-disable-next-line no-console
        console.log('Unknown mode');
        break;
      }
    }
  }

  start(): Promise<AppMode> {
    return new Promise(((resolve) => {
      // eslint-disable-next-line no-console
      console.log('Start mode, wait!');
      setTimeout(resolve, 1000, AppMode.Game);
    }));
  }

  play(): Promise<AppMode> {
    const game = new NymaGame(this.state.context!, { canvasDim: this.state.canvasDim });
    return game.play();
  }

  render() {
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          width={this.state.canvasDim.width}
          height={this.state.canvasDim.height}
        />
      </div>
    );
  }
}
