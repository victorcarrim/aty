import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Cadastro from './components/Usuarios/Cadastro';
import Login from './components/Usuarios/Login';
import { PrivateRoute } from './routes/PrivateRoute';
import Dashboard from './pages/Dashboard';
import EditarUsuario from './pages/EditarUsuario';
import GerenciarUsuarios from './pages/GerenciarUsuarios';
import { ToastContainer } from 'react-toastify';
import GerenciarSensores from './pages/GerenciarSensores';
import GerenciarSensor from './components/Sensores/GerenciarSensor';
import EditarSensor from './pages/EditarSensor';
import CadastroEstacoes from './components/Estacoes/CadastroEstacoes';
import GerenciarEstacoes from './pages/GerenciarEstacoes';

function App() {

  return (
    <div>
    <ToastContainer />
    
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/cadastro' element={<Cadastro/>} />
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        } />
        <Route path='/pesquisar-estacao' element={
          <PrivateRoute>
          </PrivateRoute>
        } />
        <Route path='/gerenciar-usuarios' element={
          <PrivateRoute>
            <GerenciarUsuarios/>
          </PrivateRoute>
        } />
        <Route path='/gerenciar-sensores' element={
          <PrivateRoute>
            <GerenciarSensores/>
          </PrivateRoute>
        } />
        <Route path='/editar-usuario/' element={
          <PrivateRoute>
            <EditarUsuario/>
          </PrivateRoute>
        } />
        <Route path='/editar-sensor/' element={
          <PrivateRoute>
            <EditarSensor />
          </PrivateRoute>
        } />
        <Route path='/cadastrar-estacao/' element={
          <PrivateRoute>
            <GerenciarEstacoes />
          </PrivateRoute>
        } />

      </Routes>
    </Router>
    </div>
    
  )
}

export default App
