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
    // Admin reducers
    addUser: (state, action) => {
      state.admin.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.admin.users = state.admin.users.filter(
        (user) => user.id !== action.payload
      );
    },

    // Merchant reducers
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

    // Member reducers (if needed in future)
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
  approvePurchase,
  setContributionRate,
  updatePoints,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
