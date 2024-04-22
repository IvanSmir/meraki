import { Container } from "@mui/material"
import { TopCard } from "./"
import { useEffect, useState } from "react"
import { HttpActionsProducts } from "../utils"



const { getTopThree } = HttpActionsProducts()
const defaultContent = [
    {
        title: 'Cargando...',
        description: 'Cargando',
        image: 'https://via.placeholder.com/300'
    },
    {
        title: 'Cargando...',
        description: 'Cargando',
        image: 'https://via.placeholder.com/300'
    },
    {
        title: 'Cargando...',
        description: 'Cargando',
        image: 'https://via.placeholder.com/300'
    }
]
export const TopPosts = () => {
    const [content, setContent] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTopThree()
                setContent(data.map(item => {
                    return {
                        title: item.nombre,
                        description: item.description,
                        image: item.avatar,
                        _id: item._id
                    }
                }))
            } catch (error) {
                setContent(defaultContent)

            }
        }
        fetchData()
    }, [])
    return (
        <Container sx={{ display: "flex", justifyContent: 'center', mt: 5, flexDirection: 'column', gap: 5 }}>
            {/* <TopCard content={content} />
            <TopCard content={content} right />
            <TopCard content={content} /> */}

            {content.map((item, index) => {
                if (index === 1) {
                    return <TopCard key={index} content={item} right />
                } else {
                    return <TopCard key={index} content={item} />
                }
            })}


        </Container>
    )
}
