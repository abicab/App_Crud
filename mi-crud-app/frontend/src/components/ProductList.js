import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const queryClient = useQueryClient();

    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/products');
            return response.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => axios.delete(`http://localhost:8000/products/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        },
    });

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Productos</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category?.name || 'Sin categoría'}</td>
                            <td>
                                <Link to={`/products/${product.id}/edit`} className="btn btn-primary btn-sm mr-2">
                                    Editar
                                </Link>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductList;