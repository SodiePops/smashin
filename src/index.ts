/**
 * Entry point.
 */

import * as tudi from 'tudi'
import PlayerController from './PlayerController'
import ScreenWrap from './ScreenWrap'
import LaserWeapon from './LaserWeapon'
import Asteroid from './Asteroid'
import GameManager from './GameManager'
const Vec2 = tudi.Math.Vec2

const player: tudi.Entity = new tudi.Entity(
  'player',
  {position: new Vec2(window.innerWidth / 2, window.innerHeight / 2), pivot: new Vec2(21, 16)},
  [
    new tudi.Components.SpriteComponent('assets/ship.png'),
    new tudi.Components.AudioComponent(['assets/sounds/laser.wav']),
    new ScreenWrap(),
    new PlayerController(),
    new LaserWeapon(),
  ],
  [new tudi.Entity(
    'thrust',
    {pivot: new Vec2(18, 4), position: new Vec2(21, 33), rotation: -Math.PI / 2},
    [new tudi.Components.SpriteComponent('assets/thrust.png')],
    [],
  )],
)

const scene: tudi.Scene = new tudi.Scene(
  {
    images: ['assets/ship.png', 'assets/laser.png', 'assets/thrust.png',
      'assets/asteroid-sm.png', 'assets/asteroid-md.png', 'assets/asteroid-lg.png', 'assets/asteroid-xl.png'],
    sounds: ['assets/sounds/hit.wav', 'assets/sounds/laser.wav', 'assets/sounds/theme.wav'],
  },
  [
    GameManager(),
    player,
    Asteroid('xl', new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight)),
    Asteroid('xl', new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight)),
    Asteroid('xl', new Vec2(Math.random() * window.innerWidth, Math.random() * window.innerHeight)),
  ],
)

const game: tudi.Game = new tudi.Game(window.innerWidth, window.innerHeight)
game.start(scene).then(() => {
 // TOODO
})
