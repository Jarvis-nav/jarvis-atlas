

import { corridorGraph, zoneToCorridor, dijkstra } from './corridorGraph';
import { zoneMap } from './zones';

export function getPathThroughCorridors(sourceId, targetId) {
  const startNode = zoneToCorridor[sourceId]?.[0];
  const endNode = zoneToCorridor[targetId]?.[0];

  if (!startNode || !endNode) return [];

  const corridorPath = dijkstra(corridorGraph, startNode, endNode).map(id => ({
    x: corridorGraph[id].x,
    y: corridorGraph[id].y
  }));

  return [
    { x: zoneMap[sourceId].x, y: zoneMap[sourceId].y },
    ...corridorPath,
    { x: zoneMap[targetId].x, y: zoneMap[targetId].y }
  ];
}

