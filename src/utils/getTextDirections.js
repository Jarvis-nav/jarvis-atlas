// export function getTextDirections(pathPoints) {
//   if (!pathPoints || pathPoints.length < 2) return [];

//   const getDirection = (dx, dy) => {
//     if (Math.abs(dx) > Math.abs(dy)) {
//       return dx > 0 ? 'right' : 'left';
//     } else {
//       return dy > 0 ? 'down' : 'up';
//     }
//   };

//   const directions = ['Start at source'];
//   let prevDirection = null;

//   for (let i = 1; i < pathPoints.length; i++) {
//     const dx = pathPoints[i].x - pathPoints[i - 1].x;
//     const dy = pathPoints[i].y - pathPoints[i - 1].y;
//     const dir = getDirection(dx, dy);

//     if (dir !== prevDirection) {
//       directions.push(`Then go ${dir}`);
//       prevDirection = dir;
//     } else {
//       directions.push('Continue straight');
//     }
//   }

//   return directions;
// }
export function getTextDirections(pathPoints) {
  if (!pathPoints || pathPoints.length < 2) return [];

  const getDirection = (dx, dy) => {
    if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 'right' : 'left';
    if (Math.abs(dy) > 0) return dy > 0 ? 'down' : 'up';
    return 'straight';
  };

  const directions = ['Start at source'];
  let prevDirection = null;

  for (let i = 1; i < pathPoints.length; i++) {
    const dx = pathPoints[i].x - pathPoints[i - 1].x;
    const dy = pathPoints[i].y - pathPoints[i - 1].y;
    const dir = getDirection(dx, dy);
    if (dir !== prevDirection) {
      directions.push(`Then go ${dir}`);
      prevDirection = dir;
    } else {
      directions.push('Continue straight');
    }
  }

  return directions;
}
