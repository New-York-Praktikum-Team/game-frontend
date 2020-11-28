import { CanvasHelper } from 'helpers/CanvasHelper';
import { Position } from 'game/objects/Position';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';
import { SceneBase } from './SceneBase';

export class StartScene extends SceneBase {
  private secondsBeforeStart = 3;

  private tickDuration = 1000;

  private buttonDimensions = {
    width: 350,
    height: 100,
  };

  private startButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - this.buttonDimensions.width) / 2,
    y: 100,
    width: this.buttonDimensions.width,
    height: this.buttonDimensions.height,
  };

  private buttonTopLeft: Position = {
    x: this.startButtonRectangle.x,
    y: this.startButtonRectangle.y,
  };

  renderScene(): void {
    CanvasHelper.clear(this.context!, this.canvasSize, Colors.LightBlue);

    CanvasHelper.renderButton(
      this.context!,
      this.startButtonRectangle,
      this.buttonTopLeft,
    );

    CanvasHelper.renderText(
      this.context!,
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

  onStartButtonClick(nextScene: (appMode: AppMode) => void): void {
    const {
      context, canvasSize, secondsBeforeStart, tickDuration,
    } = this;
    let counter = secondsBeforeStart;

    // draw countdown before the game starts
    let timerId = setTimeout(function tick() {
      const counterText = counter === 0 ? 'GO!' : counter.toString();

      CanvasHelper.clear(context!, canvasSize, Colors.LightBlue);

      CanvasHelper.renderText(
        context!,
        'Get ready in',
        {
          x: canvasSize.width / 2,
          y: canvasSize.height / 3,
          align: 'center',
          font: '32px Arial',
          color: Colors.DarkGrey,
        },
      );

      CanvasHelper.renderText(
        context!,
        counterText,
        {
          x: canvasSize.width / 2,
          y: canvasSize.height / 2,
          align: 'center',
          font: '72px Arial',
          color: Colors.DarkBlue,
        },
      );

      counter -= 1;
      timerId = setTimeout(tick, tickDuration);
    }, 0);

    setTimeout(() => {
      clearInterval(timerId);
      nextScene(AppMode.Game);
    }, (secondsBeforeStart + 1) * tickDuration);
  }

  handleCanvasClick = (nextScene: (appMode: AppMode) => void) => (event: MouseEvent) => {
    const isButtonClicked = CanvasHelper.isClickedInsideRect(
      event,
      this.clientRect,
      this.startButtonRectangle,
    );

    if (isButtonClicked) {
      this.onStartButtonClick(nextScene);
    }
  };

  render(): Promise<AppMode> {
    return super.render(this.handleCanvasClick);
  }
}
