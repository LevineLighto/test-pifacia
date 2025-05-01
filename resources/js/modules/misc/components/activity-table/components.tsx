import { FC, useContext } from "react";
import { ActivityFilterContext, ActivityFilterContextType } from "../activity-filter";
import { useGetActivity } from "@/misc/hooks";
import { useHasPermission } from "@/hooks/permission";
import { ACTIVITY_READ } from "@/constants/permissions";
import { Table } from "@/components/table";
import { DataDisplay } from "@/components/misc";
import { Pagination } from "@/components/navigations";

export const ActivityTable : FC = () => {
    const canRead   = useHasPermission(ACTIVITY_READ)

    const {
        committedFilter, setCommittedFilter
    } = useContext(ActivityFilterContext) as ActivityFilterContextType

    const { isLoading, error, data, mutate } = useGetActivity(committedFilter)
    
    const handlePagination = (page: number) => {
        setCommittedFilter((prevState) => ({
            ...prevState,
            page: page
        }))
    }
    
    if (!canRead) {
        return (<></>)
    }

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th className="text-start">Category</th>
                        <th className="text-start">Description</th>
                        <th className="text-start">Modified At</th>
                    </tr>
                </thead>
                <tbody>
                    { isLoading ? (
                        <tr>
                            <td colSpan={3} className="text-center">
                                Loading...
                            </td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={3} className="text-center text-primary">
                                Unable to get data
                            </td>
                        </tr>
                    ) : !data?.data?.length ? (
                        <tr>
                            <td colSpan={3} className="text-center">
                                Data not found
                            </td>
                        </tr>
                    ) : data.data.map((item) => (
                        <tr key={`activity-${item.id}`}>
                            <td>
                                <p className="font-medium mb-2">
                                    { item.type }
                                </p>
                                <DataDisplay
                                    label="Sub Type"
                                    containerClassName="mb-3"
                                >
                                    { item.sub_type }
                                </DataDisplay>
                                <DataDisplay
                                    label="Action"
                                    containerClassName="mb-3"
                                >
                                    { item.action }
                                </DataDisplay>
                            </td>
                            <td>{ item.description }</td>
                            <td>
                                <p className="font-medium mb-2">
                                    { item.created_at }
                                </p>
                                <DataDisplay
                                    label="Modified By"
                                    containerClassName="mb-3"
                                >
                                    { item.created_by?.name }
                                </DataDisplay>
                                <DataDisplay
                                    label="Modified via URL"
                                    containerClassName="mb-3"
                                >
                                    { item.url }
                                </DataDisplay>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </Table>
            <Pagination
                page={data?.pagination?.current_page}
                max={data?.pagination?.total_page}
                onClick={handlePagination}
            />
        </>
    )
}
