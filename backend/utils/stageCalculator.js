function calculateStage(answers, questions) {
  const stageScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

  answers.forEach(({ questionId, answer }) => {
    const question = questions.find(q => q.id === questionId)
    if (!question) return

    // Position within the group = which stage this question scores for
    // Group 1: ids 1-5, Group 2: ids 6-10, etc.
    // Position = ((id - 1) % 5) + 1
    const position = ((question.id - 1) % 5) + 1
    stageScores[position] += answer
  })

  // Highest scoring stage wins. Tiebreak = earlier stage (conservative)
  let assignedStage = 1, highScore = 0
  for (let stage = 1; stage <= 5; stage++) {
    if (stageScores[stage] > highScore) {
      highScore = stageScores[stage]
      assignedStage = stage
    }
  }

  return { assignedStage, stageScores }
}

module.exports = { calculateStage }