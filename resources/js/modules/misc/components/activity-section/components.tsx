'use client'

import { FC } from "react";
import { ActivityFilter } from "../activity-filter";
import { ActivityTable } from "../activity-table/components";

export const ActivitySection : FC = () => {
    return (
        <section>
            <header className="flex flex-wrap justify-between gap-4 mb-6">
                <h1 className="text-3xl varela-round">
                    Activity
                </h1>
            </header>
            <ActivityFilter/>
            <ActivityTable/>
        </section>
    )
}