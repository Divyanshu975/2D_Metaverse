import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Game: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);

    useEffect(() => {
        console.log("inside useEffect");
    if (phaserGameRef.current || !gameRef.current) return;

    // const config: Phaser.Types.Core.GameConfig = {
    //   type: Phaser.AUTO,
    //   width: 800,
    //   height: 600,
    //     parent: gameRef.current,
    //   backgroundColor: '#1d1d1d',
    //   physics: {
    //     default: 'arcade',
    //     arcade: {
    //       debug: false,
    //     },
    //   },
    //   scene: {
    //     preload,
    //     create,
    //     update,
    //   },
    // };

    let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    function preload(this: Phaser.Scene) {
      this.load.spritesheet('player', 'assets/player.png',{frameWidth: 32, frameHeight: 32,});
    }

    function create(this: Phaser.Scene) {
      player = this.physics.add.sprite(400, 300, 'player');
        cursors = this.input.keyboard.createCursorKeys();
        
        this.anims.create({
            key: 'walk-down',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1,
          });
          
          this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
            frameRate: 8,
            repeat: -1,
          });
          
          this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
            frameRate: 8,
            repeat: -1,
          });
          
          this.anims.create({
            key: 'walk-up',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
            frameRate: 8,
            repeat: -1,
          });
          
    }

    function update(this: Phaser.Scene) {
      const speed = 200;

      if (cursors.left?.isDown) {
        player.setVelocityX(-speed);
        player.setVelocityY(0);
        player.anims.play('walk-left', true);
      } else if (cursors.right?.isDown) {
        player.setVelocityX(speed);
        player.setVelocityY(0);
        player.anims.play('walk-right', true);
      } else if (cursors.up?.isDown) {
        player.setVelocityY(-speed);
        player.setVelocityX(0);
        player.anims.play('walk-up', true);
      } else if (cursors.down?.isDown) {
        player.setVelocityY(speed);
        player.setVelocityX(0);
        player.anims.play('walk-down', true);
      } else {
        player.setVelocity(0);
        player.anims.stop();
      }
      
    }

        // phaserGameRef.current = new Phaser.Game(config);
        setTimeout(() => {
            if (gameRef.current?.querySelector('canvas')) {
                console.warn('Canvas already exists. Skipping Phaser init.');
                return;
            }
            
            const config: Phaser.Types.Core.GameConfig = {
              type: Phaser.AUTO,
              width: 800,
              height: 600,
              parent: gameRef.current,
              backgroundColor: '#1d1d1d',
              physics: {
                default: 'arcade',
                arcade: {
                  debug: true,
                },
              },
              scene: {
                preload,
                create,
                update,
              },
            };
      
            phaserGameRef.current = new Phaser.Game(config);
          }, 0);

    return () => {
      phaserGameRef.current?.destroy(true);
    };
  }, []);

  return <div ref={gameRef} style={{ width: '800px', height: '600px', border: '1px solid red' }}/>;
};

export default Game;
