Create a web-based 3D free-flight airplane simulation game using HTML, CSS, and JavaScript with the Three.js library.

**1. Core Technology:**
- Use HTML for the basic structure.
- Use CSS to make the game canvas fill the entire browser window without any margins.
- Use JavaScript and the Three.js library for all the game logic and 3D rendering.

**2. Graphics and Visual Style:**
- **Overall Style:** Bright, colorful, and cartoonish.
- **Player Airplane:** Create a simple, low-poly cartoon airplane model. Give it a red body and yellow wings.
- **Scenery:**
    - The sky should be a bright blue color.
    - Scatter a few simple, white, cartoon-style clouds (can be simple geometric shapes) in the sky.
    - The ground should be a flat, green plane that extends to the horizon.

**3. Gameplay and Controls:**
- **Objective:** There is no specific objective. It's a free-flight simulation where the player can fly around freely.
- **Movement:** The airplane should always move forward at a constant speed.
- **Player Controls:** The player controls the airplane's orientation using the keyboard arrow keys:
    - **Up Arrow:** Pitches the airplane's nose down (for diving).
    - **Down Arrow:** Pitches the airplane's nose up (for climbing).
    - **Left Arrow:** Rolls the airplane to the left.
    - **Right Arrow:** Rolls the airplane to the right.
- **Camera:** The camera should be in a third-person view, positioned slightly behind and above the airplane, and it must smoothly follow the airplane's movement and rotation.

**4. File Structure:**
- Create three files: `index.html`, `style.css`, and `script.js`.
- Link the CSS and JavaScript files correctly within the `index.html` file.