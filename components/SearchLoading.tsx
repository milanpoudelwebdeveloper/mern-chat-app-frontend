import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const SearchLoading = () => {
  return (
    <Stack>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton height="45px" key={index}></Skeleton>
      ))}
    </Stack>
  )
}

export default SearchLoading
