import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const SearchLoading: React.FC<{ length?: number }> = ({ length = 3 }) => {
  return (
    <Stack>
      {Array.from({ length: length }).map((_, index) => (
        <Skeleton height="45px" key={index}></Skeleton>
      ))}
    </Stack>
  )
}

export default SearchLoading
