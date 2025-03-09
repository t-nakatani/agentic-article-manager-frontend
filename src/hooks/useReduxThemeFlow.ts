import { useCallback, useEffect } from "react";
import { 
  Node, 
  Edge, 
  OnNodesChange, 
  OnEdgesChange, 
  OnConnect,
  applyNodeChanges, 
  applyEdgeChanges, 
  addEdge 
} from "reactflow";
import { 
  fetchThemeFlowAsync, 
  saveThemeFlowAsync, 
  updateNodes, 
  updateEdges 
} from "@/lib/redux/features/themes/themesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

export function useReduxThemeFlow() {
  const dispatch = useAppDispatch();
  const { nodes, edges, loading, error } = useAppSelector((state) => state.themes);

  // 初期データの読み込み
  useEffect(() => {
    dispatch(fetchThemeFlowAsync());
  }, [dispatch]);

  // ノードの変更を処理
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes);
      dispatch(updateNodes(updatedNodes));
    },
    [nodes, dispatch]
  );

  // エッジの変更を処理
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      dispatch(updateEdges(updatedEdges));
    },
    [edges, dispatch]
  );

  // 接続の処理
  const onConnect: OnConnect = useCallback(
    (connection) => {
      const newEdge = { ...connection, id: `e${connection.source}-${connection.target}` };
      const updatedEdges = addEdge(newEdge, edges);
      dispatch(updateEdges(updatedEdges));
    },
    [edges, dispatch]
  );

  // 保存処理
  const handleSave = useCallback(() => {
    dispatch(saveThemeFlowAsync({ nodes, edges }));
  }, [nodes, edges, dispatch]);

  return {
    nodes,
    edges,
    loading,
    error,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleSave,
  };
} 