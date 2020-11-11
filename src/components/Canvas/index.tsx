import React, { Component } from 'react';

export class Canvas extends Component {
  public myRef: any;

  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.myRef.current.getContext('2d');
    ctx.fillStyle = "#AFEEEE";
    ctx.fillRect(0, 0, 500, 500);

    ctx.beginPath();
    ctx.lineWidth = 3;

    ctx.moveTo(60, 120);
    ctx.bezierCurveTo(90, 30, 200, 130, 310, 55);

    ctx.moveTo(60, 120);
    ctx.bezierCurveTo(90, 170, 200, 110, 310, 160);

    ctx.moveTo(310, 55);
    ctx.quadraticCurveTo(320, 80, 280, 110);

    ctx.moveTo(310, 160);
    ctx.quadraticCurveTo(320, 120, 280, 110);

    ctx.moveTo(100, 100);
    ctx.arc(100, 100, 5, 0, 2 * Math.PI);

    ctx.moveTo(60, 120);
    ctx.lineTo(80, 120);
    ctx.stroke();
  }

  render() {
    return (
      <div>
        <canvas ref={this.myRef} width={500} height={500} />
      </div>
    );
  }

}
