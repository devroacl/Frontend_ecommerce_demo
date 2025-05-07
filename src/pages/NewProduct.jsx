import ProductForm from '../components/ProductForm';
import ProtectedRoute from '../components/ProtectedRoute';

export default function NewProduct() {
  return (
    <ProtectedRoute allowedRoles={['ROLE_VENDEDOR']}>
      <ProductForm />
    </ProtectedRoute>
  );
}