import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import questReducer from "./questSlice";
import challengeReducer from "./challengeSlice";
import challengeHistoryReducer from "./challengeHistorySlice";
import dailyChallengeReducer from "./dailyChallengeSlice";
import dailyRewardReducer from "./dailyRewardSlice";
import itemReducer from "./itemSlice";
import rewardReducer from "./rewardSlice";
import statReducer from "./statSlice";
import subquestReducer from "./subquestSlice";
import taskReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    quests: questReducer,
    challenges: challengeReducer,
    challengeHistory: challengeHistoryReducer,
    dailyChallenges: dailyChallengeReducer,
    dailyRewards: dailyRewardReducer,
    items: itemReducer,
    rewards: rewardReducer,
    stats: statReducer,
    subquests: subquestReducer,
    tasks: taskReducer,
    // Add more slices here as needed
  },
  // You can add middleware or devTools options here if needed
});

export default store;
