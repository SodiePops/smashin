import * as tudi from 'tudi'
const Vec2 = tudi.Math.Vec2

export default class Laser extends tudi.Components.Component {
  name = 'laser'
  speed = 20
  lifespan = 0.5 // seconds
  private time = 0

  setup (): void {
    // T O D O
  }

  update (dt: number): void {
    this.time += dt
    if (this.time > this.lifespan) {
      this.entity.destroy()
    }

    this.entity.transform.position
      .add(Vec2.MULT(this.entity.transform.forward, this.speed))
  }
}
