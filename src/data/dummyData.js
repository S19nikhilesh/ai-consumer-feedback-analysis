export const datasets = [
  {
    id: "august-2026",
    fileName: "August_Feedback.csv",
    uploadedAt: "August 19, 2026",
    totalReviews: 20,

    sentiment: {
      positive: 12,
      negative: 5,
      neutral: 3,
    },

    categories: [
      {
        name: "Transaction Failure",
        positive: 2,
        neutral: 1,
        negative: 7,
      },
      {
        name: "Customer Support",
        positive: 3,
        neutral: 0,
        negative: 3,
      },
      {
        name: "Login Issues",
        positive: 1,
        neutral: 1,
        negative: 2,
      },
      {
        name: "App Performance",
        positive: 4,
        neutral: 1,
        negative: 0,
      },
      {
        name: "Refund Issues",
        positive: 1,
        neutral: 0,
        negative: 2,
      },
      {
        name: "Authentication",
        positive: 1,
        neutral: 0,
        negative: 1,
      },
    ],

    insights: [
      "Most negative feedback is related to transaction failures.",
      "Users generally appreciate the application's interface and usability.",
      "Customer support response time is a recurring concern.",
      "Improving transaction reliability could significantly improve customer satisfaction.",
    ],

    reviews: [
      {
        id: 1,
        text: "Payment failed but money was deducted from my account.",
        sentiment: "Negative",
        category: "Transaction Failure",
      },
      {
        id: 2,
        text: "The app is very easy to use and navigation is smooth.",
        sentiment: "Positive",
        category: "UI/UX",
      },
      {
        id: 3,
        text: "Customer support took three days to respond.",
        sentiment: "Negative",
        category: "Customer Support",
      },
      {
        id: 4,
        text: "I cannot login after updating the application.",
        sentiment: "Negative",
        category: "Login Issues",
      },
      {
        id: 5,
        text: "The transaction was completed instantly and worked perfectly.",
        sentiment: "Positive",
        category: "Transaction",
      },
      {
        id: 6,
        text: "The app crashes whenever I try to open my statements.",
        sentiment: "Negative",
        category: "App Performance",
      },
      {
        id: 7,
        text: "Very poor customer service experience.",
        sentiment: "Negative",
        category: "Customer Support",
      },
      {
        id: 8,
        text: "The new interface looks clean and professional.",
        sentiment: "Positive",
        category: "UI/UX",
      },
      {
        id: 9,
        text: "My refund has not been credited yet.",
        sentiment: "Negative",
        category: "Refund Issues",
      },
      {
        id: 10,
        text: "OTP verification keeps failing.",
        sentiment: "Negative",
        category: "Authentication",
      },
      {
        id: 11,
        text: "The mobile app is fast and reliable.",
        sentiment: "Positive",
        category: "App Performance",
      },
      {
        id: 12,
        text: "I was charged twice for the same transaction.",
        sentiment: "Negative",
        category: "Transaction Failure",
      },
      {
        id: 13,
        text: "The support team resolved my issue quickly.",
        sentiment: "Positive",
        category: "Customer Support",
      },
      {
        id: 14,
        text: "The application takes too long to load.",
        sentiment: "Negative",
        category: "App Performance",
      },
      {
        id: 15,
        text: "I am unable to reset my password.",
        sentiment: "Negative",
        category: "Login Issues",
      },
      {
        id: 16,
        text: "The payment experience was excellent.",
        sentiment: "Positive",
        category: "Transaction",
      },
      {
        id: 17,
        text: "The account statement contains incorrect information.",
        sentiment: "Neutral",
        category: "Account Information",
      },
      {
        id: 18,
        text: "Security verification is unnecessarily complicated.",
        sentiment: "Neutral",
        category: "Authentication",
      },
      {
        id: 19,
        text: "The app stopped working after the latest update.",
        sentiment: "Negative",
        category: "App Performance",
      },
      {
        id: 20,
        text: "Overall I am satisfied with the service.",
        sentiment: "Positive",
        category: "Overall Experience",
      },
    ],
  },
];