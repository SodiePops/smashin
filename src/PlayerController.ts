import * as tudi from 'tudi'
const KEYS = tudi.Keyboard.KEYS

export default class PlayerController extends tudi.Components.Component {
  name = 'playerController'
  speed = 48
  scaleSpeed = 1
  rotationSpeed = Math.PI / 2

  private soundID: number

  setup (): void {
    // Do nothing
  }

  update (dt: number): void {
    const t = this.entity.transform
    const a = <tudi.Components.AudioComponent>this.entity.getComponent('audio')
    if (tudi.Keyboard.isDown(KEYS.LEFT))
      t.position.x -= this.speed * dt
    if (tudi.Keyboard.isDown(KEYS.RIGHT))
      t.position.x += this.speed * dt
    if (tudi.Keyboard.isDown(KEYS.UP))
      t.position.y -= this.speed * dt
    if (tudi.Keyboard.isDown(KEYS.DOWN))
      t.position.y += this.speed * dt

    if (tudi.Keyboard.isDown(KEYS.W))
      t.scale.y += this.scaleSpeed * dt
    if (tudi.Keyboard.isDown(KEYS.A))
      t.scale.x -= this.scaleSpeed * dt
    if (tudi.Keyboard.isDown(KEYS.S))
      t.scale.y -= this.scaleSpeed * dt
    if (tudi.Keyboard.isDown(KEYS.D))
      t.scale.x += this.scaleSpeed * dt

    if (tudi.Keyboard.isDown(KEYS.SPACEBAR))
      t.rotation += this.rotationSpeed * dt

    if (tudi.Keyboard.isDown(KEYS.Q)) {
      const s = a.sounds['assets/sounds/powerup.wav']
      if (!s.playing(this.soundID)) {
        this.soundID = s.play()
      }
    }
  }
}
