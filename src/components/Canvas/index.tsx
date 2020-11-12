import { Ball } from 'game/Ball';
import { randomColor } from 'game/Color';
import { BallRadius } from 'game/Defaults';
import { GameObject } from 'game/GameObject';
import { Hole } from 'game/Hole';
import { Level } from 'game/levels/Level';
import { Level1 } from 'game/levels/Level1';
import { Nyma } from 'game/Nyma';
import React, { Component, RefObject } from 'react';

enum AppMode {
  Start, Game, End,
}

type CanvasProps = {};
type CanvasDimension = { width: number, height: number };

interface CanvasState {
  appMode: AppMode;
  context: CanvasRenderingContext2D | null;
  canvasDim: CanvasDimension;
  snakeLength: number;
  score: number;
  level: Level | undefined;
}

export class Canvas extends Component<CanvasProps, CanvasState> {
  state: CanvasState = {
    appMode: AppMode.Start,
    context: null,
    canvasDim: {
      width: 500,
      height: 500,
    },
    snakeLength: 10,
    score: 0,
    level: undefined,
  };

  canvasRef: RefObject<HTMLCanvasElement>;

  gameObjects: GameObject[] = [];

  nyma?: Nyma;

  hole?: Hole;

  ballSnake?: Ball[];

  constructor(props: CanvasProps) {
    super(props);
    this.canvasRef = React.createRef<HTMLCanvasElement>();
  }

  componentDidMount() {
    const context = this.canvasRef.current!.getContext('2d')!;

    this.setState({ context, level: new Level1() }, () => {
      this.startGame();
    });
  }

  startTime: number = 0;

  lastTime: number = 0;

  animationTime = 50000;

  animateStep = 0;

  startGame() {
    this.nyma = new Nyma({ x: this.state.canvasDim.width / 2, y: this.state.canvasDim.height / 2 });
    this.hole = new Hole(this.state.level!.path().end);
    this.ballSnake = [];

    this.gameObjects.push(this.nyma);
    this.gameObjects.push(this.hole);

    this.setState({
      appMode: AppMode.Start,
      score: 0,
    });
    this.drawObjects();

    this.startTime = performance.now();
    this.lastTime = this.startTime;
    this.animateStep = 0;

    requestAnimationFrame(() => { this.updateCanvas(); });
  }

  drawObjects(): void {
    const ctx = this.state.context!;
    ctx.fillStyle = '#AFEEEE';
    ctx.fillRect(0, 0, this.state.canvasDim.width, this.state.canvasDim.height);
    this.gameObjects.forEach((o) => o.draw(this.state.context!));
  }

  addBall(): Ball {
    const ball = new Ball(this.state.level!.path().start, BallRadius, randomColor());
    this.ballSnake!.push(ball);
    this.gameObjects.push(ball);
    ball.draw(this.state.context!);

    return ball;
  }

  updateCanvas() {
    const ctx = this.state.context!;

    const time = performance.now();
    const shiftTime = time - this.startTime;
    const multiply = shiftTime / this.animationTime;

    const timeDelta = time - this.lastTime;
    this.lastTime = time;

    // adding new balls with 20px distance from each other
    const currentSnakeLength = this.ballSnake!.length;
    if (
      currentSnakeLength === 0
      || this.ballSnake![currentSnakeLength - 1]
        .distanceToPosition(this.state.level!.path().start) > 20
    ) {
      this.addBall();
    }

    ctx.clearRect(0, 0, this.state.canvasDim.width, this.state.canvasDim.height);
    this.drawObjects();

    this.ballSnake!.forEach((ball) => {
      ball.clock(timeDelta, ctx);
    });

    if (multiply < 1) {
      this.animateStep += 1;
      requestAnimationFrame(() => { this.updateCanvas(); });
    }
  }

  render() {
    return (
      <div>
        <canvas
          ref={this.canvasRef}
          width={this.state.canvasDim.width}
          height={this.state.canvasDim.height}
        />
      </div>
    );
  }
}
