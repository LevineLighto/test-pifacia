import { FC, ReactNode } from "react";
import { PaginationProps } from "./props";
import { paginationClasses } from "./classes";
import { Button } from "@/components/buttons";
import { ChevronLeft, ChevronRight } from "react-feather";

export const Pagination : FC<PaginationProps> = ({
    page = 1,
    max  = 1,
    onClick,
}) => {
    const handleClick = (page : number) => {
        if (typeof onClick == 'function') {
            onClick(page)
        }
    }

    if (max == 1) {
        return <></>
    }

    const items : ReactNode[] = [];

    for (let pageNumber = 1; pageNumber <= max; pageNumber++) {
        if (pageNumber == 1 || 
            pageNumber == max || 
            (pageNumber >= page - 2 && pageNumber <= page + 2)
        ) {
            items.push(
                <Button
                    key={`pagination-item-${pageNumber}`}
                    variant={ pageNumber == page ? 'solid' : 'outline' }
                    onClick={() => handleClick(pageNumber)}
                >
                    { pageNumber }
                </Button>
            )
        } else if (pageNumber < page - 2) {
            pageNumber = page - 3;
            items.push(
                <Button
                    key={`pagination-item-${pageNumber}`}
                    disabled
                    variant="outline"
                >...</Button>
            )
        } else if (pageNumber > page + 2) {
            pageNumber = max - 1;
            items.push(
                <Button
                    key={`pagination-item-${pageNumber}`}
                    disabled
                    variant="outline"
                >...</Button>
            )
        }
    }

    return (
        <div 
            className={`${
                paginationClasses.display
            } ${
                paginationClasses.flex
            }`}
        >
            <Button
                variant="outline"
                onClick={() => handleClick(page - 1)}
                disabled={page == 1}
            >
                <ChevronLeft size="1rem"/>
            </Button>
            { items }
            <Button
                variant="outline"
                onClick={() => handleClick(page + 1)}
                disabled={page == max}
            >
                <ChevronRight size="1rem"/>
            </Button>
        </div>
    )
}