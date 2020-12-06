import { CanvasHelper } from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';
import { SceneButtonActions } from './Scene';

export class LosingScene extends SceneButtonActions {
  private countingDown = false;

  private buttonSize = {
    width: 250,
    height: 50,
  };

  private restartButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - this.buttonSize.width) / 2,
    y: this.canvasSize.height - this.buttonSize.height - 30,
    width: this.buttonSize.width,
    height: this.buttonSize.height,
  };

  private menuButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - this.buttonSize.width) / 2,
    y: this.canvasSize.height - this.buttonSize.height * 2 - 30 * 2,
    width: this.buttonSize.width,
    height: this.buttonSize.height,
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

    CanvasHelper.renderText(
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

    CanvasHelper.renderButton(
      this.context,
      this.menuButtonRectangle,
      { text: 'Go to Main Menu', fontSize: '24px' },
    );

    CanvasHelper.renderButton(
      this.context,
      this.restartButtonRectangle,
      { text: 'Play again', fontSize: '24px' },
    );
  }

  handleCanvasClick = (nextScene: (appMode: AppMode) => void) => (event: MouseEvent) => {
    const isRestartButtonClicked = CanvasHelper.isMousePositionInsideRect(
      event,
      this.clientRect,
      this.restartButtonRectangle,
    ) && !this.countingDown;

    const isMenuButtonClicked = CanvasHelper.isMousePositionInsideRect(
      event,
      this.clientRect,
      this.menuButtonRectangle,
    ) && !this.countingDown;

    if (isRestartButtonClicked) {
      this.countingDown = true;
      super.renderCountdown(nextScene);
    }

    if (isMenuButtonClicked) {
      nextScene(AppMode.Main);
    }
  };
}
