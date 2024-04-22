import { HighlightOff } from "@mui/icons-material";
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

export const ItemCard = ({ title, image, id, tipo, estado, precio, callback, toDelete, callbackDelete }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (callback) {

            callback({ nombre: title, id, imagen: image, precio, estado })
        }
        else if (tipo === 'producto')
            navigate(`/products/${id}`)
        else
            navigate(`/clients/${id}`)


    }
    return (
        <Card sx={{ maxWidth: 220, position: 'relative', overflow: "visible" }} >
            {toDelete &&
                <Button
                    sx={{
                        position: 'absolute',
                        color: 'error.main',
                        top: '-13px',
                        right: '-13px',
                        borderRadius: '50%',
                        width: 30,
                        height: 30,
                        minWidth: 30,
                        minHeight: 30,
                        ":hover": {
                            backgroundColor: 'red',
                            opacity: 0.9
                        },
                        zIndex: 1
                    }}
                    onClick={() => callbackDelete(id, title)}
                >
                    <HighlightOff fontSize="small" sx={{ ":hover": { color: "white" }, width: 25, height: 25 }} />
                </Button>
            }
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={title}
                />
                <CardContent sx={{ width: 220, height: 100 }}>
                    <Typography gutterBottom variant="h5" component="h5">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

ItemCard.propTypes =
{
    title: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string,
    tipo: PropTypes.string,
    callback: PropTypes.func,
    estado: PropTypes.bool,
    precio: PropTypes.number,
    toDelete: PropTypes.bool,
    callbackDelete: PropTypes.func

}

