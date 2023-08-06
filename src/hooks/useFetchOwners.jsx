import { useEffect, useState } from "react";
import { useMataGatos } from "../context/mataGatosContext";

const generateRamdomTimestamp = () => {
    const from = new Date('2020-01-01').getTime();
    const now = new Date().getTime();

    const random = Math.floor(Math.random() * (now - from) + from);
    return random;
};


export function useFetchOwners({ searchText }) {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const { increaseKilledCats } = useMataGatos();
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [loadingMoreData, setLoadingMoreData] = useState(false);
                
    useEffect(() => {
        console.log("useFetchOwners");
        const url = searchText 
            ? `https://gorest.co.in/public/v2/users?name=${searchText}&page=${page}&per_page=10`
            : `https://gorest.co.in/public/v2/users?page=${page}&per_page=10`

        if (loadingMoreData) return;
        setLoadingMoreData(true);

        hasMoreData && fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json, charset=UTF-8",
                "Authorization": "Bearer 61cb4c2c7bf7096f606410c9f450b345f49b62dad96126720505faefd448f350"
            }
        })
        .then((response) => {
            increaseKilledCats();
            if (!response.ok) {
                throw new Error("Algo salió mal...");
            }
            return response.json();
        })
        .then((data) => {
            if (data.length > 0) {
                data.map((owner) => {
                    owner.created_at = generateRamdomTimestamp();
                });
                setOwners((prev => page > 1 ? [...prev, ...data] : data));
            } else {
                setHasMoreData(false);
            }
                
            setLoading(false);
            setLoadingMoreData(false);
        })
        .catch((error) => {
            setLoading(false);
            setLoadingMoreData(false);
            console.log(error)
        });
    }, [page, searchText]);

    return {
        owners,
        loading,
        setPage,
        hasMoreData,
        setHasMoreData
    };
}

