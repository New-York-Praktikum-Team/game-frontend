import { clear, isMousePositionInsideRect, renderButton } from 'helpers/CanvasHelper';
import { Rectangle } from 'consts/shapes';
import { Level1 } from 'game/levels/Level1';
import { Level2 } from 'game/levels/Level2';
import { Level3 } from 'game/levels/Level3';
import { Colors } from 'consts/colors';
import { NextSceneResolveFunction, SceneButtonActions } from './Scene';

const buttonSize = {
  width: 250,
  height: 50,
};

export class LevelSelectionScene extends SceneButtonActions {
  private countingDown = false;

  private buttonProps = [
    { y: 50, text: '🌀 Level 1', LevelConstructor: Level1 },
    { y: 150, text: '💖 Level 2', LevelConstructor: Level2 },
    { y: 250, text: '🎄 Level 3', LevelConstructor: Level3 },
  ];

  private buttonRectangles: Rectangle[] = this.buttonProps.map((prop) => ({
    x: (this.canvasSize.width - buttonSize.width) / 2,
    y: prop.y,
    width: buttonSize.width,
    height: buttonSize.height,
  }));

  renderScene(): void {
    clear(this.context, this.canvasSize, Colors.LightBlue);

    this.buttonRectangles.forEach((rectangle, index) => {
      renderButton(
        this.context,
        rectangle,
        { text: this.buttonProps[index].text, fontSize: '24px' },
      );
    });
  }

  handleCanvasClick = (nextScene: NextSceneResolveFunction) => (event: MouseEvent) => {
    const isButtonClicked: boolean[] = this.buttonRectangles.map(
      (rectangle) => isMousePositionInsideRect(
        event,
        this.clientRect,
        rectangle,
      ) && !this.countingDown,
    );

    isButtonClicked.forEach((isClicked, index) => {
      if (isClicked) {
        this.countingDown = true;
        super.renderCountdown(
          nextScene,
          { level: new this.buttonProps[index].LevelConstructor(this.canvasSize) },
        );
      }
    });
  };
}
