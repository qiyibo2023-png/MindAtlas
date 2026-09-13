(function(T){'use strict';T.version='ptsd-trauma-assessment-v1.0.0';T.sections=[
  {
    "id": "intro",
    "label": "traumaUI.section_intro",
    "questions": [
      {
        "id": "intro.agree",
        "label": "traumaUI.q_intro_agree",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "intro.adult",
        "label": "traumaUI.q_intro_adult",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "intro.concern",
        "label": "traumaUI.q_intro_concern",
        "options": [
          [
            "symptoms",
            "traumaUI.option_symptoms"
          ],
          [
            "memories",
            "traumaUI.option_memories"
          ],
          [
            "uncertain",
            "traumaUI.option_uncertain"
          ]
        ],
        "optional": false
      }
    ]
  },
  {
    "id": "exposure",
    "label": "traumaUI.section_exposure",
    "questions": [
      {
        "id": "exposure.threshold",
        "label": "traumaUI.q_exposure_threshold",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "exposure.mode",
        "label": "traumaUI.q_exposure_mode",
        "options": [
          [
            "direct",
            "traumaUI.option_direct"
          ],
          [
            "witness",
            "traumaUI.option_witness"
          ],
          [
            "close",
            "traumaUI.option_close"
          ],
          [
            "occupation",
            "traumaUI.option_occupation"
          ],
          [
            "media",
            "traumaUI.option_media"
          ],
          [
            "other",
            "traumaUI.option_other"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "exposure.closeViolent",
        "label": "traumaUI.q_exposure_closeViolent",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "exposure.timing",
        "label": "traumaUI.q_exposure_timing",
        "options": [
          [
            "recent",
            "traumaUI.option_recent"
          ],
          [
            "older",
            "traumaUI.option_older"
          ],
          [
            "ongoing",
            "traumaUI.option_ongoing"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": true
      },
      {
        "id": "exposure.category",
        "label": "traumaUI.q_exposure_category",
        "options": [
          [
            "accident",
            "traumaUI.option_accident"
          ],
          [
            "assault",
            "traumaUI.option_assault"
          ],
          [
            "sexual",
            "traumaUI.option_sexual"
          ],
          [
            "war",
            "traumaUI.option_war"
          ],
          [
            "disaster",
            "traumaUI.option_disaster"
          ],
          [
            "illness",
            "traumaUI.option_illness"
          ],
          [
            "witnessed",
            "traumaUI.option_witnessed"
          ],
          [
            "closeEvent",
            "traumaUI.option_closeEvent"
          ],
          [
            "occupational",
            "traumaUI.option_occupational"
          ],
          [
            "severeEvent",
            "traumaUI.option_severeEvent"
          ],
          [
            "stressor",
            "traumaUI.option_stressor"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": true
      }
    ]
  },
  {
    "id": "intrusion",
    "label": "traumaUI.section_intrusion",
    "questions": [
      {
        "id": "intrusion.linked",
        "label": "traumaUI.q_intrusion_linked",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "intrusion.memories",
        "label": "traumaUI.q_intrusion_memories",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "intrusion.nightmares",
        "label": "traumaUI.q_intrusion_nightmares",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "intrusion.reliving",
        "label": "traumaUI.q_intrusion_reliving",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "intrusion.emotional",
        "label": "traumaUI.q_intrusion_emotional",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "intrusion.physical",
        "label": "traumaUI.q_intrusion_physical",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      }
    ]
  },
  {
    "id": "avoidance",
    "label": "traumaUI.section_avoidance",
    "questions": [
      {
        "id": "avoidance.linked",
        "label": "traumaUI.q_avoidance_linked",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "avoidance.internal",
        "label": "traumaUI.q_avoidance_internal",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "avoidance.external",
        "label": "traumaUI.q_avoidance_external",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      }
    ]
  },
  {
    "id": "negative",
    "label": "traumaUI.section_negative",
    "questions": [
      {
        "id": "negative.linked",
        "label": "traumaUI.q_negative_linked",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "negative.beliefs",
        "label": "traumaUI.q_negative_beliefs",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "negative.blame",
        "label": "traumaUI.q_negative_blame",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "negative.emotion",
        "label": "traumaUI.q_negative_emotion",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "negative.interest",
        "label": "traumaUI.q_negative_interest",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "negative.detachment",
        "label": "traumaUI.q_negative_detachment",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "negative.positive",
        "label": "traumaUI.q_negative_positive",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "negative.memory",
        "label": "traumaUI.q_negative_memory",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      }
    ]
  },
  {
    "id": "arousal",
    "label": "traumaUI.section_arousal",
    "questions": [
      {
        "id": "arousal.linked",
        "label": "traumaUI.q_arousal_linked",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "arousal.alert",
        "label": "traumaUI.q_arousal_alert",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "arousal.startle",
        "label": "traumaUI.q_arousal_startle",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "arousal.anger",
        "label": "traumaUI.q_arousal_anger",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "arousal.sleep",
        "label": "traumaUI.q_arousal_sleep",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "arousal.focus",
        "label": "traumaUI.q_arousal_focus",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "arousal.reckless",
        "label": "traumaUI.q_arousal_reckless",
        "options": [
          [
            "0",
            "traumaUI.option_0"
          ],
          [
            "1",
            "traumaUI.option_1"
          ],
          [
            "2",
            "traumaUI.option_2"
          ],
          [
            "3",
            "traumaUI.option_3"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      }
    ]
  },
  {
    "id": "course",
    "label": "traumaUI.section_course",
    "questions": [
      {
        "id": "course.duration",
        "label": "traumaUI.q_course_duration",
        "options": [
          [
            "under3",
            "traumaUI.option_under3"
          ],
          [
            "3to30",
            "traumaUI.option_3to30"
          ],
          [
            "overMonth",
            "traumaUI.option_overMonth"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "course.current",
        "label": "traumaUI.q_course_current",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "course.distress",
        "label": "traumaUI.q_course_distress",
        "options": [
          [
            "none",
            "traumaUI.option_none"
          ],
          [
            "mild",
            "traumaUI.option_mild"
          ],
          [
            "moderate",
            "traumaUI.option_moderate"
          ],
          [
            "severe",
            "traumaUI.option_severe"
          ],
          [
            "na",
            "traumaUI.option_na"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      }
    ]
  },
  {
    "id": "function",
    "label": "traumaUI.section_function",
    "questions": [
      {
        "id": "function.work",
        "label": "traumaUI.q_function_work",
        "options": [
          [
            "none",
            "traumaUI.option_none"
          ],
          [
            "mild",
            "traumaUI.option_mild"
          ],
          [
            "moderate",
            "traumaUI.option_moderate"
          ],
          [
            "severe",
            "traumaUI.option_severe"
          ],
          [
            "na",
            "traumaUI.option_na"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "function.school",
        "label": "traumaUI.q_function_school",
        "options": [
          [
            "none",
            "traumaUI.option_none"
          ],
          [
            "mild",
            "traumaUI.option_mild"
          ],
          [
            "moderate",
            "traumaUI.option_moderate"
          ],
          [
            "severe",
            "traumaUI.option_severe"
          ],
          [
            "na",
            "traumaUI.option_na"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "function.relationships",
        "label": "traumaUI.q_function_relationships",
        "options": [
          [
            "none",
            "traumaUI.option_none"
          ],
          [
            "mild",
            "traumaUI.option_mild"
          ],
          [
            "moderate",
            "traumaUI.option_moderate"
          ],
          [
            "severe",
            "traumaUI.option_severe"
          ],
          [
            "na",
            "traumaUI.option_na"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "function.sleep",
        "label": "traumaUI.q_function_sleep",
        "options": [
          [
            "none",
            "traumaUI.option_none"
          ],
          [
            "mild",
            "traumaUI.option_mild"
          ],
          [
            "moderate",
            "traumaUI.option_moderate"
          ],
          [
            "severe",
            "traumaUI.option_severe"
          ],
          [
            "na",
            "traumaUI.option_na"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "function.selfCare",
        "label": "traumaUI.q_function_selfCare",
        "options": [
          [
            "none",
            "traumaUI.option_none"
          ],
          [
            "mild",
            "traumaUI.option_mild"
          ],
          [
            "moderate",
            "traumaUI.option_moderate"
          ],
          [
            "severe",
            "traumaUI.option_severe"
          ],
          [
            "na",
            "traumaUI.option_na"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "function.leaving",
        "label": "traumaUI.q_function_leaving",
        "options": [
          [
            "none",
            "traumaUI.option_none"
          ],
          [
            "mild",
            "traumaUI.option_mild"
          ],
          [
            "moderate",
            "traumaUI.option_moderate"
          ],
          [
            "severe",
            "traumaUI.option_severe"
          ],
          [
            "na",
            "traumaUI.option_na"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "function.focus",
        "label": "traumaUI.q_function_focus",
        "options": [
          [
            "none",
            "traumaUI.option_none"
          ],
          [
            "mild",
            "traumaUI.option_mild"
          ],
          [
            "moderate",
            "traumaUI.option_moderate"
          ],
          [
            "severe",
            "traumaUI.option_severe"
          ],
          [
            "na",
            "traumaUI.option_na"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "function.social",
        "label": "traumaUI.q_function_social",
        "options": [
          [
            "none",
            "traumaUI.option_none"
          ],
          [
            "mild",
            "traumaUI.option_mild"
          ],
          [
            "moderate",
            "traumaUI.option_moderate"
          ],
          [
            "severe",
            "traumaUI.option_severe"
          ],
          [
            "na",
            "traumaUI.option_na"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "function.routine",
        "label": "traumaUI.q_function_routine",
        "options": [
          [
            "none",
            "traumaUI.option_none"
          ],
          [
            "mild",
            "traumaUI.option_mild"
          ],
          [
            "moderate",
            "traumaUI.option_moderate"
          ],
          [
            "severe",
            "traumaUI.option_severe"
          ],
          [
            "na",
            "traumaUI.option_na"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "function.intimacy",
        "label": "traumaUI.q_function_intimacy",
        "options": [
          [
            "none",
            "traumaUI.option_none"
          ],
          [
            "mild",
            "traumaUI.option_mild"
          ],
          [
            "moderate",
            "traumaUI.option_moderate"
          ],
          [
            "severe",
            "traumaUI.option_severe"
          ],
          [
            "na",
            "traumaUI.option_na"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": true
      }
    ]
  },
  {
    "id": "dissociation",
    "label": "traumaUI.section_dissociation",
    "questions": [
      {
        "id": "dissociation.self",
        "label": "traumaUI.q_dissociation_self",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "dissociation.world",
        "label": "traumaUI.q_dissociation_world",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "dissociation.reality",
        "label": "traumaUI.q_dissociation_reality",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "dissociation.fixed",
        "label": "traumaUI.q_dissociation_fixed",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      }
    ]
  },
  {
    "id": "ruleouts",
    "label": "traumaUI.section_ruleouts",
    "questions": [
      {
        "id": "medical.contribution",
        "label": "traumaUI.q_medical_contribution",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "medical.memory",
        "label": "traumaUI.q_medical_memory",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "substance.contribution",
        "label": "traumaUI.q_substance_contribution",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      }
    ]
  },
  {
    "id": "context",
    "label": "traumaUI.section_context",
    "questions": [
      {
        "id": "context.hypothetical",
        "label": "traumaUI.q_context_hypothetical",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "context.broadWorry",
        "label": "traumaUI.q_context_broadWorry",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "context.panicReminder",
        "label": "traumaUI.q_context_panicReminder",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "context.unexpectedPanic",
        "label": "traumaUI.q_context_unexpectedPanic",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      },
      {
        "id": "context.broadMood",
        "label": "traumaUI.q_context_broadMood",
        "options": [
          [
            "yes",
            "traumaUI.option_yes"
          ],
          [
            "no",
            "traumaUI.option_no"
          ],
          [
            "unknown",
            "traumaUI.option_unknown"
          ]
        ],
        "optional": false
      }
    ]
  }
];T.clusters={"intrusion":["memories","nightmares","reliving","emotional","physical"],"avoidance":["internal","external"],"negative":["beliefs","blame","emotion","interest","detachment","positive","memory"],"arousal":["alert","startle","anger","sleep","focus","reckless"]};T.questions=T.sections.flatMap(s=>s.questions);T.questions.forEach(q=>{q.label=I18n.pair(q.label);q.options=q.options.map(([v,k])=>[v,...I18n.pair(k)]);});})(globalThis.Trauma=globalThis.Trauma||{});
