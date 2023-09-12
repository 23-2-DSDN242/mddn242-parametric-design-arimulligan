[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/ihfjUrzT)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11530222&assignment_repo_type=AssignmentRepo)
## The Egyptize Font

*by Arianna Mulligan*

Each of my letters are composed with a triangle-pyramid, two irregular quadrilaterals and a snake (either being
just its head or its body and head). I also added an old paper-like feature to the background, to fully embrace the 'old egyptian' theme that I was going for. I used thousands of tiny lines with varying colours, so there was older looking edges. Then I created an image based on those lines (because I used random function, interpolation needed more efficiency, and image function is faster because the tiny lines in the loop would only be run once - less time complexity).

I was inspired to make an egyptian font because I was reading about how Moses' staff turns into a snake in the Bible. Also how Cleopatra the Queen of Egypt supposedly died by putting her hand in a basket of asps. This is why I added a snake into the egyptian font. The snake has points instead of arcs drawn because the old carvings of the snake hieroglyphs would've eroded. This is why sometimes the snake isn't fully drawn, but sometimes it is. It also looks nicer with the interpolation. As the snake is the main theme of the font, I decided to focus on how to interpolate the snake, using its' coordinates and rotation to make it look like the snake is squiggling into its place. I didn't end up changing the snakes' actual angles and shape because I wanted to emphasise how the snake isn't actually alive - like how Moses' staff is a straight, unalive stick, which only turns into a snake in front of Pharaoh and his officials.

The two pillars have unique designs of inverted polygons because Egyptian columns were very diverse and had many carvings on them. The triangle is how you would view a pyramid in birds eye view, with the different colours representing another step down the pyramid. I kept these objects interpolating normally, so it wouldn't be too much movement for the user and so they could focus on the snake movements.

Apart from the mentioned parameters down below (like the four objects' coordinates), everything else is fixed - from the pillar decor to the way the snakes head is drawn.

The thirteen controlled parameters per letter:
  * `triangleX`: The x-coordinate of the pyramid vibe triangle.
  * `triangleY`: The y-coordinate of the pyramid vibe triangle.
  * `rect1X`: The x-coordinate of one of the pillar quadrilaterals.
  * `rect1Y`: The y-coordinate of one of the pillar quadrilaterals.
  * `rect2X`: The x-coordinate of the other pillar quadrilaterals.
  * `rect2Y`: The y-coordinate of the other pillar quadrilaterals.
  * `snakeX`: The x-coordinate of the snake, asp or boa - your choice.
  * `snakeY`: The y-coordinate of the snake.
  * `snakeLength`: The number of arc squiggles that is drawn for the snakes length.
  * `snakeRot`: The rotation of the snake, the pivot point being around its head.
  * `rect1Rot`: The rotation of one of the pillars, pivot point being its center.
  * `rect2Rot`: The rotation of the other pillar, pivot point being its center.
  * `triangleRot`: The rotation of the triangle, pivot point being its center.