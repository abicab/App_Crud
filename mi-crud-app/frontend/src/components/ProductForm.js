import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const queryClient = useQueryClient();

    const { data: categories, isLoading, isError, error } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/categories');
            return response.data;
        },
    });

    const mutation = useMutation({
        mutationFn: (newProduct) => {
            return axios.post('http://localhost:8000/products', newProduct);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('products');
            setName('');
            setPrice('');
            setCategoryId('');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ name, price: parseFloat(price), categoryId });
    };

    if (isLoading) return <p>Loading categories...</p>;
    if (isError) return <p>Error loading categories: {error.message}</p>;

    return (
        <Form onSubmit={handleSubmit} className="p-4">
            <Form.Group className="mb-3">
                <Form.Label>Nombre del producto:</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresa nombre del producto"
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Precio:</Form.Label>
                <Form.Control
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Ingresa precio"
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Categoría:</Form.Label>
                <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Agregar
            </Button>
        </Form>
    );
};

export default ProductForm;
