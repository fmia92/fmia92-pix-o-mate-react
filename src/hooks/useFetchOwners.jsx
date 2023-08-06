import { useEffect, useState } from "react";
import { useMataGatos } from "../context/mataGatosContext";

const generateRamdomTimestamp = () => {
    const from = new Date('2020-01-01').getTime();
    const now = new Date().getTime();

    const random = Math.floor(Math.random() * (now - from) + from);
    return random;
};


export function useFetchOwners({ searchText, perPages}) {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const { increaseKilledCats } = useMataGatos();
                
    useEffect(() => {
        const url = searchText 
        ? `https://gorest.co.in/public/v2/users?name=${searchText}&page=1&per_page=${perPages}`
        : `https://gorest.co.in/public/v2/users?page=1&per_page=${perPages}`;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json, charset=UTF-8",
                "Authorization": "Bearer 61cb4c2c7bf7096f606410c9f450b345f49b62dad96126720505faefd448f350"
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Algo salió mal...");
            }
            increaseKilledCats();
            return response.json();
        })
        .then((data) => {
            console.log({
                data
            });
            data.map((owner) => {
                owner.created_at = generateRamdomTimestamp();
            });
            setOwners(data);
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            console.log(error)
        });
    }, [perPages, searchText]);

    return {
        owners,
        loading
    };
}

