import '../css/app.css'

import { createInertiaApp } from "@inertiajs/react"
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers"
import { createRoot } from "react-dom/client"
import { AppWrapper } from './components/wrappers/app-wrapper'

const appName = import.meta.env.VITE_APP_NAME || 'Pifacia Test App'
createInertiaApp({
    title   : title => `${title} - ${appName}`,
    resolve : (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup   : ({el, App, props}) => {
        const root = createRoot(el)
        root.render(
            <AppWrapper>
                <App {...props} />
            </AppWrapper>
        )
    },
    progress: {
        color: '#ec1d21',
    }
})