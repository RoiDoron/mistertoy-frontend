import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import '../src/assets/style/main.css'


import { AppFooter } from './cmp/AppFooter.jsx'
import { AppHeader } from './cmp/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { store } from './store/store.js'
import { About } from './pages/About.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'


export function App() {
  return (
    <Provider store={store}>
        <Router>
            <section className="app">
                <AppHeader />
                <main className='main-layout'>
                    <Routes>
                       <Route element={<Home/>} path='/'/>
                       <Route element={<About/>} path='/about'/>
                       <Route element={<ToyIndex/>} path='/toy'/>
                    </Routes>
                </main>
                <AppFooter />
            </section>
        </Router>
    </Provider>

)
}

