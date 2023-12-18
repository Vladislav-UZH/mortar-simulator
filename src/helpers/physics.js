export class Physics {
  constructor({ startSpeed, angle }) {
    this.startSpeed = startSpeed;
    this.angle = angle;
    this.G_CONSTANT = 9.8;
  }
  msToSec(ms) {
    return +(ms / 1000).toFixed(3);
  }

  getValueOfAngleInRadians({ type = "cos", angle = 45 }) {
    const radians = (angle * Math.PI) / 180;

    return +Math[type](radians).toFixed(80);
  }

  _getOX(time) {
    const Vs = this.startSpeed;
    const cos = this.getValueOfAngleInRadians({
      type: "cos",
      angle: this.angle,
    });
    const t = this.msToSec(time);

    return Vs * cos * t;
  }
  _getOY(time) {
    const Vs = this.startSpeed;
    const sin = this.getValueOfAngleInRadians({
      type: "sin",
      angle: this.angle,
    });
    const t = this.msToSec(time);

    return Vs * sin * t - (this.G_CONSTANT * Math.pow(t, 2)) / 2;
  }

  getVelocityOX(time) {
    const Vs = this.startSpeed;
    const cos = this.getValueOfAngleInRadians({
      type: "cos",
      angle: this.angle,
    });
    const t = this.msToSec(time);

    return Vs * cos * t;
  }

  getVelocityOY(time) {
    const Vs = this.startSpeed;
    const sin = this.getValueOfAngleInRadians({
      type: "sin",
      angle: this.angle,
    });
    const t = this.msToSec(time);

    return Vs * sin - this.G_CONSTANT * t;
  }

  getVelocity(time) {
    const Vx = this.getVelocityOX(time);
    const Vy = this.getVelocityOY(time);
    // return Vy;
    return +(Math.abs(Math.pow(Vx, 2) + Math.pow(Vy, 2)) / 10).toFixed(3);
  }

  getCoordinate({ axis, timeInSec }) {
    return {
      OX: this._getOX(timeInSec),
      OY: this._getOY(timeInSec),
    }[axis];
  }
}
