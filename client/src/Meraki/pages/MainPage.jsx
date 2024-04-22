import { Divider, Box } from "@mui/material"
import { MainContent, TopPosts } from "../components"

export const MainPage = () => {

    return (
        <Box sx={{
            display: "flex", justifyContent: 'center'
        }}>
            <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.22)', width: '80vw' }} >

                <MainContent />
                <Divider variant="middle" />

                <TopPosts />

            </Box>
        </Box >

    )
}
