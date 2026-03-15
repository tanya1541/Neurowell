// data/psychoedConfig.js
//
// Metadata for all 28 psychoed articles.
// id must match psychoedContent.js exactly.
// hasReflection: true  → controller prompts for reflection after article
//                         and saves a ToolEntry (psychoed_<id>) on response
// reflectionPrompt     → the question shown after reading
// minStage             → matches stageLocked in chatTree.js (1 = always available)

const psychoedConfig = [
  // ── Stage 1 ────────────────────────────────────────────────────────────────
  { id: 'coping_with_stress',   minStage: 1, hasReflection: true,  reflectionPrompt: "what resonates most with you from that?" },
  { id: 'panic_attacks',        minStage: 1, hasReflection: true,  reflectionPrompt: "did anything in that change how you think about panic?" },
  { id: 'anxiety',              minStage: 1, hasReflection: true,  reflectionPrompt: "what part of this felt most relevant to you?" },
  { id: 'self_harm',            minStage: 1, hasReflection: false, reflectionPrompt: null },
  { id: 'suicide',              minStage: 1, hasReflection: false, reflectionPrompt: null },
  { id: 'stigma',               minStage: 1, hasReflection: true,  reflectionPrompt: "has stigma — from others or yourself — affected how you've dealt with things?" },
  { id: 'lifestyle_basics',     minStage: 1, hasReflection: true,  reflectionPrompt: "which of these feels most relevant to where you are right now?" },

  // ── Stage 2 ────────────────────────────────────────────────────────────────
  { id: 'low_mood',             minStage: 2, hasReflection: true,  reflectionPrompt: "does the distinction between low mood and depression feel relevant to you?" },
  { id: 'depression',           minStage: 2, hasReflection: true,  reflectionPrompt: "what part of this felt most like your experience?" },
  { id: 'worry',                minStage: 2, hasReflection: true,  reflectionPrompt: "is your worry more practical or hypothetical, do you think?" },
  { id: 'intrusive_thoughts',   minStage: 2, hasReflection: true,  reflectionPrompt: "how does it feel to know intrusive thoughts are almost universal?" },
  { id: 'nats',                 minStage: 2, hasReflection: true,  reflectionPrompt: "can you think of a recent automatic thought you had?" },
  { id: 'cognitive_distortions',minStage: 2, hasReflection: true,  reflectionPrompt: "which thinking trap do you recognise most in yourself?" },
  { id: 'regulating_emotions',  minStage: 2, hasReflection: true,  reflectionPrompt: "which regulation strategy do you currently use most — helpful or unhelpful?" },
  { id: 'low_self_esteem',      minStage: 2, hasReflection: true,  reflectionPrompt: "where do you think your self-critical belief came from?" },
  { id: 'abc_model',            minStage: 2, hasReflection: true,  reflectionPrompt: "can you think of a recent situation and what your B was?" },

  // ── Stage 3 ────────────────────────────────────────────────────────────────
  { id: 'avoidance',                  minStage: 3, hasReflection: true,  reflectionPrompt: "what are you currently avoiding that this article brought to mind?" },
  { id: 'behavioural_activation',     minStage: 3, hasReflection: true,  reflectionPrompt: "what activity have you stopped doing since feeling low that you could restart?" },
  { id: 'cognitive_restructuring',    minStage: 3, hasReflection: true,  reflectionPrompt: "what's a thought you have that you could test the evidence on?" },
  { id: 'coping_with_stress_advanced',minStage: 3, hasReflection: true,  reflectionPrompt: "do you tend toward rumination or reflection when things get hard?" },
  { id: 'assertiveness',              minStage: 3, hasReflection: true,  reflectionPrompt: "which style — passive, aggressive, assertive — do you default to?" },
  { id: 'conflict',                   minStage: 3, hasReflection: true,  reflectionPrompt: "which of Gottman's four patterns do you recognise most?" },

  // ── Stage 4 ────────────────────────────────────────────────────────────────
  { id: 'panic_disorder',          minStage: 4, hasReflection: true,  reflectionPrompt: "does the panic cycle description match your experience?" },
  { id: 'anxiety_disorders',       minStage: 4, hasReflection: true,  reflectionPrompt: "which anxiety disorder description felt most relevant to you?" },
  { id: 'relapse_prevention_intro',minStage: 4, hasReflection: true,  reflectionPrompt: "what are your earliest warning signs when things start to slip?" },

  // ── Stage 5 ────────────────────────────────────────────────────────────────
  { id: 'finding_a_therapist',     minStage: 5, hasReflection: true,  reflectionPrompt: "is therapy something you've considered or tried?" },
  { id: 'relapse_prevention_full', minStage: 5, hasReflection: true,  reflectionPrompt: "what would your level 1 early warning signs be?" },
  { id: 'lifestyle_optimisation',  minStage: 5, hasReflection: true,  reflectionPrompt: "which area — sleep, exercise, nutrition, connection — needs the most attention right now?" },
]

module.exports = psychoedConfig