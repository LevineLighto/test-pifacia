import { useSwr } from "@/hooks/swr";
import { Division, DivisionFilter } from "../types";
import { route } from "ziggy-js";

export const useGetDivisions = (filter: DivisionFilter) => useSwr<Division[]>(route('hr.divisions.get'), filter)
export const useFindDivision = (division_id: string) => useSwr<Division>(division_id ? route('hr.divisions.find', division_id) : null)