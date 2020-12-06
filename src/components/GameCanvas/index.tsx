import React, { Component, RefObject } from 'react';
import { CanvasSize } from 'helpers/CanvasHelper';
import { NymaGame } from 'game/scenes/NymaGame';
import { StartScene } from 'game/scenes/Start';
import { LosingScene } from 'game/scenes/Losing';
import { WinningScene } from 'game/scenes/Winning';

export enum AppMode {
  Main, Game, Losing, Winning,
}

type CanvasProps = {};

type Scene = typeof StartScene | typeof LosingScene | typeof WinningScene;

interface CanvasState {
  appMode: AppMode;
  context: CanvasRenderingContext2D | null;
  canvasSize: CanvasSize;
}

export class GameCanvas extends Component<CanvasProps, CanvasState> {
  state: CanvasState = {
    appMode: AppMode.Main,
    context: null,
    canvasSize: {
      width: 500,
      height: 500,
    },
  };

  canvasRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();

  componentDidMount() {
    const context = this.canvasRef.current!.getContext('2d')!;
    this.setState({ context });
  }

  componentDidUpdate() {
    const renderScene = this.getSceneByAppMode(this.state.appMode);

    renderScene().then((appMode) => {
      this.setState({ appMode });
    });
  }

  getSceneByAppMode = (appMode: AppMode) => {
    switch (appMode) {
      case AppMode.Game: return this.play;
      case AppMode.Losing: return this.renderScene(LosingScene);
      case AppMode.Winning: return this.renderScene(WinningScene);

      case AppMode.Main:
      default: return this.renderScene(StartScene);
    }
  };

  renderScene = (SceneConstructor: Scene) => () => {
    const scene = new SceneConstructor(
      this.canvasRef.current!,
      this.state.canvasSize,
    );

    return scene.render();
  };

  play = () => {
    const game = new NymaGame(this.state.context!, { canvasSize: this.state.canvasSize });
    return game.play();
  };

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
