import { useState, useEffect } from "react";

import { WEDDING_QUERY, GUEST_QUERY } from "../utils/queries";
import { ADD_GUESTS } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";

const useImperativeQuery = (query) => {
  const { refetch } = useQuery(query, {
    skip: true,
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "cache-first", // Used for subsequent executions
  });

  const imperativelyCallQuery = async (variables) => {
    const result = await refetch(variables);
    return result?.data;
  };

  return imperativelyCallQuery;
};

export function useGuestsData(organiser) {
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState(null);
  const [weddings, setWeddings] = useState(null);
  const getGuests = useImperativeQuery(GUEST_QUERY);
  const getWeddings = useImperativeQuery(WEDDING_QUERY);
  const [addGuests, addGuestsResponse] = useMutation(ADD_GUESTS);
  const getData = async () => {
    const guestsResponse = await getGuests();
    const weddingsResponse = await getWeddings();
    setGuests(guestsResponse.guests)
    setWeddings(weddingsResponse.weddings)
    setLoading(false)
  };

  useEffect(() => {
      getData();
  }, [])

  return {
    guests,
    weddings,
    addGuests,
    loading,
  };
}
