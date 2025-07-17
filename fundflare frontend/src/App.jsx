import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthInitializer from "./components/AuthInitializer";
import Router from "./routes/Router";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthInitializer />
      <main className="bg-bodyBgColor">
        <Router />
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App
