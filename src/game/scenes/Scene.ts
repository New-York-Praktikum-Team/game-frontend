import { CanvasSize, clear, renderText } from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';

type NextSceneResolveFunction = (value?: AppMode | PromiseLike<AppMode>) => void;
type EventListenerFabric = (
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
  ) {
    this.clientRect = canvasRef.getBoundingClientRect();
    this.context = canvasRef.getContext('2d')!;
  }

  abstract render(): Promise<AppMode>;

  abstract destroy(): void;
}

export abstract class SceneButtonActions extends Scene {
  private secondsBeforeStart = 3;

  private tickDuration = 1000;

  protected renderCountdown(nextScene: (appMode: AppMode) => void): void {
    const {
      context, canvasSize, secondsBeforeStart, tickDuration,
    } = this;
    let counter = secondsBeforeStart;

    // draw countdown before the game starts
    let timerId = setTimeout(function tick() {
      const counterText = counter === 0 ? 'GO!' : counter.toString();

      clear(context, canvasSize, Colors.LightBlue);

      renderText(
        context,
        'Get ready in',
        {
          x: canvasSize.width / 2,
          y: canvasSize.height / 3,
          align: 'center',
          font: '32px Arial',
          color: Colors.DarkGrey,
        },
      );

      renderText(
        context,
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

  protected abstract renderScene(): void;

  protected abstract handleCanvasClick: EventListenerFabric;

  private eventClickListener?: (event: MouseEvent) => void;

  render(): Promise<AppMode> {
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
