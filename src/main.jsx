import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Route.jsx'
import Provider from './providers/Provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider>
        <RouterProvider router={router} />
    </Provider>
    

)
