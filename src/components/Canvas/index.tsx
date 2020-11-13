import { NymaGame } from 'game/NymaGame';
import React, { Component, RefObject } from 'react';

export enum AppMode {
  Start, Game, End_lose, End_win,
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
      case AppMode.End_lose: {
        const ctx = this.state.context!;
        ctx.fillStyle = 'darkblue';
        ctx.textAlign = 'center';
        ctx.font = '60px Arial';
        ctx.fillText('You LOST! Haha', this.state.canvasDim.width / 2, 0.85 * this.state.canvasDim.height);
        break;
      }
      case AppMode.End_win: {
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
      const ctx = this.state.context!;
      ctx.fillStyle = '#ffff1f';
      ctx.fillRect(0, 0, this.state.canvasDim.width, this.state.canvasDim.height);

      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.font = '48px Arial';
      ctx.fillText('Game Start!', this.state.canvasDim.width / 2, this.state.canvasDim.height / 2);

      setTimeout(resolve, 2000, AppMode.Game);
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
