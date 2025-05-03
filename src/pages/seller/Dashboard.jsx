import { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, CircularProgress, Card, CardContent } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ProductList from '../../components/dashboard/ProductList';
import SalesList from '../../components/dashboard/SalesList';
import productService from '../../services/productService';
import orderService from '../../services/orderService';

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

const SellerDashboard = () => {
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState({
    products: true,
    sales: true,
    stats: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, salesData, statsData] = await Promise.all([
          productService.getSellerProducts(),
          orderService.getSellerSales(),
          orderService.getSalesStats()
        ]);
        
        setProducts(productsData);
        setSales(salesData);
        setStats(statsData);
        
        setLoading({
          products: false,
          sales: false,
          stats: false
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading({
          products: false,
          sales: false,
          stats: false
        });
      }
    };
    
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const salesData = [
    { name: 'Ene', ventas: stats?.monthlySales?.january || 0 },
    { name: 'Feb', ventas: stats?.monthlySales?.february || 0 },
    { name: 'Mar', ventas: stats?.monthlySales?.march || 0 },
    { name: 'Abr', ventas: stats?.monthlySales?.april || 0 },
    { name: 'May', ventas: stats?.monthlySales?.may || 0 },
    { name: 'Jun', ventas: stats?.monthlySales?.june || 0 },
    { name: 'Jul', ventas: stats?.monthlySales?.july || 0 },
    { name: 'Ago', ventas: stats?.monthlySales?.august || 0 },
    { name: 'Sep', ventas: stats?.monthlySales?.september || 0 },
    { name: 'Oct', ventas: stats?.monthlySales?.october || 0 },
    { name: 'Nov', ventas: stats?.monthlySales?.november || 0 },
    { name: 'Dic', ventas: stats?.monthlySales?.december || 0 },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)', mt: 8 }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          minWidth: 200,
        }}
      >
        <Tab label="Resumen" />
        <Tab label="Mis Productos" />
        <Tab label="Mis Ventas" />
      </Tabs>
      
      <Box sx={{ flexGrow: 1 }}>
        <TabPanel value={value} index={0}>
          <Typography variant="h4" gutterBottom>
            Resumen de Ventas
          </Typography>
          
          {loading.stats ? (
            <CircularProgress />
          ) : (
            <>
              <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography color="text.secondary">Total Ventas</Typography>
                    <Typography variant="h5">${stats?.totalSales?.toLocaleString() || 0}</Typography>
                  </CardContent>
                </Card>
                
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography color="text.secondary">Ventas este Mes</Typography>
                    <Typography variant="h5">${stats?.currentMonthSales?.toLocaleString() || 0}</Typography>
                  </CardContent>
                </Card>
                
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography color="text.secondary">Productos Vendidos</Typography>
                    <Typography variant="h5">{stats?.totalItemsSold || 0}</Typography>
                  </CardContent>
                </Card>
              </Box>
              
              <Box sx={{ height: 400 }}>
                <Typography variant="h6" gutterBottom>
                  Ventas Mensuales
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ventas" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </>
          )}
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          <Typography variant="h4" gutterBottom>
            Mis Productos
          </Typography>
          {loading.products ? (
            <CircularProgress />
          ) : (
            <ProductList 
              products={products} 
              onProductUpdate={() => {
                // Función para actualizar la lista después de editar
              }} 
            />
          )}
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          <Typography variant="h4" gutterBottom>
            Mis Ventas
          </Typography>
          {loading.sales ? (
            <CircularProgress />
          ) : (
            <SalesList sales={sales} />
          )}
        </TabPanel>
      </Box>
    </Box>
  );
};

export default SellerDashboard;