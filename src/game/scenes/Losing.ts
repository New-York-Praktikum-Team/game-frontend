import { isMousePositionInsideRect, renderButton, renderText } from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';
import { AppModeOptions, SceneButtonActions } from './Scene';

const buttonSize = {
  width: 250,
  height: 50,
};

export class LosingScene extends SceneButtonActions {
  private countingDown = false;

  private restartButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - buttonSize.width) / 2,
    y: this.canvasSize.height - buttonSize.height - 30,
    width: buttonSize.width,
    height: buttonSize.height,
  };

  private menuButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - buttonSize.width) / 2,
    y: this.canvasSize.height - buttonSize.height * 2 - 30 * 2,
    width: buttonSize.width,
    height: buttonSize.height,
  };

  renderParanja(): void {
    this.context.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.context.fillRect(
      0, 0,
      this.canvasSize.width,
      this.canvasSize.height,
    );
  }

  renderScene(): void {
    this.renderParanja();

    renderText(
      this.context,
      'You LOST! 🤬',
      {
        x: this.canvasSize.width / 2,
        y: 50,
        align: 'center',
        font: '32px Arial',
        color: Colors.DarkGrey,
      },
    );

    renderButton(
      this.context,
      this.menuButtonRectangle,
      { text: 'Go to Main Menu', fontSize: '24px' },
    );

    renderButton(
      this.context,
      this.restartButtonRectangle,
      { text: 'Play again', fontSize: '24px' },
    );
  }

  handleCanvasClick = (nextScene: (value: AppModeOptions) => void) => (event: MouseEvent) => {
    const isRestartButtonClicked = isMousePositionInsideRect(
      event,
      this.clientRect,
      this.restartButtonRectangle,
    ) && !this.countingDown;

    const isMenuButtonClicked = isMousePositionInsideRect(
      event,
      this.clientRect,
      this.menuButtonRectangle,
    ) && !this.countingDown;

    if (isRestartButtonClicked) {
      this.countingDown = true;
      super.renderCountdown(nextScene);
    }

    if (isMenuButtonClicked) {
      nextScene({ appMode: AppMode.Main });
    }
  };
}
