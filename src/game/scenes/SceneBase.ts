import { CanvasSize } from 'helpers/CanvasHelper';
import { AppMode } from 'components/GameCanvas';

export type NextSceneResolveFunction = (value?: AppMode | PromiseLike<AppMode>) => void;
export type EventListenerFabric = (
  nextScene: NextSceneResolveFunction
) => (
  event: MouseEvent
) => void;

export abstract class SceneBase {
  clientRect: ClientRect;

  context: CanvasRenderingContext2D | null;

  abstract renderScene(): void;

  constructor(
    public canvasRef: HTMLCanvasElement,
    public canvasSize: CanvasSize,
  ) {
    this.clientRect = canvasRef.getBoundingClientRect();
    this.context = canvasRef.getContext('2d');
  }

  render(handleCanvasClick: EventListenerFabric): Promise<AppMode> {
    return new Promise((resolve) => {
      this.renderScene();
      this.canvasRef.addEventListener('click', handleCanvasClick(resolve));
    });
  }
}
