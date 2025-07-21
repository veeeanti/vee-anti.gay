document.addEventListener("DOMContentLoaded", function () {
  var c = document.getElementById("c");
  if (c) {
    var ctx = c.getContext("2d");

    // Function to resize the canvas to fit the window
    function resizeCanvas() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }

    // Resize the canvas when the window is resized
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Call once to set the initial size

    // Matrix rain logic
    var matrix =
      "abcλdefghλijklmnoλpqrstλuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345λ6789@#$%^&λλ*()*&^%+-/~{[|`]}veeλnti";
    matrix = matrix.split("");

    var font_size = 15;
    var columns = c.width / font_size;
    var drops = [];
    for (var x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = "#d63b6a";
      ctx.font = font_size + "px arial";

      for (var i = 0; i < drops.length; i++) {
        var text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * font_size, drops[i] * font_size);

        if (drops[i] * font_size > c.height && Math.random() > 0.975) drops[i] = 0;

        drops[i]++;
      }
    }

    setInterval(draw, 45);
  } else {
    console.error("Canvas element not found");
  }
});
