import { CanvasHelper, CanvasSize } from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';

export type NextSceneResolveFunction = (value?: AppMode | PromiseLike<AppMode>) => void;
export type EventListenerFabric = (
  nextScene: NextSceneResolveFunction
) => (
  event: MouseEvent
) => void;

export abstract class SceneBase {
  private secondsBeforeStart = 3;

  private tickDuration = 1000;

  clientRect: ClientRect;

  context: CanvasRenderingContext2D;

  protected abstract renderScene(): void;

  constructor(
    public canvasRef: HTMLCanvasElement,
    public canvasSize: CanvasSize,
  ) {
    this.clientRect = canvasRef.getBoundingClientRect();
    this.context = canvasRef.getContext('2d')!;
  }

  renderCountdown(nextScene: (appMode: AppMode) => void): void {
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

  render(handleCanvasClick: EventListenerFabric): Promise<AppMode> {
    return new Promise((resolve) => {
      this.renderScene();
      this.canvasRef.addEventListener('click', handleCanvasClick(resolve));
    });
  }
}
