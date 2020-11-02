import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Button, Spinner, HStack, UnorderedList, ListItem, Input } from '@chakra-ui/core'
 
function FetchTab() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=redux',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
 
  useEffect(() => {
    const fetchData = async() => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
 
      setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);
 
  return (
    <>
    <HStack mb="6">
    <form mt="6" mb="12" w="360px" h="60px" onSubmit={event => {
          setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);

          event.preventDefault();
        }}>
    <Input 
      type="text" 
      value={query} 
      onChange={event => setQuery(event.target.value)}
      mb="2"
    />
    <Button type="submit" colorScheme="teal" size="md">Search</Button>
    </form>
    </HStack>

    {isError && <div>Something went wrong ...</div>}

    {isLoading ? (
      <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
    ) : (
      <UnorderedList>
      {data.hits.map(item => (
        <ListItem key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </ListItem>
      ))}
    </UnorderedList>
    )}
    </>
  );
}
 
export default FetchTab;