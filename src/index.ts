/**
 * Entry point.
 */
import * as tudi from 'tudi'
import PlayerController from './PlayerController'

const player: tudi.Entity = new tudi.Entity(
  {pos: {x: 100, y: 150}},
  [
    new tudi.Components.SpriteComponent('images/player.png'),
    new PlayerController(),
  ],
  [],
)

const scene: tudi.Scene = new tudi.Scene(
  ['images/player.png', 'images/floor.png', 'images/enemy.png'],
  [
    player,
    new tudi.Entity(
      {pos: {x: 20, y: 30}},
      [new tudi.Components.SpriteComponent('images/floor.png')],
      []),
    new tudi.Entity(
      {pos: {x: 5, y: 10}},
      [new tudi.Components.SpriteComponent('images/enemy.png')],
      []),
  ],
)

const game: tudi.Game = new tudi.Game(200, 200)
game.start(scene)
