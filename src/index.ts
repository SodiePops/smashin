/**
 * Entry point.
 */
import * as tudi from 'tudi'
import PlayerController from './PlayerController'
const Vec2: typeof tudi.Math.Vec2 = tudi.Math.Vec2

const child1: tudi.Entity = new tudi.Entity(
  'child1',
  {position: new Vec2(5, 15)},
  [
    new tudi.Components.SpriteComponent('assets/enemy.png'),
    // new PlayerController(),
  ],
  [],
)

const player: tudi.Entity = new tudi.Entity(
  'player',
  {position: new Vec2(window.innerWidth / 2, window.innerHeight / 2)/*, scale: new Vec2(1, 3)*/},
  [
    new tudi.Components.SpriteComponent('assets/player.png'),
    new tudi.Components.AudioComponent(['assets/sounds/powerup.wav']),
    new PlayerController(),
  ],
  [child1],
)

const scene: tudi.Scene = new tudi.Scene(
  {
    images: ['assets/player.png', 'assets/floor.png', 'assets/enemy.png'],
    sounds: ['assets/sounds/blip.wav', 'assets/sounds/coin.wav', 'assets/sounds/powerup.wav'],
  },
  [
    player,
    new tudi.Entity(
      'floor',
      {position: new Vec2(20, 30)},
      [new tudi.Components.SpriteComponent('assets/floor.png')],
      []),
    new tudi.Entity(
      'enemy',
      {position: new Vec2(60, 50)},
      [new tudi.Components.SpriteComponent('assets/enemy.png')],
      []),
  ],
)

const game: tudi.Game = new tudi.Game(window.innerWidth, window.innerHeight)
game.start(scene).then(() => {
  setTimeout(() => {
    // console.log('child1', child1.transform.position.toString(), child1.transform.worldPosition.toString())
    // console.log('player', player.transform.position.toString(), player.transform.worldPosition.toString())
    // console.log((<tudi.Components.SpriteComponent>player.getComponent('sprite')).sprite.localTransform)
  }, 2000)
})
