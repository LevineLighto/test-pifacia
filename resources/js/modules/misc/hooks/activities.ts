import { useSwr } from "@/hooks/swr"
import { Activity } from "../types"
import { route } from "ziggy-js"

export const useGetActivity = (filter?: Record<string, any>) => {
    return useSwr<Activity[]>(route('misc.activities.get'), filter)
}