import { CanvasSize, clear, renderText } from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Level } from 'game/levels/Level';

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
    }

    document.onfullscreenchange = () => {
      this.clientRect = this.canvasRef.getBoundingClientRect();
    }
  }

  abstract render(): Promise<AppOptions>;

  abstract destroy(): void;
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
      this.eventClickListener = this.handleCanvasClick(resolve);
      this.canvasRef.addEventListener('click', this.eventClickListener);
    });
  }

  destroy(): void {
    this.canvasRef.removeEventListener('click', this.eventClickListener!);
  }
}
