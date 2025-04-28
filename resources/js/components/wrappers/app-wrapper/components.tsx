import { FC, PropsWithChildren } from "react";
import { ErrorBoundary } from "../error-boundary";
import { ToastContainer } from "react-toastify";

export const AppWrapper : FC<PropsWithChildren> = ({ children }) => (
    <ErrorBoundary>
        { children }
        <ToastContainer/>
    </ErrorBoundary>
)