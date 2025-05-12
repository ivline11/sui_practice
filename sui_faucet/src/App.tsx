import { Theme, Container, Flex, Heading, Box, Tabs } from '@radix-ui/themes';
import { ConnectButton, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useState } from 'react';


const networks = {
  devnet: { url: getFullnodeUrl('devnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
};

const queryClient = new QueryClient();

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider>
          <Theme appearance="dark">
            <Container size="2">
              <Flex direction="column" gap="4">
                <Heading>My Sui DApp</Heading>
                <ConnectButton />
                <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
                  <Tabs.List>
                    <Tabs.Trigger value="home">Home</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="home">
                    <Box>Home Content</Box>
                  </Tabs.Content>
                  <Tabs.Content value="settings">
                    <Box>Settings Content</Box>
                  </Tabs.Content>
                </Tabs.Root>
              </Flex>
            </Container>
          </Theme>  
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}

export default App;