import React, { useState, useEffect } from 'react'
import { Heading, Text, Center, Box, HStack } from '@chakra-ui/core'
import { ethers } from 'ethers'

function EthersTab() {
  const [isEtherem, setIsEtherem] = useState(false)
  const [isEnable, setIsEnable] = useState(false)
  const [account, setAccount] = useState('0x0')
  const [network, setNetwork] = useState(null)
  const [balance, setBalance] = useState(0)

  // check if ethereum is injected
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setIsEtherem(true)
    } else setIsEtherem(false)
  }, [])

  // connect metamask to app
  useEffect(() => {
    ;(async () => {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        const account = accounts[0]
        setIsEnable(true)
        setAccount(account)
      } catch (e) {
        setIsEnable(false)
      }
    })()
  }, [isEtherem])

  useEffect(() => {
    ;(async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork()
      const _balance = await provider.getBalance(account)
      const balance = ethers.utils.formatEther(_balance)
      setNetwork(network)
      setBalance(balance)
    })()
  }, [isEnable, account])

  return (
    <>
    <Center>
    <Heading as="h1" size="2xl" color="green.700" mb="12">Web3 with ethers.js</Heading>
    </Center>
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <HStack>
      <Text fontSize="2xl">Metamask status: </Text>
      {isEnable ? 
        <Text color="green.500" fontSize="3xl">'connected'</Text> :
        <Text color="red.500" fontSize="3xl">'disconnected'</Text>}
      </HStack>
      {network !== null && (
        <>
          <Text fontSize="2xl">Account: {account}</Text>
          <Text fontSize="2xl">Network name: {network.name}</Text>
          <Text fontSize="2xl">Network id: {network.chainId}</Text>
          <Text fontSize="2xl">Balance: {balance}</Text>
        </>
      )}
      </Box>
    </>
  )
}

export default EthersTab
