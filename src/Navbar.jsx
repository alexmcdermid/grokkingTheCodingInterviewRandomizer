import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useAuth } from './AuthContext';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { currentUser, signInWithGitHub, signOut } = useAuth();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={8}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>GTCIR</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              {!currentUser ? 
                <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} onClick={signInWithGitHub}>
                  Sign In
                </Button>
              : 
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                      size={'sm'}
                      src={currentUser.photoURL}
                    />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <br />
                    <Center>
                      <Avatar
                        size={'2xl'}
                        src={currentUser.photoURL}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{currentUser.displayName}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    {/* <MenuItem>Your Stats</MenuItem>
                    <MenuItem>Account Settings</MenuItem> */}
                    <MenuItem onClick={signOut}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}