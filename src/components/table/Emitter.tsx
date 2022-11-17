const emitter = (() => {
  // 2d array indexed by row and column
  const subs = [];
  return {
    // Subscribe function that will be called once for each
    // cell, in a useEffect
    subscribe(r, c, cb) {
      subs[r] = subs[r] ?? [];
      // Note that this does not handle multiple
      // subscriptions for the same cell
      subs[r][c] = cb;
      // This will be invoked by useEffect's cleanup
      return () => delete subs[r][c];
    },
    // Called by each cell when it is hovered
    highlight(newRow, newCol) {
      subs.forEach((row, r) => {
        row.forEach((cb, c) => {
          let isHighlighted;

          if (newCol < 3 && newRow > 1) {
            isHighlighted = r === newRow && c <= 3;
          } else if (newRow > 1 && newCol > 3) {
            isHighlighted =
              (r === newRow && c < newCol) || (c === newCol && r < newRow);
          } else if (newRow < 2 && newCol > 3) {
            isHighlighted = c === newCol && r <= 1;
          } else {
            isHighlighted = false;

            // isHighlighted =
            //   (r === newRow && c <= newCol) || (c === newCol && r <= newRow);
          }
          cb(isHighlighted);
        });
      });
    },
  };
})();

export default emitter;
