import {
  clear, isMousePositionInsideRect, renderButton, renderText,
} from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';
import { SceneButtonActions } from './Scene';

const buttonSize = {
  width: 250,
  height: 50,
};

export class WinningScene extends SceneButtonActions {
  private countingDown = false;

  private restartButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - buttonSize.width) / 2,
    y: this.canvasSize.height / 2,
    width: buttonSize.width,
    height: buttonSize.height,
  };

  renderScene(): void {
    clear(this.context, this.canvasSize, Colors.LightBlue);

    renderText(
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

    renderButton(
      this.context,
      this.restartButtonRectangle,
      { text: 'Play again', fontSize: '24px' },
    );
  }

  handleCanvasClick = (nextScene: (appMode: AppMode) => void) => (event: MouseEvent) => {
    const isButtonClicked = isMousePositionInsideRect(
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
