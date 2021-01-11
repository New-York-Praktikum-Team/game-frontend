import { clear, isMousePositionInsideRect, renderImage } from 'helpers/CanvasHelper';
import { Rectangle } from 'consts/shapes';
import { Level1 } from 'game/levels/Level1';
import { Level2 } from 'game/levels/Level2';
import { Level3 } from 'game/levels/Level3';
import { Colors } from 'consts/colors';
import level1ButtonImage from 'assets/images/Level1Button.png';
import level2ButtonImage from 'assets/images/Level2Button.png';
import level3ButtonImage from 'assets/images/Level3Button.png';
import { NextSceneResolveFunction, SceneButtonActions } from './Scene';

const buttonSize = {
  width: 310,
  height: 40,
};

export class LevelSelectionScene extends SceneButtonActions {
  private countingDown = false;

  private buttonProps = [
    { y: this.canvasSize.height / 2 - 150, image: level1ButtonImage, LevelConstructor: Level1 },
    { y: this.canvasSize.height / 2 - 50, image: level2ButtonImage, LevelConstructor: Level2 },
    { y: this.canvasSize.height / 2 + 50, image: level3ButtonImage, LevelConstructor: Level3 },
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
      // button images have 20 px top and left margin
      renderImage(
        this.context,
        {
          x: rectangle.x - 20,
          y: rectangle.y - 20,
        },
        this.buttonProps[index].image,
      );
    });
  }

  handleCanvasClick = (nextScene: NextSceneResolveFunction) => (event: MouseEvent) => {
    const isButtonClicked: boolean[] = this.buttonRectangles.map(
      (rectangle) => isMousePositionInsideRect(
        event,
        this.clientRect,
        this.canvasSize,
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
