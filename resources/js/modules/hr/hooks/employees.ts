import { useSwr } from "@/hooks/swr";
import { Employee, EmployeeFilter } from "../types";
import { route } from "ziggy-js";

export const useGetEmployees = (filter: EmployeeFilter) => useSwr<Employee[]>(route('hr.employees.get'), filter)
export const useFindEmployee = (employee_id: string) => useSwr<Employee>(employee_id ? route('hr.employees.find', employee_id) : null)