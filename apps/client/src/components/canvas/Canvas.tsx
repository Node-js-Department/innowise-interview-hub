"use client";
import {
  DomainNode,
  FollowUpNode,
  QuestionNode,
  ThemeNode,
  TopicNode,
} from "@/nodes";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  NodeMouseHandler,
  Panel,
  ReactFlow,
  useEdges,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

// you also need to adjust the style import
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo } from "react";
import { useCanvasInitialValues } from "@/components/canvas/hooks/use-canvas-initial-values";
import { useLayoutNodes } from "./hooks/use-layout-nodes";
import { INode, ISetInterview } from "./types/types";

export interface ICanvasProps {
  nodes: ISetInterview[];
}

export const Canvas = ({ nodes: allNodes }: ICanvasProps) => {
  const { transformedNodes: initialNodes, initialEdges } =
    useCanvasInitialValues(allNodes);

  const { layoutedNodes, layoutedEdges } = useLayoutNodes(
    initialNodes,
    initialEdges
  );

  const proOptions = { hideAttribution: true }

  const nodeTypes = useMemo(
    () => ({
      domainNode: DomainNode,
      topicNode: TopicNode,
      questionNode: QuestionNode,
      themeNode: ThemeNode,
      followUpNode: FollowUpNode,
    }),
    []
  );

  const allEdges = useEdges();

  const onNodeClick = (
    e: React.MouseEvent<Element, MouseEvent>,
    node: Node
  ) => {
    const edgesToNode = findAllEdgesToNode(node.id);
    setEdges((edges) =>
      edges.map((edge) =>
        edgesToNode.some((newEdge) => newEdge.id === edge.id)
          ? { ...edge, style: { stroke: "#c63031", strokeWidth: 2 } }
          : { ...edge, style: {} }
      )
    );
  };

  const findAllEdgesToNode = (targetNodeId: string): Edge[] => {
    const selectedEdgesList: Edge[] = [];
    const findParentEdges = (nodeId: string) => {
      const incomingEdges = allEdges.filter((edge) => edge.target === nodeId);
      if (incomingEdges.length > 0) {
        incomingEdges.forEach((edge) => {
          selectedEdgesList.push(edge);
          // Recursively find parent edges
          findParentEdges(edge.source);
        });
      }
    };

    findParentEdges(targetNodeId);
    return selectedEdgesList;
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onPaneClick = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      setEdges((edges) =>
        edges.map((edge) => {
          return { ...edge, style: {} };
        })
      );
      setNodes((nodes) =>
        nodes.map((n) => {
          return { ...n, selected: false };
        })
      );
    },
    [setEdges]
  );

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>, node: INode) => {
      // Prevent native context menu from showing
      event.preventDefault();
      if (node.type !== "questionNode" && node.type !== "followUpNode") {
        return false;
      }

      console.log(node);
      let addQuestion = prompt("Do you want to add this question?", "yes");
      if (addQuestion !== null) {
        const edgesToNode = findAllEdgesToNode(node.id);
        setEdges((edges) =>
          edges.map((edge) =>
            edgesToNode.some((newEdge) => newEdge.id === edge.id)
              ? { ...edge, style: { stroke: "#c63031", strokeWidth: 2 } }
              : edge
          )
        );
        setNodes((nodes) =>
          nodes.map((n) => (n.id === node.id ? { ...n, selected: true } : n))
        );
      }
    },
    []
  );

  // const onLayout = useCallback(
  //   (direction: string | undefined) => {
  //     const { nodes: layoutedNodes, edges: layoutedEdges }
  //       = getLayoutedElements(nodes, edges, direction);

  //     setNodes([...layoutedNodes]);
  //     setEdges([...layoutedEdges]);
  //   },
  //   [nodes, edges]
  // );

  return (
    <div style={{height: "100%" }} className=" w-full p-1 h-[calc(100%-12px)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu as unknown as NodeMouseHandler<Node>}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={4}
        proOptions={proOptions}
      />
      <Controls />
      {/* <Panel position='top-right'>
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel> */}
      <Background variant={BackgroundVariant.Cross} gap={12} size={1} />
    </div>
  );
};
