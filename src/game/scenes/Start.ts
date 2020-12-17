import {
  clear, isMousePositionInsideRect, renderButton, renderText,
} from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';
import { SceneButtonActions } from './Scene';

const buttonSize = {
  width: 350,
  height: 100,
};

export class StartScene extends SceneButtonActions {
  private countingDown = false;

  private startButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - buttonSize.width) / 2,
    y: 100,
    width: buttonSize.width,
    height: buttonSize.height,
  };

  renderScene(): void {
    clear(this.context, this.canvasSize, Colors.LightBlue);

    renderButton(
      this.context,
      this.startButtonRectangle,
      { text: 'Play' },
    );

    renderText(
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
    const isButtonClicked = isMousePositionInsideRect(
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
