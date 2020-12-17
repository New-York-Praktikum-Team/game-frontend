import React, { Component, RefObject } from 'react';
import { CanvasSize } from 'helpers/CanvasHelper';
import { NymaGame } from 'game/scenes/NymaGame';
import { StartScene } from 'game/scenes/Start';
import { LosingScene } from 'game/scenes/Losing';
import { WinningScene } from 'game/scenes/Winning';
import { SceneDerived } from 'game/scenes/Scene';

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
      width: 800,
      height: 500,
    },
  };

  canvasRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();

  componentDidMount() {
    const context = this.canvasRef.current!.getContext('2d')!;
    this.setState({ context });
  }

  componentDidUpdate() {
    const scene = this.getSceneByAppMode(this.state.appMode);

    scene.render().then((appMode) => {
      scene.destroy();
      this.setState({ appMode });
    });
  }

  getSceneByAppMode = (appMode: AppMode) => {
    switch (appMode) {
      case AppMode.Game: return this.sceneToRender(NymaGame);
      case AppMode.Losing: return this.sceneToRender(LosingScene);
      case AppMode.Winning: return this.sceneToRender(WinningScene);

      case AppMode.Main:
      default: return this.sceneToRender(StartScene);
    }
  };

  sceneToRender = (SceneConstructor: SceneDerived) => {
    const scene = new SceneConstructor(
      this.canvasRef.current!,
      this.state.canvasSize,
    );

    return scene;
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
