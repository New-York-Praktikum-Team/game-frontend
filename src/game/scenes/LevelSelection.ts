import { clear, isMousePositionInsideRect, renderButton } from 'helpers/CanvasHelper';
import { Rectangle } from 'consts/shapes';
import { Level1 } from 'game/levels/Level1';
import { Level2 } from 'game/levels/Level2';
import { Level3 } from 'game/levels/Level3';
import { Colors } from 'consts/colors';
import { NextSceneResolveFunction, SceneButtonActions } from './Scene';

export class LevelSelectionScene extends SceneButtonActions {
  private countingDown = false;

  private buttonDimensions = {
    width: 250,
    height: 50,
  };

  private button1Rectangle: Rectangle = {
    x: (this.canvasSize.width - this.buttonDimensions.width) / 2,
    y: 50,
    width: this.buttonDimensions.width,
    height: this.buttonDimensions.height,
  };

  private button2Rectangle: Rectangle = {
    x: (this.canvasSize.width - this.buttonDimensions.width) / 2,
    y: 150,
    width: this.buttonDimensions.width,
    height: this.buttonDimensions.height,
  };

  private button3Rectangle: Rectangle = {
    x: (this.canvasSize.width - this.buttonDimensions.width) / 2,
    y: 250,
    width: this.buttonDimensions.width,
    height: this.buttonDimensions.height,
  };

  renderScene(): void {
    clear(this.context, this.canvasSize, Colors.LightBlue);

    renderButton(
      this.context,
      this.button1Rectangle,
      { text: '🌀 Level 1', fontSize: '24px' },
    );

    renderButton(
      this.context,
      this.button2Rectangle,
      { text: '💖 Level 2', fontSize: '24px' },
    );

    renderButton(
      this.context,
      this.button3Rectangle,
      { text: '🎄 Level 3', fontSize: '24px' },
    );
  }

  handleCanvasClick = (nextScene: NextSceneResolveFunction) => (event: MouseEvent) => {
    const isButton1Clicked = isMousePositionInsideRect(
      event,
      this.clientRect,
      this.button1Rectangle,
    ) && !this.countingDown;

    const isButton2Clicked = isMousePositionInsideRect(
      event,
      this.clientRect,
      this.button2Rectangle,
    ) && !this.countingDown;

    const isButton3Clicked = isMousePositionInsideRect(
      event,
      this.clientRect,
      this.button3Rectangle,
    ) && !this.countingDown;

    if (isButton1Clicked) {
      this.countingDown = true;
      super.renderCountdown(nextScene, { level: new Level1(this.canvasSize) });
    }

    if (isButton2Clicked) {
      this.countingDown = true;
      super.renderCountdown(nextScene, { level: new Level2(this.canvasSize) });
    }

    if (isButton3Clicked) {
      this.countingDown = true;
      super.renderCountdown(nextScene, { level: new Level3(this.canvasSize) });
    }
  };
}
