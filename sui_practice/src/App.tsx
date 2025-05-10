import { useCallback, useState } from "react";
import { getFullnodeUrl } from '@mysten/sui/client';
import { ConnectButton, SuiClientProvider, useSuiClient, WalletProvider } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading, Button } from "@radix-ui/themes";
import { getFaucetHost, requestSuiFromFaucetV2 } from "@mysten/sui/faucet";
import { MIST_PER_SUI } from "@mysten/sui/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 네트워크 설정
const networks = {
  devnet: { url: getFullnodeUrl('devnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
};

const MY_ADDRESS = "0x11506437425d15856996aa53ab0c7831e8d7f8221f99d814e4db47b53c75d219";

function FaucetApp() {
  const [balanceBefore, setBalanceBefore] = useState<number | null>(null);
  const [balanceAfter, setBalanceAfter] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const suiClient = useSuiClient();

  const getBalance = async (address: string) => {
    const result = await suiClient.getBalance({ owner: address });
    return Number(result.totalBalance) / Number(MIST_PER_SUI);
  };

  const handleFaucetClick = useCallback(async () => {
    try {
      setLoading(true);
      const before = await getBalance(MY_ADDRESS);
      setBalanceBefore(before);

      await requestSuiFromFaucetV2({
        host: getFaucetHost("testnet"),
        recipient: MY_ADDRESS,
      });
      const after = await getBalance(MY_ADDRESS);
      setBalanceAfter(after);
    } catch (error) {
      console.error("Error requesting SUI from faucet:", error);
    } finally {
      setLoading(false);
    }
  }, [suiClient]);

  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>Sui faucet </Heading>
        </Box>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          {/* <WalletStatus /> */}
        </Container>
      </Container>
      <div style={{ padding: 24 }}>
        <h1>Hello, Sui!</h1>
        <Button onClick={handleFaucetClick} disabled={loading}>
          {loading ? "Requesting SUI..." : "Request SUI from Faucet"}
        </Button>
        {balanceBefore !== null && balanceAfter !== null && (
          <div style={{ marginTop: 16 }}>
            <p>💧 Balance before: {balanceBefore} SUI</p>
            <p>💰 Balance after: {balanceAfter} SUI</p>
          </div>
        )}
      </div>
    </>
  );
}

// Wrap your app with the required providers
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider>
          <FaucetApp />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
