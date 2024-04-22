import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { HttpActionsClients } from "../utils/HttpActionsClients"
import { Box, Fab, Grid } from "@mui/material"
import { ClientDetails } from "../components/Client/ClientDetails"
import { ClientProducts } from "../components"
import { Delete, Edit } from "@mui/icons-material"
import { ModalDelete } from "../components/ModalDelete"
import { AgregarProducto } from "./AgregarProducto"


const { getClient, getProductsFronClient } = HttpActionsClients()

export const ClientPage = () => {
  const clientId = useParams().id
  const navigate = useNavigate()
  const [client, setClient] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false)
  const [toDelete, setToDelete] = useState({});
  const handleOpen = ({ nombre, tipo, id }) => {
    setToDelete({ nombre, tipo, id })
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const handleOpenAdd = () => setOpenAdd(true)
  const handleCloseAdd = () => setOpenAdd(false)

  const fetchProducts = async () => {
    try {
      const productsData = await getProductsFronClient(clientId);
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    let isActive = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const clientData = await getClient(clientId);
        const productsData = await getProductsFronClient(clientId);
        if (isActive) {
          setClient(clientData);
          setProducts(productsData);
        }
      } catch (error) {
        if (isActive) {
          navigate('/clients');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isActive = false;
    };
  }, [clientId, navigate]);


  const handleClickEdit = () => {
    navigate(`/clients/edit/${clientId}`)
  }
  const handleClickDelete = () => {
    setOpen(true)
    handleOpen({ nombre: client.nombre, tipo: 'cliente', id: client._id })
  }

  const removeProducts = (id) => {
    setProducts(products.filter((product) => product._id !== id))
  }


  if (loading) {
    return <div>Loading...</div>
  }
  if (!client) {
    return <div>Cargando detalles del cliente...</div>;
  }
  return (
    <Box sx={{
      display: "flex", justifyContent: 'center'
    }}>
      <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.22)', height: '100', width: '80vw', justifyContent: 'center' }} >
        <Grid container spacing={2} sx={{ p: 2 }} >
          <Grid item xs={12}>
            <ClientDetails client={client} />
          </Grid>
          <Grid>
            <ClientProducts products={products} setToDelete={setToDelete} setOpenDelete={setOpen} setOpenAdd={handleOpenAdd} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>

        <Fab size="medium" color="error" aria-label="edit"
          sx={{ position: 'fixed', bottom: 120, right: { xs: 10, md: 50 } }}
          onClick={handleClickDelete}>
          <Delete />
        </Fab>

        <Fab color="secondary" aria-label="edit"
          sx={{ position: 'fixed', bottom: 50, right: { xs: 10, md: 50 } }}
          onClick={handleClickEdit}>
          <Edit />
        </Fab>
      </Box>
      <ModalDelete tipo={toDelete.tipo} nombre={toDelete.nombre} id={toDelete.id} handleClose={handleClose} open={open} removeProducts={removeProducts} />
      <AgregarProducto id={clientId} nombre={client.nombre} open={openAdd} handleClose={handleCloseAdd} refresh={fetchProducts} />

    </Box >
  )
}
