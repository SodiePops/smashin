import * as tudi from 'tudi'
import ScreenWrap from './ScreenWrap'
import Laser from './Laser'
const Vec2 = tudi.Math.Vec2

export default class LaserWeapon extends tudi.Components.Component {
  name = 'laserWeapon'

  setup (): void {/**/}

  fire (): void {
    this.entity.scene.addEntity(this.createLaser())
  }

  createLaser (): tudi.Entity {
    const t = this.entity.transform
    return new tudi.Entity(
      'laser',
      {
        position: t.position.clone(),
        rotation: this.entity.transform.rotation - Math.PI / 2,
        pivot: new Vec2(3, 5),
      },
      [
        new tudi.Components.SpriteComponent('assets/laser.png'),
        new ScreenWrap(),
        new Laser(),
      ],
      [])
  }
}
