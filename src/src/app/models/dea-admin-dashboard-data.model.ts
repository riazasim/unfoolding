interface UsageEntry {
  balance: number;
  dateTime: string;
}

export interface DeaAdminDashboardDataModel {
  customersCount: string;
  currentDailyUsage: number;
  currentMonthlyUsage: Array<UsageEntry>;
  dailyUsageInCurrentMonth: Array<UsageEntry>;
  usageDistributionBySource: Array<UsageEntry>;
  usageDistributionByMonthInYear: Array<UsageEntry>;
}

export interface DeaUserDashboardDataModel {
  subUserCount: string;
  availableUsage: number;
  nextBillingDate: string;
  topFiveSubUsersByUsage: [string?, string?, string?, string?, string?];
  dailyUsage: Array<UsageEntry>;
  usageDistributionBySource: Array<UsageEntry>;
}
