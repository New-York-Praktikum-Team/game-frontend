import { CanvasHelper } from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';
import { SceneBase } from './SceneBase';

export class LosingScene extends SceneBase {
  private countingDown = false;

  private buttonDimensions = {
    width: 250,
    height: 50,
  };

  private restartButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - this.buttonDimensions.width) / 2,
    y: this.canvasSize.height - this.buttonDimensions.height - 30,
    width: this.buttonDimensions.width,
    height: this.buttonDimensions.height,
  };

  private menuButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - this.buttonDimensions.width) / 2,
    y: this.canvasSize.height - this.buttonDimensions.height * 2 - 30 * 2,
    width: this.buttonDimensions.width,
    height: this.buttonDimensions.height,
  };

  renderParanja(): void {
    this.context!.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.context!.fillRect(
      0, 0,
      this.canvasSize.width,
      this.canvasSize.height,
    );
  }

  renderScene(): void {
    this.renderParanja();

    CanvasHelper.renderText(
      this.context!,
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
      this.context!,
      this.menuButtonRectangle,
      { text: 'Go to Main Menu', fontSize: '24px' },
    );

    CanvasHelper.renderButton(
      this.context!,
      this.restartButtonRectangle,
      { text: 'Play again', fontSize: '24px' },
    );
  }

  handleCanvasClick = (nextScene: (appMode: AppMode) => void) => (event: MouseEvent) => {
    const isRestartButtonClicked = CanvasHelper.isClickedInsideRect(
      event,
      this.clientRect,
      this.restartButtonRectangle,
    ) && !this.countingDown;

    const isMenuButtonClicked = CanvasHelper.isClickedInsideRect(
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

  render(): Promise<AppMode> {
    return super.render(this.handleCanvasClick);
  }
}
