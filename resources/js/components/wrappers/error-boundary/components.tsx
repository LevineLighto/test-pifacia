import { ErrorMsg } from "@/components/misc"
import { Component, PropsWithChildren } from "react"

export class ErrorBoundary extends Component<PropsWithChildren> {
    state = {
        isError: false
    }

    componentDidCatch(error, errorInfo) {
        console.error(error)
        console.info(errorInfo)

        this.setState({ isError: true })
    }

    render() {
        if (this.state.isError) {
            return ( <ErrorMsg/> )
        }

        return this.props.children
    }
}