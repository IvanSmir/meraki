import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

export const TopCard = ({ content, right }) => {
    const navigate = useNavigate()
    const { title, description, image, _id } = content;
    const isImageRight = right
    const handleClick = () => {
        navigate(`/products/${_id}`)

    }

    return (
        <Card sx={{ maxWidth: 1200, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }} onClick={handleClick}>
            <CardActionArea sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, flexGrow: 1 }}
                onClick={handleClick}>
                {!isImageRight && (
                    <CardMedia
                        component="img"
                        sx={{
                            maxWidth: 250,
                            height: 300,
                            flexGrow: 0,
                        }}
                        image={image}
                        alt={title}
                    />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                {isImageRight && (
                    <CardMedia
                        component="img"
                        sx={{
                            maxWidth: 250,
                            height: 300,
                            flexGrow: 0,
                        }}
                        image={image}
                        alt={title}
                    />
                )}
            </CardActionArea>
        </Card >

    );
}

TopCard.propTypes = {
    content: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
    right: PropTypes.bool,
}
