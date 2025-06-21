import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WorkshopList from './components/WorkshopList';
import WorkshopForm from './components/WorkshopForm';
import WorkshopDetail from './components/WorkshopDetail';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<WorkshopList />} />
            <Route path="/workshop/new" element={<WorkshopForm />} />
            <Route path="/workshop/:id" element={<WorkshopDetail />} />
            <Route path="/workshop/edit/:id" element={<WorkshopForm />} />
          </Routes>
        </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;