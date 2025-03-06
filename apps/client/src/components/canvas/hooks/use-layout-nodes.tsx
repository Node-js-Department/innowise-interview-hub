import { IEdge, ILayoutNode, INode } from "../types/types";
import dagre from "@dagrejs/dagre";

export const useLayoutNodes = (
  initialNodes: INode[],
  initialEdges: IEdge[]
) => {
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 180;
  const nodeHeight = 20;

  const getLayoutedElements = (
    nodes: INode[],
    edges: IEdge[],
    direction = "LR"
  ) => {
    const isHorizontal = direction === "LR";
    dagreGraph.setGraph({
      rankdir: direction,
      // ranker: "longest-path",
      // ranksep: 40,
    });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, {
        width:
          node.type === "questionNode" || node.type === "followUpNode"
            ? 400
            : nodeWidth,
        height:
          node.type === "questionNode" || node.type === "followUpNode"
            ? 40
            : nodeHeight,
      });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      const newNode = {
        ...node,
        targetPosition: isHorizontal ? "left" : "top",
        sourcePosition: isHorizontal ? "right" : "bottom",
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
        draggable: false,
      };

      return newNode;
    });

    return { nodes: newNodes, edges };
  };

  const {
    nodes: layoutedNodes,
    edges: layoutedEdges,
  }: { nodes: ILayoutNode[]; edges: IEdge[] } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  return { layoutedNodes, layoutedEdges };
};
