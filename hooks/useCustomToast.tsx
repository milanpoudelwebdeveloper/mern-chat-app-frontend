import { ToastPosition, useToast } from '@chakra-ui/react'

export const useCustomToast = () => {
  const toast = useToast()

  const showToast = (
    title: string,
    status: 'info' | 'warning' | 'success' | 'error' | undefined,
    position?: ToastPosition | undefined
  ) => {
    toast({
      title,
      status,
      duration: 3000,
      isClosable: true,
      position: position || 'top',
    })
  }

  return { showToast }
}
