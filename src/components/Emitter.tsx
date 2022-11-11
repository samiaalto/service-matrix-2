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

          isHighlighted =
            (r === newRow && c <= newCol) || (c === newCol && r <= newRow);

          // useState won't rerender the component if the
          // value hasn't changed, so we can call it for
          // every cell
          cb(isHighlighted);
        });
      });
    },
  };
})();

export default emitter;
