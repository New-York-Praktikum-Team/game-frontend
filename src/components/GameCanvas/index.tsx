import React, { Component, RefObject } from 'react';
import { CanvasSize } from 'helpers/CanvasHelper';
import { NymaGame } from 'game/scenes/NymaGame';
import { StartScene } from 'game/scenes/Start';
import { LosingScene } from 'game/scenes/Losing';
import { WinningScene } from 'game/scenes/Winning';
import { SceneBaseDerived } from 'game/scenes/SceneBase';

export enum AppMode {
  Main, Game, Losing, Winning,
}

type CanvasProps = {};

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
      case AppMode.Game: return this.renderScene(NymaGame);
      case AppMode.Losing: return this.renderScene(LosingScene);
      case AppMode.Winning: return this.renderScene(WinningScene);

      case AppMode.Main:
      default: return this.renderScene(StartScene);
    }
  };

  renderScene = (SceneConstructor: SceneBaseDerived) => () => {
    const scene = new SceneConstructor(
      this.canvasRef.current!,
      this.state.canvasSize,
    );

    return scene.render();
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
