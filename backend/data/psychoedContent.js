// data/psychoedContent.js
//
// ─────────────────────────────────────────────────────────────────────────────
// PSYCHOEDUCATION ARTICLE CONTENT
// ─────────────────────────────────────────────────────────────────────────────
//
// Each article has:
//   id          — matches psychoedConfig.js
//   title       — display title
//   readTime    — estimated read time string
//   safeMessaging — true for self-harm / suicide articles
//   sections    — array of { heading, body } objects
//                 body is plain text; frontend handles rendering
//                 Use \n\n for paragraph breaks within body
//
// Safe messaging articles follow Samaritans/PAPYRUS media guidelines:
//   - No methods described
//   - No statistics that could normalise
//   - Hopeful, recovery-focused framing
//   - Always signpost professional support
// ─────────────────────────────────────────────────────────────────────────────

const psychoedContent = [


  // ═══════════════════════════════════════════════════════════════════════════
  // STAGE 1
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'coping_with_stress',
    title: 'Coping with Stress',
    readTime: '5 min',
    sections: [
      {
        heading: 'What is stress?',
        body: `Stress is your body's response to pressure — any situation that feels threatening, overwhelming, or beyond your ability to cope. It's not a weakness or a character flaw. It's a built-in alarm system that every human being has, and in the right doses, it's actually useful.\n\nThe problem comes when stress becomes chronic — when the alarm never switches off. When that happens, the physical and emotional cost starts to add up.`,
      },
      {
        heading: 'What stress does to your body',
        body: `When you perceive a threat — whether it's a deadline, an argument, or financial pressure — your brain triggers the fight-or-flight response. Stress hormones like cortisol and adrenaline flood your system. Your heart beats faster. Your muscles tense. Your digestion slows. Your thinking narrows.\n\nThis is brilliant if you need to run from danger. It's exhausting if it's triggered by your inbox every morning.\n\nOver time, chronic stress can affect your sleep, your immune system, your concentration, your mood, and your relationships. It's not "just in your head" — it's a full-body experience.`,
      },
      {
        heading: 'Common sources of stress',
        body: `Stress can come from anywhere: work demands, relationship difficulties, financial worries, health concerns, major life changes, or simply having too much to do and too little time. Sometimes there's no single big thing — it's the accumulation of small pressures that tips you over.\n\nIt's also worth knowing that positive life events — a new job, a new baby, moving house — can be just as stressful as negative ones, because they still require adaptation.`,
      },
      {
        heading: 'Problem-focused vs emotion-focused coping',
        body: `There are two broad approaches to managing stress, and knowing which one to use matters.\n\nProblem-focused coping works when the stressor is something you can actually change. You break the problem down, make a plan, take action. It reduces stress by tackling the source.\n\nEmotion-focused coping works when the stressor is outside your control — you can't fix it, so you manage how you feel about it. This includes things like talking to someone, exercising, journalling, or practising relaxation.\n\nThe trap many people fall into is using emotion-focused coping on solvable problems (avoidance, distraction) or trying to problem-solve situations that can't be changed (ruminating on things that are done and can't be undone). Learning to tell the difference is one of the most useful mental health skills there is.`,
      },
      {
        heading: 'What actually helps',
        body: `Research consistently points to a few things that make a genuine difference to stress levels:\n\nMovement — even a 20-minute walk reduces cortisol and improves mood. You don't need to run a marathon.\n\nSleep — chronic stress disrupts sleep, and poor sleep makes stress worse. Protecting your sleep routine is one of the highest-leverage things you can do.\n\nConnection — talking to someone you trust genuinely reduces physiological stress. We're wired for social regulation.\n\nBreathing — slow, diaphragmatic breathing directly activates the parasympathetic nervous system — the "rest and digest" counterpart to fight-or-flight. This is why the breathing tool in STORI works.\n\nReducing stimulants — caffeine amplifies the stress response. If you're already on edge, cutting back can make a noticeable difference.\n\nSaying no — chronic stress is often a workload problem. Boundaries aren't selfish; they're sustainable.`,
      },
      {
        heading: 'When stress becomes something more',
        body: `Stress that doesn't ease when the pressure reduces, or that feels overwhelming even without an obvious cause, may have tipped into anxiety or depression. Both are very treatable — but they benefit from different approaches than general stress management.\n\nIf you feel like things aren't improving despite your efforts, that's important information. It's worth speaking to your GP or a mental health professional.`,
      },
    ],
  },

  {
    id: 'panic_attacks',
    title: 'Understanding Panic Attacks',
    readTime: '6 min',
    sections: [
      {
        heading: 'What is a panic attack?',
        body: `A panic attack is a sudden surge of intense fear or discomfort that peaks within minutes. It's not dangerous — but it's one of the most frightening experiences a person can have, precisely because the physical symptoms are so convincing.\n\nPanic attacks are extremely common. Many people have one at some point in their life, often without understanding what's happening.`,
      },
      {
        heading: 'What happens in your body',
        body: `A panic attack is your fight-or-flight system firing at full power — usually without an external threat to justify it.\n\nYour heart pounds or races. You might feel chest tightness, shortness of breath, dizziness, tingling in your hands or face, nausea, sweating, or a sense of unreality — like you're watching yourself from outside, or the world doesn't feel real. Some people feel like they're dying. Some feel like they're going mad.\n\nNone of these things are dangerous. They are uncomfortable, alarming symptoms of a nervous system in overdrive — not signs of a heart attack, not signs of losing your mind.`,
      },
      {
        heading: 'Why panic attacks feel so convincing',
        body: `The cruel irony of panic is that fear of the symptoms makes them worse. Your brain detects a racing heart and interprets it as danger — which escalates the panic response — which makes your heart race more. This is the panic spiral.\n\nMany people who experience panic attacks become afraid of the attacks themselves. They start monitoring their body for signs of the next one, avoiding situations where one might occur. This vigilance and avoidance can, over time, make panic attacks more frequent — not less.`,
      },
      {
        heading: 'The most important thing to know',
        body: `A panic attack always passes. Always.\n\nThe physical response cannot sustain itself indefinitely. Adrenaline is metabolised. The nervous system resets. No matter how terrifying it feels in the moment, you will not die from a panic attack, you will not lose control, and it will end.\n\nThis knowledge doesn't make panic pleasant — but it can take the edge off the fear of the fear. And that matters.`,
      },
      {
        heading: 'What to do during a panic attack',
        body: `The goal isn't to stop the panic — fighting it usually amplifies it. The goal is to ride it out while doing things that slow the physiological response.\n\nBreathing is the most powerful tool. Slow your exhale down — longer out than in. Try breathing in for 4 counts, holding for 1, and out for 6. This activates the parasympathetic nervous system directly.\n\nGround yourself. Name 5 things you can see. Feel the ground under your feet. Hold something cold or textured. Bringing attention to sensory experience pulls you back into the present and out of the fear spiral.\n\nRemind yourself what's happening. "This is a panic attack. It is not dangerous. It will pass." This sounds simple, but naming the experience accurately helps the prefrontal cortex come back online and reduces the catastrophic interpretation that fuels panic.`,
      },
      {
        heading: 'Panic attacks vs panic disorder',
        body: `Having one or a few panic attacks doesn't mean you have panic disorder. Panic disorder is when panic attacks become frequent and you develop significant fear of future attacks, changing your behaviour to try to prevent them.\n\nPanic disorder is very treatable — typically with a form of CBT that involves gradually confronting the feared sensations rather than avoiding them. If you think this applies to you, it's worth speaking to your GP.`,
      },
    ],
  },

  {
    id: 'anxiety',
    title: 'Understanding Anxiety',
    readTime: '6 min',
    sections: [
      {
        heading: 'What anxiety actually is',
        body: `Anxiety is not a weakness. It's not a personality flaw. It's a survival system — and in the right context, it's one of the most valuable things your brain does.\n\nAt its core, anxiety is your brain's threat-detection system. It scans for danger, anticipates problems, and prepares your body to respond. Without it, you wouldn't look both ways before crossing the road.\n\nThe problem arises when the threat-detection system becomes oversensitive — when it fires in response to situations that aren't actually dangerous, or stays activated long after the danger has passed.`,
      },
      {
        heading: 'The anxiety cycle',
        body: `Anxiety follows a predictable pattern:\n\nA trigger — real or imagined — activates the threat system. Your body responds: heart rate increases, muscles tense, breathing shallows, attention narrows to the perceived danger. You feel the urge to do something — escape, avoid, check, seek reassurance.\n\nIf you act on that urge (avoid the situation, check five more times, get reassurance from someone), the anxiety reduces in the short term. This is the trap. That short-term relief teaches your brain that avoidance works — and makes the anxiety more likely to return next time.`,
      },
      {
        heading: 'What keeps anxiety going',
        body: `Anxiety persists because of three main mechanisms:\n\nAvoidance — when you avoid the things that make you anxious, you never get to discover that you can cope, or that the feared outcome doesn't happen. The anxiety stays intact because it's never tested.\n\nSafety behaviours — things you do to feel safer in anxiety-provoking situations (always having your phone charged in case you need help, sitting near the exit, over-preparing). Like avoidance, they prevent you from learning that you'd have been okay without them.\n\nHyperawareness — once anxious, people often focus intense attention on their body (am I okay?) or on others (how am I coming across?). This focus amplifies symptoms and creates a self-monitoring loop.`,
      },
      {
        heading: 'Types of anxiety',
        body: `Anxiety shows up in different forms:\n\nGeneralised Anxiety Disorder (GAD) — excessive, persistent worry about a wide range of everyday things, most days, for months at a time.\n\nSocial anxiety — intense fear of being judged, embarrassed, or humiliated in social situations.\n\nHealth anxiety — persistent worry about having a serious illness, despite medical reassurance.\n\nPhobias — intense fear of specific situations or things (heights, spiders, needles) that triggers strong avoidance.\n\nPanic disorder — recurrent panic attacks with significant fear of future attacks.\n\nAll of these are treatable. They often overlap, and you don't need a formal diagnosis to benefit from learning how anxiety works.`,
      },
      {
        heading: 'What helps',
        body: `The most evidence-based approach to anxiety is gradual exposure — facing feared situations rather than avoiding them, while resisting safety behaviours. This feels counterintuitive (why would you deliberately make yourself anxious?) but it's the only way to genuinely reduce anxiety long-term.\n\nCognitive approaches also help: learning to identify and challenge the catastrophic predictions that anxiety generates. "What am I predicting will happen? How likely is it really? What would I tell a friend in this situation?"\n\nLifestyle also matters: regular movement, adequate sleep, reducing caffeine, limiting alcohol (which often increases anxiety the day after), and building in regular relaxation rather than just collapsing when you hit empty.`,
      },
      {
        heading: 'The goal isn\'t no anxiety',
        body: `Anxiety is part of being human. The goal of anxiety treatment isn't to eliminate it — it's to reduce it to a level where it stops running your life. Most people who recover from significant anxiety don't become fearless; they become people who can feel anxious and do the thing anyway.\n\nThat shift — from anxiety as something to be avoided to anxiety as something to be tolerated and moved through — is at the heart of recovery.`,
      },
    ],
  },

  {
    id: 'self_harm',
    title: 'Self-Harm',
    readTime: '6 min',
    safeMessaging: true,
    sections: [
      {
        heading: 'If you\'re struggling right now',
        body: `If you're in a difficult place right now, please know that support is available.\n\n📞 Samaritans: 116 123 (free, 24/7, any reason)\nText SHOUT to 85258 (free text crisis support)\n\nYou don't have to be in immediate danger to reach out. If things feel too much, talking to someone is always the right call.`,
      },
      {
        heading: 'What self-harm is',
        body: `Self-harm means hurting yourself on purpose as a way of coping with emotional pain, overwhelming feelings, or difficult situations. It's more common than most people realise, and it affects people of all ages, genders, and backgrounds.\n\nSelf-harm is not attention-seeking. It's not manipulation. And it doesn't mean someone wants to die. For most people, it's a way of trying to cope with something that feels unbearable — a way to feel something when everything feels numb, or to release pressure when emotions feel overwhelming.`,
      },
      {
        heading: 'Why people self-harm',
        body: `People have different reasons, and they can vary from one episode to the next. Some of the most common include:\n\nTo release overwhelming emotional pain — when feelings become too intense to contain, physical pain can feel like a release valve.\n\nTo feel something — when depression brings numbness and disconnection, some people self-harm to feel real, or present.\n\nTo punish themselves — when self-blame or shame is overwhelming, self-harm can be a way of acting out internal judgment.\n\nTo feel in control — when life feels chaotic and out of control, self-harm can feel like one thing that is within your power.\n\nNone of these reasons make self-harm a good solution — but understanding why it happens is the starting point for finding something better.`,
      },
      {
        heading: 'The problem with self-harm as a coping strategy',
        body: `Self-harm often works in the very short term — that's why people do it. It can genuinely reduce emotional intensity in the moment. But it doesn't address the underlying pain. The feelings that led to it are still there when it's over.\n\nOver time, self-harm can become a habit — the first thing your brain reaches for when things get hard. The threshold for it can lower, so it takes less and less distress to trigger it. And it often brings shame, secrecy, and isolation, which tend to make the underlying pain worse.`,
      },
      {
        heading: 'What helps instead',
        body: `Finding alternatives that meet the same emotional need — without the harm — is at the heart of recovery from self-harm. This looks different for different people and often takes time to work out.\n\nFor emotional release: intense exercise, tearing paper, writing out feelings and then destroying the paper, shouting into a pillow.\n\nFor feeling present: grounding exercises (5-4-3-2-1), holding ice, going outside, focusing intensely on a sensory experience.\n\nFor calm: slow breathing, meditation, warm baths, rhythmic movement.\n\nThese aren't magic solutions — in the moment, they can feel inadequate compared to a habitual coping method. But with practice and support, it's possible to build a toolkit that genuinely helps.`,
      },
      {
        heading: 'Recovery is possible',
        body: `Many people who have self-harmed go on to stop — not by white-knuckling through it, but by gradually building better ways of coping and addressing the pain underneath.\n\nTalking to someone is an important first step. Your GP can refer you to mental health support. MIND (www.mind.org.uk) and Harmless (www.harmless.org.uk) both offer specific support for people affected by self-harm.\n\nYou don't have to figure this out alone.`,
      },
    ],
  },

  {
    id: 'suicide',
    title: 'Suicidal Thoughts',
    readTime: '5 min',
    safeMessaging: true,
    sections: [
      {
        heading: 'If you\'re having thoughts of suicide right now',
        body: `Please reach out to someone now.\n\n📞 Samaritans: 116 123 (free, 24/7)\nText HELLO to 85258\nA&E or call 999 if you are in immediate danger.\n\nYou don't need to be certain about how you feel. You don't need to have a plan. If thoughts of suicide are present, that's enough reason to talk to someone.`,
      },
      {
        heading: 'Suicidal thoughts are more common than you think',
        body: `Many people experience thoughts of suicide at some point in their lives — particularly during periods of severe depression, overwhelming stress, or unbearable pain. Having these thoughts does not mean you will act on them, and it does not mean you are broken or beyond help.\n\nSuicidal thoughts are usually a sign that someone is in more pain than they currently have the resources to cope with. That's a mental health crisis — and mental health crises can be survived and recovered from.`,
      },
      {
        heading: 'Why people have suicidal thoughts',
        body: `Suicidal thoughts often arise from a combination of pain and hopelessness — the feeling that things will not get better, that there is no other way out of the suffering. When depression, trauma, or overwhelming circumstances narrow our thinking, it can become genuinely difficult to see that the future could be different from the present.\n\nThis narrowing of perspective is a symptom of crisis — not a realistic assessment of the future. Many people who have been in that dark place, and received support, describe it as being unable to see what they can now see clearly.`,
      },
      {
        heading: 'What to do if you\'re having these thoughts',
        body: `Tell someone. A friend, a family member, your GP, or a crisis line. Saying the words out loud — "I'm having thoughts of suicide" — often reduces their intensity, and it opens the door to support.\n\nIf you can, put distance between yourself and anything you might use to hurt yourself. This is called means restriction and it's one of the most evidence-based interventions there is.\n\nTry to get through the next hour, not the next year. When things feel impossible, shrinking your timeframe can help. What can you do right now, in the next few minutes, to be a little safer?`,
      },
      {
        heading: 'If someone you know is struggling',
        body: `If you're worried about someone, ask them directly — "Are you thinking about suicide?" Research consistently shows that asking does not plant the idea or make things worse. It usually brings relief.\n\nListen without judgment. You don't need to fix it. Take them seriously. Help them connect with professional support. Stay with them if possible while they access help.\n\nYou can also contact Papyrus (for under 35s): 0800 068 41 41, or the Samaritans on 116 123.`,
      },
      {
        heading: 'Recovery is real',
        body: `With the right support, people recover from suicidal crises. Treatment for the conditions that underlie suicidal thinking — depression, PTSD, severe anxiety — is effective. Life does change. Pain does shift.\n\nIf you're struggling, please keep going. And please reach out.\n\n📞 Samaritans: 116 123 (always free, always available)`,
      },
    ],
  },

  {
    id: 'stigma',
    title: 'Mental Health Stigma',
    readTime: '5 min',
    sections: [
      {
        heading: 'What stigma is',
        body: `Stigma is a mark of disgrace associated with a particular circumstance — and mental health stigma is the set of negative attitudes, beliefs, and stereotypes that surround mental health difficulties. It exists at a societal level (in media, policy, workplaces) and at a personal level — including the stigma we direct at ourselves.\n\nStigma causes real harm. It stops people seeking help, delays diagnosis, and adds an extra layer of suffering on top of an already difficult experience.`,
      },
      {
        heading: 'Where stigma comes from',
        body: `Mental health stigma has deep historical roots. For most of history, mental illness was misunderstood — attributed to moral weakness, spiritual failing, or character deficiency. These attitudes persist in cultural narratives even as our scientific understanding has changed dramatically.\n\nMedia portrayals still often link mental illness with danger, instability, or weakness — despite the fact that people with mental health conditions are far more likely to be victims of violence than perpetrators, and that mental illness is not a predictor of unreliability or incompetence.`,
      },
      {
        heading: 'Public stigma vs self-stigma',
        body: `Public stigma is what others think. Self-stigma is what you come to think about yourself after internalising those messages.\n\nSelf-stigma often sounds like: "I should be able to handle this on my own." "What kind of person can't cope with normal life?" "People will think less of me if they know." "I'm weak for feeling this way."\n\nSelf-stigma is particularly damaging because it operates from the inside — it reduces self-esteem, undermines confidence in recovery, and makes reaching out feel shameful rather than brave.`,
      },
      {
        heading: 'Pushing back',
        body: `Challenging stigma starts with separating fact from inherited assumption.\n\nFact: Mental health difficulties are extremely common. They affect people across all demographics, professions, and life circumstances.\n\nFact: Mental illness has biological, psychological, and social causes. It is not a character failing any more than diabetes or a broken leg is.\n\nFact: Seeking help for mental health is an act of courage and self-awareness — not weakness. It takes more strength to acknowledge difficulty and ask for support than to suffer in silence.\n\nFact: Most people with mental health conditions recover, manage well, and live full lives.`,
      },
      {
        heading: 'Protecting yourself from stigma',
        body: `You don't owe anyone your mental health history. Choosing who you share with, and when, is a personal decision — and it's okay to be selective.\n\nAt the same time, secrecy feeds shame. Many people find that carefully chosen disclosure — telling one trusted person — significantly reduces the isolation that self-stigma creates.\n\nBuilding a more compassionate relationship with your own story is also work worth doing. The inner voice that criticises you for struggling is drawing on inaccurate cultural messages — not facts. Cognitive approaches can help challenge and reframe it.`,
      },
      {
        heading: 'You are not your diagnosis',
        body: `A mental health diagnosis can be useful — it opens doors to appropriate treatment and helps make sense of experiences. But it is a description of a pattern of difficulties, not a definition of who you are.\n\nYou are a whole person. Your mental health is one part of your experience — and it can change.`,
      },
    ],
  },

  {
    id: 'lifestyle_basics',
    title: 'Sleep, Food & Movement',
    readTime: '7 min',
    sections: [
      {
        heading: 'Why the basics matter so much',
        body: `There's a reason therapists and psychiatrists always ask about sleep, diet, and exercise. These aren't platitudes. They are the physiological foundation on which mental health rests — and when they're disrupted, everything else becomes harder.\n\nThis doesn't mean lifestyle changes will cure clinical depression or anxiety. But they consistently make a meaningful difference, they're within your control, and they interact powerfully with every other intervention you might use.`,
      },
      {
        heading: 'Sleep',
        body: `Sleep is probably the single most important lifestyle factor for mental health. During sleep, the brain processes emotional memories, clears metabolic waste, consolidates learning, and regulates the stress-response system.\n\nPoor sleep makes depression worse. It makes anxiety worse. It impairs emotional regulation, increases irritability, and reduces your ability to use the cognitive skills that help you cope.\n\nWhat helps:\n\nConsistency — going to bed and waking at roughly the same time, even on weekends, is more important than duration. The body clock responds to regularity.\n\nLight — get natural light in the morning (it resets your circadian rhythm) and reduce bright/blue light in the evening (screens, overhead lighting).\n\nWind-down — the brain doesn't switch off on demand. Building a 30-60 minute buffer before bed with low stimulation helps.\n\nAvoid clock-watching — if you can't sleep, lying in bed anxious about not sleeping makes things worse. If you've been awake 20+ minutes, get up and do something calm until you feel sleepy.\n\nLimit alcohol — it helps you fall asleep but disrupts sleep quality significantly, particularly in the second half of the night.`,
      },
      {
        heading: 'Food',
        body: `The gut-brain axis — the bidirectional communication between your digestive system and your brain — is increasingly understood to be central to mental health. Roughly 90% of serotonin is produced in the gut.\n\nThis doesn't mean food is medicine in a simple sense. But it does mean that what you eat affects how you feel.\n\nWhat the evidence supports:\n\nRegularity — skipping meals or eating erratically leads to blood sugar fluctuations that affect energy and mood stability.\n\nWhole foods — diets rich in vegetables, fruits, whole grains, legumes, and lean protein are consistently associated with better mental health outcomes than highly processed diets.\n\nOmega-3 fatty acids — found in oily fish, walnuts, flaxseed — have the most evidence behind them for mood support.\n\nCaffeine — a stimulant that can worsen anxiety and disrupt sleep. If you're anxious or sleeping poorly, reducing caffeine (especially after midday) is worth trying.\n\nHydration — even mild dehydration affects cognitive function and mood.`,
      },
      {
        heading: 'Movement',
        body: `Exercise is one of the most evidence-based interventions for depression and anxiety. It's not a cure — but the effect sizes are real and significant.\n\nExercise increases serotonin, dopamine, and norepinephrine — the neurotransmitters targeted by antidepressant medication. It reduces cortisol. It promotes neuroplasticity — the brain's ability to form new connections. And it has robust effects on self-esteem and perceived competence.\n\nThe good news is you don't need to do much:\n\nAerobic exercise at moderate intensity (walking briskly, cycling, swimming) for 30 minutes, three to five times a week, produces clinically significant effects on depression and anxiety.\n\nEven a 10-20 minute walk produces measurable mood benefits. If that's what's possible right now, that's enough.\n\nConsistency matters more than intensity. Something sustainable several times a week beats an ambitious programme you abandon.`,
      },
      {
        heading: 'The basics interact',
        body: `These three areas compound each other. Poor sleep increases appetite for high-sugar foods and reduces motivation to exercise. Sedentary behaviour worsens sleep quality. A poor diet undermines energy for movement.\n\nBut the reverse is also true — improvements in one area tend to support the others. A 20-minute walk improves sleep quality that night. Better sleep improves impulse control around food. Small improvements stack.\n\nYou don't need to fix everything at once. Picking one small, achievable change and building from there is a more sustainable approach than a total lifestyle overhaul.`,
      },
      {
        heading: 'When basics aren\'t enough',
        body: `If you're doing everything right and still struggling significantly, that's important information. Lifestyle optimisation supports mental health — it doesn't replace treatment for clinical conditions. Please speak to your GP if things aren't improving.`,
      },
    ],
  },


  // ═══════════════════════════════════════════════════════════════════════════
  // STAGE 2
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'low_mood',
    title: 'Understanding Low Mood',
    readTime: '5 min',
    sections: [
      {
        heading: 'Low mood vs depression',
        body: `Low mood is something everyone experiences. It's the emotional dip that follows disappointment, loss, difficult news, poor sleep, or simply a bad stretch of days. It's unpleasant, but it's a normal part of human experience — and it usually lifts on its own, especially when circumstances improve.\n\nDepression is different. It's persistent (weeks or months rather than days), more pervasive (affecting most areas of life), and less clearly linked to external circumstances. It involves a shift in how you function, not just how you feel.`,
      },
      {
        heading: 'How to tell the difference',
        body: `Low mood tends to fluctuate — you might feel better after a good conversation, a change of scene, or some good news. Depression tends to be more fixed. Even positive things may not shift it much, or the shift doesn't last.\n\nDepression also tends to involve:\n\nLoss of interest or pleasure in things you used to enjoy\nChanges in sleep (usually sleeping too much or too little)\nChanges in appetite or weight\nFatigue and low energy that doesn't respond to rest\nDifficulty concentrating or making decisions\nFeelings of worthlessness or excessive guilt\nIn more severe cases, thoughts of death or suicide\n\nIf you recognise several of these, particularly for two or more weeks, it's worth speaking to your GP.`,
      },
      {
        heading: 'What causes low mood',
        body: `Low mood rarely has a single cause. It typically arises from a combination of:\n\nLife circumstances — loss, stress, conflict, isolation, financial pressure\nBiology — genetics, hormones, physical health, medication side effects\nPsychology — how we process and make sense of what happens to us\nBehaviour — withdrawal and inactivity that create a low-mood feedback loop\n\nUnderstanding your own pattern — what tends to trigger your low periods, what tends to help — is genuinely useful information.`,
      },
      {
        heading: 'The activity trap',
        body: `One of the most consistent patterns in low mood is this: you feel low, so you do less. Doing less means fewer opportunities for pleasure, achievement, or connection. Which makes you feel lower. Which makes you do even less.\n\nThis isn't laziness — it's a feedback loop. Depression genuinely reduces energy and motivation. But the withdrawal that feels protective actually maintains the depression.\n\nThe implication is important: doing things — even when you don't feel like it, even when they don't feel enjoyable at first — is one of the most powerful things you can do for low mood.`,
      },
      {
        heading: 'What helps',
        body: `For low mood that isn't clinical depression:\n\nActivity — keeping up with things you'd normally do, even partially, and including activities that have previously brought pleasure or a sense of achievement.\n\nConnection — social withdrawal is common with low mood, and it makes things worse. Even brief, low-pressure contact with others helps.\n\nRumination management — low mood often comes with a lot of thinking about what's wrong. Techniques that interrupt rumination (exercise, mindfulness, behavioural engagement) make a real difference.\n\nFor clinical depression, psychological therapy (particularly CBT) and medication are both effective, and they're often most effective in combination. Your GP is the starting point.`,
      },
    ],
  },

  {
    id: 'depression',
    title: 'Understanding Depression',
    readTime: '6 min',
    sections: [
      {
        heading: 'What depression is',
        body: `Depression is one of the most common mental health conditions in the world — and one of the most misunderstood. It's not sadness, though sadness can be part of it. It's not weakness. It's not something you can simply "snap out of".\n\nDepression is a clinical condition involving persistent changes in mood, thinking, behaviour, and physical functioning that significantly impairs daily life. It has biological, psychological, and social components — and it is very treatable.`,
      },
      {
        heading: 'What it actually feels like',
        body: `Depression is often described as a flatness or emptiness rather than sadness — a kind of greyness that drains colour from things that used to matter. Many people with depression describe losing interest in everything, struggling to feel anything, finding that even good things feel hollow.\n\nPhysically, depression is exhausting. Getting out of bed can feel like climbing a mountain. Basic tasks — showering, cooking, replying to a message — can feel impossibly heavy.\n\nCognitively, depression distorts thinking. It generates negative predictions about the future, negative interpretations of the present, and negative beliefs about the self. These feel like accurate observations — but they're symptoms, not facts.`,
      },
      {
        heading: 'The biology of depression',
        body: `Depression involves changes in brain chemistry — particularly in systems involving serotonin, dopamine, and norepinephrine. It also involves changes in stress-response systems (elevated cortisol), inflammatory processes, and disrupted circadian rhythms.\n\nThis is why antidepressant medication works for many people — it targets these biological systems. But biology isn't destiny: psychological and social interventions also produce measurable changes in brain function. The brain is plastic; it changes in response to experience, including the experience of therapy.`,
      },
      {
        heading: 'The thinking patterns of depression',
        body: `CBT identifies a set of characteristic thinking patterns — cognitive distortions — that depression generates and maintains:\n\nAll-or-nothing thinking — "If I'm not doing perfectly, I'm failing completely."\nMind-reading — "People think I'm boring / incompetent / a burden."\nFuture-telling — "Things will never get better."\nMagnification — catastrophising small problems; minimising positive things.\nPersonalisation — taking excessive responsibility for things outside your control.\nShould statements — rigid rules about how you or others must behave.\n\nThese patterns aren't personality traits. They're symptoms — and they respond to treatment.`,
      },
      {
        heading: 'What helps',
        body: `Depression is one of the most treatable mental health conditions.\n\nCBT (Cognitive Behavioural Therapy) is highly effective — it targets both the thinking patterns and the behavioural withdrawal that maintain depression. Behavioural Activation (increasing engagement with meaningful and pleasurable activities) is one of its most powerful components.\n\nAntidepressant medication works for moderate to severe depression and is often most effective in combination with therapy.\n\nExercise has genuine evidence behind it as an adjunct treatment — particularly aerobic exercise at moderate intensity.\n\nSocial connection, adequate sleep, and structured routine all support recovery.\n\nIf you think you might be depressed, please speak to your GP. You don't need to meet a threshold of severity to deserve help.`,
      },
      {
        heading: 'Recovery',
        body: `Most people with depression recover. The majority have episodes — periods of depression that eventually lift — rather than a constant unremitting condition. With treatment, recovery is faster and recurrence is less likely.\n\nRecovery doesn't always feel linear. There are setbacks. But the trajectory, with appropriate support, is genuinely upward for most people.\n\nYou don't have to wait until things are really bad to seek help. Early intervention produces better outcomes. And you deserve support now, not only when things reach crisis point.`,
      },
    ],
  },

  {
    id: 'worry',
    title: 'Understanding Worry',
    readTime: '6 min',
    sections: [
      {
        heading: 'What worry is',
        body: `Worry is the mind's attempt to prepare for bad things that might happen. It involves repetitive, often verbal thought about future threats or uncertainties — running through scenarios, imagining problems, planning responses.\n\nSome worry is useful. It motivates preparation, flags genuine risks, and prompts action. The problem arises when worry becomes excessive, uncontrollable, or when it focuses on things that can't be solved or prevented — running in circles without producing useful action.`,
      },
      {
        heading: 'The two types of worry',
        body: `One of the most practically useful distinctions in managing worry is between two types:\n\nPractical worries are about real, current problems that you can actually do something about. "I'm worried about this deadline" — there's something concrete to address.\n\nHypothetical worries are about uncertainties and what-ifs that you can't actually do anything about. "What if I get seriously ill? What if something happens to someone I love? What if I lose my job?" These are about possibilities, not current realities.\n\nThey need completely different responses — and applying the wrong response makes things worse. Trying to problem-solve a hypothetical worry doesn't work because there's no actual problem to solve yet. Passively sitting with a practical worry that requires action creates its own anxiety.`,
      },
      {
        heading: 'Practical worries: problem-focused response',
        body: `If there's a real, current problem that you can actually take a step on, the most useful thing is to take that step.\n\nDefine the problem specifically. What exactly is the issue? What would a solution look like? Brainstorm options — even imperfect ones. Choose one. Make it as small and concrete as possible. Then do it.\n\nAfter you've taken the step, remind yourself that you've done what you can. Continuing to worry after action has been taken is your brain running a process it no longer needs to run.`,
      },
      {
        heading: 'Hypothetical worries: acceptance-focused response',
        body: `If your worry is genuinely about an uncertainty you can't control, the path forward is different — and harder.\n\nYou cannot think your way to certainty. The mind's attempt to resolve "what if" worries by thinking about them more doesn't produce resolution — it produces more worry. The only solution to uncertainty is learning to tolerate it.\n\nThis sounds simple but is difficult in practice. Techniques that help:\n\nContainment — scheduling a specific "worry time" (15 minutes at the same time each day) where you allow yourself to worry. When worry arrives outside that time, you note it and redirect: "I'll think about that at worry time." This stops worry from spreading through the whole day.\n\nDefusion — creating distance from worrying thoughts rather than engaging with them. "I notice I'm having the thought that something bad will happen." This shifts your relationship with the thought rather than trying to resolve it.\n\nTolerance practice — deliberately sitting with uncertainty without trying to reduce it, gradually building your capacity to function despite not knowing.`,
      },
      {
        heading: 'What maintains worry',
        body: `Several things keep worry going:\n\nIntolerance of uncertainty — people who find uncertainty particularly distressing worry more. Any ambiguity triggers the worry engine.\n\nPositive beliefs about worry — many people believe worrying is useful ("it keeps me prepared") or responsible ("if I worry, I'm taking things seriously"). These beliefs maintain worry even when it's causing significant distress.\n\nAvoidance — avoiding situations that trigger uncertainty temporarily reduces anxiety but maintains the underlying worry.\n\nReassurance-seeking — checking, looking things up, asking others if you'll be okay. Each reassurance provides brief relief but doesn't build genuine tolerance.`,
      },
      {
        heading: 'When worry becomes an anxiety disorder',
        body: `Generalised Anxiety Disorder (GAD) is characterised by excessive, uncontrollable worry about a wide range of topics, most days, for at least six months. It's often accompanied by physical tension, fatigue, difficulty concentrating, and sleep disruption.\n\nGAD is very treatable. CBT with a focus on worrying itself — rather than the specific content of worries — produces significant improvement. If this sounds familiar, speak to your GP.`,
      },
    ],
  },

  {
    id: 'intrusive_thoughts',
    title: 'Intrusive Thoughts',
    readTime: '5 min',
    sections: [
      {
        heading: 'What intrusive thoughts are',
        body: `Intrusive thoughts are unwanted thoughts, images, or urges that pop into the mind uninvited. They're often disturbing, violent, sexual, or blasphemous — completely at odds with the person's values and intentions.\n\nHere's the key fact: intrusive thoughts are almost universal. Research consistently finds that the vast majority of people — including people with no mental health difficulties whatsoever — experience them. The content of intrusive thoughts is remarkably similar across people and cultures.`,
      },
      {
        heading: 'Why they\'re not meaningful',
        body: `The content of an intrusive thought tells you almost nothing about who you are or what you might do. Having the thought "what if I pushed that person off the platform?" doesn't mean you want to push them. Having a disturbing sexual thought doesn't mean you want to act on it.\n\nThe presence of a thought — especially an unwanted, distressing one — and the desire to act on it are entirely different things. People who are troubled by violent intrusive thoughts are typically the last people who would ever act on them. The distress they feel is evidence of their values, not a threat to them.`,
      },
      {
        heading: 'What makes intrusive thoughts stick',
        body: `Most intrusive thoughts float through the mind and are forgotten. They become "stuck" when we make them significant — when we treat them as meaningful, threatening, or revealing.\n\nThe thought "what if I hurt someone?" gets treated as a warning signal, or as evidence of a dangerous impulse, rather than as mental noise. This triggers anxiety. We try to suppress it or reassure ourselves. But thought suppression backfires spectacularly — trying not to think about something makes you think about it more. And reassurance provides only brief relief before the doubt returns.\n\nThe emotional response to the thought, and the attempts to manage it, are what turn a normal intrusive thought into a significant problem.`,
      },
      {
        heading: 'OCD and intrusive thoughts',
        body: `Obsessive-Compulsive Disorder (OCD) occurs when intrusive thoughts (obsessions) become so distressing, and the associated compulsions (mental or behavioural rituals to reduce the distress) so time-consuming, that they significantly interfere with daily life.\n\nOCD is often misrepresented as a quirky tidiness thing. In reality, it can be extremely distressing — often involving deeply personal and disturbing content — and is driven by the same mechanism: treating intrusive thoughts as significant and performing rituals to manage the resulting anxiety.\n\nThe most effective treatment for OCD is Exposure and Response Prevention (ERP) — gradually facing the intrusive thoughts without performing compulsions, building tolerance to the uncertainty and distress they create.`,
      },
      {
        heading: 'What actually helps',
        body: `The counterintuitive truth about intrusive thoughts is that the solution is not to fight them, resolve them, or reassure yourself about them. It's to change your relationship with them.\n\nNotice and name — "there's an intrusive thought" — without evaluating its content or engaging with it.\n\nAllow it to be there without doing anything about it. Don't suppress, don't analyse, don't seek reassurance. Sit with the discomfort.\n\nReturn your attention to what you were doing.\n\nOver time, thoughts that are met with equanimity rather than alarm tend to lose their power. The anxiety around them reduces. They don't stop completely — but they stop running your life.`,
      },
    ],
  },

  {
    id: 'nats',
    title: 'Automatic Thoughts',
    readTime: '6 min',
    sections: [
      {
        heading: 'What automatic thoughts are',
        body: `Automatic thoughts are the rapid, spontaneous thoughts that run through our minds in response to situations — the internal commentary that interprets what's happening and what it means. They're called "automatic" because they arise without deliberate effort; they just appear.\n\nIn CBT, automatic thoughts are central to understanding emotional responses. The situation itself doesn't determine how you feel — your interpretation of it does. Two people can experience the same event and have completely different emotional reactions, because they're thinking about it differently.`,
      },
      {
        heading: 'The ABC model',
        body: `A simple way to understand this is the ABC framework:\n\nA — Activating event (the situation)\nB — Belief / thought (your interpretation)\nC — Consequence (how you feel and what you do)\n\nMost people assume A causes C. Something happens → you feel something. But between A and C is always B — a thought, often so fast it feels automatic or even unconscious.\n\nSomeone doesn't reply to your message (A) → "They're ignoring me, they must be annoyed with me" (B) → anxiety, withdrawal (C). The same event (A) with a different thought (B) — "They're probably just busy" — produces a completely different consequence.`,
      },
      {
        heading: 'Negative Automatic Thoughts (NATs)',
        body: `Negative Automatic Thoughts (NATs) are automatic thoughts that are consistently negative, distorted, and self-defeating. They're characteristic of depression and anxiety — and they maintain and worsen mood by providing a constant stream of negative interpretation.\n\nNATs are often about the self ("I'm useless"), the world ("nothing ever works out"), or the future ("this will never get better"). They feel like facts — like accurate observations about reality — but they're actually hypotheses that can be tested and challenged.`,
      },
      {
        heading: 'Common thinking distortions',
        body: `NATs typically involve one or more thinking distortions — systematic errors in how information is processed:\n\nAll-or-nothing thinking — seeing things in black and white, with no middle ground. "If I'm not perfect, I'm a failure."\n\nOvergeneralisation — drawing sweeping conclusions from single events. "This went wrong, so everything always goes wrong."\n\nMental filter — focusing exclusively on negative details while filtering out positive ones.\n\nDisqualifying the positive — rejecting positive experiences because "they don't count."\n\nMind-reading — assuming you know what others are thinking, usually negatively.\n\nFortune-telling — predicting the future negatively as if it were fact.\n\nCatastrophising — blowing things out of proportion.\n\nEmotional reasoning — "I feel useless, therefore I am useless."\n\nShould statements — rigid internal rules that generate guilt or frustration.\n\nLabelling — "I'm a failure" rather than "I made a mistake."`,
      },
      {
        heading: 'Catching your automatic thoughts',
        body: `The first step in working with automatic thoughts is learning to notice them. Because they're automatic, they often happen below conscious awareness — you just notice a feeling (anxiety, sadness, shame) without being aware of the thought that triggered it.\n\nUseful questions: "What was going through my mind just before I started feeling this way?" "What does this situation mean about me / others / my future?" "What's the worst I'm imagining might happen?"\n\nWriting thoughts down is more effective than trying to work with them in your head. There's something about externalising them that makes them easier to examine.`,
      },
      {
        heading: 'What comes next',
        body: `Once you can catch your automatic thoughts, you can start to evaluate them — to ask whether they're accurate, whether there's another way of seeing the situation, what a more balanced view might look like.\n\nThis is what the Cognitive Restructuring tool in STORI is designed to help you with. The goal isn't to force positive thinking — it's to think more accurately. Often, a thought that feels absolutely certain turns out to be based on assumptions rather than evidence.`,
      },
    ],
  },

  {
    id: 'cognitive_distortions',
    title: 'Thinking Traps',
    readTime: '6 min',
    sections: [
      {
        heading: 'What thinking traps are',
        body: `Thinking traps — or cognitive distortions — are systematic errors in how we process information. They're not random mistakes. They're patterned, predictable ways that our thinking goes wrong, particularly when we're anxious, depressed, or under stress.\n\nEveryone uses thinking traps sometimes. When they become habitual — the default way of processing experience — they have a significant impact on mood and behaviour.`,
      },
      {
        heading: 'The most common thinking traps',
        body: `All-or-nothing thinking: Seeing things in extremes with no middle ground. Success or failure. Perfect or worthless. "If I can't do it perfectly, there's no point doing it at all." Reality is almost always more nuanced.\n\nOvergeneralisation: Using one negative event to draw sweeping conclusions. "This went wrong. Things always go wrong for me." The giveaway words are "always", "never", "everyone", "no one".\n\nMental filter: Focusing on a single negative detail while filtering out the bigger picture. Getting one piece of critical feedback in an otherwise positive review and dwelling on it for days.\n\nDisqualifying the positive: Actively dismissing positive information. "They only said that to be nice." "Anyone could have done that." This maintains negative beliefs in the face of contradictory evidence.\n\nMind-reading: Assuming you know what others are thinking — usually that they're judging you negatively. "She looked bored. She thinks I'm dull." You don't actually know this.\n\nFortune-telling: Predicting a negative outcome as if it were already decided. "I know I'll mess it up." "It'll just go wrong." These predictions are presented to the mind as facts rather than possibilities.\n\nCatastrophising: Exaggerating the importance or consequences of events. Imagining the worst possible outcome as the most likely one. "If I make a mistake at work, I'll lose my job, then I'll lose my house..."\n\nEmotional reasoning: Using how you feel as evidence for how things are. "I feel stupid, so I must be stupid." "I feel like a burden, so I must be a burden." Feelings are real — but they're not always accurate reporters of facts.\n\nShould statements: Rigid internal rules about how you or others must behave. "I should always be productive." "I shouldn't need help." These generate guilt (directed inward) or anger and frustration (directed outward).\n\nLabelling: Attaching a global negative label instead of describing a specific behaviour. "I made a mistake" becomes "I'm a failure." "She was rude once" becomes "she's a terrible person."\n\nPersonalisation: Taking excessive responsibility for things outside your control. "My friend is in a bad mood — I must have done something." "If only I'd handled it differently, none of this would have happened."`,
      },
      {
        heading: 'Why these traps exist',
        body: `Thinking traps aren't bugs — they're features that became liabilities. Many of them evolved as mental shortcuts that worked well in simpler, more dangerous environments. Overgeneralising from one bad experience ("that plant made me ill — avoid all plants like it") was adaptive. Assuming negative intent in ambiguous social situations kept our ancestors cautious.\n\nIn complex modern life, these shortcuts misfire. They bias our processing toward threat and negativity in ways that are no longer helpful.`,
      },
      {
        heading: 'Spotting your personal patterns',
        body: `Most people have a few thinking traps they use more than others — a personal signature style of distortion. Common patterns:\n\nPeople with depression tend toward all-or-nothing thinking, overgeneralisation, mental filter, and labelling.\n\nPeople with anxiety tend toward fortune-telling, catastrophising, mind-reading, and probability overestimation.\n\nPeople with low self-esteem tend toward disqualifying the positive and personalisation.\n\nRecognising your own pattern is useful — it means you know where to look when your thinking is distorted.`,
      },
      {
        heading: 'What to do with them',
        body: `The first step is recognition — catching the trap in action. "That's fortune-telling." "That's a mental filter." Naming it creates a small but important gap between you and the thought.\n\nThe second step is evaluation — not replacing the thought with a positive one, but testing it. "What's the evidence for and against this?" "Is there another way of seeing this?" "What would I say to a friend who was thinking this?"\n\nThe goal is a more balanced, accurate perspective — not forced positivity. Often the balanced thought is quite moderate: "I might struggle with this presentation, but I might also do okay. I've managed before."\n\nThis is what the Cognitive Restructuring tool in STORI is built around.`,
      },
    ],
  },

  {
    id: 'regulating_emotions',
    title: 'Regulating Emotions',
    readTime: '6 min',
    sections: [
      {
        heading: 'What emotional regulation means',
        body: `Emotional regulation is the ability to manage and respond to emotional experiences in ways that are flexible, adaptive, and proportionate to the situation. It doesn't mean suppressing emotions or never feeling intensely — it means having a range of strategies available for working with emotions rather than being overwhelmed by them or avoiding them entirely.`,
      },
      {
        heading: 'How emotions work',
        body: `Emotions are information. They arise in response to something meaningful — a threat, a loss, a violation of values, an unexpected pleasure. They're accompanied by physical sensations, thoughts, and action urges (the impulse to do something — flee, fight, approach, withdraw).\n\nEmotions are not good or bad in themselves. Anger can be useful. Sadness is appropriate. Fear keeps us safe. The problem arises when emotions are disproportionate to the situation, persist long past their usefulness, or when we respond to them in ways that create more problems than they solve.`,
      },
      {
        heading: 'Unhelpful regulation strategies',
        body: `Many of the things people naturally do to manage difficult emotions are helpful in the short term and harmful in the long term:\n\nSuppression — pushing feelings down, trying not to feel them. This takes significant cognitive effort and often leads to rebound — the suppressed feeling comes back more intensely. It also prevents the processing of emotions, which is necessary for them to naturally resolve.\n\nAvoidance — not going to situations that trigger difficult emotions, or using substances, screens, or busyness to escape them. Avoidance maintains emotional difficulties because it prevents learning that the emotion is tolerable and temporary.\n\nRumination — going over and over distressing experiences or feelings. This feels like processing but usually isn't — it tends to maintain and amplify negative emotion rather than resolve it.`,
      },
      {
        heading: 'Helpful regulation strategies',
        body: `Cognitive reappraisal — changing how you interpret a situation, which changes the emotional response it generates. "This is a disaster" creates different feelings than "this is a setback I can work through." This is one of the most effective long-term strategies.\n\nAcceptance — allowing emotions to be present without trying to change, suppress, or fight them. Counterintuitively, accepting difficult feelings often reduces their intensity. The struggle against an emotion is often more exhausting than the emotion itself.\n\nOpposite action — when an emotion generates an unhelpful action urge (depression generates withdrawal, anger generates aggression), doing the opposite. Reaching out rather than isolating. Behaving calmly rather than reacting.\n\nPhysiological soothing — directly calming the nervous system through slow breathing, physical warmth, gentle movement, or grounding exercises. These work at a biological level, not just a cognitive one.\n\nDistraction — in moments of acute distress, deliberate distraction (engaging in an absorbing task, exercise, creative activity) can be helpful as a short-term strategy. The key is using it temporarily, not chronically.`,
      },
      {
        heading: 'Building emotional regulation capacity',
        body: `Emotional regulation isn't a fixed trait — it's a skill that can be built. People who find it difficult have usually never been explicitly taught these strategies, or grew up in environments where emotional expression was modelled poorly.\n\nPractise noticing your emotions before they escalate — catching them early when they're more manageable. Name them specifically. Research suggests that simply labelling an emotion ("I'm feeling anxious") reduces its intensity.\n\nBuild your window of tolerance — the range of emotional intensity you can experience without becoming overwhelmed. This expands with practice and with addressing the underlying issues that create emotional sensitivity.`,
      },
    ],
  },

  {
    id: 'low_self_esteem',
    title: 'Low Self-Esteem',
    readTime: '6 min',
    sections: [
      {
        heading: 'What self-esteem is',
        body: `Self-esteem is the overall sense of your own worth and value as a person. It's not the same as confidence (which is task-specific) or self-efficacy (belief in your ability to do something). It's deeper than that — a background sense of whether you are fundamentally okay, acceptable, and worthy of good things.`,
      },
      {
        heading: 'Where low self-esteem comes from',
        body: `Self-esteem is built — and damaged — through experience, particularly early experience.\n\nCritical, harsh, or unpredictable parenting can generate core beliefs that you are fundamentally flawed, unlovable, or not good enough. Childhood bullying, academic difficulties, trauma, or persistent experiences of failure or rejection can embed similar beliefs.\n\nThese experiences create what CBT calls core beliefs — deep-level assumptions about the self that feel like facts ("I'm fundamentally unlovable") but are actually interpretations that formed in particular circumstances and have been maintained by selective attention to confirming evidence ever since.`,
      },
      {
        heading: 'How low self-esteem maintains itself',
        body: `Low self-esteem is self-perpetuating through several mechanisms:\n\nBiased information processing — people with low self-esteem notice and remember information that confirms the negative self-view and discount or explain away information that contradicts it. A compliment doesn't register; a criticism is proof.\n\nSafety behaviours — doing things to prevent anticipated rejection (over-apologising, over-achieving, never asserting needs) that prevent disconfirmation of the negative belief.\n\nSelf-sabotage — unconsciously undermining situations that might generate evidence against the negative self-view ("I shouldn't get my hopes up").\n\nComparison — constantly comparing internally ("how I am") with others externally ("how they appear"), almost always unfavourably.`,
      },
      {
        heading: 'What doesn\'t work',
        body: `The obvious solutions to low self-esteem often backfire:\n\nPositive affirmations said against a deeply held negative belief often create cognitive dissonance and resistance — "I am a wonderful, worthwhile person" bounces off if the underlying belief says otherwise.\n\nAchievement — chasing accomplishments to prove worth is exhausting and unstable. Self-esteem built on performance is contingent — it collapses with any failure. And the goalposts keep moving.\n\nSeeking reassurance — asking for validation provides momentary relief but doesn't update the underlying belief, and can become a dependency.`,
      },
      {
        heading: 'What does work',
        body: `CBT approaches to low self-esteem target the core beliefs directly:\n\nIdentifying the belief and its origins — tracing where the self-critical belief came from, and recognising that it was a conclusion reached in particular circumstances by a younger, less-resourced version of you.\n\nTesting the belief — treating it as a hypothesis rather than a fact. What's the evidence for and against it? Are you evaluating yourself by a different standard than you'd apply to others?\n\nBuilding a more balanced self-view — not "I'm wonderful" but something like "I'm a person with strengths and limitations, like everyone else."\n\nBehavioural experiments — deliberately doing things that challenge the safety behaviours and generate new evidence.\n\nSelf-compassion — developing the capacity to treat yourself with the same kindness you would offer a good friend. Research on self-compassion is robust: it's associated with greater resilience, less depression and anxiety, and — paradoxically — better performance than self-criticism.`,
      },
    ],
  },

  {
    id: 'abc_model',
    title: 'The ABC Model',
    readTime: '5 min',
    sections: [
      {
        heading: 'The central idea',
        body: `The ABC Model is one of the foundational ideas in CBT, developed by Albert Ellis in the 1950s. Its central claim is simple but profound:\n\nIt's not events that upset us — it's the beliefs we hold about them.\n\nThis might feel counterintuitive. Surely if something bad happens, you feel bad because of what happened? But the ABC model points out that the same event can produce wildly different emotional responses in different people — which suggests that something between the event and the emotion is doing the work.`,
      },
      {
        heading: 'A, B, C',
        body: `A — Activating Event\nThe situation or trigger. This can be external (something that happens) or internal (a thought, a memory, a physical sensation).\n\nB — Beliefs / Thoughts\nYour interpretation of the event. The meaning you assign to it. This includes both automatic thoughts and deeper beliefs about yourself and the world.\n\nC — Consequences\nYour emotional response and your behaviour. How you feel and what you do as a result.\n\nThe model says: A triggers B, and B produces C. A does not directly cause C.`,
      },
      {
        heading: 'An example',
        body: `A: You send a message to a friend and they don't reply for several hours.\n\nPerson 1's B: "They're ignoring me. I must have said something wrong. They're probably angry with me."\nPerson 1's C: Anxiety, self-doubt, checking the phone repeatedly, withdrawal.\n\nPerson 2's B: "They're probably just busy. They'll reply when they can."\nPerson 2's C: No significant emotional response.\n\nSame A. Very different C. The difference is B.`,
      },
      {
        heading: 'Why this matters',
        body: `If A directly caused C, you'd have very little power over your emotional life — you'd be entirely at the mercy of what happens to you.\n\nBut if B mediates between A and C, then changing B — examining and updating your interpretations — changes C. You have agency.\n\nThis is the foundation of CBT. Not: "change the situation" (often not possible). Not: "control your emotions directly" (also not straightforwardly possible). But: "examine and update your interpretations, and the emotional consequences will change."\n\nThis isn't about positive thinking — it's about accurate thinking. Many of our automatic interpretations are biased, distorted, or built on old assumptions. Bringing them into the light and examining them is powerful.`,
      },
      {
        heading: 'Using it in practice',
        body: `When you notice a strong emotional reaction, the ABC model gives you a structured place to start:\n\nWhat was the A? What specifically happened? Try to stick to observable facts, not interpretations.\n\nWhat's my B? What went through my mind about it? What does it mean to me? What's the worst interpretation I've jumped to?\n\nWhat's my C? What am I feeling, and how am I behaving?\n\nOnce you have A and B clearly, you can start to examine the B: is this interpretation accurate? Is there another way of seeing it? What would I think if I were less stressed / less depressed / more like my best self?\n\nThe ABC Model tool in STORI walks you through this process step by step.`,
      },
    ],
  },


  // ═══════════════════════════════════════════════════════════════════════════
  // STAGE 3
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'avoidance',
    title: 'Avoidance & Safety Behaviours',
    readTime: '6 min',
    sections: [
      {
        heading: 'Why avoidance feels like the right thing to do',
        body: `When something makes you anxious, avoiding it makes complete sense in the short term. The anxiety goes down. You feel relief. Your nervous system gets a break.\n\nThe problem is what happens next time. And the time after that.\n\nAvoidance is one of the most powerful drivers of anxiety disorders. Not because it doesn't work — it does, temporarily. But because it teaches your brain that the avoided thing is genuinely dangerous, that you can't cope with it, and that the only safe response is to keep avoiding it. The anxiety becomes more entrenched, not less.`,
      },
      {
        heading: 'What avoidance looks like',
        body: `Avoidance is obvious when it's complete — not going somewhere, not doing something. But it also comes in subtler forms:\n\nDelay — "I'll deal with it later" (indefinitely).\n\nEscape — entering the situation but leaving when anxiety rises.\n\nDistraction — being physically present but mentally elsewhere.\n\nProcrastination — particularly around tasks associated with fear of failure or judgment.\n\nSubstance use — using alcohol or other substances to reduce anxiety before situations.\n\nSeeking reassurance — another form of avoidance; you do the thing but rely on external reassurance rather than developing internal confidence.`,
      },
      {
        heading: 'Safety behaviours',
        body: `Safety behaviours are the things you do within situations to prevent the feared outcome — and they're just as problematic as full avoidance, but sneakier.\n\nIf you're anxious in social situations, a safety behaviour might be: staying near the door, only talking to people you know, having a drink first, over-preparing what you'll say, monitoring yourself carefully, or leaving early.\n\nThe problem is this: if the feared outcome doesn't happen ("I didn't make a fool of myself"), your brain doesn't attribute it to the fact that the feared outcome wouldn't have happened anyway. It attributes it to the safety behaviour: "I survived because I left early / stayed by the door / watched myself carefully."\n\nSo you never update the belief that the situation is dangerous. The anxiety remains intact for next time.`,
      },
      {
        heading: 'The anxiety curve',
        body: `Here's what actually happens when you stay in an anxiety-provoking situation without escaping or using safety behaviours: anxiety rises, reaches a peak, and then — if you stay — comes down on its own. Every time.\n\nThis process is called habituation. The nervous system cannot maintain peak anxiety indefinitely. If you ride it out, the anxiety reduces — and crucially, you've generated new evidence: "I could cope with it. I stayed. The feared outcome didn't happen."\n\nAvoidance and escape prevent this process from completing. You leave during the rising phase, confirm that it was dangerous, and never experience the natural resolution.`,
      },
      {
        heading: 'Gradual exposure',
        body: `The evidence-based approach to avoidance and anxiety is gradual exposure — systematically facing feared situations, starting with less challenging ones and building up, while resisting safety behaviours.\n\nThe key word is gradual. The goal isn't to throw yourself into the most terrifying situation immediately — it's to build up a hierarchy of challenges, starting where the anxiety is manageable, and developing evidence at each step that you can cope and the feared outcome doesn't happen.\n\nThis is what the Exposure Ladder tool in STORI is built around.`,
      },
      {
        heading: 'What to expect',
        body: `Exposure is uncomfortable. There's no way around this — you're going to feel anxious. But this is not the same as something going wrong. Anxiety is the thing you're building tolerance to.\n\nInitially, each confrontation with a feared situation will generate significant anxiety. With repetition, the response reduces. The situation becomes less frightening. The evidence accumulates that you can cope.\n\nMost people find that the anticipatory anxiety (before the situation) is worse than the actual experience. This is itself useful information.`,
      },
    ],
  },

  {
    id: 'behavioural_activation',
    title: 'Behavioural Activation',
    readTime: '6 min',
    sections: [
      {
        heading: 'The problem it solves',
        body: `When you're depressed, you don't feel like doing things. So you do less. And doing less means fewer opportunities for pleasure, achievement, or connection. Which makes you feel more depressed. Which makes you do even less.\n\nThis is the depression spiral — and it's one of the most powerful mechanisms that maintains low mood even when the original cause has passed or changed.\n\nBehavioural Activation is a direct intervention in this spiral. It doesn't wait for motivation to return before doing things. It does things first — and lets the mood follow.`,
      },
      {
        heading: 'Why "wait until you feel like it" doesn\'t work',
        body: `The intuitive approach to depression is: "I'll do things when I feel better." The problem is that feeling better is partly dependent on doing things. If you wait for the motivation to return on its own, you may wait a very long time — while the inactivity deepens the depression.\n\nBehavioural Activation inverts this. It says: "Act first. The feeling catches up." This feels counterintuitive, and it requires doing things when you really don't feel like it. But the evidence is strong: activity — particularly meaningful activity — genuinely improves mood, even when it doesn't feel like it will.`,
      },
      {
        heading: 'Activity and mood',
        body: `Activity affects mood through several mechanisms:\n\nNeurochemistry — physical activity increases serotonin, dopamine, and norepinephrine. Even non-physical activity engages reward pathways when it involves achievement or connection.\n\nMastery and pleasure — these are the two key categories in Behavioural Activation. Activities that give you a sense of accomplishment (mastery), and activities that are intrinsically enjoyable (pleasure). Both improve mood; their combination is particularly powerful.\n\nRumination interruption — depression generates rumination — repetitive, often self-critical thinking. Activity disrupts this process. You cannot fully ruminate and fully engage in an absorbing activity simultaneously.\n\nConnection — social engagement directly reduces physiological stress markers and improves mood.`,
      },
      {
        heading: 'The three categories of activity',
        body: `In planning activities, it helps to think across three categories:\n\nNecessary activities — things that need to happen: basic self-care, responsibilities, practical tasks. When depression is severe, these can feel mountainous. Completing them generates a sense of functioning and control.\n\nPleasurable activities — things you've previously enjoyed or that other people in similar situations find enjoyable. Note: depressed people often say "I don't enjoy anything anymore." This is a symptom, not a permanent state. Doing things before the enjoyment returns is part of the treatment.\n\nMeaningful activities — things connected to your values, relationships, or sense of purpose. These often have the most powerful effect on mood over time.`,
      },
      {
        heading: 'How to start',
        body: `Start small. Severely depressed people sometimes need to begin with tiny steps — getting dressed, having a meal, going outside for five minutes. This isn't a failure of ambition; it's meeting yourself where you are and building from there.\n\nSchedule activities in advance. Planned activities are more likely to happen than vague intentions. Put them in your calendar.\n\nMonitor and adjust. Track what you do and how you feel before and after. Most people find that mood improves more than they anticipated during activities — and this data helps counter the depressive prediction that "it won't help."\n\nDon't wait for motivation. Motivation tends to come after you start, not before. "Action before motivation" is the core principle.`,
      },
      {
        heading: 'What gets in the way',
        body: `Avoidance — depression makes withdrawal feel protective. Notice the urge to cancel or postpone, and treat it as a symptom rather than good advice.\n\nAll-or-nothing thinking — "If I can't do the full activity perfectly, there's no point." Half an activity, done imperfectly, still generates mood benefits.\n\nNegative predictions — "It won't help / I won't enjoy it / I'll feel worse." These are predictions, not facts. Treat them as hypotheses to test, not decisions to defer to.`,
      },
    ],
  },

  {
    id: 'cognitive_restructuring',
    title: 'Challenging Your Thoughts',
    readTime: '6 min',
    sections: [
      {
        heading: 'What cognitive restructuring is',
        body: `Cognitive restructuring is the core CBT technique for working with negative automatic thoughts. It's a structured process of examining your thoughts — not to replace them with positive ones, but to evaluate whether they're accurate and, if not, to develop a more balanced perspective.\n\nThe goal is not to feel better by thinking happier thoughts. It's to think more accurately, and to let more accurate thinking produce a more appropriate emotional response.`,
      },
      {
        heading: 'The process',
        body: `Step 1: Identify the situation and the thought\nWhat happened? What went through your mind? Try to capture the thought as specifically as possible — not "I felt bad" but "I thought: they think I'm incompetent."\n\nStep 2: Identify the emotion and its intensity\nWhat are you feeling? How intense is it (0-100%)?\n\nStep 3: Look at the evidence\nWhat evidence supports this thought? What evidence goes against it? Be as specific as possible. Evidence means concrete facts, not feelings. "I feel like they think I'm incompetent" is not evidence.\n\nStep 4: Consider alternative perspectives\nIs there another way of interpreting this situation? What would a friend say? What would you think if you were less anxious / depressed? What would someone who knows and likes you think?\n\nStep 5: Develop a balanced thought\nBased on all the above, what's a more accurate, balanced way of seeing this? Not a positive spin — an honest, fair assessment.\n\nStep 6: Re-rate the emotion\nHow intense is the emotion now? Most people find it reduces — not to zero, but meaningfully.`,
      },
      {
        heading: 'Common mistakes',
        body: `Forced positivity — replacing "I'm terrible" with "I'm wonderful" doesn't work. The mind rejects it. The balanced thought needs to be believable and honest.\n\nNot enough evidence — "I can't think of any evidence against it" usually means you haven't looked hard enough, or the depression/anxiety is filtering it out. Push harder.\n\nWorking in your head — cognitive restructuring is most effective on paper (or screen). Writing it out slows the process down enough to actually examine the thought, rather than just thinking about thinking.`,
      },
      {
        heading: 'What it\'s not',
        body: `Cognitive restructuring is not telling yourself that everything is fine. It's not suppressing negative feelings. It's not toxic positivity.\n\nSometimes the balanced thought is genuinely negative: "Yes, I made a mistake. It had real consequences. AND I've dealt with difficult things before and I can address this too." That's not a happy thought — but it's more accurate than "I've ruined everything and I can never recover," and it produces a very different emotional and behavioural response.`,
      },
      {
        heading: 'Building the skill',
        body: `Cognitive restructuring is a skill — and like all skills, it improves with practice. Early on, it can feel clunky and forced. The balanced thought might not feel very convincing. That's normal.\n\nOver time, the process becomes faster and more automatic. You start catching thoughts earlier, evaluating them more fluently, and the balanced perspective comes more readily.\n\nMany people find that after weeks of practice, the unhelpful thought still arrives — but they can dismiss it quickly: "There's the fortune-telling again." The thought loses its hold even when it appears.`,
      },
    ],
  },

  {
    id: 'coping_with_stress_advanced',
    title: 'Coping with Stress (Advanced)',
    readTime: '6 min',
    sections: [
      {
        heading: 'Beyond the basics',
        body: `If you've read the introductory article on stress, you'll know the foundations: sleep, movement, connection, breathing, and the problem-focused vs emotion-focused distinction. This article goes further — looking at some of the more nuanced aspects of stress management that make the biggest difference at a more advanced level.`,
      },
      {
        heading: 'Stress appraisal: the two questions',
        body: `Cognitive research on stress suggests that our stress response is driven by two appraisals:\n\n1. "Is this a threat to me?"\n2. "Do I have the resources to cope?"\n\nStress arises when the perceived threat exceeds the perceived coping resources. This means that stress is as much about your assessment of your own resources as it is about the stressor itself.\n\nThis is significant because coping resource appraisal is often inaccurate — particularly when we're depressed or anxious. We underestimate our capacities, discount our past resilience, and catastrophise about our ability to handle difficulty. Working on this appraisal — building realistic confidence in your own coping — directly reduces stress reactivity.`,
      },
      {
        heading: 'The role of meaning',
        body: `Viktor Frankl observed that people can endure almost any "what" if they have a "why". This insight has been extensively researched: stressors that are perceived as meaningful — challenging but purposeful — generate less damage than stressors that feel pointless.\n\nThis doesn't mean you have to find deep meaning in every difficulty. But when stress is chronic, asking "what matters to me about getting through this?" and "what does handling this well make possible?" can meaningfully shift the experience.`,
      },
      {
        heading: 'Rumination vs reflection',
        body: `One of the most important distinctions in stress management is between rumination and reflection.\n\nRumination is repetitive, passive, negative thinking about stressors and their causes, consequences, and implications. It feels like problem-solving but isn't — it circulates the same thoughts without producing new insight or action. Research consistently shows that rumination maintains and worsens depression and stress.\n\nReflection is purposeful, curious engagement with a problem with the intention of understanding it or generating solutions. It's active, time-limited, and oriented toward a goal.\n\nThe same topic — a work conflict, a relationship problem — can be approached in either mode. Building the ability to notice which mode you're in, and to shift out of rumination into reflection or action, is a high-leverage skill.`,
      },
      {
        heading: 'The stress buffer of social connection',
        body: `Social support is one of the most robust buffers against the negative effects of stress — it's associated with better physical health outcomes, faster recovery from illness, and lower rates of depression.\n\nBut not all social interactions are supportive. The quality and nature of connection matters more than quantity. Venting without resolution can increase rather than decrease stress. Social comparison in the age of social media often does the same.\n\nWhat seems to buffer stress most effectively is felt belonging and practical support — feeling that you're not alone, and having concrete help when you need it. Investing in relationships that provide both is genuinely protective.`,
      },
      {
        heading: 'Accepting the uncontrollable',
        body: `A significant source of chronic stress is investing emotional energy in trying to change or control things that are genuinely outside your control. This is exhausting and, by definition, futile.\n\nThe Serenity Prayer captures the core skill: "the serenity to accept the things I cannot change, the courage to change the things I can, and the wisdom to know the difference." Easier said than done — but the investment in developing this wisdom pays dividends in reduced suffering.\n\nACT (Acceptance and Commitment Therapy) has developed specific techniques for building acceptance of uncontrollable stressors without giving up or becoming passive. The core insight is that acceptance doesn't mean approval — it means not fighting reality.`,
      },
    ],
  },

  {
    id: 'assertiveness',
    title: 'Boundaries & Assertiveness',
    readTime: '6 min',
    sections: [
      {
        heading: 'What assertiveness is — and isn\'t',
        body: `Assertiveness is the ability to express your thoughts, feelings, needs, and preferences directly, honestly, and respectfully — in a way that acknowledges both your own rights and the rights of others.\n\nIt's not aggression (expressing yourself without regard for others). It's not passivity (suppressing your needs to keep the peace). It's the middle ground — and it's a skill, not a personality trait.`,
      },
      {
        heading: 'The three styles',
        body: `Passive: Prioritising others' needs and wishes over your own, often at significant personal cost. Saying yes when you mean no. Avoiding conflict at all costs. Not expressing opinions or preferences. The short-term benefit is approval and safety; the long-term cost is resentment, frustration, reduced self-esteem, and relationships built on a false version of you.\n\nAggressive: Pursuing your own needs and preferences without adequate regard for others. Dominating, intimidating, dismissing others' perspectives. The short-term benefit might be getting what you want; the long-term cost is damaged relationships and others becoming defensive or avoidant.\n\nAssertive: Expressing needs and feelings clearly and directly, while listening to and respecting others. Saying no when you mean no, with clarity and without excessive guilt. Disagreeing without attacking. This produces better long-term outcomes in relationships, reduces internal resentment, and maintains self-respect.`,
      },
      {
        heading: 'Boundaries',
        body: `Boundaries are the limits you set on what you will and won't accept in relationships and interactions — in terms of how people treat you, what you're willing to do, and what access people have to your time, energy, and emotional resources.\n\nBoundaries are not about controlling others. You can't dictate what someone does — you can only be clear about what you will do in response. "I'm not willing to be spoken to like that. If it continues, I'll end the conversation."\n\nSetting boundaries is uncomfortable, particularly for people with a history of prioritising others or avoiding conflict. It can feel selfish. It often generates short-term conflict or discomfort. But boundaries are the infrastructure of sustainable relationships — they prevent resentment from building and allow genuine generosity to exist.`,
      },
      {
        heading: 'Why assertiveness is difficult',
        body: `For many people, assertiveness is blocked by deeply held beliefs:\n\n"My needs aren't as important as other people's."\n"If I say no, they'll be angry / leave / think badly of me."\n"It's selfish to put myself first."\n"Conflict is dangerous."\n"A good person doesn't make a fuss."\n\nThese beliefs are usually learned — often in families where assertion was unsafe or punished, or where worth was conditional on being agreeable. They feel like facts but they're interpretations that can be examined and updated.`,
      },
      {
        heading: 'Assertiveness in practice',
        body: `Some practical tools:\n\nI-statements — express your perspective in terms of your own experience rather than accusations about others. "I feel frustrated when..." rather than "You always..."\n\nBroken record — calmly repeating your position when someone pushes back, without getting drawn into argument. "I understand you feel that way. I'm still not able to do that."\n\nDelaying — "Let me think about that and get back to you." This breaks the pressure of in-the-moment decision-making.\n\nAcknowledge and hold — "I can see this is important to you. I'm still going to need to decline."\n\nAssertiveness is a skill that improves with practice, and anxiety around it reduces as you accumulate evidence that the feared consequences (rejection, conflict, dislike) are less catastrophic than predicted.`,
      },
    ],
  },

  {
    id: 'conflict',
    title: 'Handling Conflict',
    readTime: '6 min',
    sections: [
      {
        heading: 'Why conflict is inevitable — and not always bad',
        body: `Conflict — disagreement, tension, incompatible needs — is a normal feature of any relationship. The goal isn't to have no conflict; it's to have conflict that's handled well enough that the relationship can repair and continue.\n\nResearch by John Gottman found that the difference between relationships that last and those that don't isn't the absence of conflict — it's the ratio of positive to negative interactions, and critically, the ability to repair after conflict. Conflict handled constructively can actually deepen trust and understanding.`,
      },
      {
        heading: 'What makes conflict destructive',
        body: `Gottman identified four patterns that reliably predict relationship breakdown:\n\nCriticism — attacking the person rather than the behaviour. "You always do this" / "You're so selfish." The antidote: complain about the specific behaviour, not the character.\n\nContempt — expressing superiority, mockery, or disgust. Eye-rolling, sarcasm, name-calling. This is the single strongest predictor of relationship breakdown.\n\nDefensiveness — responding to complaints or criticism with counter-attack or victimhood. Taking no responsibility, deflecting. The antidote: find even a grain of validity in what's being said.\n\nStonewalling — emotional withdrawal from the interaction. Going silent, physically leaving, tuning out. Often occurs when someone becomes flooded (overwhelmed with stress hormones).`,
      },
      {
        heading: 'Emotional flooding',
        body: `Conflict becomes much harder to handle when you're emotionally flooded — when the physiological stress response is fully activated. Heart rate above around 100bpm, adrenaline and cortisol surging, thinking narrowing.\n\nIn this state, you literally cannot access the parts of the brain responsible for perspective-taking, empathy, and nuanced problem-solving. This is why some arguments spiral — both people are flooded, and both are operating from the most reactive parts of their nervous system.\n\nThe most important thing you can do when you're flooded is take a break. Not a punishment break — a genuine physiological recovery break. 20 minutes at minimum (the time it takes for stress hormones to reduce). Return when you're calm enough to think.`,
      },
      {
        heading: 'Approaching difficult conversations',
        body: `Some principles that make a genuine difference:\n\nSoft startup — how you begin a difficult conversation largely determines how it ends. Begin with "I" statements rather than "you" accusations. "I've been feeling disconnected from you recently and I want to understand what's going on" lands very differently than "You never make time for me."\n\nStick to the specific — "I felt hurt when you cancelled last minute" is workable. "You're always unreliable and you never consider my feelings" isn't.\n\nAim to understand before you aim to persuade — most people don't feel heard in conflict. Spending time genuinely trying to understand the other person's perspective (even if you disagree with it) changes the dynamic significantly.\n\nRepair attempts — any attempt to de-escalate during an argument: humour, apology, acknowledging the other person's point, calling for a break. These are crucial, and noticing and accepting them when your partner makes them matters enormously.`,
      },
      {
        heading: 'When conflict is more serious',
        body: `Some conflicts signal deeper incompatibilities or patterns that require more systematic work — either together (couples therapy, mediation) or individually. If conflict in a relationship is frequent, highly escalating, or leaving you regularly feeling unsafe, worthless, or chronically distressed, that's important information.\n\nConflict that involves power imbalance, control, intimidation, or any form of abuse is different from ordinary interpersonal conflict and requires different support. If this is your situation, please speak to someone you trust or contact a specialist support service.`,
      },
    ],
  },


  // ═══════════════════════════════════════════════════════════════════════════
  // STAGE 4
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'panic_disorder',
    title: 'Panic Disorder',
    readTime: '6 min',
    sections: [
      {
        heading: 'What distinguishes panic disorder',
        body: `Panic disorder is diagnosed when someone has recurrent, unexpected panic attacks — at least some of which seem to come "out of the blue," without an obvious external trigger — and they develop significant concern about future attacks, or change their behaviour to try to prevent them.\n\nThe panic attacks themselves are the same as any panic attack — a sudden surge of intense fear with significant physical symptoms. What distinguishes panic disorder is the spiral that builds around them: fear of the fear, vigilance for symptoms, avoidance of situations associated with previous attacks.`,
      },
      {
        heading: 'The panic cycle',
        body: `Understanding the panic cycle is central to recovery from panic disorder:\n\nA trigger (which may be internal — a physical sensation, a thought — or external) activates a threat appraisal. "Something is wrong." The body responds with arousal. Arousal produces physical symptoms (rapid heart rate, shortness of breath, dizziness). The person catastrophically misinterprets these symptoms ("I'm having a heart attack / I'm going mad"). This misinterpretation dramatically amplifies the threat appraisal. Arousal spikes. Symptoms intensify. Full panic.\n\nThe pivotal point in the cycle is the catastrophic misinterpretation. Panic disorder is maintained largely by the belief that panic symptoms are dangerous or evidence of something terrible. Correcting this belief — through information and experience — is central to recovery.`,
      },
      {
        heading: 'Agoraphobia and avoidance',
        body: `Many people with panic disorder develop agoraphobia — avoidance of situations where escape might be difficult or help unavailable if a panic attack occurred. Common avoided situations include public transport, crowds, queues, open spaces, being alone.\n\nAvoidance is the main thing that maintains panic disorder. Every time you avoid, you prevent the learning that the situation is manageable, that panic is survivable, and that the feared catastrophe doesn't happen.\n\nThe treatment for panic disorder — Cognitive Behavioural Therapy — is therefore largely an exposure-based approach. You gradually face the situations and sensations that trigger panic, in a planned, systematic way.`,
      },
      {
        heading: 'Interoceptive exposure',
        body: `One distinctive element of CBT for panic disorder is interoceptive exposure — deliberately inducing the physical sensations associated with panic (through exercise, spinning, breathing through a straw) and learning to tolerate them without catastrophising.\n\nThis sounds alarming. But it's based on a well-established principle: when you deliberately bring on the sensations in a controlled context, you discover they're not dangerous. You build tolerance. You update the catastrophic belief. Over time, the sensations lose their power to trigger the panic spiral.`,
      },
      {
        heading: 'What recovery looks like',
        body: `Recovery from panic disorder doesn't typically mean never experiencing anxiety or physical symptoms. It means changing your relationship with those sensations — stopping interpreting them as catastrophic, stopping the avoidance that maintains them, and discovering that you can tolerate them and continue to function.\n\nWith good CBT, most people with panic disorder see significant improvement. Many recover fully.\n\nIf you think you have panic disorder, please speak to your GP and ask for a referral for CBT. NICE guidelines recommend CBT as first-line treatment.`,
      },
    ],
  },

  {
    id: 'anxiety_disorders',
    title: 'Anxiety Disorders',
    readTime: '7 min',
    sections: [
      {
        heading: 'An overview',
        body: `Anxiety disorders are among the most common mental health conditions — affecting a significant proportion of the population at some point. They share a common core (the anxiety cycle: perceived threat → bodily arousal → avoidance) but differ in what triggers the anxiety and what form the avoidance takes.\n\nHaving a name for what you're experiencing can be helpful — it reduces shame, it opens doors to appropriate treatment, and it connects you to a body of knowledge about what helps. You don't need a formal diagnosis to benefit from the information below.`,
      },
      {
        heading: 'Generalised Anxiety Disorder (GAD)',
        body: `GAD involves excessive, hard-to-control worry about a wide range of everyday matters — work, health, relationships, finances, minor practical matters — on most days for at least six months.\n\nKey features: the worry jumps between topics (when one worry resolves, another takes its place); there's significant physical tension; sleep is often disturbed; concentration is affected; and there's a pervasive sense of being "on edge."\n\nGAD is treated with CBT focused specifically on the worry process — not the content of worries but the way worry operates and is maintained — and/or medication. It's very treatable.`,
      },
      {
        heading: 'Social Anxiety Disorder',
        body: `Social anxiety is intense fear of social situations in which you might be judged, embarrassed, or humiliated. It goes beyond ordinary shyness — it involves significant distress and avoidance that impairs daily life.\n\nCommon feared situations: speaking in groups, meeting new people, eating or writing in public, using the phone, attending parties. The feared outcome is usually humiliation, negative evaluation, or doing something embarrassing.\n\nSocial anxiety maintains itself through safety behaviours (avoiding eye contact, over-preparing, staying quiet) that prevent disconfirmation of the negative belief, and through post-event processing (replaying what went wrong after the fact).\n\nCBT with an exposure component is highly effective. Many people with significant social anxiety see major improvement.`,
      },
      {
        heading: 'Health Anxiety',
        body: `Health anxiety involves persistent preoccupation with having or developing a serious illness, despite medical reassurance. The person often seeks significant reassurance (from doctors, from the internet, from others) — which provides brief relief before the doubt returns.\n\nHealth anxiety is driven by intolerance of uncertainty (you can never be 100% certain you're not ill), heightened attention to bodily sensations (which amplifies perceived symptoms), and catastrophic interpretation of ambiguous sensations.\n\nTreatment involves reducing reassurance-seeking (which maintains the anxiety rather than resolving it), challenging catastrophic interpretations, and building tolerance of health uncertainty.`,
      },
      {
        heading: 'Specific Phobias',
        body: `A phobia is an intense, disproportionate fear of a specific object or situation — heights, spiders, needles, flying, blood, vomiting, dogs. The fear is recognised as excessive but feels uncontrollable.\n\nPhobias are among the most treatable mental health conditions. Graded exposure therapy — systematically and gradually confronting the feared thing — has excellent outcomes, often producing significant improvement in just a few sessions.\n\nThe exposure needs to be gradual (starting where the anxiety is manageable), repeated (to allow habituation to develop), and without safety behaviours.`,
      },
      {
        heading: 'OCD',
        body: `Obsessive-Compulsive Disorder involves recurring, intrusive thoughts (obsessions) that generate intense anxiety, and repetitive behaviours or mental acts (compulsions) performed to reduce that anxiety.\n\nThe compulsions provide short-term relief but maintain the OCD by confirming that the obsession is dangerous and needs to be neutralised. This is why the treatment — Exposure and Response Prevention (ERP) — involves deliberately facing the obsession without performing the compulsion.\n\nOCD is often misrepresented as a tidiness quirk. In reality, it can involve deeply distressing content (harm, contamination, blasphemy, doubt) and can be severely impairing. It's also very treatable with the right specialist input.`,
      },
      {
        heading: 'PTSD',
        body: `Post-Traumatic Stress Disorder develops following exposure to traumatic events and involves intrusive re-experiencing (flashbacks, nightmares), avoidance of trauma reminders, hypervigilance, and significant disruption to daily functioning.\n\nTrauma memories are processed differently from ordinary memories — they're stored fragmented, without proper temporal context, and can be triggered by sensory cues to feel as if the trauma is happening again.\n\nFirst-line treatments are Trauma-Focused CBT (TF-CBT) and EMDR (Eye Movement Desensitisation and Reprocessing). Both have strong evidence and are recommended in NICE guidelines. Please see your GP for a referral if PTSD sounds like your experience.`,
      },
    ],
  },

  {
    id: 'relapse_prevention_intro',
    title: 'Relapse Prevention (Intro)',
    readTime: '5 min',
    sections: [
      {
        heading: 'What a relapse is — and isn\'t',
        body: `A relapse is a return to significant mental health difficulties after a period of improvement. It's different from a lapse — a temporary dip or bad patch — though the two can feel identical in the moment.\n\nUnderstanding this distinction matters. Many people catastrophise lapses as proof that recovery hasn't worked, and this catastrophising itself becomes a driver of relapse. "I felt better and now I feel bad again — I've failed" is a common and unhelpful narrative.\n\nSetbacks are a normal part of recovery from most mental health conditions. They don't erase progress. They don't mean you're back at square one. And they're often predictable — which means they can be prepared for.`,
      },
      {
        heading: 'Why relapse happens',
        body: `Understanding your personal vulnerability factors is the foundation of relapse prevention. These typically include:\n\nStressful life events — particularly those that echo themes from the original difficulties (loss, rejection, failure).\n\nLifestyle factors — disrupted sleep, reduced exercise, social withdrawal, increased alcohol use. These often creep back in during good periods.\n\nStopping helpful practices — abandoning the strategies and habits that supported recovery because things feel better and they no longer feel necessary.\n\nEarly warning signs being missed or ignored — small changes in mood, thinking, or behaviour that signal a downturn is beginning.`,
      },
      {
        heading: 'Early warning signs',
        body: `Most people have a characteristic pattern of early warning signs — specific changes that appear before a full relapse develops. These are personal and specific; they're different from person to person.\n\nCommon examples: sleeping longer than usual, withdrawing from social contact, increasing irritability, losing interest in things, being less able to concentrate, becoming more self-critical, using alcohol more, skipping exercise, increased worry.\n\nIdentifying your personal early warning signs is one of the most valuable things you can do — because catching a downturn early dramatically improves your ability to intervene before it becomes significant.`,
      },
      {
        heading: 'Building your safety net',
        body: `Relapse prevention is about building a plan before you need it — when you're well enough to think clearly.\n\nYour plan should include:\n\nYour early warning signs — what are the first signs for you that things are slipping?\n\nYour response plan — what will you do when you notice those signs? Which tools? Who will you contact? When will you go back to your GP?\n\nYour triggers — which situations or circumstances are most likely to destabilise you? How can you minimise exposure, or have a plan if they occur?\n\nYour support people — who knows about your mental health history and can be a check-in point?`,
      },
      {
        heading: 'Staying well',
        body: `The things that got you well tend to be the things that keep you well: regular sleep and routine, movement, connection, managing stress, using the skills you've built, and maintaining relationships with any professional support.\n\nThe challenge is that when life improves, the motivation to maintain these practices often reduces. "I feel fine — I don't need to do all that anymore." This is exactly when they matter most.\n\nStaying well isn't as dramatic as getting well — but it's real work, and it's worth it.`,
      },
    ],
  },


  // ═══════════════════════════════════════════════════════════════════════════
  // STAGE 5
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'finding_a_therapist',
    title: 'Finding a Therapist',
    readTime: '6 min',
    sections: [
      {
        heading: 'Why you might want a therapist',
        body: `Apps and self-help tools like STORI can do a lot — they can teach you skills, help you track progress, and provide structure for self-guided work. But for some people, and for some stages of recovery, working with a therapist one-to-one offers something distinct: a relational space, tailored clinical judgment, and the experience of being genuinely known and accompanied by another person.\n\nIf your difficulties are severe, complex, or longstanding; if you've experienced trauma; if you feel stuck despite self-directed work — a therapist is worth pursuing.`,
      },
      {
        heading: 'Types of therapy',
        body: `There are many modalities, and evidence for specific approaches varies by condition:\n\nCBT (Cognitive Behavioural Therapy) — the most extensively researched psychological therapy, with strong evidence for depression, all anxiety disorders, OCD, and eating disorders. Structured, skills-focused, typically 8–20 sessions.\n\nACT (Acceptance and Commitment Therapy) — focuses on psychological flexibility, values-based living, and accepting difficult experiences rather than fighting them. Good evidence for depression, anxiety, and chronic pain.\n\nPsychodynamic therapy — explores the role of unconscious patterns, early experience, and the therapeutic relationship. Less structured, often longer-term. Good evidence for depression and personality difficulties.\n\nDBT (Dialectical Behaviour Therapy) — developed for emotionally intense, self-harming presentations. Combines CBT with mindfulness and acceptance strategies. Very effective for people who find emotion regulation particularly difficult.\n\nEMDR (Eye Movement Desensitisation and Reprocessing) — first-line treatment for PTSD. Also used for other trauma-related presentations.\n\nFor most common presentations, CBT is a good first port of call.`,
      },
      {
        heading: 'How to access therapy in the UK',
        body: `NHS: Your GP can refer you to IAPT (Improving Access to Psychological Therapies) services — free CBT-based therapy with typically a few weeks to a few months' wait, depending on your area. You can also self-refer: www.nhs.uk/service-search/mental-health\n\nPrivate therapy: A therapist charges typically £50–£120 per session. Sliding scale and lower-cost options exist. The BACP directory (www.bacp.co.uk/search/therapists) and UKCP (www.psychotherapy.org.uk) allow you to search for accredited therapists.\n\nCharitable and community services: Many organisations offer free or low-cost counselling — particularly for specific groups (young people, survivors of specific experiences, etc). Your GP can advise.`,
      },
      {
        heading: 'What to look for in a therapist',
        body: `Accreditation — look for BABCP (for CBT), BACP, or UKCP accreditation. These indicate that the therapist has met training and ethical standards.\n\nSpecialism — look for someone who works with people with similar difficulties to yours. Most therapist profiles describe their areas of experience.\n\nThe relationship — research consistently finds that the quality of the therapeutic relationship is the strongest predictor of outcomes, across modalities. It's worth trying someone out (most offer an initial consultation) and being honest if the fit doesn't feel right. A good therapist will not be offended.`,
      },
      {
        heading: 'What to expect from therapy',
        body: `Good therapy is rarely comfortable — it involves looking at things you'd often rather not look at. Progress is rarely linear. Some sessions feel productive; others feel frustrating.\n\nIt's worth committing to at least 4–6 sessions before deciding if it's working — early sessions are often assessment and relationship-building rather than the core work.\n\nBe honest with your therapist. Including if something isn't helping or something they do lands badly. A good therapist can work with this — and the ability to have that conversation is itself part of the therapeutic process.`,
      },
    ],
  },

  {
    id: 'relapse_prevention_full',
    title: 'Mental Health Relapse Prevention',
    readTime: '7 min',
    sections: [
      {
        heading: 'What this article is for',
        body: `You've come a long way. You understand your mental health much better than you did. You have tools. You have insight. Now the task shifts: from getting better to staying well.\n\nThis article is about building a comprehensive relapse prevention plan — something you create when you're doing well, that you can rely on if things become difficult again.`,
      },
      {
        heading: 'Understanding your pattern',
        body: `Recovery reveals patterns. Looking back at your most difficult periods, you can usually identify:\n\nTriggers — the types of events or situations that tended to precede a downturn. Not all stress is equal; some themes have particular resonance for you.\n\nMaintaining factors — the things that kept you stuck once things got difficult. Withdrawal, avoidance, stopping helpful habits, not asking for help.\n\nEarly warning signs — the specific, personal changes that appeared before a full downturn developed. These are your early warning system — and the earlier you catch them, the easier it is to intervene.\n\nProtective factors — the things that seemed to buffer you, support you, or make recovery possible. Understanding these is as important as understanding vulnerabilities.`,
      },
      {
        heading: 'Your wellness baseline',
        body: `One of the most useful things you can do is define what "well" looks like for you — specifically and concretely. Not just the absence of symptoms, but the positive markers of your wellbeing:\n\nHow much social contact are you having? How are you sleeping? How is your energy? What activities are you doing? How is your self-talk? What does your relationship with yourself feel like?\n\nHaving a clear picture of your wellness baseline makes it easier to notice early when things are drifting from it.`,
      },
      {
        heading: 'Your maintenance plan',
        body: `The practices that helped you recover usually need to continue — in a sustainable, integrated form — to stay well. Consider:\n\nWhich STORI tools have been most valuable to you? How do you keep them in your life when things are going well?\n\nWhat lifestyle factors matter most for your mental health? Sleep, movement, connection, limiting alcohol? How will you protect these?\n\nAre there any professional relationships (GP, therapist, psychiatrist) worth maintaining, even infrequently?\n\nAre there any annual stressors — particular times of year, predictable difficult periods — where you'd benefit from increased support?`,
      },
      {
        heading: 'Your action plan for early warning signs',
        body: `When you notice your early warning signs, what will you do? Having this decided in advance removes the need to figure it out when you're already struggling.\n\nA tiered approach works well:\n\nLevel 1 (mild signs) — increase use of specific tools, increase exercise, check in with one trusted person.\n\nLevel 2 (several signs, persisting) — contact your GP, consider a therapy top-up session, tell someone close what's happening.\n\nLevel 3 (significant relapse) — immediate GP appointment, potential sick leave, activate your full support network.\n\nKnowing what level 3 looks like for you — and having decided in advance that you'll take it seriously when it arrives — is important.`,
      },
      {
        heading: 'Building your support network',
        body: `Recovery often requires support, and staying well is easier with people who know what you've been through.\n\nWho in your life knows about your mental health history? Who could you call if things got difficult? Is there anyone you'd like to be more open with?\n\nThis doesn't mean telling everyone. But having one or two people who know — who could notice if you were struggling, who you could reach out to without having to explain everything from scratch — is genuinely protective.\n\nConsider having a direct conversation with those people: "I wanted you to know that if I start [early warning sign], it would really help if you [specific thing they could do]."`,
      },
      {
        heading: 'Compassion for the future self who struggles',
        body: `It's easy, when things are going well, to feel that you've got this — that you'll handle things well if difficulties return. This is partly true, but it's worth also extending compassion to the version of yourself who might be struggling in the future.\n\nThat person will be doing their best under difficult circumstances. They may not be thinking clearly. They may not be following the plan. They may need help.\n\nLeaving them good instructions (a written relapse plan), some encouragement ("I know this is hard. I've been here before and I've got through it."), and the knowledge that reaching out is the right call — is one of the best things your current self can do for your future self.`,
      },
    ],
  },

  {
    id: 'lifestyle_optimisation',
    title: 'Lifestyle Optimisation',
    readTime: '7 min',
    sections: [
      {
        heading: 'Beyond the basics',
        body: `The introductory lifestyle article covered the fundamentals: sleep consistency, whole foods, regular movement. By Stage 5, you've likely already integrated many of these. This article goes deeper — into the science and practice of optimising lifestyle for long-term mental health and flourishing.`,
      },
      {
        heading: 'Sleep science',
        body: `Sleep is not just rest — it's an active process of consolidation, restoration, and regulation. Recent research on the glymphatic system has shown that the brain clears metabolic waste products during sleep that accumulate during waking hours. Poor sleep is associated with increased beta-amyloid accumulation — the same plaques found in Alzheimer's disease.\n\nFor mental health specifically, REM sleep is crucial for emotional memory processing — it seems to strip the emotional charge from difficult memories while retaining the factual content. This is why sleep deprivation so reliably worsens emotional reactivity.\n\nOptimising sleep: consistent sleep-wake timing is the single most impactful lever. Temperature — the bedroom should be cool (around 18°C). No alcohol within 3 hours of sleep (it suppresses REM). Morning light exposure within 30 minutes of waking (sets the circadian clock). Limiting caffeine after midday.`,
      },
      {
        heading: 'Exercise and the brain',
        body: `Regular aerobic exercise is one of the most powerful interventions available for brain health and mental wellbeing. The mechanisms are well understood:\n\nBDNF (Brain-Derived Neurotrophic Factor) — often called "fertiliser for the brain," BDNF promotes neurogenesis (growth of new neurons, particularly in the hippocampus, the brain region central to memory and mood regulation). Exercise is the most potent natural stimulator of BDNF.\n\nNeurotransmitter regulation — exercise increases baseline levels of serotonin, dopamine, and norepinephrine — the targets of antidepressant medication.\n\nStress inoculation — regular exercise trains the stress-response system. People who exercise regularly show lower cortisol responses to psychological stressors.\n\nFor optimisation: 150-300 minutes of moderate intensity aerobic exercise per week is the evidence-based target. Zone 2 (conversational pace) for endurance; 1-2 strength sessions per week for metabolic and musculoskeletal health. Consistency over intensity.`,
      },
      {
        heading: 'Nutrition and the brain',
        body: `The emerging field of nutritional psychiatry suggests that diet has a more direct impact on mental health than previously recognised.\n\nThe gut-brain axis: the enteric nervous system (sometimes called the "second brain") contains more neurons than the spinal cord. The microbiome — the community of microorganisms in the gut — produces neurotransmitters, modulates inflammation, and communicates bidirectionally with the brain via the vagus nerve.\n\nDietary patterns associated with better mental health outcomes: the Mediterranean diet (vegetables, fruit, whole grains, legumes, fish, olive oil) consistently shows associations with lower rates of depression. Ultra-processed foods show the opposite association.\n\nSpecific nutrients with evidence: Omega-3 fatty acids (EPA/DHA from oily fish), magnesium (green leafy vegetables, nuts), B vitamins (whole grains, meat, legumes), and vitamin D (sun exposure, oily fish, fortified foods) all have roles in brain function and mood regulation.`,
      },
      {
        heading: 'Connection as medicine',
        body: `Social connection is not a luxury — it's a fundamental biological need. Research by John Cacioppo demonstrated that chronic loneliness has health effects comparable to smoking 15 cigarettes a day.\n\nQuality matters more than quantity. The key variables seem to be felt belonging, reciprocity (giving and receiving), and having at least a few relationships with genuine depth and intimacy.\n\nBuilding connection is an active process at Stage 5 — not just maintaining existing relationships, but investing in building depth, being vulnerable enough to be genuinely known, and contributing to communities beyond your immediate circle.`,
      },
      {
        heading: 'Meaning, purpose, and flourishing',
        body: `Positive psychology research distinguishes between hedonic wellbeing (feeling good) and eudaimonic wellbeing (living well — meaning, engagement, accomplishment, purpose). Both matter; eudaimonic wellbeing seems to be more robust and more strongly associated with long-term mental health.\n\nAt Stage 5, the question shifts from "how do I feel better?" to "how do I live a life that reflects what matters to me?" Values clarification — getting specific about what you care about and whether your life is organised around it — is a powerful frame for this work.\n\nThis might mean reviewing your commitments, making changes to how you spend your time, building new relationships, creating something, contributing to something beyond yourself. The specifics are personal — what matters is the alignment between what you value and how you live.`,
      },
    ],
  },

]

module.exports = psychoedContent