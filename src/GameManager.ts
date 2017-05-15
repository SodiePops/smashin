import * as tudi from 'tudi'
import Asteroid from './Asteroid'
const Vec2 = tudi.Math.Vec2

export default function GameManager (): tudi.Entity {
  return new tudi.Entity(
    'gameManager',
    {},
    [
      new GameManagerComponent(),
      new tudi.Components.AudioComponent(['assets/sounds/theme.wav']),
    ],
    [],
  )
}

class GameManagerComponent extends tudi.Components.Component {
  name = 'gameManager'
  hasPlayedTheme = false

  setup (): void {
    // T O D O
  }

  playTheme (): void {
    const a = <tudi.Components.AudioComponent>this.entity.getComponent('audio')
    const s = a.sounds['assets/sounds/theme.wav']
    s.play()
  }

  restartGame (): void {
    this.playTheme()
    this.entity.scene
      .addEntity(Asteroid('xl', new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight)))
    this.entity.scene
      .addEntity(Asteroid('xl', new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight)))
    this.entity.scene
      .addEntity(Asteroid('xl', new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight)))
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
