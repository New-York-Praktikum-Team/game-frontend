import { CanvasHelper, CanvasSize } from 'helpers/CanvasHelper';
import { Position } from 'game/objects/Position';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';
import { Rectangle } from 'consts/shapes';

export class LosingScene {
  constructor(
    public context: CanvasRenderingContext2D,
    public canvasRef: HTMLCanvasElement,
    public canvasSize: CanvasSize,
    public clientRect: ClientRect,
  ) { }

  public restartButtonRectangle: Rectangle = {
    x: 125,
    y: 420,
    width: 250,
    height: 50,
  };

  getMousePosition(event: MouseEvent): Position {
    const { left = 0, top = 0 } = (this.clientRect || {});

    return ({
      x: event.clientX - left,
      y: event.clientY - top,
    });
  }

  renderLosingScene(): void {
    const buttonTopLeft: Position = {
      x: this.restartButtonRectangle.x,
      y: this.restartButtonRectangle.y,
    };

    this.context.fillStyle = 'rgba(255, 255, 255, 0.7)';

    this.context.fillRect(
      0,
      0,
      this.canvasSize.width,
      this.canvasSize.height,
    );

    CanvasHelper.renderText(
      this.context,
      'You LOST! 🤬',
      {
        x: this.canvasSize.width / 2,
        y: 50,
        align: 'center',
        font: '32px Arial',
        color: Colors.DarkGrey,
      },
    );

    CanvasHelper.renderStartButton(
      this.context,
      this.restartButtonRectangle,
      buttonTopLeft,
      { text: 'Play again', fontSize: '24px' },
    );
  }

  // function that creates event listener callback
  handleCanvasClick(onButtonClick: (appMode: AppMode) => void): (event: MouseEvent) => void {
    return (event: MouseEvent) => {
      // detect if start button was clicked
      const mousePosition = this.getMousePosition(event);
      const isButtonClicked = CanvasHelper.isPositionInsideRect(
        mousePosition,
        this.restartButtonRectangle,
      );

      if (isButtonClicked) {
        onButtonClick(AppMode.Main);
      }
    };
  }

  render(): Promise<AppMode> {
    return new Promise((resolve) => {
      this.renderLosingScene();
      this.canvasRef.addEventListener('click', this.handleCanvasClick(resolve));
    });
  }
}
