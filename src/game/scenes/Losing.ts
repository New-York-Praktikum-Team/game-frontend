import { CanvasHelper } from 'helpers/CanvasHelper';
import { Position } from 'game/objects/Position';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';
import { SceneBase } from './SceneBase';

export class LosingScene extends SceneBase {
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

  private buttonTopLeft: Position = {
    x: this.restartButtonRectangle.x,
    y: this.restartButtonRectangle.y,
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
      this.restartButtonRectangle,
      this.buttonTopLeft,
      { text: 'Play again', fontSize: '24px' },
    );
  }

  handleCanvasClick = (nextScene: (appMode: AppMode) => void) => (event: MouseEvent) => {
    const isButtonClicked = CanvasHelper.isClickedInsideRect(
      event,
      this.clientRect,
      this.restartButtonRectangle,
    );

    if (isButtonClicked) {
      nextScene(AppMode.Main);
    }
  };

  render(): Promise<AppMode> {
    return super.render(this.handleCanvasClick);
  }
}
