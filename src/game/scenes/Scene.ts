import {
  CanvasSize, clear, isMousePositionInsideRect, renderImageButton, renderText,
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

  fullScreenButtonClickTarget?: Rectangle;

  constructor(
    public canvasRef: HTMLCanvasElement,
    public canvasSize: CanvasSize,
    public options?: GameOptions,
  ) {
    this.clientRect = canvasRef.getBoundingClientRect();
    this.context = canvasRef.getContext('2d')!;
  }

  setUp(): void {
    window.onresize = () => {
      this.clientRect = this.canvasRef.getBoundingClientRect();
    };

    document.onfullscreenchange = () => {
      this.clientRect = this.canvasRef.getBoundingClientRect();
    };
  }

  abstract render(): Promise<AppOptions>;

  abstract destroy(): void;

  renderFullScreenButton(): void {
    if (document.fullscreenEnabled) {
      this.fullScreenButtonClickTarget = renderImageButton(
        this.context,
        {
          x: this.canvasSize.width - 100,
          y: this.canvasSize.height - 100,
        },
        !document.fullscreenElement ? fullscreen : fullscreenExit,
      );
    }
  }

  handleFullScreenButtonClick(event: MouseEvent): void {
    const isFullScreenButtonClicked = isMousePositionInsideRect(
      event,
      this.clientRect,
      this.fullScreenButtonClickTarget!,
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
    let counter = secondsBeforeStart + 1; // add additional second to display "GO!"

    // draw countdown before the game starts

    let timerId: NodeJS.Timeout;

    const tick = () => {
      if (counter === 0) {
        clearInterval(timerId);
        nextScene({ appMode: AppMode.Game, options });
        return;
      }

      const counterText = counter === 1 ? 'GO!' : (counter - 1).toString(); // substract additional second

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
    this.canvasRef.removeEventListener('click', this.eventClickListener!);
  }
}
