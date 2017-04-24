/**
 * Entry point.
 */
import * as tudi from 'tudi'
import PlayerController from './PlayerController'

const player: tudi.Entity = new tudi.Entity(
  {pos: {x: 100, y: 150}},
  [
    new tudi.Components.SpriteComponent('assets/player.png'),
    new PlayerController(),
  ],
  [],
)

const scene: tudi.Scene = new tudi.Scene(
  ['assets/player.png', 'assets/floor.png', 'assets/enemy.png'],
  [
    player,
    new tudi.Entity(
      {pos: {x: 20, y: 30}},
      [new tudi.Components.SpriteComponent('assets/floor.png')],
      []),
    new tudi.Entity(
      {pos: {x: 5, y: 10}},
      [new tudi.Components.SpriteComponent('assets/enemy.png')],
      []),
  ],
)

const game: tudi.Game = new tudi.Game(200, 200)
game.start(scene)
