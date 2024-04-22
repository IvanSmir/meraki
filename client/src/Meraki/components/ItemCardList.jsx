import { Grid } from "@mui/material";
import { ItemCard } from "./ItemCard";
import PropTypes from 'prop-types';



export const ItemCardList = ({ content, tipo }) => {
    return (
        <Grid container spacing={2} sx={{ mt: 5, mb: 2 }}>

            {content?.map((item) => (
                <Grid key={item._id} item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ItemCard title={item.nombre} image={item.avatar} id={item._id} tipo={tipo} />
                </Grid>
            ))}
        </Grid>
    );
}

ItemCardList.propTypes = {
    content: PropTypes.array,
    tipo: PropTypes.string
}