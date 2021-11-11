
var jeu = {
    scene : null,
    world : world,
    player: player,
    cursor : null,
    zombieTemplate : zombieTemplate
}

function preload(){
    jeu.scene = this;
    jeu.scene.load.image("tiles","tilesheet.png");
    jeu.scene.load.tilemapTiledJSON('map',"TP2_Tiled2bis.json");
    jeu.scene.load.atlas("player","player.png","playerAtlas.json");
    jeu.scene.load.atlas("zombie","zombie.png","zombieAtlas.json");
    jeu.scene.load.image("spark","particle.png");

    jeu.scene.load.image("validation","yellow_boxCheckmark.png");
    jeu.scene.load.image("panel","yellow_panel.png");
    jeu.scene.load.image("spark","particle.png");

    this.load.audio("gemmeSound","gemmeSound.ogg");

    jeu.world.gameOver = false;
    jeu.player.isAlive = true;
}

function create(){

    jeu.world.initialiserWorld();
    jeu.player.initialiserPlayer();
    jeu.player.generatePlayerAnimations();
    jeu.player.aPlayer.anims.play("playerWalk");
    jeu.zombieTemplate.generateZombieAnimations();

    var zombie1 = jeu.zombieTemplate.createZombie(jeu.world.debutZombie1.x,jeu.world.debutZombie1.y,60).initZombie();
    var zombie2 = jeu.zombieTemplate.createZombie(jeu.world.debutZombie2.x,jeu.world.debutZombie2.y,50).initZombie();
    var zombie3 = jeu.zombieTemplate.createZombie(jeu.world.debutZombie3.x,jeu.world.debutZombie3.y,10).initZombie();
    jeu.world.gererCollider();
    jeu.cursor = jeu.scene.input.keyboard.createCursorKeys();
    jeu.world.gererCamera();
}



function update(time,delta){
    jeu.player.gererDeplacement();
    if(jeu.player.isAlive){
        jeu.player.gererDeplacement();
    }
    ajusterTailleEcran();
}

function ajusterTailleEcran(){
    var canvas = document.querySelector("canvas");

    var fenetreWidth = window.innerWidth;
    var fenetreHeight = window.innerHeight;
    var fenetreRation = fenetreWidth / fenetreHeight;
    var configRatio = config.width/config.height;
    if(fenetreRation < configRatio){
        canvas.style.width = fenetreWidth + "px";
        canvas.style.height = (fenetreWidth/configRatio) + "px";
    }
    else{
        canvas.style.width = (fenetreHeight * configRatio) + "px";
        canvas.style.height = fenetreHeight + "px";
    }
}