(function(A){'use strict';
A.version='psychosis-assessment-v1.0.0';A.copy={...Eating.copy,...{"title":"psychosisUI.title","intro":"psychosisUI.intro","custom":"psychosisUI.custom","clear":"psychosisUI.clear","privacy":"psychosisUI.privacy","high":"psychosisUI.high","moderate":"psychosisUI.moderate","low":"psychosisUI.low","insufficient":"psychosisUI.insufficient","psychosis":"psychosisUI.psychosis","care":"psychosisUI.care","medicalWarning":"psychosisUI.medicalWarning","review":"psychosisUI.review","patternReason":"psychosisUI.patternReason","partialReason":"psychosisUI.partialReason","mixedReason":"psychosisUI.mixedReason","moodCompare":"psychosisUI.moodCompare","bipolarCompare":"psychosisUI.bipolarCompare","ocdCompare":"psychosisUI.ocdCompare","traumaCompare":"psychosisUI.traumaCompare","dissociationCompare":"psychosisUI.dissociationCompare","anxietyCompare":"psychosisUI.anxietyCompare","adhdCompare":"psychosisUI.adhdCompare","sleepCompare":"psychosisUI.sleepCompare","cultureCompare":"psychosisUI.cultureCompare","griefCompare":"psychosisUI.griefCompare","medicalCompare":"psychosisUI.medicalCompare","substanceCompare":"psychosisUI.substanceCompare","routerReason":"psychosisUI.routerReason","coherent":"psychosisUI.coherent","qualified":"psychosisUI.qualified","impact":"psychosisUI.impact","independent":"psychosisUI.independent"}};
A.modalities=["audio","visual","tactile","smell","presence","distortion"];A.sections=[
  {
    "id": "intro",
    "label": "psychosisUI.section_intro",
    "questions": [
      {
        "id": "intro.agree",
        "label": "psychosisUI.q_intro_agree",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "intro.adult",
        "label": "psychosisUI.q_intro_adult",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "perception",
    "label": "psychosisUI.section_perception",
    "questions": [
      {
        "id": "perception.audio",
        "label": "psychosisUI.q_perception_audio",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "perception.visual",
        "label": "psychosisUI.q_perception_visual",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "perception.tactile",
        "label": "psychosisUI.q_perception_tactile",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "perception.smell",
        "label": "psychosisUI.q_perception_smell",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "perception.presence",
        "label": "psychosisUI.q_perception_presence",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "perception.distortion",
        "label": "psychosisUI.q_perception_distortion",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "audio",
    "label": "psychosisUI.section_audio",
    "when": "perception.audio",
    "questions": [
      {
        "id": "audio.type",
        "label": "psychosisUI.q_audio_type",
        "options": [
          [
            "name",
            "psychosisUI.opt_auditory_name"
          ],
          [
            "internal",
            "psychosisUI.opt_auditory_internal"
          ],
          [
            "external",
            "psychosisUI.opt_auditory_external"
          ],
          [
            "commentary",
            "psychosisUI.opt_auditory_commentary"
          ],
          [
            "command",
            "psychosisUI.opt_auditory_command"
          ],
          [
            "unknown",
            "psychosisUI.opt_auditory_unknown"
          ]
        ]
      },
      {
        "id": "audio.time",
        "label": "psychosisUI.q_audio_time",
        "options": [
          [
            "current",
            "psychosisUI.opt_time_current"
          ],
          [
            "history",
            "psychosisUI.opt_time_history"
          ],
          [
            "unknown",
            "psychosisUI.opt_time_unknown"
          ]
        ]
      },
      {
        "id": "audio.frequency",
        "label": "psychosisUI.q_audio_frequency",
        "options": [
          [
            "isolated",
            "psychosisUI.opt_freq_isolated"
          ],
          [
            "recurrent",
            "psychosisUI.opt_freq_recurrent"
          ],
          [
            "unknown",
            "psychosisUI.opt_freq_unknown"
          ]
        ]
      },
      {
        "id": "audio.awake",
        "label": "psychosisUI.q_audio_awake",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "audio.conviction",
        "label": "psychosisUI.q_audio_conviction",
        "options": [
          [
            "doubt",
            "psychosisUI.opt_conviction_doubt"
          ],
          [
            "uncertain",
            "psychosisUI.opt_conviction_uncertain"
          ],
          [
            "strong",
            "psychosisUI.opt_conviction_strong"
          ],
          [
            "complete",
            "psychosisUI.opt_conviction_complete"
          ],
          [
            "fluctuating",
            "psychosisUI.opt_conviction_fluctuating"
          ],
          [
            "unknown",
            "psychosisUI.opt_conviction_unknown"
          ]
        ]
      },
      {
        "id": "audio.insight",
        "label": "psychosisUI.q_audio_insight",
        "options": [
          [
            "open",
            "psychosisUI.opt_insight_open"
          ],
          [
            "some",
            "psychosisUI.opt_insight_some"
          ],
          [
            "limited",
            "psychosisUI.opt_insight_limited"
          ],
          [
            "none",
            "psychosisUI.opt_insight_none"
          ],
          [
            "unknown",
            "psychosisUI.opt_insight_unknown"
          ]
        ]
      },
      {
        "id": "audio.distress",
        "label": "psychosisUI.q_audio_distress",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "audio.impact",
        "label": "psychosisUI.q_audio_impact",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "audio.sleep",
        "label": "psychosisUI.q_audio_sleep",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "audio.trauma",
        "label": "psychosisUI.q_audio_trauma",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "audio.substance",
        "label": "psychosisUI.q_audio_substance",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "visual",
    "label": "psychosisUI.section_visual",
    "when": "perception.visual",
    "questions": [
      {
        "id": "visual.time",
        "label": "psychosisUI.q_visual_time",
        "options": [
          [
            "current",
            "psychosisUI.opt_time_current"
          ],
          [
            "history",
            "psychosisUI.opt_time_history"
          ],
          [
            "unknown",
            "psychosisUI.opt_time_unknown"
          ]
        ]
      },
      {
        "id": "visual.frequency",
        "label": "psychosisUI.q_visual_frequency",
        "options": [
          [
            "isolated",
            "psychosisUI.opt_freq_isolated"
          ],
          [
            "recurrent",
            "psychosisUI.opt_freq_recurrent"
          ],
          [
            "unknown",
            "psychosisUI.opt_freq_unknown"
          ]
        ]
      },
      {
        "id": "visual.awake",
        "label": "psychosisUI.q_visual_awake",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "visual.conviction",
        "label": "psychosisUI.q_visual_conviction",
        "options": [
          [
            "doubt",
            "psychosisUI.opt_conviction_doubt"
          ],
          [
            "uncertain",
            "psychosisUI.opt_conviction_uncertain"
          ],
          [
            "strong",
            "psychosisUI.opt_conviction_strong"
          ],
          [
            "complete",
            "psychosisUI.opt_conviction_complete"
          ],
          [
            "fluctuating",
            "psychosisUI.opt_conviction_fluctuating"
          ],
          [
            "unknown",
            "psychosisUI.opt_conviction_unknown"
          ]
        ]
      },
      {
        "id": "visual.insight",
        "label": "psychosisUI.q_visual_insight",
        "options": [
          [
            "open",
            "psychosisUI.opt_insight_open"
          ],
          [
            "some",
            "psychosisUI.opt_insight_some"
          ],
          [
            "limited",
            "psychosisUI.opt_insight_limited"
          ],
          [
            "none",
            "psychosisUI.opt_insight_none"
          ],
          [
            "unknown",
            "psychosisUI.opt_insight_unknown"
          ]
        ]
      },
      {
        "id": "visual.distress",
        "label": "psychosisUI.q_visual_distress",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "visual.impact",
        "label": "psychosisUI.q_visual_impact",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "visual.sleep",
        "label": "psychosisUI.q_visual_sleep",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "visual.trauma",
        "label": "psychosisUI.q_visual_trauma",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "visual.substance",
        "label": "psychosisUI.q_visual_substance",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "tactile",
    "label": "psychosisUI.section_tactile",
    "when": "perception.tactile",
    "questions": [
      {
        "id": "tactile.time",
        "label": "psychosisUI.q_tactile_time",
        "options": [
          [
            "current",
            "psychosisUI.opt_time_current"
          ],
          [
            "history",
            "psychosisUI.opt_time_history"
          ],
          [
            "unknown",
            "psychosisUI.opt_time_unknown"
          ]
        ]
      },
      {
        "id": "tactile.frequency",
        "label": "psychosisUI.q_tactile_frequency",
        "options": [
          [
            "isolated",
            "psychosisUI.opt_freq_isolated"
          ],
          [
            "recurrent",
            "psychosisUI.opt_freq_recurrent"
          ],
          [
            "unknown",
            "psychosisUI.opt_freq_unknown"
          ]
        ]
      },
      {
        "id": "tactile.awake",
        "label": "psychosisUI.q_tactile_awake",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "tactile.conviction",
        "label": "psychosisUI.q_tactile_conviction",
        "options": [
          [
            "doubt",
            "psychosisUI.opt_conviction_doubt"
          ],
          [
            "uncertain",
            "psychosisUI.opt_conviction_uncertain"
          ],
          [
            "strong",
            "psychosisUI.opt_conviction_strong"
          ],
          [
            "complete",
            "psychosisUI.opt_conviction_complete"
          ],
          [
            "fluctuating",
            "psychosisUI.opt_conviction_fluctuating"
          ],
          [
            "unknown",
            "psychosisUI.opt_conviction_unknown"
          ]
        ]
      },
      {
        "id": "tactile.insight",
        "label": "psychosisUI.q_tactile_insight",
        "options": [
          [
            "open",
            "psychosisUI.opt_insight_open"
          ],
          [
            "some",
            "psychosisUI.opt_insight_some"
          ],
          [
            "limited",
            "psychosisUI.opt_insight_limited"
          ],
          [
            "none",
            "psychosisUI.opt_insight_none"
          ],
          [
            "unknown",
            "psychosisUI.opt_insight_unknown"
          ]
        ]
      },
      {
        "id": "tactile.distress",
        "label": "psychosisUI.q_tactile_distress",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "tactile.impact",
        "label": "psychosisUI.q_tactile_impact",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "tactile.sleep",
        "label": "psychosisUI.q_tactile_sleep",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "tactile.trauma",
        "label": "psychosisUI.q_tactile_trauma",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "tactile.substance",
        "label": "psychosisUI.q_tactile_substance",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "smell",
    "label": "psychosisUI.section_smell",
    "when": "perception.smell",
    "questions": [
      {
        "id": "smell.time",
        "label": "psychosisUI.q_smell_time",
        "options": [
          [
            "current",
            "psychosisUI.opt_time_current"
          ],
          [
            "history",
            "psychosisUI.opt_time_history"
          ],
          [
            "unknown",
            "psychosisUI.opt_time_unknown"
          ]
        ]
      },
      {
        "id": "smell.frequency",
        "label": "psychosisUI.q_smell_frequency",
        "options": [
          [
            "isolated",
            "psychosisUI.opt_freq_isolated"
          ],
          [
            "recurrent",
            "psychosisUI.opt_freq_recurrent"
          ],
          [
            "unknown",
            "psychosisUI.opt_freq_unknown"
          ]
        ]
      },
      {
        "id": "smell.awake",
        "label": "psychosisUI.q_smell_awake",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "smell.conviction",
        "label": "psychosisUI.q_smell_conviction",
        "options": [
          [
            "doubt",
            "psychosisUI.opt_conviction_doubt"
          ],
          [
            "uncertain",
            "psychosisUI.opt_conviction_uncertain"
          ],
          [
            "strong",
            "psychosisUI.opt_conviction_strong"
          ],
          [
            "complete",
            "psychosisUI.opt_conviction_complete"
          ],
          [
            "fluctuating",
            "psychosisUI.opt_conviction_fluctuating"
          ],
          [
            "unknown",
            "psychosisUI.opt_conviction_unknown"
          ]
        ]
      },
      {
        "id": "smell.insight",
        "label": "psychosisUI.q_smell_insight",
        "options": [
          [
            "open",
            "psychosisUI.opt_insight_open"
          ],
          [
            "some",
            "psychosisUI.opt_insight_some"
          ],
          [
            "limited",
            "psychosisUI.opt_insight_limited"
          ],
          [
            "none",
            "psychosisUI.opt_insight_none"
          ],
          [
            "unknown",
            "psychosisUI.opt_insight_unknown"
          ]
        ]
      },
      {
        "id": "smell.distress",
        "label": "psychosisUI.q_smell_distress",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "smell.impact",
        "label": "psychosisUI.q_smell_impact",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "smell.sleep",
        "label": "psychosisUI.q_smell_sleep",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "smell.trauma",
        "label": "psychosisUI.q_smell_trauma",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "smell.substance",
        "label": "psychosisUI.q_smell_substance",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "presence",
    "label": "psychosisUI.section_presence",
    "when": "perception.presence",
    "questions": [
      {
        "id": "presence.time",
        "label": "psychosisUI.q_presence_time",
        "options": [
          [
            "current",
            "psychosisUI.opt_time_current"
          ],
          [
            "history",
            "psychosisUI.opt_time_history"
          ],
          [
            "unknown",
            "psychosisUI.opt_time_unknown"
          ]
        ]
      },
      {
        "id": "presence.frequency",
        "label": "psychosisUI.q_presence_frequency",
        "options": [
          [
            "isolated",
            "psychosisUI.opt_freq_isolated"
          ],
          [
            "recurrent",
            "psychosisUI.opt_freq_recurrent"
          ],
          [
            "unknown",
            "psychosisUI.opt_freq_unknown"
          ]
        ]
      },
      {
        "id": "presence.awake",
        "label": "psychosisUI.q_presence_awake",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "presence.conviction",
        "label": "psychosisUI.q_presence_conviction",
        "options": [
          [
            "doubt",
            "psychosisUI.opt_conviction_doubt"
          ],
          [
            "uncertain",
            "psychosisUI.opt_conviction_uncertain"
          ],
          [
            "strong",
            "psychosisUI.opt_conviction_strong"
          ],
          [
            "complete",
            "psychosisUI.opt_conviction_complete"
          ],
          [
            "fluctuating",
            "psychosisUI.opt_conviction_fluctuating"
          ],
          [
            "unknown",
            "psychosisUI.opt_conviction_unknown"
          ]
        ]
      },
      {
        "id": "presence.insight",
        "label": "psychosisUI.q_presence_insight",
        "options": [
          [
            "open",
            "psychosisUI.opt_insight_open"
          ],
          [
            "some",
            "psychosisUI.opt_insight_some"
          ],
          [
            "limited",
            "psychosisUI.opt_insight_limited"
          ],
          [
            "none",
            "psychosisUI.opt_insight_none"
          ],
          [
            "unknown",
            "psychosisUI.opt_insight_unknown"
          ]
        ]
      },
      {
        "id": "presence.distress",
        "label": "psychosisUI.q_presence_distress",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "presence.impact",
        "label": "psychosisUI.q_presence_impact",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "presence.sleep",
        "label": "psychosisUI.q_presence_sleep",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "presence.trauma",
        "label": "psychosisUI.q_presence_trauma",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "presence.substance",
        "label": "psychosisUI.q_presence_substance",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "distortion",
    "label": "psychosisUI.section_distortion",
    "when": "perception.distortion",
    "questions": [
      {
        "id": "distortion.time",
        "label": "psychosisUI.q_distortion_time",
        "options": [
          [
            "current",
            "psychosisUI.opt_time_current"
          ],
          [
            "history",
            "psychosisUI.opt_time_history"
          ],
          [
            "unknown",
            "psychosisUI.opt_time_unknown"
          ]
        ]
      },
      {
        "id": "distortion.frequency",
        "label": "psychosisUI.q_distortion_frequency",
        "options": [
          [
            "isolated",
            "psychosisUI.opt_freq_isolated"
          ],
          [
            "recurrent",
            "psychosisUI.opt_freq_recurrent"
          ],
          [
            "unknown",
            "psychosisUI.opt_freq_unknown"
          ]
        ]
      },
      {
        "id": "distortion.awake",
        "label": "psychosisUI.q_distortion_awake",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "distortion.conviction",
        "label": "psychosisUI.q_distortion_conviction",
        "options": [
          [
            "doubt",
            "psychosisUI.opt_conviction_doubt"
          ],
          [
            "uncertain",
            "psychosisUI.opt_conviction_uncertain"
          ],
          [
            "strong",
            "psychosisUI.opt_conviction_strong"
          ],
          [
            "complete",
            "psychosisUI.opt_conviction_complete"
          ],
          [
            "fluctuating",
            "psychosisUI.opt_conviction_fluctuating"
          ],
          [
            "unknown",
            "psychosisUI.opt_conviction_unknown"
          ]
        ]
      },
      {
        "id": "distortion.insight",
        "label": "psychosisUI.q_distortion_insight",
        "options": [
          [
            "open",
            "psychosisUI.opt_insight_open"
          ],
          [
            "some",
            "psychosisUI.opt_insight_some"
          ],
          [
            "limited",
            "psychosisUI.opt_insight_limited"
          ],
          [
            "none",
            "psychosisUI.opt_insight_none"
          ],
          [
            "unknown",
            "psychosisUI.opt_insight_unknown"
          ]
        ]
      },
      {
        "id": "distortion.distress",
        "label": "psychosisUI.q_distortion_distress",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "distortion.impact",
        "label": "psychosisUI.q_distortion_impact",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "distortion.sleep",
        "label": "psychosisUI.q_distortion_sleep",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "distortion.trauma",
        "label": "psychosisUI.q_distortion_trauma",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "distortion.substance",
        "label": "psychosisUI.q_distortion_substance",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "belief",
    "label": "psychosisUI.section_belief",
    "questions": [
      {
        "id": "belief.targeted",
        "label": "psychosisUI.q_belief_targeted",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "belief.reference",
        "label": "psychosisUI.q_belief_reference",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "belief.grandiose",
        "label": "psychosisUI.q_belief_grandiose",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "belief.control",
        "label": "psychosisUI.q_belief_control",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "belief.other",
        "label": "psychosisUI.q_belief_other",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "belief.current",
        "label": "psychosisUI.q_belief_current",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "belief.conviction",
        "label": "psychosisUI.q_belief_conviction",
        "options": [
          [
            "doubt",
            "psychosisUI.opt_conviction_doubt"
          ],
          [
            "uncertain",
            "psychosisUI.opt_conviction_uncertain"
          ],
          [
            "strong",
            "psychosisUI.opt_conviction_strong"
          ],
          [
            "complete",
            "psychosisUI.opt_conviction_complete"
          ],
          [
            "fluctuating",
            "psychosisUI.opt_conviction_fluctuating"
          ],
          [
            "unknown",
            "psychosisUI.opt_conviction_unknown"
          ]
        ]
      },
      {
        "id": "belief.insight",
        "label": "psychosisUI.q_belief_insight",
        "options": [
          [
            "open",
            "psychosisUI.opt_insight_open"
          ],
          [
            "some",
            "psychosisUI.opt_insight_some"
          ],
          [
            "limited",
            "psychosisUI.opt_insight_limited"
          ],
          [
            "none",
            "psychosisUI.opt_insight_none"
          ],
          [
            "unknown",
            "psychosisUI.opt_insight_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "organization",
    "label": "psychosisUI.section_organization",
    "questions": [
      {
        "id": "organization.thought",
        "label": "psychosisUI.q_organization_thought",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "organization.speech",
        "label": "psychosisUI.q_organization_speech",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "organization.behavior",
        "label": "psychosisUI.q_organization_behavior",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "organization.baseline",
        "label": "psychosisUI.q_organization_baseline",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "negative",
    "label": "psychosisUI.section_negative",
    "questions": [
      {
        "id": "negative.motivation",
        "label": "psychosisUI.q_negative_motivation",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "negative.expression",
        "label": "psychosisUI.q_negative_expression",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "negative.speech",
        "label": "psychosisUI.q_negative_speech",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "negative.social",
        "label": "psychosisUI.q_negative_social",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "negative.pleasure",
        "label": "psychosisUI.q_negative_pleasure",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "function",
    "label": "psychosisUI.section_function",
    "questions": [
      {
        "id": "function.decline",
        "label": "psychosisUI.q_function_decline",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "function.work",
        "label": "psychosisUI.q_function_work",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.school",
        "label": "psychosisUI.q_function_school",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.relationships",
        "label": "psychosisUI.q_function_relationships",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.selfCare",
        "label": "psychosisUI.q_function_selfCare",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.living",
        "label": "psychosisUI.q_function_living",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.communication",
        "label": "psychosisUI.q_function_communication",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.social",
        "label": "psychosisUI.q_function_social",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      },
      {
        "id": "function.organization",
        "label": "psychosisUI.q_function_organization",
        "options": [
          [
            "none",
            "psychosisUI.opt_impact_none"
          ],
          [
            "mild",
            "psychosisUI.opt_impact_mild"
          ],
          [
            "moderate",
            "psychosisUI.opt_impact_moderate"
          ],
          [
            "severe",
            "psychosisUI.opt_impact_severe"
          ],
          [
            "unknown",
            "psychosisUI.opt_impact_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "course",
    "label": "psychosisUI.section_course",
    "questions": [
      {
        "id": "course.onset",
        "label": "psychosisUI.q_course_onset",
        "options": [
          [
            "sudden",
            "psychosisUI.opt_onset_sudden"
          ],
          [
            "gradual",
            "psychosisUI.opt_onset_gradual"
          ],
          [
            "stable",
            "psychosisUI.opt_onset_stable"
          ],
          [
            "unknown",
            "psychosisUI.opt_onset_unknown"
          ]
        ]
      },
      {
        "id": "course.time",
        "label": "psychosisUI.q_course_time",
        "options": [
          [
            "current",
            "psychosisUI.opt_time_current"
          ],
          [
            "history",
            "psychosisUI.opt_time_history"
          ],
          [
            "unknown",
            "psychosisUI.opt_time_unknown"
          ]
        ]
      },
      {
        "id": "course.pattern",
        "label": "psychosisUI.q_course_pattern",
        "options": [
          [
            "persistent",
            "psychosisUI.opt_course_persistent"
          ],
          [
            "episodic",
            "psychosisUI.opt_course_episodic"
          ],
          [
            "unknown",
            "psychosisUI.opt_course_unknown"
          ]
        ]
      },
      {
        "id": "course.duration",
        "label": "psychosisUI.q_course_duration",
        "options": [
          [
            "days",
            "psychosisUI.opt_duration_days"
          ],
          [
            "weeks",
            "psychosisUI.opt_duration_weeks"
          ],
          [
            "months",
            "psychosisUI.opt_duration_months"
          ],
          [
            "unknown",
            "psychosisUI.opt_duration_unknown"
          ]
        ]
      },
      {
        "id": "course.worsening",
        "label": "psychosisUI.q_course_worsening",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "mood",
    "label": "psychosisUI.section_mood",
    "questions": [
      {
        "id": "mood.depression",
        "label": "psychosisUI.q_mood_depression",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "mood.onlyDepression",
        "label": "psychosisUI.q_mood_onlyDepression",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "mood.activation",
        "label": "psychosisUI.q_mood_activation",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "mood.onlyActivation",
        "label": "psychosisUI.q_mood_onlyActivation",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "trauma",
    "label": "psychosisUI.section_trauma",
    "questions": [
      {
        "id": "trauma.reliving",
        "label": "psychosisUI.q_trauma_reliving",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "trauma.only",
        "label": "psychosisUI.q_trauma_only",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "trauma.dissociation",
        "label": "psychosisUI.q_trauma_dissociation",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "ocd",
    "label": "psychosisUI.section_ocd",
    "questions": [
      {
        "id": "ocd.intrusive",
        "label": "psychosisUI.q_ocd_intrusive",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "ocd.rituals",
        "label": "psychosisUI.q_ocd_rituals",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "ocd.linked",
        "label": "psychosisUI.q_ocd_linked",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "sleep",
    "label": "psychosisUI.section_sleep",
    "questions": [
      {
        "id": "sleep.transitions",
        "label": "psychosisUI.q_sleep_transitions",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "sleep.deprivation",
        "label": "psychosisUI.q_sleep_deprivation",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "context.anxiety",
        "label": "psychosisUI.q_context_anxiety",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "context.adhd",
        "label": "psychosisUI.q_context_adhd",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "substance",
    "label": "psychosisUI.section_substance",
    "questions": [
      {
        "id": "substance.use",
        "label": "psychosisUI.q_substance_use",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "substance.withdrawal",
        "label": "psychosisUI.q_substance_withdrawal",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "substance.medication",
        "label": "psychosisUI.q_substance_medication",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "medical",
    "label": "psychosisUI.section_medical",
    "questions": [
      {
        "id": "medical.illness",
        "label": "psychosisUI.q_medical_illness",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "medical.neurology",
        "label": "psychosisUI.q_medical_neurology",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "medical.change",
        "label": "psychosisUI.q_medical_change",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  },
  {
    "id": "culture",
    "label": "psychosisUI.section_culture",
    "questions": [
      {
        "id": "culture.shared",
        "label": "psychosisUI.q_culture_shared",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      },
      {
        "id": "culture.grief",
        "label": "psychosisUI.q_culture_grief",
        "options": [
          [
            "yes",
            "psychosisUI.opt_yn_yes"
          ],
          [
            "no",
            "psychosisUI.opt_yn_no"
          ],
          [
            "unknown",
            "psychosisUI.opt_yn_unknown"
          ]
        ]
      }
    ]
  }
];
for(const s of A.sections)for(const q of s.questions){q.label=I18n.pair(q.label);q.options=q.options.map(([v,k])=>[v,...I18n.pair(k)]);}
A.questions=A.sections.flatMap(s=>s.questions);
})(globalThis.Psychosis=globalThis.Psychosis||{});

Psychosis.copy.safety="psychosisExtra.safetyHelp";

Psychosis.sections[0].questions.push({id:"intro.concern",label:I18n.pair("psychosisEntry.concern"),options:[["perception","psychosisEntry.perception"],["belief","psychosisEntry.belief"],["organization","psychosisEntry.organization"],["function","psychosisEntry.function"],["other","psychosisEntry.other"]].map(([v,k])=>[v,...I18n.pair(k)])});
Psychosis.questions=Psychosis.sections.flatMap(s=>s.questions);
