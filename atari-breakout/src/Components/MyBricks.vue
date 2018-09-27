<script>
export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ["provider"],

  props: ["bricks"],

  data() {
    return {
      // We cache the dimensions of the previous
      // render so that we can clear the area later.
      oldBricks: []
    };
  },

  computed: {
    calculatedBox() {
      const ctx = this.provider.context;

      // Turn start / end percentages into x, y, width, height in pixels.
      const calculated = [];
      let i, j;
      for (i = 0; i < this.bricks.length; i++) {
        let bricks_row = this.bricks[i];
        let cal_row = [];
        for (j = 0; j < bricks_row.length; j++) {
          let brick = bricks_row[j];
          let clone = cloneBrick(brick);
          cal_row.push(clone);
        }
        calculated.push(cal_row);
      }

      // Yes yes, side-effects. This lets us cache the box dimensions of the previous render.
      // before we re-calculate calculatedBox the next render.
      this.oldBricks = calculated;
      return calculated;
    }
  },

  render() {
    // Since the parent canvas has to mount first, it's *possible* that the context may not be
    // injected by the time this render function runs the first time.
    if (!this.provider.context) return;
    const ctx = this.provider.context;

    // Keep a reference to the box used in the previous render call.
    const oldBricks = this.oldBricks;
    // Calculate the new box. (Computed properties update on-demand.)
    const newBricks = this.calculatedBox;

    let i, j;
    // Clear the old area from the previous render.
    for (i = 0; i < oldBricks.length; i++) {
      let bricks_row = oldBricks[i];
      for (j = 0; j < bricks_row.length; j++) {
        let brick = bricks_row[j];
        ctx.clearRect(brick.x, brick.y, brick.w, brick.h);
      }
    }
    // Draw the new ones.

    for (i = 0; i < newBricks.length; i++) {
      let bricks_row = newBricks[i];
      for (j = 0; j < bricks_row.length; j++) {
        let brick = bricks_row[j];
        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
      }
    }
    // console.log(this.bricks);
  }
};
function cloneBrick(brick) {
  let clone = new Object();
  clone.x = brick.x;
  clone.y = brick.y;
  clone.w = brick.w;
  clone.h = brick.h;
  clone.color = brick.color;
  return clone;
}
</script>