var zombieTemplate = {

    createZombie : function(posX,posY,range){
        var zombie = {
            aZombie : null,
            debutZombie : null,
            isAlive : null,
        
            initZombie : function(){
                this.aZombie = jeu.scene.physics.add.sprite(posX,posY,"zombie","zombie_stand");
                this.aZombie.setOrigin(0.5,1);
                this.gererDeplacement();
                this.gererCollide();
            },
            /*
            detruireZombie : function(){
                this.aZombie.destroy();
            },
        */
            gererDeplacement : function(){
                this.aZombie.anims.play("zombieWalk");
                var tween = jeu.scene.tweens.add({
                    targets : this.aZombie,
                    x : posX + range,
                    ease : "Linear",
                    duration : 1000 * range / 100,
                    yoyo : true,
                    repeat : -1,
                    onStart : function (){},
                    onComplete : function (){},
                    onYoyo : function (tween){tween.targets[0].flipX = !tween.targets[0].flipX},
                    onRepeat : function (){ tween.targets[0].flipX = !tween.targets[0].flipX}
                });
            
            },
            gererCollide : function(){
                jeu.scene.physics.add.collider(this.aZombie,jeu.world.topLayer);
                jeu.scene.physics.add.overlap(jeu.player.aPlayer,this.aZombie,this.attackZombie);
            },
            attackZombie : function(player,zombie){
                if(jeu.player.isJumping){
                    zombie.destroy();
                }
                else{
                    jeu.world.killPlayer();
                }
            }
        }
        return zombie;
    },
    generateZombieAnimations : function(){
        jeu.scene.anims.create({
            key: "zombieWalk",
            frames : jeu.scene.anims.generateFrameNames("zombie",{prefix:"zombie_walk",start:1,end:2}),
            frameRate:6,
            repeat : -1
        });
        jeu.scene.anims.create({
            key: "zombieIdle",
            frames : [{key: "zombie",frame : "zombie_stand"},{key :"zombie",frame :"zombie_idle"}],
            frameRate:2,
            repeat : -1
        });
    },
}
