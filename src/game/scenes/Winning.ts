import { CanvasHelper } from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';

import { SceneButtonActions } from './Scene';

export class WinningScene extends SceneButtonActions {
  private countingDown = false;

  private buttonSize = {
    width: 250,
    height: 50,
  };

  private restartButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - this.buttonSize.width) / 2,
    y: this.canvasSize.height / 2,
    width: this.buttonSize.width,
    height: this.buttonSize.height,
  };

  renderScene(): void {
    CanvasHelper.clear(this.context, this.canvasSize, Colors.LightBlue);

    CanvasHelper.renderText(
      this.context,
      'You WIN! 🎉',
      {
        x: this.canvasSize.width / 2,
        y: this.canvasSize.height / 3,
        align: 'center',
        font: '42px Arial',
        color: Colors.DarkGrey,
      },
    );

    CanvasHelper.renderButton(
      this.context,
      this.restartButtonRectangle,
      { text: 'Play again', fontSize: '24px' },
    );
  }

  handleCanvasClick = (nextScene: (appMode: AppMode) => void) => (event: MouseEvent) => {
    const isButtonClicked = CanvasHelper.isMousePositionInsideRect(
      event,
      this.clientRect,
      this.restartButtonRectangle,
    ) && !this.countingDown;

    if (isButtonClicked) {
      this.countingDown = true;
      super.renderCountdown(nextScene);
    }
  };
}
