<script>
export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ["provider"],

  props: ["ball"],

  data() {
    return {
      // We cache the dimensions of the previous
      // render so that we can clear the area later.
      oldBox: {
        x: null,
        y: null,
        r: null,
        color: null
      }
    };
  },

  computed: {
    calculatedBox() {
      const ctx = this.provider.context;

      // Turn start / end percentages into x, y, width, height in pixels.
      const calculated = {
        x: this.ball.x,
        y: this.ball.y,
        r: this.ball.r,
        color: this.ball.color
      };

      // Yes yes, side-effects. This lets us cache the box dimensions of the previous render.
      // before we re-calculate calculatedBox the next render.
      this.oldBox = calculated;
      return calculated;
    }
  },

  render() {
    // Since the parent canvas has to mount first, it's *possible* that the context may not be
    // injected by the time this render function runs the first time.
    if (!this.provider.context) return;
    const ctx = this.provider.context;

    // Keep a reference to the box used in the previous render call.
    const oldBox = this.oldBox;
    // Calculate the new box. (Computed properties update on-demand.)
    const newBox = this.calculatedBox;

    // Clear the old area from the previous render.
    ctx.clearRect(
      oldBox.x - oldBox.r - 1,
      oldBox.y - oldBox.r - 1,
      2 * oldBox.r + 2,
      2 * oldBox.r + 2
    );
    // clearArc(ctx, oldBox.x, oldBox.y, oldBox.r);

    // Draw the new rectangle.
    ctx.beginPath();
    ctx.arc(newBox.x, newBox.y, newBox.r, 0, 2 * Math.PI);
    ctx.fillStyle = newBox.color;
    ctx.fill();
    ctx.closePath();
  }
};
function clearArc(ctx, x, y, r) {
  ctx.clip();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
</script>