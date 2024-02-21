import { Card, Heading, Skeleton, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { STAKE_TOKEN_ADDRESSES } from "../cost/addresses";

export default function StakeToken() {
    const address = useAddress();
    const { contract: stakeTokenContract, isLoading: loadingStakeToken } = useContract(STAKE_TOKEN_ADDRESSES);
    const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(stakeTokenContract, address);
    
    const fontSize = useBreakpointValue({ base: "md", md: "large" });
    const padding = useBreakpointValue({ base: 4, md: 5 });
    const skeletonWidth = useBreakpointValue({ base: "80%", md: "50%" });

    return (
        <Card p={padding} bgGradient="linear(to-r, rgb(0, 122, 255), rgba(250,215,22,255))">
            <Stack>
                <Heading fontSize={fontSize}>BLUE Balance</Heading>
                <Skeleton h={4} w={skeletonWidth} isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                    <Text fontSize={fontSize} fontWeight={"bold"}>${tokenBalance?.symbol}</Text>
                </Skeleton>
                <Skeleton h={4} w={"100%"} isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                    <Text fontSize={fontSize}>{tokenBalance?.displayValue}</Text>
                </Skeleton>
            </Stack>
        </Card>
    )
}
