import {
  clear, isMousePositionInsideRect, renderImage,
} from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';
import playButtonImage from 'assets/images/PlayButton.png';
import smileEmojiImage from 'assets/images/SmileEmoji.png';
import { NextSceneResolveFunction, SceneButtonActions } from './Scene';

const buttonSize = {
  width: 310,
  height: 52,
};

const emojiSize = {
  width: 101,
  height: 101,
};

export class StartScene extends SceneButtonActions {
  private countingDown = false;

  private startButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - buttonSize.width) / 2,
    y: this.canvasSize.height / 3 + 150,
    width: buttonSize.width,
    height: buttonSize.height,
  };

  renderScene(): void {
    clear(this.context, this.canvasSize, Colors.LightBlue);

    renderImage(
      this.context,
      {
        x: (this.canvasSize.width - emojiSize.width) / 2,
        y: this.canvasSize.height / 3,
      },
      smileEmojiImage,
    );

    renderImage(
      this.context,
      {
        x: this.startButtonRectangle.x - 8,
        y: this.startButtonRectangle.y - 6,
      },
      playButtonImage,
    );
  }

  handleCanvasClick = (nextScene: NextSceneResolveFunction) => (event: MouseEvent) => {
    const isButtonClicked = isMousePositionInsideRect(
      event,
      this.clientRect,
      this.canvasSize,
      this.startButtonRectangle,
    ) && !this.countingDown;

    if (isButtonClicked) {
      this.countingDown = true;
      nextScene({ appMode: AppMode.LevelSelection });
    }
  };
}
