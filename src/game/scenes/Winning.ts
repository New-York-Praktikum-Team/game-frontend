import {
  blurCanvas, isMousePositionInsideRect, renderImage, renderText,
} from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';
import goToMenuButtonImage from 'assets/images/GoToMenuButton.png';
import playAgainButtonImage from 'assets/images/PlayAgainButton.png';
import winningEmojiImage from 'assets/images/WinningEmoji.png';
import { NextSceneResolveFunction, SceneButtonActions } from './Scene';

const buttonSize = {
  width: 310,
  height: 40,
};

const emojiSize = {
  width: 101,
  height: 101,
};

export class WinningScene extends SceneButtonActions {
  private countingDown = false;

  private menuButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - buttonSize.width) / 2,
    y: (2 * this.canvasSize.height) / 3 - 50,
    width: buttonSize.width,
    height: buttonSize.height,
  };

  private restartButtonRectangle: Rectangle = {
    x: (this.canvasSize.width - buttonSize.width) / 2,
    y: (2 * this.canvasSize.height) / 3 + buttonSize.height - 20,
    width: buttonSize.width,
    height: buttonSize.height,
  };

  renderParanja(): void {
    this.context.fillStyle = 'rgba(255, 255, 255, 0.75)';
    this.context.fillRect(
      0, 0,
      this.canvasSize.width,
      this.canvasSize.height,
    );
  }

  renderScene(): void {
    blurCanvas(this.context).then(() => {
      this.renderParanja();

      renderImage(
        this.context,
        {
          x: (this.canvasSize.width - emojiSize.width) / 2,
          y: this.canvasSize.height / 2 - 150,
        },
        winningEmojiImage,
      );

      renderText(
        this.context,
        'You are the WINNER!',
        {
          x: this.canvasSize.width / 2,
          y: this.canvasSize.height / 2 - 20,
          align: 'center',
          font: '32px Arial',
          color: Colors.DarkGrey,
        },
      );

      renderImage(
        this.context,
        {
          x: this.menuButtonRectangle.x - 8,
          y: this.menuButtonRectangle.y - 6,
        },
        goToMenuButtonImage,
      );

      renderImage(
        this.context,
        {
          x: this.restartButtonRectangle.x - 8,
          y: this.restartButtonRectangle.y - 6,
        },
        playAgainButtonImage,
      );

      this.renderFullScreenButton();
    });
  }

  handleCanvasClick = (nextScene: NextSceneResolveFunction) => (event: MouseEvent) => {
    const isRestartButtonClicked = isMousePositionInsideRect(
      event,
      this.clientRect,
      this.canvasSize,
      this.restartButtonRectangle,
    ) && !this.countingDown;

    const isMenuButtonClicked = isMousePositionInsideRect(
      event,
      this.clientRect,
      this.canvasSize,
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
