import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CategoryForm from './components/categoryForm';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import EditProductForm from './components/EditProductForm';

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-100">
        <ul className="flex space-x-4">
          <li>
            <Link to="/categories/create" className="text-blue-500 hover:underline">Añadir Categoría</Link>
          </li>
          <li>
            <Link to="/products/create" className="text-blue-500 hover:underline">Añadir Productos</Link>
          </li>
          <li>
            <Link to="/products" className="text-blue-500 hover:underline">Productos</Link>
          </li>
        </ul>
      </nav>

      <div className="p-4">
        <Routes>
          <Route path="/categories/create" element={<CategoryForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/create" element={<ProductForm />} />
          <Route path="/products/:id/edit" element={<EditProductForm />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;