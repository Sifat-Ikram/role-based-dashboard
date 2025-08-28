import { createSlice } from "@reduxjs/toolkit";
import dummyData from "../../../public/dummyData.json";

const initialState = {
  admin: {
    users: dummyData.adminData.users,
    merchants: dummyData.adminData.merchants,
  },
  merchant: {
    purchases: dummyData.merchantData.purchases,
    notifications: dummyData.merchantData.notifications,
    contributionRate: 10, // default
  },
  member: {
    pointsSummary: dummyData.memberData.pointsSummary,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.admin.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.admin.users = state.admin.users.filter(
        (user) => user.id !== action.payload
      );
    },
    addMerchant: (state, action) => {
      state.admin.merchants.push(action.payload);
    },
    removeMerchant: (state, action) => {
      state.admin.merchants = state.admin.merchants.filter(
        (merchant) => merchant.id !== action.payload
      );
    },
    approvePurchase: (state, action) => {
      const id = action.payload;
      const purchaseIndex = state.merchant.purchases.findIndex(
        (p) => p.id === id
      );
      if (purchaseIndex !== -1) {
        state.merchant.purchases.splice(purchaseIndex, 1);
        state.merchant.notifications.push(`Purchase ${id} approved`);
      }
    },
    setContributionRate: (state, action) => {
      state.merchant.contributionRate = action.payload;
    },
    updatePoints: (state, action) => {
      state.member.pointsSummary = {
        ...state.member.pointsSummary,
        ...action.payload,
      };
    },
  },
});

export const {
  addUser,
  removeUser,
  addMerchant,
  removeMerchant,
  approvePurchase,
  setContributionRate,
  updatePoints,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
