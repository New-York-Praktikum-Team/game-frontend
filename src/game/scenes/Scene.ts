import {
  CanvasSize, clear, isMousePositionInsideRect, renderImage, renderText,
} from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Level } from 'game/levels/Level';
import { Rectangle } from 'consts/shapes';
import fullscreen from 'assets/images/Fullscreen.png';
import fullscreenExit from 'assets/images/FullscreenExit.png';

const secondsBeforeStart = 3;

const tickDuration = 1000;

export interface GameOptions {
  level?: Level;
  score?: number;
}

export interface AppOptions {
  appMode: AppMode;
  options?: GameOptions;
}

export type NextSceneResolveFunction =
  (value: AppOptions | PromiseLike<AppOptions>) => void;
type EventListenerFaсtory = (
  nextScene: NextSceneResolveFunction
) => (
  event: MouseEvent
) => void;

type SceneClass = typeof Scene;

export interface SceneDerived extends SceneClass { }

export abstract class Scene {
  clientRect: ClientRect;

  context: CanvasRenderingContext2D;

  fullScreenButtonRectangle: Rectangle;

  constructor(
    public canvasRef: HTMLCanvasElement,
    public canvasSize: CanvasSize,
    public options?: GameOptions,
  ) {
    this.clientRect = canvasRef.getBoundingClientRect();
    this.context = canvasRef.getContext('2d')!;

    this.fullScreenButtonRectangle = {
      x: this.canvasSize.width - 68,
      y: this.canvasSize.height - 68,
      width: 68,
      height: 68,
    };
  }

  protected updateClientRect = (): void => {
    this.clientRect = this.canvasRef.getBoundingClientRect();
  };

  setUp(): void {
    window.addEventListener('resize', this.updateClientRect);
    window.addEventListener('scroll', this.updateClientRect);
    document.addEventListener('fullscreenchange', this.updateClientRect);
  }

  abstract render(): Promise<AppOptions>;

  destroy(): void {
    window.removeEventListener('resize', this.updateClientRect);
    window.removeEventListener('scroll', this.updateClientRect);
    document.removeEventListener('fullscreenchange', this.updateClientRect);
  }

  renderFullScreenButton = (): void => {
    if (document.fullscreenEnabled) {
      const pxData = this.context.getImageData(
        this.fullScreenButtonRectangle.x + this.fullScreenButtonRectangle.width / 2,
        this.fullScreenButtonRectangle.y + this.fullScreenButtonRectangle.height / 2,
        1,
        1,
      ).data;
      this.context.fillStyle = `rgba(${pxData[0]}, ${pxData[1]}, ${pxData[2]}, ${pxData[3]})`;
      this.context.fillRect(
        this.fullScreenButtonRectangle.x,
        this.fullScreenButtonRectangle.y,
        this.fullScreenButtonRectangle.width,
        this.fullScreenButtonRectangle.height,
      );

      renderImage(
        this.context,
        {
          x: this.fullScreenButtonRectangle.x + 10,
          y: this.fullScreenButtonRectangle.y + 10,
        },
        !document.fullscreenElement ? fullscreen : fullscreenExit,
      );
    }
  };

  handleFullScreenButtonClick(event: MouseEvent): void {
    const isFullScreenButtonClicked = isMousePositionInsideRect(
      event,
      this.clientRect,
      this.canvasSize,
      this.fullScreenButtonRectangle,
    );

    if (isFullScreenButtonClicked) {
      if (!document.fullscreenElement) {
        this.canvasRef.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  }
}

export abstract class SceneButtonActions extends Scene {
  protected renderCountdown(
    nextScene: NextSceneResolveFunction, options?: GameOptions,
  ): void {
    let counter = secondsBeforeStart + 1;
    let timerId: NodeJS.Timeout;

    const tick = () => {
      if (counter === 0) {
        clearInterval(timerId);
        nextScene({ appMode: AppMode.Game, options });
        return;
      }

      const counterText = counter === 1 ? 'GO!' : (counter - 1).toString();

      clear(this.context, this.canvasSize, Colors.LightBlue);

      const level = options?.level ?? this.options?.level;
      const text = level ? `Get ready for ${level.name.toLowerCase()} in` : 'Get ready in';

      renderText(
        this.context,
        text,
        {
          x: this.canvasSize.width / 2,
          y: this.canvasSize.height / 3,
          align: 'center',
          font: '32px Arial',
          color: Colors.DarkGrey,
        },
      );

      renderText(
        this.context,
        counterText,
        {
          x: this.canvasSize.width / 2,
          y: this.canvasSize.height / 2,
          align: 'center',
          font: '72px Arial',
          color: Colors.DarkBlue,
        },
      );

      counter -= 1;
      timerId = setTimeout(tick, tickDuration);
    };

    timerId = setTimeout(tick, 0);
  }

  setUp(): void {
    super.setUp();
    document.addEventListener('fullscreenchange', this.renderFullScreenButton);
  }

  protected abstract renderScene(): void;

  protected abstract handleCanvasClick: EventListenerFaсtory;

  private eventClickListener?: (event: MouseEvent) => void;

  render(): Promise<AppOptions> {
    return new Promise((resolve) => {
      this.renderScene();
      this.renderFullScreenButton();
      this.eventClickListener = (event) => {
        this.handleFullScreenButtonClick(event);
        this.handleCanvasClick(resolve)(event);
      };
      this.canvasRef.addEventListener('click', this.eventClickListener);
    });
  }

  destroy(): void {
    super.destroy();
    this.canvasRef.removeEventListener('click', this.eventClickListener!);
    document.removeEventListener('fullscreenchange', this.renderFullScreenButton);
  }
}
