import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newCategory) => {
      return axios.post('http://localhost:8000/categories', newCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
      setName('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name });
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4">
      <Form.Group className="mb-3">
        <Form.Label>Nombre de la categoría:</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingresa el nombre de la categoría"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Agregar
      </Button>
    </Form>
  );
};

export default CategoryForm;