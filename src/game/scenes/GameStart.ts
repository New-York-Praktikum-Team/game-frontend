import { CanvasHelper, CanvasSize } from 'helpers/CanvasHelper';
import { Position } from 'game/objects/Position';
import { AppMode } from 'components/GameCanvas';
import { Colors } from 'consts/colors';

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class StartScene {
  constructor(
    public context: CanvasRenderingContext2D | null,
    public canvasRef: HTMLCanvasElement | null,
    public canvasSize: CanvasSize,
    public clientRect: ClientRect | null,
  ) { }

  public startButtonRectangle: Rectangle = {
    x: 75,
    y: 100,
    width: 350,
    height: 100,
  };

  getMousePosition(event: MouseEvent): Position {
    const { left = 0, top = 0 } = (this.clientRect || {});

    return ({
      x: event.clientX - left,
      y: event.clientY - top,
    });
  }

  isPositionInsideRect(position: Position, rectangle: Rectangle): boolean {
    return (
      position.x > rectangle.x
      && rectangle.x + rectangle.width > position.x
      && position.y > rectangle.y
      && rectangle.y + rectangle.height > position.y
    );
  }

  renderStartButton(): void {
    // set button color
    this.context!.fillStyle = '#3369F3';

    // draw button background
    this.context!.fillRect(
      this.startButtonRectangle.x,
      this.startButtonRectangle.y,
      this.startButtonRectangle.width,
      this.startButtonRectangle.height,
    );

    // draw button text
    CanvasHelper.renderText(
      this.context!,
      'Play', {
        x: this.canvasSize.width / 2,
        y: this.canvasSize.height / 3,
        align: 'center',
        font: '42px Arial',
        color: Colors.white,
      },
    );
  }

  renderStartScene(): void {
    // clear prev scene
    CanvasHelper.clear(this.context!, this.canvasSize, Colors.lightBlue);

    // draw the main button
    this.renderStartButton();

    // supportive text
    CanvasHelper.renderText(
      this.context!,
      'To start the game, press the big blue button above', {
        x: this.canvasSize.width / 2,
        y: this.canvasSize.height / 2,
        align: 'center',
        font: '16px Arial',
        color: Colors.darkGrey,
      },
    );
  }

  // function that creates event listener callback
  handleCanvasClick(onButtonClick: (appMode: AppMode) => void): (event: MouseEvent) => void {
    return (event: MouseEvent) => {
      // detect if start button was clicked
      const mousePosition = this.getMousePosition(event);
      const isButtonClicked = this.isPositionInsideRect(mousePosition, this.startButtonRectangle);

      if (isButtonClicked) {
        let counter = 5;
        const { context, canvasSize } = this;

        // draw countdown before the game starts
        let timerId = setTimeout(function tick() {
          const counterText = counter === 0 ? 'GO!' : counter.toString();

          CanvasHelper.clear(context!, canvasSize, Colors.lightBlue);

          CanvasHelper.renderText(
            context!,
            'Get ready in', {
              x: canvasSize.width / 2,
              y: canvasSize.height / 3,
              align: 'center',
              font: '32px Arial',
              color: Colors.darkGrey,
            },
          );

          CanvasHelper.renderText(
            context!,
            counterText, {
              x: canvasSize.width / 2,
              y: canvasSize.height / 2,
              align: 'center',
              font: '72px Arial',
              color: Colors.darkBlue,
            },
          );

          counter -= 1;
          timerId = setTimeout(tick, 1000);
        }, 0);

        setTimeout(() => {
          clearInterval(timerId);
          onButtonClick(AppMode.Game);
        }, 6000);
      }
    };
  }

  render(): Promise<AppMode> {
    return new Promise((resolve) => {
      this.renderStartScene();
      this.canvasRef?.addEventListener('click', this.handleCanvasClick(resolve));
    });
  }
}
