import { useEffect } from 'react'
import { useMataGatosStore } from '../context/mataGatosContext'
import { useInfiniteQuery } from '@tanstack/react-query'

const generateRamdomTimestamp = () => {
  const from = new Date('2020-01-01').getTime()
  const now = new Date().getTime()

  const random = Math.floor(Math.random() * (now - from) + from)
  return random
}

const generateRandomPhoneNumber = () => {
  const areaCode = '+' + Math.floor(Math.random() * 100).toString().padStart(2, '0');
  const lineNumber = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  return `${areaCode} ${lineNumber}`;
}

  // Verificamos si es Lunes o Jueves a las 12 de la noche
const isUpdateDay = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    return (day === 1 || day === 4) && hour === 0;
};

let cache = {};

if (localStorage.getItem('cache')) {
  cache = JSON.parse(localStorage.getItem('cache'));
}

async function fetchOwners({ pageParam = 1, searchText }) {
  const url = searchText
    ? `https://gorest.co.in/public/v2/users?page=${pageParam}&per_page=10&name=${searchText}`
    : `https://gorest.co.in/public/v2/users?page=${pageParam}&per_page=10`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json, charset=UTF-8',
      Authorization: 'Bearer 61cb4c2c7bf7096f606410c9f450b345f49b62dad96126720505faefd448f350',
    },
  });

  const data = await response.json();

  const owners = data.map((owner) => {
    const createdAt = cache[`created_at_${owner.id}`];
    const phone = cache[`phone_${owner.id}`];
    owner.created_at = createdAt ? parseInt(createdAt) : generateRamdomTimestamp();
    owner.phone = phone ? phone : generateRandomPhoneNumber();
    return owner;
  });

  return owners;
}

export const useFetchOwners = ({ searchText }) => {
  const { increaseKilledCats } = useMataGatosStore();

  const { data, isLoading, error, isFetching, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery(
    ['owners', {searchText}],
    ({ pageParam }) => fetchOwners({ pageParam, searchText }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length === 0) return;
        return allPages.length + 1
      },
      onSuccess: () => {
        increaseKilledCats();
      },
      refetchOnWindowFocus: false
    }
  )

  
  const owners = data?.pages?.flatMap((page) => page) ?? []

  console.log('owners', owners)

  useEffect(() => {
    owners.forEach((owner) => {
      if (!cache[`created_at_${owner.id}`]) {
        cache[`created_at_${owner.id}`] = owner.createdAt;
      }
      if (!cache[`phone_${owner.id}`]) {
        cache[`phone_${owner.id}`] = owner.phone;
      }
    });
    localStorage.setItem('cache', JSON.stringify(cache));
  }, [owners]);

  useEffect(() => {
    const dayInterval = setInterval(() => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      if ((day === 1 || day === 4) && hour === 0) {
        refetch();
      }
    }, 60 * 60 * 1000);
    return () => clearInterval(dayInterval);
  }, [refetch]);
  
  return {
    isFetching,
    owners,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage
  }
}