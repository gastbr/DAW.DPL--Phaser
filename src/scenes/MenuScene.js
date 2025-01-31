import { Scene } from "phaser";
import apiFetch from "../apiFetch";

export class MenuScene extends Scene {
    constructor() {
        super("MenuScene");
    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {

        // Background rectangles
        this.add.rectangle(
            0,
            this.scale.height / 2,
            this.scale.width,
            120,
            0xffffff
        ).setAlpha(.8).setOrigin(0, 0.5);
        this.add.rectangle(
            0,
            this.scale.height / 2 + 85,
            this.scale.width,
            50,
            0x000000
        ).setAlpha(.8).setOrigin(0, 0.5);

        // Logo
        const logo_game = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height / 2,
            "knighthawks",
            "PHASER'S\nREVENGE",
            52,
            1
        )
        logo_game.setOrigin(0.5, 0.5);
        logo_game.postFX.addShine();

        const start_msg = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height / 2 + 85,
            "pixelfont",
            "CLICK TO START",
            24
        ).setOrigin(0.5, 0.5);

        function hola() {
            console.log('hola función');
        }

        const api_load_msg = this.add.bitmapText(
            this.scale.width / 2,
            this.scale.height - 50,
            "pixelfont",
            `Cargando datos de API...`,
            16
        ).setOrigin(0.5, 0.5);

        apiFetch(hola)
            .then(data => {
                console.log(data);
                api_load_msg.destroy();
                const api_msg = this.add.bitmapText(
                    this.scale.width / 2,
                    this.scale.height - 50,
                    "pixelfont",
                    `
                    ID: ${data.bicicletas[0].id} - COLOR: ${data.bicicletas[0].color} - MODEL: ${data.bicicletas[0].modelo}
                    ID: ${data.bicicletas[1].id} - COLOR: ${data.bicicletas[1].color} - MODEL: ${data.bicicletas[1].modelo}
                    ID: ${data.bicicletas[2].id} - COLOR: ${data.bicicletas[2].color} - MODEL: ${data.bicicletas[2].modelo}
                    `,
                    16
                ).setOrigin(0.5, 0.5);
            });

        // Tween to blink the text
        this.tweens.add({
            targets: start_msg,
            alpha: 0,
            duration: 800,
            ease: (value) => Math.abs(Math.round(value)),
            yoyo: true,
            repeat: -1
        });

        // Send start-game event when user clicks
        this.input.on("pointerdown", () => {
            this.game.events.emit("start-game");
        });
    }
}