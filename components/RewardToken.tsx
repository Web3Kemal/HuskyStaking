import { Card, Heading, Skeleton, Stack, Text, useBreakpointValue, Box } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { REWARD_TOKEN_ADDRESSES } from "../cost/addresses";

export default function StakeToken() {
    const address = useAddress();
    const { contract: stakeTokenContract, isLoading: loadingStakeToken } = useContract(REWARD_TOKEN_ADDRESSES);
    const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(stakeTokenContract, address);

    
    const fontSize = useBreakpointValue({ base: "md", md: "large" });
    const padding = useBreakpointValue({ base: 4, md: 5 });
    const skeletonWidth = useBreakpointValue({ base: "80%", md: "50%" });
    
    return (

            <Card p={padding} bgGradient="linear(to-r, rgba(250,215,22,255),rgb(17, 112, 219))">
                <Stack spacing={3}>
                    <Heading fontSize={fontSize}>CAPO Balance</Heading>
                    <Skeleton h={4} w={skeletonWidth}isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                        <Text fontSize={fontSize} fontWeight={"bold"}>${tokenBalance?.symbol}</Text>
                    </Skeleton>
                    <Skeleton isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                        <Text fontSize={fontSize}>{tokenBalance?.displayValue}</Text>
                    </Skeleton>
                </Stack>
            </Card>
    )
}
