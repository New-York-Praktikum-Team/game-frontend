import React, { Component, RefObject } from 'react';
import { CanvasSize } from 'helpers/CanvasHelper';
import { NymaGame } from 'game/scenes/NymaGame';
import { StartScene } from 'game/scenes/Start';
import { LosingScene } from 'game/scenes/Losing';
import { WinningScene } from 'game/scenes/Winning';
import { GameOptions, SceneDerived } from 'game/scenes/Scene';
import { LevelSelectionScene } from 'game/scenes/LevelSelection';

export enum AppMode {
  Main, Game, Losing, Winning, LevelSelection,
}

type CanvasProps = {};

interface CanvasState {
  appMode: AppMode;
  options?: GameOptions;
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
    const scene = this.getSceneByAppMode(this.state.appMode);

    scene.render().then((appModeOptions) => {
      scene.destroy();
      this.setState({ 
        appMode: appModeOptions.appMode, 
        options: appModeOptions.options ?? this.state.options,
      });
    });
  }

  getSceneByAppMode = (appMode: AppMode) => {
    switch (appMode) {
      case AppMode.Game: return this.sceneToRender(NymaGame);
      case AppMode.Losing: return this.sceneToRender(LosingScene);
      case AppMode.Winning: return this.sceneToRender(WinningScene);
      case AppMode.LevelSelection: return this.sceneToRender(LevelSelectionScene);

      case AppMode.Main:
      default: return this.sceneToRender(StartScene);
    }
  };

  sceneToRender = (SceneConstructor: SceneDerived) => {
    const scene = new SceneConstructor(
      this.canvasRef.current!,
      this.state.canvasSize,
      this.state.options,
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
