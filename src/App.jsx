import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes/Router";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="bg-bodyBgColor">
        <AuthProvider>
          <Router />

        </AuthProvider>
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
