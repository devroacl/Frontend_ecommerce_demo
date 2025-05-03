import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  ShoppingBag as ProductsIcon,
  Block as BlockIcon,
  CheckCircle as ApproveIcon,
  BarChart as StatsIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import adminService from '../../services/adminService';
import ProductForm from '../../components/admin/ProductForm';
import UserManagementForm from '../../components/admin/UserManagementForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard = () => {
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState({
    users: true,
    products: true,
    stats: true
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading({ users: true, products: true, stats: true });
        
        const [usersData, productsData, statsData] = await Promise.all([
          adminService.getUsers(),
          adminService.getProducts(),
          adminService.getStats()
        ]);
        
        setUsers(usersData);
        setProducts(productsData);
        setStats(statsData);
        
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading({ users: false, products: false, stats: false });
      }
    };
    
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleToggleProductStatus = async (productId, currentStatus) => {
    try {
      await adminService.updateProductStatus(productId, !currentStatus);
      setProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, activo: !currentStatus } : p
      ));
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      await adminService.updateUserStatus(userId, !currentStatus);
      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, activo: !currentStatus } : u
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleOpenProductDialog = (product = null) => {
    setCurrentProduct(product);
    setOpenProductDialog(true);
  };

  const handleCloseProductDialog = () => {
    setOpenProductDialog(false);
    setCurrentProduct(null);
  };

  const handleOpenUserDialog = (user = null) => {
    setCurrentUser(user);
    setOpenUserDialog(true);
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
    setCurrentUser(null);
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (currentProduct) {
        // Actualizar producto existente
        const updatedProduct = await adminService.updateProduct(currentProduct.id, productData);
        setProducts(prev => prev.map(p => 
          p.id === currentProduct.id ? updatedProduct : p
        ));
      } else {
        // Crear nuevo producto
        const newProduct = await adminService.createProduct(productData);
        setProducts(prev => [...prev, newProduct]);
      }
      handleCloseProductDialog();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleSaveUser = async (userData) => {
    try {
      if (currentUser) {
        // Actualizar usuario existente
        const updatedUser = await adminService.updateUser(currentUser.id, userData);
        setUsers(prev => prev.map(u => 
          u.id === currentUser.id ? updatedUser : u
        ));
      }
      handleCloseUserDialog();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: 'calc(100vh - 64px)',
      mt: 8,
      backgroundColor: '#f9f9f9'
    }}>
      {/* Menú lateral */}
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          minWidth: 250,
          bgcolor: 'background.paper',
          boxShadow: theme.shadows[2]
        }}
      >
        <Tab 
          label="Resumen" 
          icon={<DashboardIcon />} 
          iconPosition="start" 
          sx={{ justifyContent: 'flex-start', minHeight: 56 }} 
        />
        <Tab 
          label="Usuarios" 
          icon={<UsersIcon />} 
          iconPosition="start" 
          sx={{ justifyContent: 'flex-start', minHeight: 56 }} 
        />
        <Tab 
          label="Productos" 
          icon={<ProductsIcon />} 
          iconPosition="start" 
          sx={{ justifyContent: 'flex-start', minHeight: 56 }} 
        />
        <Tab 
          label="Estadísticas" 
          icon={<StatsIcon />} 
          iconPosition="start" 
          sx={{ justifyContent: 'flex-start', minHeight: 56 }} 
        />
        <Tab 
          label="Configuración" 
          icon={<SettingsIcon />} 
          iconPosition="start" 
          sx={{ justifyContent: 'flex-start', minHeight: 56 }} 
        />
      </Tabs>
      
      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <TabPanel value={value} index={0}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Resumen Administrativo
          </Typography>
          
          {loading.stats ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary">
                      Usuarios Totales
                    </Typography>
                    <Typography variant="h3">
                      {stats.totalUsers}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary">
                      Productos Activos
                    </Typography>
                    <Typography variant="h3">
                      {stats.activeProducts}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary">
                      Ventas Hoy
                    </Typography>
                    <Typography variant="h3">
                      {stats.todaySales}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary">
                      Ingresos Mensuales
                    </Typography>
                    <Typography variant="h3">
                      ${stats.monthlyRevenue.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              {/* Gráficos y más estadísticas */}
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Actividad Reciente
                    </Typography>
                    {/* Aquí iría un gráfico de actividad */}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Productos Populares
                    </Typography>
                    {/* Aquí iría una lista de productos populares */}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">Gestión de Usuarios</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Buscar usuarios..."
                InputProps={{
                  startAdornment: <SearchIcon color="action" />
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => handleOpenUserDialog()}
              >
                Nuevo Usuario
              </Button>
            </Box>
          </Box>
          
          {loading.users ? (
            <CircularProgress />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Correo</TableCell>
                    <TableCell>RUT</TableCell>
                    <TableCell>Rol</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.nombre} {user.apellido}</TableCell>
                      <TableCell>{user.correo}</TableCell>
                      <TableCell>{user.rut}</TableCell>
                      <TableCell>
                        <Chip 
                          label={user.rol.replace('ROLE_', '')} 
                          color={
                            user.rol === 'ROLE_ADMIN' ? 'primary' : 
                            user.rol === 'ROLE_VENDEDOR' ? 'secondary' : 'default'
                          } 
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={user.activo ? 'Activo' : 'Inactivo'} 
                          color={user.activo ? 'success' : 'error'} 
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenUserDialog(user)}
                          sx={{ mr: 1 }}
                        >
                          Editar
                        </Button>
                        <Button
                          size="small"
                          startIcon={user.activo ? <BlockIcon /> : <ApproveIcon />}
                          color={user.activo ? 'error' : 'success'}
                          onClick={() => handleToggleUserStatus(user.id, user.activo)}
                        >
                          {user.activo ? 'Desactivar' : 'Activar'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">Gestión de Productos</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Buscar productos..."
                InputProps={{
                  startAdornment: <SearchIcon color="action" />
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => handleOpenProductDialog()}
              >
                Nuevo Producto
              </Button>
            </Box>
          </Box>
          
          {loading.products ? (
            <CircularProgress />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Categoría</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <img 
                            src={product.imagen || '/default-product.jpg'} 
                            alt={product.nombre}
                            style={{ 
                              width: 50, 
                              height: 50, 
                              objectFit: 'cover',
                              marginRight: 10,
                              borderRadius: 4
                            }} 
                          />
                          {product.nombre}
                        </Box>
                      </TableCell>
                      <TableCell>{product.categoria.nombre}</TableCell>
                      <TableCell>${product.precio.toLocaleString()}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Chip 
                          label={product.activo ? 'Activo' : 'Inactivo'} 
                          color={product.activo ? 'success' : 'error'} 
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenProductDialog(product)}
                          sx={{ mr: 1 }}
                        >
                          Editar
                        </Button>
                        <Button
                          size="small"
                          startIcon={product.activo ? <BlockIcon /> : <ApproveIcon />}
                          color={product.activo ? 'error' : 'success'}
                          onClick={() => handleToggleProductStatus(product.id, product.activo)}
                        >
                          {product.activo ? 'Desactivar' : 'Activar'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
        
        <TabPanel value={value} index={3}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Estadísticas Avanzadas
          </Typography>
          {/* Aquí irían gráficos y estadísticas detalladas */}
        </TabPanel>
        
        <TabPanel value={value} index={4}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Configuración del Sistema
          </Typography>
          {/* Aquí irían opciones de configuración */}
        </TabPanel>
      </Box>
      
      {/* Diálogo para Productos */}
      <Dialog 
        open={openProductDialog} 
        onClose={handleCloseProductDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {currentProduct ? 'Editar Producto' : 'Nuevo Producto'}
        </DialogTitle>
        <DialogContent>
          <ProductForm 
            product={currentProduct} 
            onSave={handleSaveProduct} 
            onCancel={handleCloseProductDialog}
          />
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para Usuarios */}
      <Dialog 
        open={openUserDialog} 
        onClose={handleCloseUserDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {currentUser ? 'Editar Usuario' : 'Nuevo Usuario'}
        </DialogTitle>
        <DialogContent>
          <UserManagementForm 
            user={currentUser} 
            onSave={handleSaveUser} 
            onCancel={handleCloseUserDialog}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;