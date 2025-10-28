import { Application, Assets, Sprite } from "pixi.js";

( async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ width : 900, height : 600, background: "#1099bb"});

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  // Load the bunny texture
  const texture = await Assets.load("/assets/bunny.png");

  // Create a bunny Sprite
  const bunny: Sprite = new Sprite(texture);

  // Center the sprite's anchor point
  bunny.anchor.set(0.5);

  // Move the sprite to the center of the screen
  bunny.position.set(app.screen.width / 2, app.screen.height / 2);
  const gravity = 0.1;
  var speed = 0;
    const minimumY = app.screen.height
    const groundY = app.screen.height - app.screen.height/2;
    // Add the bunny to the stage
    let canJump : boolean = true;
    app.stage.addChild(bunny);
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && canJump) {
            speed = -3;
            canJump = false;
        }
    });
    window.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            canJump = true;
        }
    });
  // Listen for animate update
  app.ticker.add((time) => {
    // Just for fun, let's rotate mr rabbit a little.
    // * Delta is 1 if running at 100% performance *
    // * Creates frame-independent transformation *
      //bunny.rotation += 0.1 * time.deltaTime;
      speed += gravity * time.deltaTime;
      bunny.position.y += speed;
      if (bunny.position.y > app.screen.height) {
          bunny.position.y = app.screen.height;
          speed *= -0.6; // bounce
      }
      if (bunny.position.y < 0) {
          bunny.position.y = 0;
          speed = 0;
      }
  });
})();
