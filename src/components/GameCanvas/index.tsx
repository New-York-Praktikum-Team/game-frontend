import { NymaGame } from 'game/scenes/NymaGame';
import { StartScene } from 'game/scenes/Start';
import React, { Component, RefObject } from 'react';
import { CanvasSize } from 'helpers/CanvasHelper';
import { LosingScene } from 'game/scenes/Losing';

export enum AppMode {
  Main, Game, Losing, Winning,
}

type CanvasProps = {};

interface CanvasState {
  appMode: AppMode;
  context: CanvasRenderingContext2D | null;
  clientRect: ClientRect | null;
  canvasSize: CanvasSize;
}

export class GameCanvas extends Component<CanvasProps, CanvasState> {
  state: CanvasState = {
    appMode: AppMode.Main,
    context: null,
    clientRect: null,
    canvasSize: {
      width: 500,
      height: 500,
    },
  };

  canvasRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();

  componentDidMount() {
    const context = this.canvasRef.current!.getContext('2d')!;
    const clientRect = this.canvasRef.current!.getBoundingClientRect();
    this.setState({ context, clientRect });
  }

  componentDidUpdate() {
    switch (this.state.appMode) {
      case AppMode.Main: {
        this.start().then((appMode) => {
          this.setState({ appMode });
        });
        break;
      }
      case AppMode.Game: {
        this.play().then((appMode) => {
          this.setState({ appMode });
        });
        break;
      }
      case AppMode.Losing: {
        this.lose().then((appMode) => {
          this.setState({ appMode });
        });
        break;
      }
      case AppMode.Winning: {
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
    const startScene = new StartScene(
      this.state.context!,
      this.canvasRef.current!,
      this.state.canvasSize,
      this.state.clientRect!,
    );

    return startScene.render();
  }

  play(): Promise<AppMode> {
    const game = new NymaGame(this.state.context!, { canvasSize: this.state.canvasSize });
    return game.play();
  }

  lose(): Promise<AppMode> {
    const losingScene = new LosingScene(
      this.state.context!,
      this.canvasRef.current!,
      this.state.canvasSize,
      this.state.clientRect!,
    );

    return losingScene.render();
  }

  render() {
    return (
      <canvas
        ref={this.canvasRef}
        width={this.state.canvasSize.width}
        height={this.state.canvasSize.height}
      />
    );
  }
}
