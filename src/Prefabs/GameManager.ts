import * as tudi from 'tudi'
import asteroid from './Asteroid'
const Vec2 = tudi.Math.Vec2

class GameManager extends tudi.Components.Component {
  name = 'gameManager'
  hasPlayedTheme = false

  setup (): void {
    this.entity.update$.observe(this.update.bind(this))
  }

  playTheme (): void {
    const a = <tudi.Components.AudioComponent>this.entity.getComponent('audio')
    const s = a.sounds['assets/sounds/theme.wav']
    s.play()
  }

  restartGame (): void {
    this.playTheme()
    this.entity.scene
      .addEntity(asteroid('xl', new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight)))
    this.entity.scene
      .addEntity(asteroid('xl', new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight)))
    this.entity.scene
      .addEntity(asteroid('xl', new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight)))
  }

  update (): void {
    if (!this.hasPlayedTheme) {
      this.playTheme()
      this.hasPlayedTheme = true
    }
    for (const e of Object.values(this.entity.scene.entities)) {
      if (e.name === 'asteroid') {
        return
      }
    }
    // No more asteroids, restart game
    this.restartGame()
  }
}

export default function gameManager (): tudi.Entity {
  return new tudi.Entity(
    'gameManager',
    {},
    [
      new GameManager(),
      new tudi.Components.AudioComponent(['assets/sounds/theme.wav']),
    ],
    [],
  )
}
