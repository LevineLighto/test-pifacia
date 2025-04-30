import { useSwr } from "@/hooks/swr";
import { Position, PositionFilter } from "../types";
import { route } from "ziggy-js";

export const useGetPositions = (filter: PositionFilter) => useSwr<Position[]>(route('hr.positions.get'), filter)
export const useFindPosition = (position_id: string) => useSwr<Position>(position_id ? route('hr.positions.find', position_id) : null)