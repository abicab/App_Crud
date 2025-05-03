import { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'; 
import { useParams, useNavigate } from 'react-router-dom'; 
 
const EditProductForm = () => { 
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [name, setName] = useState(''); 
    const [price, setPrice] = useState(''); 
    const [categoryId, setCategoryId] = useState('');  
    const queryClient = useQueryClient(); 
 
    // Fetch categories 
    const { data: categories, isLoading: categoriesLoading, isError: categoriesError, error: 
categoriesErrorData } = useQuery({ 
        queryKey: ['categories'], 
        queryFn: async () => { 
            const response = await axios.get('http://localhost:8000/categories'); 
            return response.data; 
        }, 
    }); 
 
    // Fetch product details 
    const { 
        data: product, 
        isLoading: productLoading, 
        isError: productError, 
        error: productErrorData, 
    } = useQuery({ 
        queryKey: ['product', id], 
        queryFn: async () => { 
            const response = await axios.get(`http://localhost:8000/products/${id}`); 
            console.log('Product data received:', response.data); 
            return response.data; 
        }, 
        onError: (error) => { 
            console.error('Error fetching product:', error); 
            if (error.response && error.response.status === 404) { 
                alert('El producto no existe.'); 
                navigate('/products'); 
            } else { 
                alert('Ocurrió un error al cargar el producto.'); 
            } 
        }, 
    }); 
 
    useEffect(() => { 
        if (product) { 
            setName(product.name || ''); 
            setPrice(product.price !== undefined ? product.price.toString() : ''); 
            setCategoryId(product.categoryId !== undefined ? product.categoryId.toString() : ''); 
        } 
    }, [product]); 
 
    // Mutation para actualizar producto 
    const mutation = useMutation({ 
        mutationFn: (updatedProduct) => { 
            return axios.put(`http://localhost:8000/products/${id}`, updatedProduct); 
        }, 
        onSuccess: () => { 
            queryClient.invalidateQueries('products'); 
            navigate('/products'); 
        }, 
    }); 
 
    const handleSubmit = (e) => { 
        e.preventDefault(); 
        mutation.mutate({ 
            name, 
            price: parseFloat(price), 
            categoryId: parseInt(categoryId), 
        }); 
    }; 
 
    // Manejo de estados de carga y error 
    if (categoriesLoading || productLoading) return <p>Cargando...</p>; 
    if (categoriesError) return <p>Error al cargar categorías: {categoriesErrorData?.message}</p>; 
    if (productError) return <p>Error al cargar producto: {productErrorData?.message}</p>; 
 
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
                <Form.Select 
                    value={categoryId} 
                    onChange={(e) => setCategoryId(e.target.value)} 
                > 
                    <option value="">Selecciona una categoría</option> 
                    {categories.map((category) => ( 
                        <option key={category.id} value={category.id}> 
                            {category.name} 
                        </option> 
                    ))} 
                </Form.Select> 
            </Form.Group> 
            <Button variant="primary" type="submit"> 
                Guardar cambios 
            </Button> 
        </Form> 
    ); 
}; 
 
export default EditProductForm; 