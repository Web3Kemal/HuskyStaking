// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/Staking20Base.sol";

contract HuskyStaking is Staking20Base {
    uint256 constant public UNSTAKE_WAIT_PERIOD = 7 days;

    mapping(address => uint256) private unstakeTimestamp;

    constructor(
        uint80 _timeUnit,
        address _defaultAdmin,
        uint256 _rewardRatioNumerator,
        uint256 _rewardRatioDenominator,
        address _stakingAndRewardToken,  // Use a single address for staking and rewards
        address _nativeTokenWrapper
    )
        Staking20Base(
            _timeUnit,
            _defaultAdmin,
            _rewardRatioNumerator,
            _rewardRatioDenominator,
            _stakingAndRewardToken,  // Pass the same token address for both staking and rewards
            _stakingAndRewardToken,  // Pass the same token address for both staking and rewards
            _nativeTokenWrapper
        )
    {
        _setupOwner(_defaultAdmin);
        _setStakingCondition(_timeUnit, _rewardRatioNumerator, _rewardRatioDenominator);

        // Ensure that staking and reward token are the same
        require(
            IERC20Metadata(_stakingAndRewardToken).decimals() == IERC20Metadata(stakingToken).decimals(),
            "Decimals mismatch between staking and reward tokens."
        );

        require(_stakingAndRewardToken != _nativeTokenWrapper, "Token and wrapper cannot be the same.");
    }

    // Override the stake function to set unstake timestamp
    function stake(uint256 _amount) external payable virtual override {
    super._stake(_amount);
    unstakeTimestamp[msg.sender] = block.timestamp + UNSTAKE_WAIT_PERIOD;
}


    // Override the unstake function to enforce the 7 days waiting period
    function withdraw(uint256 _amount) external virtual override {
        require(unstakeTimestamp[msg.sender] <= block.timestamp, "Cannot unstake before 7 days");
        super._withdraw(_amount);
    }

    // Override the claimRewards function to enforce the 7 days waiting period
    function claimRewards() external virtual override {
        require(unstakeTimestamp[msg.sender] <= block.timestamp, "Cannot claim rewards before 7 days");
        super._claimRewards();
    }
}
