import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import WorkPage from '@/pages/WorkPage'
import AboutPage from '@/pages/AboutPage'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}
