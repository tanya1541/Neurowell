// STORI-30: 6 groups x 5 questions
// Scoring: 1=disagree strongly, 2=disagree, 3=unsure, 4=agree, 5=agree strongly
// Stage is determined by POSITION within each group (not group number)
// Position 1 of every group → Stage 1, Position 2 → Stage 2, etc.
// Each stage is scored by 6 questions (one from each group). Max score = 30

module.exports = [
  // Group 1 
  { id: 1,  group: 1, text: "I feel like my life has been ruined by what I'm going through." },
  { id: 2,  group: 1, text: "I want to start learning how to cope with how I've been feeling." },
  { id: 3,  group: 1, text: "I am just starting to work towards getting my life back on track." },
  { id: 4,  group: 1, text: "I am working on things that give me a sense of purpose in my life." },
  { id: 5,  group: 1, text: "My life is really good now and the future looks bright." },

  // Group 2 
  { id: 6,  group: 2, text: "I feel like I am nothing but my problems — like there's nothing more to me." },
  { id: 7,  group: 2, text: "Because others believed in me, I've just started to think maybe I can get better." },
  { id: 8,  group: 2, text: "I am starting to figure out what I am good at and what I find difficult." },
  { id: 9,  group: 2, text: "These days I am working on things in my life that are personally important to me." },
  { id: 10, group: 2, text: "I am doing worthwhile and satisfying things in my life." },

  // Group 3 
  { id: 11, group: 3, text: "I feel like I don't know who I am anymore." },
  { id: 12, group: 3, text: "I have started to accept that this is part of my life and I will learn to live with it." },
  { id: 13, group: 3, text: "I am starting to think about what my special qualities are." },
  { id: 14, group: 3, text: "I am learning new things about myself as I work through my difficulties." },
  { id: 15, group: 3, text: "I am happy with who I am as a person." },

  // Group 4 
  { id: 16, group: 4, text: "My life feels completely pointless right now." },
  { id: 17, group: 4, text: "I am just starting to think that maybe I can do something with my life." },
  { id: 18, group: 4, text: "I am just starting to realise that I can still be a valuable person." },
  { id: 19, group: 4, text: "I am starting to feel like I am making a valuable contribution to life." },
  { id: 20, group: 4, text: "I look forward to facing new challenges in life." },

  // Group 5 
  { id: 21, group: 5, text: "I feel like I can't do anything about my situation." },
  { id: 22, group: 5, text: "I want to start learning how to look after myself properly." },
  { id: 23, group: 5, text: "I am starting to feel more confident about learning to manage day to day." },
  { id: 24, group: 5, text: "Going through this has taught me a lot about life." },
  { id: 25, group: 5, text: "I am managing well now." },

  // Group 6 
  { id: 26, group: 6, text: "I don't seem to have any control over my life right now." },
  { id: 27, group: 6, text: "I'm starting to think there are things I can do to help myself." },
  { id: 28, group: 6, text: "I am learning about mental health and how I can support myself." },
  { id: 29, group: 6, text: "I am working hard at staying well, and I know it will be worth it." },
  { id: 30, group: 6, text: "I am in control of my life." },
]