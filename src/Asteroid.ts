import * as tudi from 'tudi'
import ScreenWrap from './ScreenWrap'
import Laser from './Laser'
const Vec2 = tudi.Math.Vec2

export default function Asteroid (size: AsteroidSize, position: tudi.Math.Vec2): tudi.Entity {
  return new tudi.Entity(
    'asteroid',
    {position, rotation: Math.random() * Math.PI * 2},
    [new AsteroidComponent(size), new ScreenWrap()],
    [],
  )
}

export type AsteroidSize = 'xl'| 'lg' | 'md' | 'sm'

class AsteroidComponent extends tudi.Components.Component {
  name = 'asteroid'
  direction: tudi.Math.Vec2
  radius: number
  speed = 6

  constructor (public size: AsteroidSize) {
    super()
    this.radius = {'xl': 256, 'lg': 128, 'md': 64, 'sm': 32}[this.size]
  }

  setup (): void {
    this.entity.transform.pivot = new Vec2(this.radius, this.radius)
    const randAngle = Math.random() * Math.PI * 2
    this.direction = new Vec2(Math.cos(randAngle), Math.sin(randAngle))
    this.entity.addComponent(
      new tudi.Components.SpriteComponent(`assets/asteroid-${this.size}.png`),
    )
  }
  update (): void {
    this.entity.transform.position
      .add(Vec2.MULT(this.direction, this.speed))

    for (const e of Object.values(this.entity.scene.entities)) {
      if (e.name === 'laser') {
        const lp = e.transform.position
        const ap = this.entity.transform.position
        if (Vec2.SUB(lp, ap).mag() < this.radius) {
          this.entity.destroy()
          e.destroy()
          return
        }
      }
    }
  }

  destroy (): void {
    switch (this.size) {
      case 'xl':
        this.entity.scene.addEntity(Asteroid('lg', this.entity.transform.position.clone()))
        this.entity.scene.addEntity(Asteroid('lg', this.entity.transform.position.clone()))
        break
      case 'lg':
        this.entity.scene.addEntity(Asteroid('md', this.entity.transform.position.clone()))
        this.entity.scene.addEntity(Asteroid('md', this.entity.transform.position.clone()))
        this.entity.scene.addEntity(Asteroid('md', this.entity.transform.position.clone()))
        break
      case 'md':
        this.entity.scene.addEntity(Asteroid('sm', this.entity.transform.position.clone()))
        this.entity.scene.addEntity(Asteroid('sm', this.entity.transform.position.clone()))
        this.entity.scene.addEntity(Asteroid('sm', this.entity.transform.position.clone()))
        this.entity.scene.addEntity(Asteroid('sm', this.entity.transform.position.clone()))
        break
      case 'sm':
        break
    }
  }

  fire (): void {
    this.entity.scene.addEntity(this.createLaser())
  }

  createLaser (): tudi.Entity {
    const t = this.entity.transform
    return new tudi.Entity(
      'laser',
      {
        position: new Vec2(t.position.x, t.position.y),
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
