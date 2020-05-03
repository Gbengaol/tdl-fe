import { useQuery } from "react-query";
import { getAllTodosEndPoint } from "../utils/apis";

const getTodos = async () => {
  const data = await getAllTodosEndPoint();
  return data;
};

export function useTodos() {
  return useQuery("profileInformation", getTodos);
}
