var world = {
    tilemap : null,
    tileset : null,
    downLayer : null,
    worldLayer : null,
    topLayer : null,
    positionDebut : null,
    positionFin : null,
    score : 0,
    scoreText : null,
    mortText : null,
    finText : null,
    gameOver : false,
    debutZombie1 :null,
    debutZombie2 :null,
    debutZombie3 :null,

    initialiserWorld : function(){
  
    this.tilemap = jeu.scene.make.tilemap({key: "map",tileWidth : 64, tileHeight : 64 });
    this.tileset = this.tilemap.addTilesetImage("tilesheet","tiles");
    this.downLayer = this.tilemap.createLayer("bot",this.tileset,0,0);
    this.worldLayer = this.tilemap.createLayer("world",this.tileset,0,0);
    this.overlapLayer = this.tilemap.createLayer("overlap",this.tileset,0,0);
    this.topLayer = this.tilemap.createDynamicLayer("top",this.tileset,0,0);
    this.positionDebut = this.tilemap.findObject("Objects", obj => obj.name === "debut");
    this.debutZombie1 =  this.tilemap.findObject("Objects", obj => obj.name === "debutZombie1");
    this.debutZombie2 =  this.tilemap.findObject("Objects", obj => obj.name === "debutZombie2");
    this.debutZombie3 =  this.tilemap.findObject("Objects", obj => obj.name === "debutZombie3");
    this.positionFin =  this.tilemap.findObject("Objects", obj => obj.name === "fin");
    this.topLayer.setCollisionByProperty({Collides : true});

    jeu.scene.physics.world.setBounds(0,0,this.tilemap.widthInPixels,this.tilemap.heightInPixels);
    this.overlapLayer.setTileIndexCallback(50,this.collectGemme,this); //id +1
    this.overlapLayer.setTileIndexCallback(53,this.collectGemme,this); //id +1
    this.overlapLayer.setTileIndexCallback(71,this.killPlayer,this); //id +1


    var policeTitre = {
        fontSize : "43px",
        color : "#FF0000",
        fontFamily : "Mochi"
    }
    this.scoreText = jeu.scene.add.text(16,16,"Score : 0",policeTitre);
    this.scoreText.setText("Score : " + this.score);
    this.scoreText.setScrollFactor(0);
    },

    gererCollider : function(){
        this.overlapLayer.setTileIndexCallback(50,this.collectGemme,this); //id +1
        jeu.scene.physics.add.collider(jeu.player.aPlayer,this.topLayer);
        jeu.scene.physics.add.overlap(jeu.player.aPlayer,this.overlapLayer);
      //  jeu.scene.physics.add.collider(jeu.zombie.aZombie,this.topLayer);
      //  jeu.scene.physics.add.overlap(jeu.zombie.aZombie,jeu.player.aPlayer, this.attackZombie);

      this.overlapLayer.setTileIndexCallback(76,this.finLevel,this); //id +1
     this.overlapLayer.setTileIndexCallback(91,this.finLevel,this); //id +1
    },
    finLevel : function(){
        if(player.x = this.positionFin.x ){
            if(!this.gameOver){
                this.gameOver = true;
                console.log("mort");
                jeu.player.killPlayer();
                jeu.scene.add.sprite(jeu.scene.cameras.main.midPoint.x,jeu.scene.cameras.main.midPoint.y,"panel").setScale(5,3);
                var restartBouton = jeu.scene.add.sprite(jeu.scene.cameras.main.midPoint.x,jeu.scene.cameras.main.midPoint.y+100,"validation").setInteractive();
                restartBouton.on("pointerup",function(){
                    jeu.scene.scene.restart();
                 });
                 var policeTitre = {
                    fontSize : "40px",
                    color : "#ffffff",
                    fontFamily : "Mochi"
                }
                this.mortText = jeu.scene.add.text(jeu.scene.cameras.main.midPoint.x-200,jeu.scene.cameras.main.midPoint.y-100,"Tu es gagné \n Recommencer ?",policeTitre);
            }
        }
    },
    gererCamera : function(){
        jeu.scene.cameras.main.startFollow(jeu.player.aPlayer);
        jeu.scene.cameras.main.setBounds(0,0,this.tilemap.widthInPixels,this.tilemap.heightInPixels);
    },
    collectGemme : function(player,tile){
        jeu.scene.sound.play("gemmeSound");
        this.genererParticules(tile.getCenterX(),tile.getCenterY());
        this.addScoreGemme(tile.properties.item);
        this.scoreText.setText("Score : "+ this.score);
        this.overlapLayer.removeTileAt(tile.x,tile.y).destroy();
    },
    addScoreGemme : function(item){
        console.log(item);
        if(item === "GemmeRouge"){
            this.score += 10;
            console.log("Score: " + this.score);
        }
        else if(item === "GemmeBleu"){
            this.score += 20;
            console.log("Score: " + this.score);
        }
        
      
    },
    genererParticules : function(posX,posY){
        var particules = jeu.scene.add.particles("spark");
        var configParticules = {
            x : posX,
            y : posY,
            speed: 200,
            angle : {
                min : 180,
                max : 360
            },
            lifeSpan : {
                min:300, 
                max:400
            },
            scale : {
                start : 0.1,
                end : 0.1
            },
            blendMode : "ADD"
        }
        var emitter = particules.createEmitter(configParticules);
        jeu.scene.time.delayedCall(300,function(){
            particules.destroy();
        })
        /*
        emitter.setPosition(posX,posY);
        emitter.setScale(0.1);
        emitter.setSpeed(200);
        emitter.setBlendMode(Phaser.BlendModes.ADD)
        jeu.scene.time.delayedCall(300,function(){
            particules.destroy();
        })
        */

    },
    killPlayer : function(){
        if(!this.gameOver){
            this.gameOver = true;
            console.log("mort");
            jeu.player.killPlayer();
            jeu.scene.add.sprite(jeu.scene.cameras.main.midPoint.x,jeu.scene.cameras.main.midPoint.y,"panel").setScale(5,3);
            var restartBouton = jeu.scene.add.sprite(jeu.scene.cameras.main.midPoint.x,jeu.scene.cameras.main.midPoint.y+100,"validation").setInteractive();
            restartBouton.on("pointerup",function(){
                jeu.scene.scene.restart();
            });
            var policeTitre = {
                fontSize : "40px",
                color : "#ffffff",
                fontFamily : "Mochi"
            }
            this.mortText = jeu.scene.add.text(jeu.scene.cameras.main.midPoint.x-200,jeu.scene.cameras.main.midPoint.y-100,"Tu es mort \n Recommencer ?",policeTitre);
        }
    },


    
    
    
}