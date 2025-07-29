export const corridorGraph = {
  A: { x: 125, y: 178, neighbors: [{ to: "B", weight: 70 }] },
  B: { x: 126, y: 296, neighbors: [{ to: "A", weight: 70 }, { to: "C", weight: 110 }] },
  C: { x: 234, y: 298, neighbors: [{ to: "B", weight: 110 }, { to: "D", weight: 130 }] },
  D: { x: 234, y: 430, neighbors: [{ to: "C", weight: 130 }, { to: "E", weight: 180 }] },
  E: { x: 234, y: 611, neighbors: [{ to: "D", weight: 180 }, { to: "F", weight: 160 }] },
  F: { x: 395, y: 611, neighbors: [{ to: "E", weight: 160 }, { to: "G", weight: 190 }] },
  G: { x: 586, y: 611, neighbors: [{ to: "F", weight: 190 }, { to: "H", weight: 180 }] },
  H: { x: 586, y: 431, neighbors: [{ to: "G", weight: 180 }, { to: "I", weight: 120 }] },
  I: { x: 707, y: 431, neighbors: [{ to: "H", weight: 120 }, { to: "J", weight: 100 }] },
  J: { x: 707, y: 298, neighbors: [{ to: "I", weight: 130 }, { to: "K", weight: 160 }] },
  K: { x: 866, y: 296, neighbors: [{ to: "J", weight: 160 }, { to: "L", weight: 150 }] },
  L: { x: 1015, y: 296, neighbors: [{ to: "K", weight: 150 }, { to: "M", weight: 120 }] },
  M: { x: 1133, y: 297, neighbors: [{ to: "L", weight: 120 }, { to: "N", weight: 120 }] },
  N: { x: 1252, y: 296, neighbors: [{ to: "M", weight: 120 }, { to: "O", weight: 120 }] },
  O: { x: 1373, y: 296, neighbors: [{ to: "N", weight: 120 }, { to: "P", weight: 120 }] },
  P: { x: 1373, y: 408, neighbors: [{ to: "O", weight: 110 }, { to: "Q", weight: 100 }] },
  Q: { x: 1373, y: 520, neighbors: [{ to: "P", weight: 100 }] }
}


export const zoneToCorridor = {
  "entry-lobby": ["A"],
  "reception": ["C"],
  "conference-room": ["F"],
  "cafeteria": ["G"],
  "toilets": ["H"],
  "open-desk": ["K"],
  "server-room": ["L"],
  "meeting-room-1": ["N"],
  "meeting-room-2": ["O"],
  "exit-gate": ["Q"]
}


export function dijkstra(graph, startNode, endNode) {
  const distances = {}, previous = {}, queue = [];
  Object.keys(graph).forEach(n => {
    distances[n] = Infinity;
    previous[n] = null;
    queue.push(n);
  });
  distances[startNode] = 0;

  while (queue.length) {
    const node = queue.reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );
    queue.splice(queue.indexOf(node), 1);
    if (node === endNode) break;

    for (const { to, weight } of graph[node].neighbors) {
      const alt = distances[node] + weight;
      if (alt < distances[to]) {
        distances[to] = alt;
        previous[to] = node;
      }
    }
  }

  const path = [];
  let current = endNode;
  while (current) {
    path.unshift(current);
    current = previous[current];
  }
  return path;
}
