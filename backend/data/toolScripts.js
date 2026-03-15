// data/toolScripts.js

const toolScripts = {

  checklist: [
    { botMessage: "before we go through the list — these might seem like small things, but when we're struggling the basics are usually the first to go. this isn't about being perfect, just noticing where you're at.", field: null, inputType: 'choice', options: ['okay, lets go'] },
    { botMessage: "did you drink enough water today?", field: 'water', inputType: 'choice', options: ['Yes ✓', 'Not yet'] },
    { botMessage: "have you eaten something today?", field: 'food', inputType: 'choice', options: ['Yes ✓', 'Not yet'] },
    { botMessage: "did you get some sleep or rest last night?", field: 'sleep', inputType: 'choice', options: ['Yes ✓', 'Not great', 'Barely any'] },
    { botMessage: "have you showered or washed today?", field: 'shower', inputType: 'choice', options: ['Yes ✓', 'Not yet'] },
    { botMessage: "brushed your teeth?", field: 'teeth', inputType: 'choice', options: ['Yes ✓', 'Not yet'] },
    { botMessage: "have you moved your body at all today — even just walking to another room?", field: 'movement', inputType: 'choice', options: ['Yes ✓', 'Not yet'] },
    { botMessage: "did you go outside or get some natural light today?", field: 'outside', inputType: 'choice', options: ['Yes ✓', 'Not yet'] },
    { botMessage: "have you spoken to anyone today — even a quick text counts?", field: 'social', inputType: 'choice', options: ['Yes ✓', 'Not yet'] },
    { botMessage: "did you do anything today just for you — gaming, reading, music, anything you enjoy?", field: 'enjoyment', inputType: 'choice', options: ['Yes ✓', 'Not yet'] },
    { botMessage: "did you plan or do any activity today — something creative, a hobby, anything you were looking forward to?", field: 'activity', inputType: 'choice', options: ['Yes ✓', 'Not yet'] },
  ],

  breathing: [
    { botMessage: "belly breathing activates your nervous system's calm response. it takes about 3 minutes. get comfortable — sit or lie down. place one hand on your chest and one just below your ribs.", field: null, inputType: 'choice', options: ["okay, i'm set up"] },
    { botMessage: "breathe in slowly through your nose for 4 counts. feel your stomach push your hand out. your chest should stay still. take that breath now.", field: null, inputType: 'choice', options: ['done'] },
    { botMessage: "now hold for 2 counts.", field: null, inputType: 'choice', options: ['done'] },
    { botMessage: "now breathe out slowly through your mouth for 6 counts. let your stomach fall.", field: null, inputType: 'choice', options: ['done'] },
    { botMessage: "good. keep repeating — in for 4, hold for 2, out for 6. come back when you feel ready to stop.", field: null, inputType: 'choice', options: ['done'] },
    { botMessage: "how many cycles did you do roughly?", field: 'cyclesCompleted', inputType: 'choice', options: ['1-2', '3-5', '6-10'] },
    { botMessage: "how do you feel compared to when we started?", field: 'moodAfter', inputType: 'choice', options: ['Calmer', 'A bit better', 'About the same', 'Actually worse'] },
  ],

  grounding: [
    { botMessage: "grounding brings you back to the present moment. it takes about 2 minutes. wherever you are is fine — take one slow breath in and out before we start.", field: null, inputType: 'choice', options: ['done'] },
    { botMessage: "look around you. name 5 things you can SEE right now.", field: 'see', inputType: 'multiline' },
    { botMessage: "now 4 things you can physically FEEL or TOUCH right now — the chair under you, your feet on the floor, temperature of the air.", field: 'touch', inputType: 'multiline' },
    { botMessage: "now 3 things you can HEAR. go quiet for a moment and really listen.", field: 'hear', inputType: 'multiline' },
    { botMessage: "now 2 things you can SMELL. if you cannot smell anything, name 2 smells you like instead.", field: 'smell', inputType: 'multiline' },
    { botMessage: "finally — 1 thing you can TASTE right now. or if you cannot, one thing you are grateful for in this moment.", field: 'taste', inputType: 'multiline' },
    { botMessage: "okay — you are back. how do you feel compared to when we started?", field: 'moodAfter', inputType: 'choice', options: ['Much calmer', 'A bit calmer', 'About the same', 'Still struggling'] },
  ],

  abc: [
    { botMessage: "the ABC model helps you understand the link between what happened, what you believed about it, and how you felt and behaved as a result. A = activating event, B = belief, C = consequence. lets work through it.", field: null, inputType: 'choice', options: ["okay, i'm ready"] },
    { botMessage: "A — what actually happened? just the facts — who was there, what was said, where were you? no interpretation yet.", field: 'activatingEvent', inputType: 'multiline' },
    { botMessage: "B — what was your first automatic thought about what happened? what did you tell yourself it meant?", field: 'inference', inputType: 'multiline' },
    { botMessage: "what did that thought mean about you, others, or the world? dig a bit deeper. (e.g. 'i am not good enough', 'people cannot be trusted')", field: 'evaluation', inputType: 'multiline' },
    { botMessage: "C — what emotion did that belief cause? name it in one word and rate the intensity 0 to 100. (e.g. anxious 80, ashamed 90)", field: 'emotional', inputType: 'multiline' },
    { botMessage: "and what did you do — or want to do — as a result of that feeling?", field: 'behavioural', inputType: 'multiline' },
  ],

  strengths: [
    { botMessage: "when we are struggling, our brain filters out the good and amplifies the bad. this tool is about deliberately looking at what is actually there. no right or wrong answers.", field: null, inputType: 'choice', options: ['okay, lets go'] },
    { botMessage: "what are some things you are genuinely good at? skills, qualities, things people come to you for.", field: 'goodAt', inputType: 'multiline' },
    { botMessage: "what is a difficult thing you have been through that you got through?", field: 'challenges', inputType: 'multiline' },
    { botMessage: "what is a compliment someone gave you that stayed with you?", field: 'compliments', inputType: 'multiline' },
    { botMessage: "how have you made a difference to someone else — even in a small way?", field: 'helpedOthers', inputType: 'multiline' },
    { botMessage: "what makes you different from most people you know?", field: 'unique', inputType: 'multiline' },
    { botMessage: "what do you care most about in life? what do you stand for?", field: 'values', inputType: 'multiline' },
    { botMessage: "when have you made someone genuinely happy or made their day better?", field: 'madeHappy', inputType: 'multiline' },
    { botMessage: "what do you like about how you look? even one thing.", field: 'appearance', inputType: 'multiline' },
  ],

  cognitiveRestructuring: [
    { botMessage: "cognitive restructuring helps you examine a negative thought properly and find a more accurate version of it. 3 steps — catch the thought, look for evidence, find a balanced alternative.", field: null, inputType: 'choice', options: ["okay, i'm ready"] },
    { botMessage: "step 1 — what was the situation? who were you with, where, what was happening? just the facts.", field: 'situation', inputType: 'multiline' },
    { botMessage: "what emotion did you feel? one word and rate it 0 to 100. (e.g. ashamed 80)", field: 'emotion', inputType: 'multiline' },
    { botMessage: "write ALL the thoughts going through your mind. for each one, rate how much you believed it 0 to 100. (e.g. i am no good 60%, there is no point trying 90%)", field: 'allThoughts', inputType: 'multiline' },
    { botMessage: "which is your hot thought — the one causing the most distress, usually rated 60% or above?", field: 'hotThought', inputType: 'multiline' },
    { botMessage: "step 2 — what evidence SUPPORTS the hot thought? facts only — not feelings or opinions.", field: 'evidenceFor', inputType: 'multiline' },
    { botMessage: "what evidence goes AGAINST the hot thought? what are you leaving out or discounting?", field: 'evidenceAgainst', inputType: 'multiline' },
    { botMessage: "step 3 — write a balanced alternative thought using both sides. link them with and, or, or but. (e.g. i failed this interview BUT i have got jobs before)", field: 'balancedThought', inputType: 'multiline' },
    { botMessage: "how much do you believe that balanced thought? rate it 0 to 100.", field: 'balancedThoughtBelief', inputType: 'scale' },
    { botMessage: "go back to the emotion you rated at the start. how intense does it feel now? rate it 0 to 100.", field: 'emotionAfter', inputType: 'scale' },
    { botMessage: "finally — does any of these patterns sound familiar for your hot thought?", field: 'distortion', inputType: 'choice', options: ['All or nothing thinking', 'Catastrophising', 'Mind reading', 'Emotional reasoning', 'Personalising', 'Disqualifying the positive', 'Jumping to conclusions', 'None of these'] },
  ],

  // toolId saved to ToolEntry is always 'worry'
  // controller determines which script to run based on
  // chat tree bridge answer and saves type: 'practical' | 'hypothetical'

  worryPractical: [
    { botMessage: "write down the worry that has been on your mind.", field: 'worry', inputType: 'multiline' },
    { botMessage: "how anxious does this worry make you feel right now? rate it 0 to 10.", field: 'ratingBefore', inputType: 'scale' },
    { botMessage: "what is one small concrete step you can take today? not solve everything — just one step.", field: 'action', inputType: 'multiline' },
    { botMessage: "when exactly will you do it? give it a specific time.", field: 'when', inputType: 'multiline' },
    { botMessage: "how anxious does the worry feel now? rate it 0 to 10.", field: 'ratingAfter', inputType: 'scale' },
  ],

  worryHypothetical: [
    { botMessage: "write down the worry that has been on your mind.", field: 'worry', inputType: 'multiline' },
    { botMessage: "how anxious does this worry make you feel right now? rate it 0 to 10.", field: 'ratingBefore', inputType: 'scale' },
    { botMessage: "write this worry in your worry diary — note the date, time, and that it is a hypothetical what-if you cannot control right now.", field: 'diaryEntry', inputType: 'multiline' },
    { botMessage: "what are you going to refocus on after this? pick something specific.", field: 'refocusActivity', inputType: 'multiline' },
    { botMessage: "how anxious does the worry feel now? rate it 0 to 10.", field: 'ratingAfter', inputType: 'scale' },
  ],

  problemSolving: [
    { botMessage: "problem solving works best when you map it out on paper — not in your head. 6 steps: identify the problem, all possible solutions, pros and cons, select a solution, plan, do it. step 7 is reviewing — you can do that from your tools library after.", field: null, inputType: 'choice', options: ['okay, lets go'] },
    { botMessage: "step 1 — what is the problem? define it as clearly and specifically as you can. one problem at a time.", field: 'problem', inputType: 'multiline' },
    { botMessage: "step 2 — brainstorm every possible solution. do not filter yet — include obvious, unlikely, even ridiculous ones.", field: 'solutions', inputType: 'multiline' },
    { botMessage: "step 3 — for each solution write the pros and cons. be honest on both sides.", field: 'prosAndCons', inputType: 'multiline' },
    { botMessage: "step 4 — which solution are you going to go with? rank them — first choice, backup, last resort.", field: 'selectedSolution', inputType: 'multiline' },
    { botMessage: "step 5 — write the specific steps you will take to put your solution into action. what, when, where, who.", field: 'plan', inputType: 'multiline' },
    { botMessage: "step 6 — when exactly are you going to do it? note the specific date, time and place.", field: 'doIt', inputType: 'multiline' },
  ],

  behaviouralActivation: [
    { botMessage: "when we are low, activity is the first thing to go — and that maintains the low mood. behavioural activation breaks that cycle by planning a structured mix of activities and following the plan, not the mood. today we will do steps 1 to 3. come back to this entry to review after the week.", field: null, inputType: 'choice', options: ['okay, lets go'] },
    { botMessage: "step 1 — routine activities. things you do regularly or every day — hygiene, cooking, cleaning, getting dressed. list the ones you want to make sure you are doing, including ones you may have stopped.", field: 'routine', inputType: 'multiline' },
    { botMessage: "now pleasurable activities — things you enjoy or used to enjoy. hobbies, seeing people, anything that gives you enjoyment. include things you have stopped doing since feeling low.", field: 'pleasurable', inputType: 'multiline' },
    { botMessage: "now necessary activities — time-limited tasks that need doing. bills, appointments, forms, anything you have been putting off.", field: 'necessary', inputType: 'multiline' },
    { botMessage: "step 2 — sort everything into easy, medium and difficult. make sure you have a mix of routine, necessary and pleasurable across each level.", field: 'hierarchy', inputType: 'multiline' },
    { botMessage: "step 3 — schedule your activities into the week. for each one write what, when (day + time), where, and who with if relevant. start with easy activities first.", field: 'schedule', inputType: 'multiline' },
  ],

  exposure: [
    { botMessage: "avoidance reduces anxiety fast in the short term — but keeps the fear alive long term. graded exposure helps you face the feared situation gradually, starting with the least scary version and working up. today we will build your ladder. after each exposure exercise, come back to this entry and tap diary to record how it went.", field: null, inputType: 'choice', options: ["okay, i'm ready"] },
    { botMessage: "what is the situation, object or experience you have been avoiding?", field: 'target', inputType: 'multiline' },
    { botMessage: "how anxious does the thought of facing it make you feel right now? rate it 0 to 100.", field: 'targetRating', inputType: 'scale' },
    { botMessage: "now build your ladder — list versions of this situation from least scary to most scary. rate each one 0 to 100. aim for 5 to 7 steps.\n\nexample:\n1. imagine going shopping alone (40%)\n2. go to corner shop with a friend (55%)\n3. go to corner shop alone (65%)", field: 'ladder', inputType: 'multiline' },
    { botMessage: "which step are you going to start with? it should feel uncomfortable but not overwhelming — around 40 to 60.", field: 'firstStep', inputType: 'multiline' },
    { botMessage: "when will you do this first step? set a specific time and day. remember — repeat it 4 to 5 times this week if possible.", field: 'plan', inputType: 'multiline' },
    { botMessage: "before you go — 4 rules that make exposure work:\n\n1. GRADED — start with your easiest step. do not move up until anxiety before the exercise has reduced.\n2. PROLONGED — stay in the situation until anxiety reduces by at least half. leaving early keeps the fear alive.\n3. REPEATED — do each step 4 to 5 times a week.\n4. WITHOUT DISTRACTION — no phone, no music, no safety behaviours. feel the anxiety rise and fall naturally. that is how your brain learns it can cope.", field: null, inputType: 'choice', options: ['okay, i understand'] },
  ],

  // triggered from tools library past entry
  // updates original ToolEntry via $push: { 'data.diary': diaryEntry }
  exposureDiary: [
    { botMessage: "which step on your ladder did you do today?", field: 'step', inputType: 'multiline' },
    { botMessage: "what was your anxiety just before you started? rate it 0 to 100.", field: 'anxietyBefore', inputType: 'scale' },
    { botMessage: "what was your highest anxiety during the exercise? rate it 0 to 100.", field: 'anxietyDuring', inputType: 'scale' },
    { botMessage: "what was your anxiety by the end — after staying in the situation? rate it 0 to 100.", field: 'anxietyAfter', inputType: 'scale' },
    { botMessage: "any thoughts or notes — what came up, what surprised you, what you learned?", field: 'thoughts', inputType: 'multiline' },
  ],

  smartGoals: [
    { botMessage: "goals give self-help direction. without one it is hard to know what you are working toward. this tool helps you set a SMART goal — Specific, Measurable, Achievable, Relevant, Time Limited. we will also look at what might get in the way.", field: null, inputType: 'choice', options: ['okay, lets go'] },
    { botMessage: "what situations or patterns are you unhappy with right now? what keeps causing you difficulty?", field: 'triggers', inputType: 'multiline' },
    { botMessage: "what do you want to achieve? write your goal as clearly as you can — do not worry about making it SMART yet.", field: 'goal', inputType: 'multiline' },
    { botMessage: "S — make it specific. what exactly will you do? who, where, how often?", field: 'specific', inputType: 'multiline' },
    { botMessage: "M — make it measurable. how will you know when you have achieved it?", field: 'measurable', inputType: 'multiline' },
    { botMessage: "A — is this achievable for where you are right now?", field: 'achievable', inputType: 'choice', options: ["Yes — it's realistic", 'It might be too much right now'] },
    { botMessage: "R — why does this goal matter to you? how does it connect to your recovery?", field: 'relevant', inputType: 'multiline' },
    { botMessage: "T — when will you achieve this by? set a specific deadline.", field: 'timeLimited', inputType: 'multiline' },
    { botMessage: "what could get in the way of achieving this goal?", field: 'problems', inputType: 'multiline' },
    { botMessage: "for each obstacle — what will you do if it comes up?", field: 'solutions', inputType: 'multiline' },
  ],

  behaviouralActivationReview: [
  { botMessage: "how did the week go? did you manage to follow the schedule?", field: 'scheduleReview', inputType: 'choice', options: ['yes — mostly', 'some of it', 'not really'] },
  { botMessage: "which activities did you actually do?", field: 'activitiesDone', inputType: 'multiline' },
  { botMessage: "what got in the way of the ones you didn't do?", field: 'barriers', inputType: 'multiline' },
  { botMessage: "how has your mood been compared to before you made the plan?", field: 'moodChange', inputType: 'choice', options: ['better', 'about the same', 'worse'] },
  { botMessage: "what will you keep, change, or add to the plan for next week?", field: 'nextWeek', inputType: 'multiline' },
],

problemSolvingReview: [
  { botMessage: "did you carry out the plan?", field: 'planCarriedOut', inputType: 'choice', options: ['yes', 'partly', 'not yet'] },
  { botMessage: "how did it go? did the solution work?", field: 'outcome', inputType: 'multiline' },
  { botMessage: "what got in the way, if anything?", field: 'barriers', inputType: 'multiline' },
  { botMessage: "do you need to go back to your list of solutions and try a different one?", field: 'tryAnother', inputType: 'choice', options: ['no — this worked', 'yes — going to try another', 'still thinking'] },
],

}

const reflectionOpeners = {
  checklist:              "how are you feeling after checking in on yourself?",
  breathing:              "did the breathing help at all?",
  grounding:              "how do you feel now compared to before?",
  abc:                    "does the situation feel any different now that it is broken down?",
  strengths:              "how does it feel to see all of that written down?",
  cognitiveRestructuring: "how does that balanced thought compare to the original one?",
  worryPractical:         "does the worry feel a bit more contained now?",
  worryHypothetical:      "does having it written down and contained make it feel any different?",
  problemSolving:         "feeling any clearer on the problem?",
  behaviouralActivation:  "how are you feeling about the plan?",
  exposure:               "how are you feeling about starting the ladder?",
  exposureDiary:          "how did that go compared to what you expected?",
  smartGoals:             "how does having that goal structured feel?",
  behaviouralActivationReview: "how does it feel to have reviewed the week?",
  problemSolvingReview:         "clearer on where things stand now?",
}

module.exports = { toolScripts, reflectionOpeners }