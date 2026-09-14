(function(V){'use strict';
V.questions=[
{
  "id": "moodOcd",
  "domainsCompared": [
    "mood",
    "ocd"
  ],
  "requiredEvidence": {},
  "informationValue": 50,
  "stopWhenKnown": [
    "mood.moodCongruentRumination",
    "ocd.intrusionCompulsionLink"
  ],
  "refinement": false,
  "questionKey": "rv201.question",
  "stopConditions": [
    "safety",
    "unknown",
    "prefer",
    "user_stop",
    "question_limit",
    "discriminated"
  ],
  "version": "symptom-router-v2.0.1",
  "reviewStatus": "unreviewed",
  "options": [
    {
      "value": "mood",
      "labelKey": "rv201.mood",
      "effects": {
        "mood.moodCongruentRumination": true
      }
    },
    {
      "value": "ocd",
      "labelKey": "rv201.ocd",
      "effects": {
        "ocd.intrusionCompulsionLink": true
      }
    },
    {
      "value": "both",
      "labelKey": "rv201.both",
      "effects": {
        "mood.moodCongruentRumination": true,
        "ocd.intrusionCompulsionLink": true
      }
    },
    {
      "value": "unknown",
      "labelKey": "rv2.unknown"
    },
    {
      "value": "prefer",
      "labelKey": "rv2.prefer"
    }
  ]
},
  {
    "id": "moodAnxiety",
    "domainsCompared": [
      "mood",
      "anxiety"
    ],
    "requiredEvidence": {},
    "informationValue": 50,
    "stopWhenKnown": [
      "general.moodLinked"
    ],
    "refinement": false,
    "questionKey": "rv2.moodAnxiety",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "mood",
        "labelKey": "rv2.moodAnxiety_mood",
        "effects": {
          "general.moodLinked": true
        }
      },
      {
        "value": "worry",
        "labelKey": "rv2.moodAnxiety_worry",
        "effects": {
          "general.moodLinked": false
        }
      },
      {
        "value": "both",
        "labelKey": "rv2.moodAnxiety_both",
        "effects": {}
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "ocdGad",
    "domainsCompared": [
      "ocd",
      "anxiety"
    ],
    "requiredEvidence": {},
    "informationValue": 50,
    "stopWhenKnown": [
      "ocd.neutralization"
    ],
    "refinement": false,
    "questionKey": "rv2.ocdGad",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "yes",
        "labelKey": "rv2.ocdGad_yes",
        "effects": {
          "ocd.neutralization": true
        }
      },
      {
        "value": "no",
        "labelKey": "rv2.ocdGad_no",
        "effects": {
          "ocd.neutralization": false
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "ocdTrauma",
    "domainsCompared": [
      "ocd",
      "trauma"
    ],
    "requiredEvidence": {},
    "informationValue": 50,
    "stopWhenKnown": [
      "general.traumaLinked"
    ],
    "refinement": false,
    "questionKey": "rv2.ocdTrauma",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "memory",
        "labelKey": "rv2.ocdTrauma_memory",
        "effects": {
          "trauma.reliving": true,
          "general.traumaLinked": true
        }
      },
      {
        "value": "feared",
        "labelKey": "rv2.ocdTrauma_feared",
        "effects": {
          "ocd.thoughtsUnwanted": true,
          "general.traumaLinked": false
        }
      },
      {
        "value": "both",
        "labelKey": "rv2.ocdTrauma_both",
        "effects": {}
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "ocdPsychosis",
    "domainsCompared": [
      "ocd",
      "psychosis"
    ],
    "requiredEvidence": {},
    "informationValue": 50,
    "stopWhenKnown": [
      "psychosis.realityDifficulty"
    ],
    "refinement": false,
    "questionKey": "rv2.ocdPsychosis",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "doubt",
        "labelKey": "rv2.ocdPsychosis_doubt",
        "effects": {
          "ocd.egoDystonic": true,
          "psychosis.conviction": false
        }
      },
      {
        "value": "certain",
        "labelKey": "rv2.ocdPsychosis_certain",
        "effects": {
          "psychosis.conviction": true,
          "psychosis.realityDifficulty": true
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "adhdMood",
    "domainsCompared": [
      "adhd",
      "mood"
    ],
    "requiredEvidence": {},
    "informationValue": 50,
    "stopWhenKnown": [
      "adhd.preMood"
    ],
    "refinement": false,
    "questionKey": "rv2.adhdMood",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "yes",
        "labelKey": "rv2.adhdMood_yes",
        "effects": {
          "adhd.preMood": true,
          "adhd.developmental": true
        }
      },
      {
        "value": "no",
        "labelKey": "rv2.adhdMood_no",
        "effects": {
          "adhd.preMood": false,
          "adhd.developmental": false
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "adhdAnxiety",
    "domainsCompared": [
      "adhd",
      "anxiety"
    ],
    "requiredEvidence": {},
    "informationValue": 50,
    "stopWhenKnown": [
      "adhd.preWorry"
    ],
    "refinement": false,
    "questionKey": "rv2.adhdAnxiety",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "yes",
        "labelKey": "rv2.adhdAnxiety_yes",
        "effects": {
          "adhd.preWorry": true,
          "adhd.developmental": true
        }
      },
      {
        "value": "no",
        "labelKey": "rv2.adhdAnxiety_no",
        "effects": {
          "adhd.preWorry": false,
          "adhd.developmental": false
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "adhdTrauma",
    "domainsCompared": [
      "adhd",
      "trauma"
    ],
    "requiredEvidence": {},
    "informationValue": 50,
    "stopWhenKnown": [
      "adhd.preTrauma"
    ],
    "refinement": false,
    "questionKey": "rv2.adhdTrauma",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "yes",
        "labelKey": "rv2.adhdTrauma_yes",
        "effects": {
          "adhd.preTrauma": true,
          "adhd.developmental": true
        }
      },
      {
        "value": "no",
        "labelKey": "rv2.adhdTrauma_no",
        "effects": {
          "adhd.preTrauma": false,
          "adhd.developmental": false
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "adhdBipolar",
    "domainsCompared": [
      "adhd",
      "mood"
    ],
    "requiredEvidence": {
      "any": [
        "adhd.impulsive"
      ]
    },
    "informationValue": 60,
    "stopWhenKnown": [
      "mood.episodicElevation"
    ],
    "refinement": false,
    "questionKey": "rv2.adhdBipolar",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "episode",
        "labelKey": "rv2.adhdBipolar_episode",
        "effects": {
          "mood.episodicElevation": true,
          "mood.reducedNeedForSleep": true
        }
      },
      {
        "value": "stable",
        "labelKey": "rv2.adhdBipolar_stable",
        "effects": {
          "mood.episodicElevation": false
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "eatingMood",
    "domainsCompared": [
      "eating",
      "mood"
    ],
    "requiredEvidence": {},
    "informationValue": 50,
    "stopWhenKnown": [
      "eating.moodAppetite"
    ],
    "refinement": false,
    "questionKey": "rv2.eatingMood",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "mood",
        "labelKey": "rv2.eatingMood_mood",
        "effects": {
          "eating.moodAppetite": true
        }
      },
      {
        "value": "weight",
        "labelKey": "rv2.eatingMood_weight",
        "effects": {
          "eating.moodAppetite": false,
          "eating.weightFear": true
        }
      },
      {
        "value": "other",
        "labelKey": "rv2.eatingMood_other",
        "effects": {
          "eating.moodAppetite": false
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "eatingOcd",
    "domainsCompared": [
      "eating",
      "ocd"
    ],
    "requiredEvidence": {},
    "informationValue": 50,
    "stopWhenKnown": [
      "eating.contamination"
    ],
    "refinement": false,
    "questionKey": "rv2.eatingOcd",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "yes",
        "labelKey": "rv2.eatingOcd_yes",
        "effects": {
          "eating.contamination": true,
          "ocd.neutralization": true
        }
      },
      {
        "value": "no",
        "labelKey": "rv2.eatingOcd_no",
        "effects": {
          "eating.contamination": false
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "eatingAnxiety",
    "domainsCompared": [
      "eating",
      "anxiety"
    ],
    "requiredEvidence": {},
    "informationValue": 50,
    "stopWhenKnown": [
      "eating.consequenceFear"
    ],
    "refinement": false,
    "questionKey": "rv2.eatingAnxiety",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "food",
        "labelKey": "rv2.eatingAnxiety_food",
        "effects": {
          "eating.consequenceFear": true
        }
      },
      {
        "value": "broad",
        "labelKey": "rv2.eatingAnxiety_broad",
        "effects": {
          "anxiety.excessiveWorry": true
        }
      },
      {
        "value": "both",
        "labelKey": "rv2.eatingAnxiety_both",
        "effects": {
          "eating.consequenceFear": true,
          "anxiety.excessiveWorry": true
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "anArfid",
    "domainsCompared": [
      "eating"
    ],
    "requiredEvidence": {
      "any": [
        "eating.restriction",
        "eating.avoidance"
      ]
    },
    "informationValue": 35,
    "stopWhenKnown": [
      "eating.weightFear"
    ],
    "refinement": true,
    "questionKey": "rv2.anArfid",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "yes",
        "labelKey": "rv2.anArfid_yes",
        "effects": {
          "eating.weightFear": true
        }
      },
      {
        "value": "no",
        "labelKey": "rv2.anArfid_no",
        "effects": {
          "eating.weightFear": false
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "bnBed",
    "domainsCompared": [
      "eating"
    ],
    "requiredEvidence": {
      "all": [
        "eating.binge",
        "eating.loss"
      ]
    },
    "informationValue": 35,
    "stopWhenKnown": [
      "eating.compensation"
    ],
    "refinement": true,
    "questionKey": "rv2.bnBed",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "yes",
        "labelKey": "rv2.bnBed_yes",
        "effects": {
          "eating.compensation": true
        }
      },
      {
        "value": "no",
        "labelKey": "rv2.bnBed_no",
        "effects": {
          "eating.compensation": false
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "psychosisTrauma",
    "domainsCompared": [
      "psychosis",
      "trauma"
    ],
    "requiredEvidence": {},
    "informationValue": 50,
    "stopWhenKnown": [
      "psychosis.traumaContext"
    ],
    "refinement": false,
    "questionKey": "rv2.psychosisTrauma",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "yes",
        "labelKey": "rv2.psychosisTrauma_yes",
        "effects": {
          "psychosis.traumaContext": true
        }
      },
      {
        "value": "no",
        "labelKey": "rv2.psychosisTrauma_no",
        "effects": {
          "psychosis.traumaContext": false
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "psychosisDissociation",
    "domainsCompared": [
      "psychosis"
    ],
    "requiredEvidence": {
      "all": [
        "trauma.dissociation"
      ]
    },
    "informationValue": 50,
    "stopWhenKnown": [
      "psychosis.realityDifficulty"
    ],
    "refinement": true,
    "questionKey": "rv2.psychosisDissociation",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "unreal",
        "labelKey": "rv2.psychosisDissociation_unreal",
        "effects": {
          "psychosis.realityDifficulty": false
        }
      },
      {
        "value": "reality",
        "labelKey": "rv2.psychosisDissociation_reality",
        "effects": {
          "psychosis.realityDifficulty": true
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "psychosisMood",
    "domainsCompared": [
      "psychosis",
      "mood"
    ],
    "requiredEvidence": {},
    "informationValue": 50,
    "stopWhenKnown": [
      "general.moodLinked"
    ],
    "refinement": false,
    "questionKey": "rv2.psychosisMood",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "yes",
        "labelKey": "rv2.psychosisMood_yes",
        "effects": {
          "general.moodLinked": true
        }
      },
      {
        "value": "no",
        "labelKey": "rv2.psychosisMood_no",
        "effects": {
          "general.moodLinked": false
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "sleepPsychosis",
    "domainsCompared": [
      "psychosis"
    ],
    "requiredEvidence": {
      "all": [
        "psychosis.perception"
      ]
    },
    "informationValue": 20,
    "stopWhenKnown": [
      "psychosis.sleep"
    ],
    "refinement": true,
    "questionKey": "rv2.sleepPsychosis",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "yes",
        "labelKey": "rv2.sleepPsychosis_yes",
        "effects": {
          "psychosis.sleep": true
        }
      },
      {
        "value": "no",
        "labelKey": "rv2.sleepPsychosis_no",
        "effects": {
          "psychosis.sleep": false,
          "psychosis.awake": true
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  },
  {
    "id": "attentionContext",
    "domainsCompared": [
      "adhd"
    ],
    "requiredEvidence": {},
    "informationValue": 10,
    "stopWhenKnown": [
      "adhd.developmental"
    ],
    "refinement": false,
    "questionKey": "rv2.attentionContext",
    "stopConditions": [
      "safety",
      "unknown",
      "prefer",
      "user_stop",
      "question_limit",
      "discriminated"
    ],
    "version": "symptom-router-v2.0.0",
    "reviewStatus": "unreviewed",
    "options": [
      {
        "value": "yes",
        "labelKey": "rv2.attentionContext_yes",
        "effects": {
          "adhd.developmental": true,
          "adhd.crossSetting": true
        }
      },
      {
        "value": "no",
        "labelKey": "rv2.attentionContext_no",
        "effects": {
          "adhd.developmental": false,
          "adhd.crossSetting": false
        }
      },
      {
        "value": "unknown",
        "labelKey": "rv2.unknown"
      },
      {
        "value": "prefer",
        "labelKey": "rv2.prefer"
      }
    ]
  }
];
for(const d of V.domains.values())d.clarificationCandidates.push(...V.questions.filter(q=>q.domainsCompared.includes(d.id)).map(q=>q.id));
})(globalThis.RouterV2);
