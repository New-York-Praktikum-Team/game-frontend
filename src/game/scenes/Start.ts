import { CanvasHelper } from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';
import { SceneButtonActions } from './Scene';

export class StartScene extends SceneButtonActions {
  private countingDown = false;

  private buttonSize = {
    width: 350,
    height: 100,
  };

  private startButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - this.buttonSize.width) / 2,
    y: 100,
    width: this.buttonSize.width,
    height: this.buttonSize.height,
  };

  renderScene(): void {
    CanvasHelper.clear(this.context, this.canvasSize, Colors.LightBlue);

    CanvasHelper.renderButton(
      this.context,
      this.startButtonRectangle,
      { text: 'Play' },
    );

    CanvasHelper.renderText(
      this.context,
      'To start the game, press the big blue button above',
      {
        x: this.canvasSize.width / 2,
        y: this.canvasSize.height / 2,
        align: 'center',
        font: '16px Arial',
        color: Colors.DarkGrey,
      },
    );
  }

  handleCanvasClick = (nextScene: (appMode: AppMode) => void) => (event: MouseEvent) => {
    const isButtonClicked = CanvasHelper.isMousePositionInsideRect(
      event,
      this.clientRect,
      this.startButtonRectangle,
    ) && !this.countingDown;

    if (isButtonClicked) {
      this.countingDown = true;
      super.renderCountdown(nextScene);
    }
  };
}
