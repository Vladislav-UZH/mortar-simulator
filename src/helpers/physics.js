export class Physics {
  constructor({ startSpeed, angle }) {}
  msToSec(ms) {
    return +(ms / 1000).toFixed(3);
  }

  getValueOfAngleInRadians({ type = "cos", angle = 45 }) {
    const radians = (angle * Math.PI) / 180;

    return +Math[type](radians).toFixed(80);
  }

  _getOX() {}
  _getOY() {}

  getCoordinate({ axis, timeInSec }) {}
}
