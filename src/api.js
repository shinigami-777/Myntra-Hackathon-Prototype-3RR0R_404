export const generateQuiz = async (quizData) => {
  const response = await fetch("http://localhost:5000/api/generate_quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quizData),
  });

  if (!response.ok) {
    throw new Error("Failed to generate quiz");
  }

  const data = await response.json();
  return data;
};

export const fetchFashionTrends = async (keyword, generateSuggestions) => {
  try {
    const response = await fetch("http://localhost:5000/api/fashion_trends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword,
        generate_suggestions: generateSuggestions,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch fashion trends");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fashion trends:", error);
    throw error;
  }
};
