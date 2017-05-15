// import * as tudi from 'tudi'
import * as tudi from 'tudi'
import LaserWeapon from './LaserWeapon'
const KEYS = tudi.Keyboard.KEYS
const Vec2 = tudi.Math.Vec2

export default class PlayerController extends tudi.Components.Component {
  name = 'playerController'
  thrust = 48
  friction = 1.1
  scaleSpeed = 1
  turnSpeed = Math.PI
  thrustSprite: tudi.Components.SpriteComponent

  private velocity = new Vec2(0, 0)
  private acceleration = new Vec2(0, 0)

  private soundID: number

  setup (): void {
    this.thrustSprite = <tudi.Components.SpriteComponent>(<tudi.Entity>this.entity.getChild('thrust')).getComponent('sprite')
  }

  update (dt: number): void {
    const t = this.entity.transform
    const a = <tudi.Components.AudioComponent>this.entity.getComponent('audio')

    if (tudi.Keyboard.isDown(KEYS.LEFT))
      t.rotation -= this.turnSpeed * dt
    if (tudi.Keyboard.isDown(KEYS.RIGHT))
      t.rotation += this.turnSpeed * dt

    if (tudi.Keyboard.isDown(KEYS.UP)) {
      this.thrustSprite.sprite.visible = true
      this.acceleration = Vec2.MULT(t.right, this.thrust)
    } else {
      this.thrustSprite.sprite.visible = false
      this.acceleration = new Vec2(0, 0)
    }
    this.velocity = Vec2.ADD(this.velocity, Vec2.MULT(this.acceleration, dt))
    t.position = Vec2.ADD(t.position, this.velocity)
    this.velocity = Vec2.DIV(this.velocity, this.friction)

    if (tudi.Keyboard.isDown(KEYS.SPACEBAR)) {
      const s = a.sounds['assets/sounds/laser.wav']
      if (!s.playing(this.soundID)) {
        this.soundID = s.play()

        const l = this.entity.getComponent('laserWeapon') as LaserWeapon
        l.fire()
      }
    }
  }
}
