import { CanvasHelper, CanvasSize } from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';

type NextSceneResolveFunction = (value?: AppMode | PromiseLike<AppMode>) => void;
type EventListenerFabric = (
  nextScene: NextSceneResolveFunction
) => (
  event: MouseEvent
) => void;

type SceneBaseClass = typeof SceneBase;

export interface SceneBaseDerived extends SceneBaseClass { }

export abstract class SceneBase {
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
}

export abstract class SceneBaseButtonActions extends SceneBase {
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

      CanvasHelper.clear(context, canvasSize, Colors.LightBlue);

      CanvasHelper.renderText(
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

      CanvasHelper.renderText(
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

  render(): Promise<AppMode> {
    return new Promise((resolve) => {
      this.renderScene();
      this.canvasRef.addEventListener('click', this.handleCanvasClick(resolve));
    });
  }
}
