import { FC } from "react";
import { UserPictureProps } from "./props";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { containerClasses, imageClasses } from "./classes";

export const UserPicture : FC<UserPictureProps> = ({
    className = '',
    ...props
}) => {

    const { props: pageProps } = usePage<PageProps>()

    return (
        <div
            className={`${
                containerClasses.borderRadius
            } ${
                containerClasses.height
            } ${
                containerClasses.position
            } ${
                containerClasses.width
            } ${
                className
            }`}
            { ...props }
        >
            <img
                src={`https://ui-avatars.com/api/?name=${pageProps.user?.name || 'user'}&rounded=true&color=FFFFFF&background=ec1d21&font-size=0.35`}
                alt={`${pageProps.user?.name || 'user'} picture`}
                className={`${
                    imageClasses.height
                } ${
                    imageClasses.objectFit
                } ${
                    imageClasses.width
                }`}
            />
        </div>
    )
}