<script>

export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ["provider"],

  props: ['paddle'],

  data() {
    return {
      // We cache the dimensions of the previous
      // render so that we can clear the area later.
      oldBox: {
        x: null,
        y: null,
        w: null,
        h: null
      }
    };
  },

  computed: {
    calculatedBox() {
      const ctx = this.provider.context;

      // Turn start / end percentages into x, y, width, height in pixels.
      const calculated = {
        x: this.paddle.x,
        y: this.paddle.y,
        w: this.paddle.w,
        h: this.paddle.h
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

    ctx.beginPath();
    // Clear the old area from the previous render.
    ctx.clearRect(oldBox.x, oldBox.y, oldBox.w, oldBox.h);
 

    // Draw the new rectangle.
    ctx.rect(newBox.x,newBox.y, newBox.w, newBox.h);
    ctx.fillStyle = "green";
    ctx.fill();


  }
};
</script>